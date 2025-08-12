import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Create beautiful waitlist confirmation email with your promotional image
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to PINHAUS Waitlist</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              background-color: #ffffff;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
            }
            .image-container {
              width: 100%;
              text-align: center;
            }
            .image-container img {
              max-width: 100%;
              height: auto;
              display: block;
            }
            .website-link-box {
              background-color: #ffffff;
              border: 2px solid #000000;
              padding: 20px;
              text-align: center;
              margin-top: 0;
            }
            .website-link {
              color: #000000;
              text-decoration: none;
              font-size: 18px;
              font-weight: bold;
              letter-spacing: 2px;
            }
            .website-link:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="image-container">
              <img src="${process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'}/Pinhaus-intro.png" alt="PINHAUS - A Moodboard Marketplace" />
            </div>
            <div class="website-link-box">
              <a href="https://pinhaus.app" class="website-link">PINHAUS.APP</a>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Welcome to PINHAUS Waitlist! 🎉',
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ 
      success: true, 
      message: 'Waitlist confirmation email sent successfully' 
    })

  } catch (error) {
    console.error('Error sending waitlist confirmation email:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send waitlist confirmation email',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 
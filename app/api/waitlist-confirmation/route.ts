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
              padding: 20px;
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 300;
            }
            .content {
              padding: 30px;
              text-align: center;
            }
            .welcome-message {
              font-size: 18px;
              color: #333;
              margin-bottom: 20px;
            }
            .image-container {
              margin: 20px 0;
            }
            .image-container img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #6c757d;
              font-size: 14px;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 25px;
              font-weight: 600;
              margin: 20px 0;
              transition: transform 0.2s ease;
            }
            .cta-button:hover {
              transform: translateY(-2px);
            }
            .status-badge {
              display: inline-block;
              background-color: #28a745;
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 600;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>PINHAUS</h1>
              <p>A Moodboard Marketplace</p>
            </div>
            <div class="content">
              <div class="status-badge">✓ You're on the list!</div>
              
              <h2>Welcome to PINHAUS!</h2>
              <p class="welcome-message">
                Thank you for joining our exclusive waitlist. You're now among the first to experience the future of fashion curation.
              </p>
              
              <div class="image-container">
                <img src="${process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'}/backstage-fashion-bg.jpg" alt="PINHAUS - A Moodboard Marketplace" />
              </div>
              
              <p>Get ready for:</p>
              <ul style="text-align: left; max-width: 400px; margin: 20px auto;">
                <li>🎯 Curated micro-trends</li>
                <li>💡 Sustainable fashion choices</li>
                <li>🚀 Early access to new collections</li>
                <li>✨ Exclusive PINHAUS community</li>
              </ul>
              
              <p>We'll notify you as soon as PINHAUS launches!</p>
              
              <a href="https://yourdomain.com" class="cta-button">
                Visit PINHAUS
              </a>
            </div>
            <div class="footer">
              <p>&copy; 2024 PINHAUS. All rights reserved.</p>
              <p>You're receiving this email because you joined our waitlist.</p>
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
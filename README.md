# PINHAUS Email System with Hosted Images

This project provides a system for sending emails with hosted images instead of text, perfect for replacing Excel add-on email functionality with beautiful, lightweight emails.

## 🚀 Features

- **Single Email Testing**: Test individual emails with hosted images
- **Bulk Email Sending**: Send to multiple recipients (perfect for Excel integration)
- **Hosted Images**: Images are linked, not attached, for optimal email performance
- **Beautiful Templates**: Professional HTML email templates with PINHAUS branding
- **Progress Tracking**: Monitor bulk email sending progress
- **Gmail Integration**: Uses Gmail SMTP for reliable delivery

## 📧 Why Hosted Images?

- ✅ **Faster Loading**: Emails load instantly (no large attachments)
- ✅ **Better Deliverability**: Smaller email size improves spam filter scores
- ✅ **Crystal Clear Images**: No Gmail compression or blurring
- ✅ **Automatic Optimization**: Cloudflare can optimize images automatically
- ✅ **No Clipping**: Avoid "View entire message" issues in Gmail

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Gmail

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password**:
   - Go to Google Account settings → Security
   - Under "2-Step Verification", click "App passwords"
   - Select "Mail" and generate a password
3. **Update your `.env.local` file**:

```env
# Gmail Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# Your domain for image hosting
NEXT_PUBLIC_DOMAIN=https://yourdomain.com
```

### 3. Host Your Promotional Image

Upload your PINHAUS promotional image to one of these locations:

- **Cloudflare Images** (recommended for automatic optimization)
- **Your own server/domain**
- **CDN service**

### 4. Update Image URLs

In the email forms, update the default image URL to point to your hosted image:

```
https://yourdomain.com/images/pinhaus-promo.jpg
```

## 🎯 Usage

### Test Single Email

1. Navigate to `/test-email`
2. Enter recipient email, subject, and image URL
3. Click "Send Email with Image"
4. Check your inbox for the beautiful HTML email

### Send Bulk Emails

1. Navigate to `/bulk-email`
2. **Copy your email column from Excel**
3. **Paste into the emails field** (supports comma, semicolon, or newline separation)
4. Set subject and image URL
5. Click send - emails go out automatically with progress tracking

### Excel Integration Workflow

1. **Copy email column** from your Excel spreadsheet
2. **Paste directly** into the bulk email form
3. **Set your image URL** and subject line
4. **Click send** - the system automatically parses and sends to all recipients
5. **Monitor progress** and results

## 🔧 API Endpoints

### POST `/api/send-email`

Send a single email with hosted image:

```json
{
  "to": "recipient@example.com",
  "subject": "PINHAUS - Coming Soon!",
  "imageUrl": "https://yourdomain.com/images/promotional-image.jpg",
  "imageAlt": "PINHAUS Coming Soon"
}
```

## 📱 Email Template Features

- **Responsive Design**: Works on all devices
- **PINHAUS Branding**: Consistent with your brand
- **Professional Layout**: Clean, modern design
- **Call-to-Action**: Includes waitlist signup button
- **Optimized Images**: Automatic sizing and optimization

## 🚨 Important Notes

### Gmail Limits
- **Daily Limit**: 500 emails per day (free accounts)
- **Rate Limit**: 100 emails per hour
- **App Passwords**: Required for 2FA-enabled accounts

### Image Requirements
- **Format**: JPG, PNG, WebP recommended
- **Size**: Keep under 5MB for optimal loading
- **URL Length**: Keep under 2000 characters
- **Hosting**: Must be publicly accessible

### Security
- **Never commit** your `.env.local` file
- **Use App Passwords**, not your regular Gmail password
- **Monitor** your Gmail account for any issues

## 🐛 Troubleshooting

### Common Issues

1. **"Authentication failed"**
   - Check your Gmail App Password
   - Ensure 2FA is enabled
   - Verify email address is correct

2. **"Image not loading"**
   - Verify image URL is publicly accessible
   - Check image format and size
   - Test URL in browser

3. **"Rate limit exceeded"**
   - Wait before sending more emails
   - Consider upgrading Gmail account
   - Spread sends over time

### Testing

- **Always test** with 1-2 emails first
- **Check spam folder** for test emails
- **Verify image loading** in different email clients
- **Test on mobile** devices

## 🔄 Development

### Run Development Server

```bash
pnpm dev
```

### Build for Production

```bash
pnpm build
```

### Environment Variables

Create a `.env.local` file with your Gmail credentials:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
NEXT_PUBLIC_DOMAIN=https://yourdomain.com
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify your Gmail configuration
3. Test with a single email first
4. Check browser console for errors

## 🎉 Success!

Once configured, you'll have a professional email system that:
- Sends beautiful emails with your PINHAUS promotional images
- Integrates seamlessly with Excel workflows
- Provides better deliverability than text-only emails
- Maintains professional branding and user experience

Your recipients will see crisp, clear images that load instantly, making your PINHAUS marketing emails stand out from the competition! 
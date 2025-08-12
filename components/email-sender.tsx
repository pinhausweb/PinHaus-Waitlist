"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { toast } from './ui/use-toast'

export default function EmailSender() {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('PINHAUS - Coming Soon!')
  const [imageUrl, setImageUrl] = useState('https://yourdomain.com/images/pinhaus-promo.jpg')
  const [isSending, setIsSending] = useState(false)

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !imageUrl) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    setIsSending(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: subject,
          imageUrl: imageUrl,
          imageAlt: 'PINHAUS Coming Soon'
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success!",
          description: "Email sent successfully with your hosted image",
        })
        setEmail('')
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send email",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email. Please check your configuration.",
        variant: "destructive"
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Send Email with Hosted Image</CardTitle>
        <CardDescription>
          Test sending emails with your PINHAUS promotional image
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSendEmail} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Recipient Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="recipient@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              type="text"
              placeholder="Email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://yourdomain.com/images/promotional-image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground">
              Use a hosted image URL (not a file attachment)
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send Email with Image'}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">How it works:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Image is hosted on your server/Cloudflare</li>
            <li>• Email contains HTML with image link</li>
            <li>• Recipients see the image when they open email</li>
            <li>• Email stays lightweight and fast</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
} 
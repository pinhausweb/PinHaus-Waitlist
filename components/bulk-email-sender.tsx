"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { toast } from './ui/use-toast'
import { Progress } from './ui/progress'

export default function BulkEmailSender() {
  const [emails, setEmails] = useState('')
  const [subject, setSubject] = useState('PINHAUS - Coming Soon!')
  const [imageUrl, setImageUrl] = useState('https://yourdomain.com/images/pinhaus-promo.jpg')
  const [isSending, setIsSending] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentEmail, setCurrentEmail] = useState('')

  const handleBulkSend = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!emails || !imageUrl) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    // Parse emails (support comma, semicolon, or newline separated)
    const emailList = emails
      .split(/[,;\n]/)
      .map(email => email.trim())
      .filter(email => email && email.includes('@'))

    if (emailList.length === 0) {
      toast({
        title: "Error",
        description: "No valid email addresses found",
        variant: "destructive"
      })
      return
    }

    setIsSending(true)
    setProgress(0)

    let successCount = 0
    let failCount = 0

    for (let i = 0; i < emailList.length; i++) {
      const email = emailList[i]
      setCurrentEmail(email)
      
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
          successCount++
        } else {
          failCount++
          console.error(`Failed to send to ${email}:`, result.message)
        }

        // Update progress
        const newProgress = ((i + 1) / emailList.length) * 100
        setProgress(newProgress)

        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100))

      } catch (error) {
        failCount++
        console.error(`Error sending to ${email}:`, error)
      }
    }

    setIsSending(false)
    setCurrentEmail('')

    toast({
      title: "Bulk Send Complete",
      description: `Sent: ${successCount}, Failed: ${failCount}`,
      variant: failCount > 0 ? "destructive" : "default"
    })

    if (successCount > 0) {
      setEmails('') // Clear the form on success
    }
  }

  const handlePasteFromExcel = () => {
    // This function can be enhanced to better handle Excel data
    toast({
      title: "Paste from Excel",
      description: "Copy your email column from Excel and paste it in the emails field above",
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Bulk Email with Hosted Image</CardTitle>
        <CardDescription>
          Send emails with your PINHAUS promotional image to multiple recipients
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleBulkSend} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emails">Recipient Emails</Label>
            <Textarea
              id="emails"
              placeholder="email1@example.com, email2@example.com, email3@example.com&#10;Or paste from Excel column"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              rows={4}
              required
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Separate emails with commas, semicolons, or new lines
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePasteFromExcel}
              >
                Excel Help
              </Button>
            </div>
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
              Use a hosted image URL for optimal email performance
            </p>
          </div>

          {isSending && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sending emails...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
              {currentEmail && (
                <p className="text-sm text-muted-foreground">
                  Currently sending to: {currentEmail}
                </p>
              )}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSending}
          >
            {isSending ? 'Sending...' : `Send to ${emails.split(/[,;\n]/).filter(e => e.trim() && e.includes('@')).length} Recipients`}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-2 text-blue-900">Excel Integration Tips:</h4>
          <ul className="text-sm space-y-1 text-blue-800">
            <li>• Copy your email column from Excel</li>
            <li>• Paste directly into the emails field above</li>
            <li>• The system will automatically parse the emails</li>
            <li>• Supports comma, semicolon, or newline separation</li>
            <li>• Perfect for replacing your current Excel add-on text emails</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
} 
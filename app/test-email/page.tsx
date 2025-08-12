import EmailSender from '@/components/email-sender'

export default function TestEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Test Email with Hosted Images
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This page allows you to test sending emails with your PINHAUS promotional image. 
            The image will be hosted on your server and linked in the email HTML for optimal performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <EmailSender />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Setup Instructions</h3>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">1</span>
                  <span>Update your <code className="bg-gray-100 px-1 rounded">.env.local</code> file with Gmail credentials</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">2</span>
                  <span>Host your promotional image on your server or Cloudflare</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">3</span>
                  <span>Use the hosted image URL in the form above</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">4</span>
                  <span>Test sending emails to yourself first</span>
                </li>
              </ol>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Benefits of Hosted Images</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✅ Emails load faster (no large attachments)</li>
                <li>✅ Better deliverability (smaller email size)</li>
                <li>✅ Images appear crisp and clear</li>
                <li>✅ Automatic compression via Cloudflare</li>
                <li>✅ No Gmail clipping issues</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Gmail App Password Setup</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li>1. Enable 2-factor authentication on your Google account</li>
                <li>2. Go to Google Account settings → Security</li>
                <li>3. Generate an App Password for "Mail"</li>
                <li>4. Use this password in your <code className="bg-gray-100 px-1 rounded">.env.local</code> file</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
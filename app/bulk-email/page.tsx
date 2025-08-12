import BulkEmailSender from '@/components/bulk-email-sender'

export default function BulkEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bulk Email with Hosted Images
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Replace your Excel add-on text emails with beautiful, lightweight emails featuring your PINHAUS promotional image. 
            Perfect for marketing campaigns and waitlist notifications.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BulkEmailSender />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Why Hosted Images?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Emails load instantly (no large attachments)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Better deliverability (smaller file size)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Crystal clear images (no Gmail compression)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Automatic optimization via Cloudflare</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>No "View entire message" clipping</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Excel Workflow</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li>1. Copy your email column from Excel</li>
                <li>2. Paste into the bulk email form</li>
                <li>3. Set your image URL and subject</li>
                <li>4. Click send - emails go out automatically</li>
                <li>5. Monitor progress and results</li>
              </ol>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Image Hosting Options</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Cloudflare:</strong>
                  <p className="text-gray-600">Upload to Cloudflare Images for automatic optimization</p>
                </div>
                <div>
                  <strong>Your Server:</strong>
                  <p className="text-gray-600">Host on your own domain for full control</p>
                </div>
                <div>
                  <strong>CDN:</strong>
                  <p className="text-gray-600">Use a CDN for global fast loading</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Pro Tips</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Test with 1-2 emails first</li>
                <li>• Use high-quality images (Cloudflare will optimize)</li>
                <li>• Keep image URLs under 2000 characters</li>
                <li>• Monitor your Gmail sending limits</li>
                <li>• Consider time zones for optimal delivery</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
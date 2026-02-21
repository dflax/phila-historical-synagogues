import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Philadelphia Historical Synagogues
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore the rich history of Philadelphia's Jewish community through
            an interactive map of synagogues past and present
          </p>
          
          <div className="flex gap-4 justify-center mb-12">
            <Link
              href="/map"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Explore Map
            </Link>
            <Link
              href="/synagogues"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              Browse List
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">562</div>
              <div className="text-gray-600">Historic Synagogues</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">83</div>
              <div className="text-gray-600">Still Active</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">250+</div>
              <div className="text-gray-600">Years of History</div>
            </div>
          </div>

          <div className="mt-16 text-left bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">About This Project</h2>
            <p className="text-gray-600 mb-4">
              This interactive database preserves the history of Philadelphia-area synagogues,
              from their founding in the 18th century to the present day. Explore locations,
              view historical photographs, and discover the stories of these important
              community institutions.
            </p>
            <p className="text-gray-600">
              This is a community-driven project. We welcome contributions of information,
              photographs, and personal stories to help preserve this important heritage.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

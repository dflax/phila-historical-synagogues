import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Philadelphia Historical Synagogues
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Home
              </Link>
              <Link href="/map" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Map
              </Link>
              <Link href="/synagogues" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Browse
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              🗺️ Explore Map
            </Link>
            <Link
              href="/synagogues"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              📚 Browse List
            </Link>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <Link href="/synagogues" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:border-blue-200 border border-transparent transition group">
              <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:text-blue-700">562</div>
              <div className="text-gray-600">Historic Synagogues</div>
            </Link>
            <Link href="/synagogues?status=active" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:border-green-200 border border-transparent transition group">
              <div className="text-4xl font-bold text-green-600 mb-2 group-hover:text-green-700">83</div>
              <div className="text-gray-600">Still Active</div>
            </Link>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-purple-600 mb-2">280+</div>
              <div className="text-gray-600">Years of History</div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="bg-white p-8 rounded-lg shadow-md text-left">
              <div className="text-3xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold mb-3">Interactive Map</h3>
              <p className="text-gray-600 mb-4">
                Explore Philadelphia's synagogues on an interactive map. Filter by year 
                to see which synagogues existed at any point in history from 1745 to present.
              </p>
              <Link href="/map" className="text-blue-600 hover:text-blue-800 font-medium">
                View Map →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-left">
              <div className="text-3xl mb-4">📖</div>
              <h3 className="text-xl font-bold mb-3">Rich History</h3>
              <p className="text-gray-600 mb-4">
                Discover the stories behind each synagogue, from their founding to the 
                present day. Learn about the rabbis, communities, and events that shaped them.
              </p>
              <Link href="/synagogues" className="text-blue-600 hover:text-blue-800 font-medium">
                Browse All →
              </Link>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-16 text-left bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">About This Project</h2>
            <p className="text-gray-600 mb-4">
              This interactive database preserves the history of Philadelphia-area synagogues,
              from their founding in the 18th century to the present day. The map shows the 
              geographic distribution and temporal evolution of Jewish communities across 
              the greater Philadelphia region.
            </p>
            <p className="text-gray-600 mb-4">
              With 562 synagogues documented and 424 locations geocoded, you can explore:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>Which synagogues were active in any given year</li>
              <li>How communities moved and evolved over time</li>
              <li>The founding and closure of congregations</li>
              <li>Geographic patterns of Jewish settlement</li>
            </ul>
            <p className="text-gray-600">
              This is a community-driven project. We welcome contributions of information,
              photographs, and personal stories to help preserve this important heritage.
            </p>
          </div>

          {/* Timeline Preview */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Explore History Through Time</h2>
            <p className="text-blue-100 mb-6">
              Use the temporal filter on our interactive map to see how Philadelphia's 
              Jewish community evolved over nearly three centuries.
            </p>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold">1745</div>
                <div className="text-sm text-blue-100">First Synagogue</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold">1880s</div>
                <div className="text-sm text-blue-100">Immigration Wave</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold">1950s</div>
                <div className="text-sm text-blue-100">Suburban Growth</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold">Today</div>
                <div className="text-sm text-blue-100">83 Active</div>
              </div>
            </div>
            <Link 
              href="/map" 
              className="inline-block mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Start Exploring →
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              Preserving Philadelphia's Jewish heritage through technology
            </p>
            <p className="text-gray-500 text-sm mt-2">
              © {new Date().getFullYear()} Philadelphia Historical Synagogues
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

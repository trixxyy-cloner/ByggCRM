import { useState } from 'react'
import { BusinessPlan } from './components/BusinessPlan'
import { ProjectIdea } from './components/ProjectIdea'
import { Contact } from './components/Contact'

function App() {
  const [activeView, setActiveView] = useState('business')

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow-lg">
        <nav className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-6">ByggCRM</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveView('business')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeView === 'business'
                ? 'bg-white text-blue-600'
                : 'bg-blue-500 text-white hover:bg-blue-700'
              }`}
            >
              Affärsplan
            </button>
            <button
              onClick={() => setActiveView('project')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeView === "project"
                ? "bg-white text-blue-600"
                : "bg-blue-500 text-white hover:bg-blue-700"
              }`}
            >
              Projektidé
            </button>
            <button
              onClick={() => setActiveView('contact')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeView === "contact"
                ? "bg-white text-blue-600"
                : "bg-blue-500 text-white hover:bg-blue-700"
              }`}
            >
              Kontakt
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
        {activeView === 'business' && <BusinessPlan />}
        {activeView === 'project' && <ProjectIdea />}
        {activeView === 'contact' && <Contact />}
      </main>

      <footer className='bg-gray-800 text-white mt-12'>
        <div className='max-w-6xl mx-auto px-4 py-8'>
          <p className='text-center text-gray-300'>
            © 2026 ByggCRM. Alla rättigheter förbehållna.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="py-12 bg-gray-900 text-white min-h-screen items-center justify-center py-2">
        <div className="items-center justify-center">
          <header className="flex flex-row items-center justify-center mb-8 space-x-16">
            <img src={viteLogo} alt="vite" className="h-32 pointer-events-none mb-4" />
            <img src={reactLogo} alt="react" className="h-32 pointer-events-none mb-4" />
          </header>

          <div className="flex flex-col items-center justify-center space-x-4 mb-8">
            <h1 className="text-6xl font-bold mb-4">Hello Vite + React!</h1>
            <h2 className='text-3xl'>TailWindCSS + Shadcn/ui</h2>
          </div>
        </div>


        <main className="flex flex-col items-center justify-center flex-1 px-20">
          <p className="text-center mb-4">
            Edit <code className="bg-gray-800 p-1 rounded">App.jsx</code> and save to test HMR updates.
          </p>
          <div className="flex items-center space-x-4">
            <button
              className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => setCount((count) => count + 1)}
            >
              count is: {count}
            </button>
            <a
              className="btn btn-secondary bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              href="https://vitejs.dev/guide/features.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vite Docs
            </a>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
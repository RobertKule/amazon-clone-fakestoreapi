import React from 'react'
import Layout from './components/layout/Layout'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import './index.css'
function App() {
  return (
    <>
      <Layout>
        <h2 className="text-3xl font-bold mb-4">Welcome to My Website</h2>
        <p className="text-lg mb-4">This is a simple React application with a layout component.</p>
        <p className="text-lg">You can add more content here as needed.</p>
      </Layout>
    </>
  )
}

export default App

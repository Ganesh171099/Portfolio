import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Tools from './components/Tools'
import Projects from './components/Projects'
import Designs from './components/Designs'
import Contact from './components/Contact'
import { ToastProvider } from './components/Toast'
import './App.css'

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto'
  }, [])

  return (
    <ToastProvider>
      <Box className="app" component="main">
        <Navbar />
        <Hero />
        <Box className="page-shell">
          <Skills />
          <Tools />
          <Projects />
          <Designs />
          <Contact />
        </Box>
      </Box>
    </ToastProvider>
  )
}

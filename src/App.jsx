import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import NotFound from './pages/NotFound.jsx'
import { projects } from './data/projects.js'
import ScrollToTop from './components/ScrollToTop.jsx'
import './App.css'

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme')
    const initialTheme = saved === 'dark' || saved === 'light' ? saved : 'light'
    document.documentElement.setAttribute('data-theme', initialTheme)
    return initialTheme
  })

  // useEffect: Persist theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<Layout theme={theme} toggleTheme={toggleTheme} />}
        >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="projects"
            element={<Projects projects={projects} />}
          />
          <Route
            path="projects/:projectId"
            element={<ProjectDetail projects={projects} />}
          />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

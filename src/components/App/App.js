import React from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'

import Header from '../Header'
import Articles from '../Articles'
import ArticlePage from '../ArticlePage'
import Footer from '../Footer'

import s from './App.module.scss'

function MainContent() {

  const location = useLocation()
  const showFooter = location.pathname === '/articles'

  return (
    <div className={s.container}>
      <Header />
      <Routes>
        <Route path='/articles' exact element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
      </Routes>
      {showFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  )
}

export default App
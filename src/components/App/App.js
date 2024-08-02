import React from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'

import Header from '../Header'
import ArticleList from '../ArticleList'
import ArticlePage from '../ArticlePage'
import Login from '../Login'
import Profile from '../Profile'
import Registration from '../Registration'
import Footer from '../Footer'

import s from './App.module.scss'

function MainContent() {

  const location = useLocation()
  const showFooter = location.pathname === '/articles'

  return (
    <div className={s.container}>
      <Header />
      <Routes>
        <Route path='/articles' exact element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/registration" element={<Registration />} />
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
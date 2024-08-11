import React from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from '../Header'
import ArticleList from '../ArticleList'
import ArticlePage from '../ArticlePage'
import Login from '../Login'
import Profile from '../Profile'
import NewArticle from '../NewArticle'
import EditArticlePage from '../EditArticlePage'
import Registration from '../Registration'
import Footer from '../Footer'
import PrivateRoute from '../PrivateRoute'

import s from './App.module.scss'

function MainContent({ isAuthenticated }) {

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
        <Route path="/new-article" element={
          <PrivateRoute
            element={<NewArticle />} 
            isAuthenticated={isAuthenticated} 
          />
        }/>
        <Route path="/articles/:slug/edit" element={
          <PrivateRoute
            element={<EditArticlePage />} 
            isAuthenticated={isAuthenticated} 
          />
        }/>
        <Route path="/registration" element={<Registration />} />
      </Routes>
      {showFooter && <Footer />}
    </div>
  )
}

function App() {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated)

  return (
    <Router>
      <MainContent isAuthenticated={isAuthenticated} />
    </Router>
  )
}

export default App


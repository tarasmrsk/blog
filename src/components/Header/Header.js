/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import s from './Header.module.scss'

function Header() {
  
  const username = localStorage.getItem('username')
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <header className={s.header}>
      <Link to='/articles' className={s.home}>Realworld Blog</Link>
      <article className={s.authentication}>
        {username ? (
          <div className={s.name}>
            <Link to="/profile" className={s.profile}>
              <span className={s.name}>{username}</span>
            </Link>
            <button type='button' onClick={handleLogout} className={s.logout}>
              Exit
            </button>
          </div>
        ) : (
          <>
            <Link to='/login' className={s.login}>Login</Link>
            <Link to='/registration' className={s.registration}>Registration</Link>
          </>
        )}
      </article>
    </header>
  )
}

export default Header
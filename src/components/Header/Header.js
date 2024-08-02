/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import s from './Header.module.scss'

function Header() {
  const navigate = useNavigate()

  const storedData = localStorage.getItem('login')
  const parsedData = storedData ? JSON.parse(storedData) : null 

  const username = parsedData ? parsedData.username : null 
  const image = parsedData ? parsedData.image : null 

  const handleLogout = () => {
    localStorage.removeItem('login')
    navigate('/login')
  }

  return (
    <header className={s.header}>
      <Link to='/articles' className={s.home}>Realworld Blog</Link>
      <article className={s.authentication}>
        {username ? (
          <div className={s.name}>
            <button type='button' className={s.create}>
              Create article
            </button>
            <Link to="/profile" className={s.profile}>
              <span className={s.username}>{username}</span>
              {image && <img src={image} alt="Avatar" className={s.avatar} />}
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
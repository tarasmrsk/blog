import React from 'react'
import { Link } from 'react-router-dom'

import s from './Header.module.scss'

function Header() {

  return (
    <section className={s.header}>
      <Link to='/articles' className={s.home}>Realworld Blog</Link>
      <article>
        <button type='button' className={s.sing_in}>
      Sing In
        </button>
        <button type='button' className={s.sing_up}>
      Sing Up
        </button>
      </article>
    </section>
  )
}

export default Header
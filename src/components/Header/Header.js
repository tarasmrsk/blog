/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { Link } from 'react-router-dom'

import s from './Header.module.scss'

function Header() {

  return (
    <section className={s.header}>
      <Link to='/articles' className={s.home}>Realworld Blog</Link>
      <article className={s.authentication}>
        <Link to='/login' className={s.login}>Login</Link>
        <Link to="/profile" className={s.profile}>
          <span className={s.name}>Имя пользователя</span>
          {/* <img src={user.avatar} alt={`${user.name}'s avatar`} /> */}
        </Link>
        <Link to='/registration' className={s.registration}>Registration</Link>
      </article>
    </section>
  )
}

export default Header


// /* eslint-disable jsx-a11y/label-has-associated-control */
// import React from 'react'
// import { Link } from 'react-router-dom'

// import s from './Header.module.scss'

// function Header({ user }) {

//   return (
//     <section className={s.header}>
//       <Link to='/articles' className={s.home}>Realworld Blog</Link>
//       <article className={s.authentication}>
//         <Link to='/login' className={s.login}>Login</Link>
//         <Link to="/profile">
//           <img src={user.avatar} alt={`${user.name}'s avatar`} />
//           <span>{user.name}</span>
//         </Link>
//         <Link to='/registration' className={s.registration}>Registration</Link>
//       </article>
//     </section>
//   )
// }

// export default Header
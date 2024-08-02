import React, { useEffect } from 'react'
import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { fetchArticles, setCurrentPage } from '../../redux/articlesReducer'

import s from './Footer.module.scss'

function Footer() {
  const dispatch = useDispatch()
  const currentPage = useSelector(state => state.id.currentPage)
  const totalArticles = useSelector(state => state.id.total)

  useEffect(() => {
    dispatch(fetchArticles(currentPage))
    localStorage.setItem('currentPage', currentPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage, dispatch])

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
  }

  return (
    <div className={s.footer}>
      <Pagination
        current={currentPage}
        total={totalArticles} 
        pageSize={5}
        onChange={handlePageChange} 
      />
    </div>
  )
}

export default Footer


// import React, { useEffect } from 'react'
// import { Pagination } from 'antd'
// import { useDispatch, useSelector } from 'react-redux'

// import { fetchArticles, setCurrentPage } from '../../redux/articlesReducer'

// import s from './Footer.module.scss'

// function Footer() {
//   const dispatch = useDispatch()
//   const currentPage = useSelector(state => state.currentPage) // Исправлено на state.articles
//   const totalArticles = useSelector(state => state.total) // Исправлено на state.articles

//   useEffect(() => {
//     // Получаем статьи при изменении текущей страницы
//     dispatch(fetchArticles({ page: currentPage, limit: 5 })) // Передаем параметры как объект
//     localStorage.setItem('currentPage', currentPage)
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }, [currentPage, dispatch])

//   const handlePageChange = (page) => {
//     dispatch(setCurrentPage(page))
//   }

//   return (
//     <div className={s.footer}>
//       <Pagination
//         current={currentPage}
//         total={totalArticles}
//         pageSize={5}
//         onChange={handlePageChange}
//       />
//     </div>
//   )
// }

// export default Footer
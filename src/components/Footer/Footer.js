import React, { useEffect } from 'react'
import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentPage } from '../../redux/articlesReducer'

import s from './Footer.module.scss'

function Footer() {
  const dispatch = useDispatch()
  const currentPage = useSelector(state => state.id.currentPage)
  const totalArticles = useSelector(state => state.id.total)

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage')
    if (savedPage) {
      dispatch(setCurrentPage(Number(savedPage)))
    }
  }, [dispatch])

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
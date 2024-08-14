import React, { useEffect } from 'react'
import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentPage } from '../../redux/articlesSlice'
import { selectCurrentPage, selectTotalArticles } from '../../redux/articlesSelectors'

import s from './Footer.module.scss'

function Footer() {
  const dispatch = useDispatch()
  const currentPage = useSelector(selectCurrentPage)
  const totalArticles = useSelector(selectTotalArticles)

  useEffect(() => {
    const savedPage = Number(localStorage.getItem('currentPage')) || 1
    dispatch(setCurrentPage(savedPage))
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage)
  }, [currentPage, dispatch])

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
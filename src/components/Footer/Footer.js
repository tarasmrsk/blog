import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { fetchArticles } from '../../redux/articlesReducer'

import s from './Footer.module.scss'

function Footer() {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const totalArticles = useSelector(state => state.id.total)

  console.log(`Общее количество статей: ${totalArticles}`)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    dispatch(fetchArticles(currentPage))
  }, [currentPage, dispatch])

  const handlePageChange = (page) => {
    setCurrentPage(page)
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

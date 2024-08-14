import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { fetchArticleSlug } from '../../redux/articlesSlice'
import { selectCurrentSlug } from '../../redux/articlesSelectors'

const useArticleAccess = (slug, currentUser) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentSlug = useSelector(selectCurrentSlug)
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      await dispatch(fetchArticleSlug(slug))
      setLoading(false)
    }
    checkAccess()
  }, [dispatch, slug])

  useEffect(() => {
    if (!loading) {
      if (currentSlug) {
        if (currentSlug.author.username !== currentUser) {
          message.error('У вас нет прав для редактирования этой статьи.')
          navigate('/articles')
        } else {
          setHasAccess(true)
        }
      }
    }
  }, [currentSlug, currentUser, loading, navigate])

  return { loading, hasAccess, currentSlug }
}

export default useArticleAccess
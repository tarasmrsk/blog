/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'

import HeartBlack from '../../img/HeartBlack.png'
import HeartRed from '../../img/HeartRed.png'
import { favoriteArticle, unfavoriteArticle } from '../../redux/favoriteArticle'
import { selectIsAuthenticated } from '../../redux/articlesSelectors'

function Like({ article }) {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const [isLiked, setIsLiked] = useState(article.favorited)
  const [likeCount, setLikeCount] = useState(article.favoritesCount)

  useEffect(() => {
    setIsLiked(article.favorited)
    setLikeCount(article.favoritesCount)
  }, [article.favorited, article.favoritesCount])

  const handleLikeToggle = useCallback(async () => {
    if (!isAuthenticated) {
      message.error('Вы должны быть авторизованы, чтобы ставить лайки.')
      return
    }
    try {
      if (isLiked) {
        await dispatch(unfavoriteArticle(article.slug))
        message.success('Лайк успешно снят!')
        setLikeCount(prevCount => prevCount - 1)
      } else {
        await dispatch(favoriteArticle(article.slug))
        message.success('Лайк успешно поставлен!')
        setLikeCount(prevCount => prevCount + 1)
      }
      setIsLiked(prevLiked => !prevLiked)
    } catch (error) {
      console.error('Ошибка при работе с лайком:', error)
      message.error('Произошла ошибка при работе с лайком.')
    }
  }, [dispatch, isLiked, article.slug])

  return (
    <>
      <img
        src={isLiked ? HeartRed : HeartBlack}
        alt="Like"
        onClick={handleLikeToggle}
        style={{ cursor: 'pointer' }}
      />
      <span>{likeCount}</span>
    </>
  )
}

export default Like





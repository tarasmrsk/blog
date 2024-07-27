/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { useLocation } from 'react-router-dom'

import { fetchArticles } from '../../redux/articlesReducer'

import s from './ArticlePage.module.scss'

function ArticlePage({ match }) {
  const dispatch = useDispatch()
  const { article, loading, error } = useSelector((state) => state.id.articles)
  const { slug, ...props } = useLocation().state

  useEffect(() => {
    dispatch(fetchArticles(slug))
  }, [dispatch, slug])

  if (loading) {
    return <div>Загрузка...</div>
  }

  if (error) {
    return <div>Ошибка: {error}</div>
  }

  return (
    <section className={s.article}>
      <div className={s.article_info}>
        <div className={s.header}>
          <div className={s.header_title}>
            <span className={s.title}>{props.title}</span>
            <span className={s.like}>♡</span>
            <span className={s.likeCounter}>{props.favoritesCount}</span>
          </div>
          {props.tagList.length > 0 && (
            <div className={s.tags}>
              {props.tagList.map((tag) => (
                <span key={tag} className={s.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div className={s.AuthorDetails}>
          <div className={s.author_info}>
            <span className={s.author}>{props.author.username}</span><br />
            <span className={s.date}>
              {new Date(props.createdAt).toLocaleDateString('en-US', {
                timeZone: 'UTC',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className={s.logo}>
            <img src={props.author.image}  alt={props.username} className={s.avatar}/>
          </div>
        </div>
      </div>
      <div className={s.text}>
        <p>{props.description}</p>
      </div>
      <ReactMarkdown className={s.body}>{props.body}</ReactMarkdown>
    </section>
  )
}

export default ArticlePage

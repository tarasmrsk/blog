import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Spin } from 'antd'

import { fetchArticles } from '../../redux/articlesReducer'

import s from './Articles.module.scss'

function Articles() {

  const dispatch = useDispatch()
  const { slug } = useParams()
  const articles = useSelector((state) => state.id.articles)
  const loading = useSelector((state) => state.id.loading)

  useEffect(() => {
    dispatch(fetchArticles(slug))
  }, [dispatch, slug])

  useEffect(() => {
    console.log(articles)
  }, [articles])

  return (
    <div>
      {!loading ? (
        <div className={s.spin}>
          <Spin tip="Loading" size="large" />
        </div>
      ) : articles && articles.length > 0 ? (
        articles.map((article, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <section key={index} className={s.article}>
            <div className={s.article_info}>
              <div className={s.header}>
                <div className={s.header_title}>
                  <Link to={`/articles/${article.slug}`} className={s.title} state={article}>{article.title}</Link>
                  <span className={s.like}>♡</span>
                  <span className={s.likeCounter}>{article.favoritesCount}</span>
                </div>
                {article.tagList.length > 0 && (
                  <div className={s.tags}>
                    {article.tagList.map((tag) => (
                      <span key={tag} className={s.tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className={s.AuthorDetails}>
                <div className={s.author_info}>
                  <span className={s.author}>{article.author.username}</span><br />
                  <span className={s.date}>
                    {new Date(article.createdAt).toLocaleDateString('en-US', {
                      timeZone: 'UTC',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className={s.logo}>
                  <img src={article.author.image}  alt={article.username} className={s.avatar}/>
                </div>
              </div>
            </div>
            <div className={s.text}>
              <p>{article.description}</p>
            </div>
          </section>
        ))
      ) : (
        <Alert message="Нет статей для отображения." type="info" />
      )}
    </div>
  )
}

export default Articles

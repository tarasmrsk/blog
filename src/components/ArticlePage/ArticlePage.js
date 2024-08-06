/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, message, Modal, Spin } from 'antd'
import ReactMarkdown from 'react-markdown'
import { useLocation, useNavigate } from 'react-router-dom'

import Like from '../Like'
import { fetchArticles } from '../../redux/articlesReducer'
import { deleteArticle } from '../../redux/articlesSlice'

import s from './ArticlePage.module.scss'

function ArticlePage({ match }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { slug, ...props } = useLocation().state

  const article = useSelector((state) => 
    state.id.articles ? state.id.articles.find((a) => a.slug === slug) : null
  )

  useEffect(() => {
    dispatch(fetchArticles(slug))
  }, [dispatch, slug])

  const handleEdit = () => {
    navigate(`/articles/${slug}/edit`, { state: props })
  }

  const handleDelete = async () => {
    try {
      await dispatch(deleteArticle(slug)).unwrap()
      message.success('Статья успешно удалена!')
      navigate('/articles')
    } catch (error) {
      console.error('Ошибка при удалении статьи:', error)
    }
  }

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить эту статью?',
      content: 'После удаления восстановить статью будет невозможно.',
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: handleDelete,
    })
  }

  const loginData = JSON.parse(localStorage.getItem('login'))
  const username = loginData ? loginData.username : null
  const isAuthor = props.author.username === username

  if (!article) return <Spin />

  return (
    <section className={s.article}>
      <div className={s.article_info}>
        <div className={s.header}>
          <div className={s.header_title}>
            <span className={s.title}>{props.title}</span>
            <Like 
              article={article} 
            />
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
        {isAuthor && username && (
          <div className={s.btn}>
            <Button type="primary" danger ghost className={s.btnDelete} onClick={showDeleteConfirm}>
            Delete
            </Button>
            <Button type="primary" ghost onClick={handleEdit}>
            Edit
            </Button>
          </div>
        )}
      </div>
      <ReactMarkdown className={s.body}>{props.body}</ReactMarkdown>
    </section>
  )
}

export default ArticlePage
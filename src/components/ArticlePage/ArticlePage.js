/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, message, Modal, Spin } from 'antd'
import ReactMarkdown from 'react-markdown'
import { useNavigate, useParams } from 'react-router-dom'

import Like from '../Like'
import { fetchArticleSlug } from '../../redux/articlesReducer'
import { deleteArticle } from '../../redux/articlesSlice'

import s from './ArticlePage.module.scss'

function ArticlePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { slug } = useParams()
  const loading = useSelector((state) => state.id.loading)
  const currentSlug = useSelector((state) => state.id.currentSlug)

  useEffect(() => {
    dispatch(fetchArticleSlug(slug))
  }, [dispatch, slug])

  const handleEdit = () => {
    navigate(`/articles/${slug}/edit`, { state: currentSlug })
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
  const isAuthor = currentSlug?.author.username === username

  if (loading) return <Spin  tip="Loading" size="large" className={s.spin}/>

  if (!currentSlug) return <Alert message="Статья не найдена" type="error" />

  return (
    <section className={s.article}>
      <div className={s.article_info}>
        <div className={s.header}>
          <div className={s.header_title}>
            <span className={s.title}>{currentSlug.title}</span>
            <Like 
              article={currentSlug} 
            />
          </div>
          {currentSlug.tagList.length > 0 && (
            <div className={s.tags}>
              {currentSlug.tagList.map((tag) => (
                <span key={tag} className={s.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div className={s.AuthorDetails}>
          <div className={s.author_info}>
            <span className={s.author}>{currentSlug.author.username}</span><br />
            <span className={s.date}>
              {new Date(currentSlug.createdAt).toLocaleDateString('en-US', {
                timeZone: 'UTC',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className={s.logo}>
            <img src={currentSlug.author.image}  alt={currentSlug.username} className={s.avatar}/>
          </div>
        </div>
      </div>
      <div className={s.text}>
        <p>{currentSlug.description}</p>
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
      <ReactMarkdown className={s.body}>{currentSlug.body}</ReactMarkdown>
    </section>
  )
}

export default ArticlePage
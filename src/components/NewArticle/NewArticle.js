/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, message } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { createArticle } from '../../redux/actionSlice'

import s from './NewArticle.module.scss'

const { TextArea } = Input

function NewArticle() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const [tags, setTags] = useState([]) 
  const [tagInput, setTagInput] = useState('')

  const onSubmit = async (data) => {
    const articleData = {
      article: {
        title: data.title,
        description: data.shortDescription,
        body: data.text,
        tagList: tags,
      },
    }
  
    try {
      setLoading(true)
      const response = await dispatch(createArticle(articleData)).unwrap()
      message.success('Статья успешно добавлена!')
      navigate(`/articles/${response.article.slug}`)
    } catch (error) {
      message.error(error)
    } finally {
      reset()
      setTags([])
      setTagInput('')
      setLoading(false)
    }
  }
  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <section className={s.NewArticleContainer}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>

        <h2 className={s.article}>Create new article</h2>

        <label htmlFor="title" className={s.title}>
          Title
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title обязателен для заполнения' }}
            render={({ field }) => (
              <Input placeholder="Title" {...field} />
            )}
          />
          {errors.title && <span className={s.errorMessage}>{errors.title.message}</span>}
        </label>

        <label htmlFor="shortDescription" className={s.shortDescription}>
            Short description
          <Controller
            name="shortDescription"
            control={control}
            rules={{ required: 'Short description обязателен для заполнения' }}
            render={({ field }) => (
              <Input placeholder="Short description" {...field} />
            )}
          />
          {errors.shortDescription && <span className={s.errorMessage}>{errors.shortDescription.message}</span>}
        </label>

        <label htmlFor="text" className={s.text}>
            Text
          <Controller
            name="text"
            control={control}
            rules={{ required: 'Text обязателен для заполнения' }}
            render={({ field }) => (
              <TextArea
                rows={5}
                placeholder="Text"
                {...field}
                className={s.textArea}
              />
            )}
          />
          {errors.text && <span className={s.errorMessage}>{errors.text.message}</span>}
        </label>

        <label htmlFor="tags" className={s.tags}>
          Tags
          <div className={s.tagsContainer}>
            <Input 
              placeholder="Tag" 
              className={s.tagsInput} 
              value={tagInput}
              onChange={(e) =>
                setTagInput(e.target.value)}
            />
            <Button type="primary" ghost htmlType="button" onClick={addTag} className={s.addButton}>Add tag</Button>
          </div>
          <div className={s.tagsList}>
            {tags.map((tag) => (
              <div key={tag} className={s.tagItem}>
                {tag}
                <Button 
                  type="primary" 
                  danger 
                  ghost 
                  onClick={() => removeTag(tag)} 
                  className={s.removeButton}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </label>

        <Button type="primary" htmlType="submit" className={s.button} loading={loading} disabled={loading}>Send</Button>

      </form>
    </section>
  )
}

export default NewArticle
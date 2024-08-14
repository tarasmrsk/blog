/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, message } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { updateProfile } from '../../redux/profileSlice'

import s from './Profile.module.scss'

function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem('login')) || {}
    const username = loginData.username || ''
    const email = loginData.email || '' 
    const avatar = loginData.image || '' 

    reset({
      username,
      email,
      avatar,
    })
  }, [reset])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await dispatch(updateProfile(data)).unwrap()
      message.success('Данные пользователя успешно обновлены!')
      navigate('/profile')
      window.location.reload()
    } catch (error) {
      message.error(error)
    } finally {
      setLoading(false)
      reset()
    }
  }

  return (
    <section className={s.profileContainer}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={s.profile}>Edit Profile</h2>

        <label htmlFor="username" className={s.username}>
          Username
          <Controller
            name="username"
            control={control}
            rules={{
              required: 'Username обязателен для заполнения',
              validate: {
                isLatin: value => /^[a-zA-Z]+$/.test(value) || 'Username должен содержать только латинские буквы',
                minLength: value => value.length >= 3 || 'Username должен быть не менее 3 символов',
                maxLength: value => value.length <= 20 || 'Username должен быть не больше 20 символов',
              },
            }}
            render={({ field }) => (
              <Input {...field} placeholder="Username" status={errors.username ? 'error' : ''} />
            )}
          />
          {errors.username && <span className={s.errorMessage}>{errors.username.message}</span>}
        </label>

        <label htmlFor="email" className={s.email}>
          Email address
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email обязателен для заполнения',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Неверный адрес электронной почты',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Email address"
                status={errors.email ? 'error' : ''}
              />
            )}
          />
          {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
        </label>

        <label htmlFor="password" className={s.password}>
          New password
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Пароль обязателен для заполнения',
              minLength: {
                value: 6,
                message: 'Password должен быть не менее 6 символов',
              },
              maxLength: {
                value: 40,
                message: 'Password должен быть не больше 40 символов',
              },
            }}
            render={({ field }) => (
              <Input.Password {...field} placeholder="New password" status={errors.password ? 'error' : ''} />
            )}
          />
          {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
        </label>

        <label htmlFor="avatar" className={s.avatar}>
          Avatar image (url)
          <Controller
            name="avatar"
            control={control}
            rules={{
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))$/i,
                message: 'Неверный URL формат',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Avatar image" 
                status={errors.avatar ? 'error' : ''}
              />
            )}
          />
          {errors.avatar && <span className={s.errorMessage}>{errors.avatar.message}</span>}
        </label>

        <Button type="primary" htmlType="submit" className={s.button} loading={loading} disabled={loading}>Save</Button>

      </form>
    </section>
  )
}

export default Profile
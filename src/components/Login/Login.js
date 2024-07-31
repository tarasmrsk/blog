/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { Button, Input } from 'antd'

import s from './Login.module.scss'

function Login() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    reset()
  }

  return (
    <section className={s.loginContainer}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={s.login}>Login</h2>

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
          Password
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Пароль обязателен для заполнения' }}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Password"
                status={errors.password ? 'error' : ''}
              />
            )}
          />
          {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
        </label>

        <Button type="primary" htmlType="submit" className={s.button}>Login</Button>

        <p className={s.registration}>
          Don’t have an account? <Link to='/registration' className={s.linkRegistration}>Registration</Link>.
        </p>
        
      </form>
    </section>
  )
}

export default Login
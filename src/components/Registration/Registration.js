/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Checkbox, Input } from 'antd'
import { useForm, Controller } from 'react-hook-form'

import { registerUser } from '../../redux/registrationSlice'

import s from './Registration.module.scss'

function Registration() {
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    await dispatch(registerUser(data))
    reset()
  }

  return (
    <section className={s.RegistrationContainer}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={s.registration}>Create New Account</h2>

        <label htmlFor="username" className={s.username}>
          Username
          <Controller
            name="username"
            control={control}
            rules={{
              required: 'Username обязателен для заполнения',
              minLength: {
                value: 3,
                message: 'Username должен быть не менее 3 символов',
              },
              maxLength: {
                value: 20,
                message: 'Username должен быть не больше 20 символов',
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
          Password
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
              <Input.Password {...field} placeholder="Password" status={errors.password ? 'error' : ''} />
            )}
          />
          {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
        </label>

        <label htmlFor="repeatPassword" className={s.password}>
          Repeat Password
          <Controller
            name="repeatPassword"
            control={control}
            rules={{
              required: 'Повторите введенный пароль',
              validate: (value) => value === getValues('password') || 'Пароли не совпадают',
            }}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Repeat Password" status={errors.repeatPassword ? 'error' : ''} />
            )}
          />
          {errors.repeatPassword && <span className={s.errorMessage}>{errors.repeatPassword.message}</span>}
        </label>

        <label htmlFor="checkbox" className={s.checkbox}>
          <Controller
            name="agreeToTerms"
            control={control}
            rules={{ required: 'Вы должны согласиться с условиями' }}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value}>
                I agree to the processing of my personal information
              </Checkbox>
            )}
          />
          {errors.agreeToTerms && <span className={s.errorMessage}>{errors.agreeToTerms.message}</span>}
        </label>

        <Button type="primary" htmlType="submit" className={s.button}>Create</Button>

        <p className={s.login}>
          Already have an account? <Link to='/login' className={s.linkLogin}>Login</Link>.
        </p>

      </form>
    </section>
  )
}

export default Registration
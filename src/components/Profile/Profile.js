/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Button, Input } from 'antd'
import { useForm, Controller } from 'react-hook-form'

import s from './Profile.module.scss'

function Profile() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    reset()
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

        <Button type="primary" htmlType="submit" className={s.button}>Save</Button>

      </form>
    </section>
  )
}

export default Profile


// /* eslint-disable react/jsx-props-no-spreading */
// import React, { useEffect } from 'react'
// import { Button, Input } from 'antd'
// import { useForm, Controller } from 'react-hook-form'
// import { useHistory } from 'react-router-dom'

// import { fetchUserData, updateUserData } from './api'
// import s from './Profile.module.scss'

// function Profile() {
//   const {
//     control,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     reset,
//   } = useForm()
//   const history = useHistory()

//   useEffect(() => {
//     const loadUserData = async () => {
//       const userData = await fetchUserData()
//       setValue('name', userData.name)
//       setValue('avatar', userData.avatar)
//     }
//     loadUserData()
//   }, [setValue])

//   const onSubmit = async (data) => {
//     await updateUserData(data)
//     history.push('/')
//     console.log(data)
//     reset()
//   }

//   return (
//     <section className={s.profileContainer}>
//       <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
//         <h2 className={s.profile}>Edit Profile</h2>

//         <label htmlFor="username" className={s.username}>
//           Username
//           <Controller
//             name="username"
//             control={control}
//             rules={{
//               required: 'Username обязателен для заполнения',
//               minLength: {
//                 value: 3,
//                 message: 'Username должен быть не менее 3 символов',
//               },
//               maxLength: {
//                 value: 20,
//                 message: 'Username должен быть не больше 20 символов',
//               },
//             }}
//             render={({ field }) => (
//               <Input {...field} placeholder="Username" status={errors.username ? 'error' : ''} />
//             )}
//           />
//           {errors.username && <span className={s.errorMessage}>{errors.username.message}</span>}
//         </label>

//         <label htmlFor="email" className={s.email}>
//           Email address
//           <Controller
//             name="email"
//             control={control}
//             rules={{
//               required: 'Email обязателен для заполнения',
//               pattern: {
//                 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                 message: 'Неверный адрес электронной почты',
//               },
//             }}
//             render={({ field }) => (
//               <Input
//                 {...field}
//                 placeholder="Email address"
//                 status={errors.email ? 'error' : ''}
//               />
//             )}
//           />
//           {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
//         </label>

//         <label htmlFor="password" className={s.password}>
//           New password
//           <Controller
//             name="password"
//             control={control}
//             rules={{
//               required: 'Пароль обязателен для заполнения',
//               minLength: {
//                 value: 6,
//                 message: 'Password должен быть не менее 6 символов',
//               },
//               maxLength: {
//                 value: 40,
//                 message: 'Password должен быть не больше 40 символов',
//               },
//             }}
//             render={({ field }) => (
//               <Input.Password {...field} placeholder="New password" status={errors.password ? 'error' : ''} />
//             )}
//           />
//           {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
//         </label>

//         <label htmlFor="avatar" className={s.avatar}>
//           Avatar image (url)
//           <Controller
//             name="avatar"
//             control={control}
//             rules={{
//               pattern: {
//                 value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))$/i,
//                 message: 'Неверный URL формат',
//               },
//             }}
//             render={({ field }) => (
//               <Input
//                 {...field}
//                 placeholder="Avatar image" 
//                 status={errors.avatar ? 'error' : ''}
//               />
//             )}
//           />
//           {errors.avatar && <span className={s.errorMessage}>{errors.avatar.message}</span>}
//         </label>

//         <Button type="primary" htmlType="submit" className={s.button}>Save</Button>

//       </form>
//     </section>
//   )
// }

// export default Profile
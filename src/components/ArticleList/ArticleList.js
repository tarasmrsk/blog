// import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { Alert, Spin } from 'antd'

// import Like from '../Like'
// import { fetchArticles } from '../../redux/articlesSlice'
// import { selectCurrentPage, selectArticles, selectLoading } from '../../redux/articlesSelectors'

// import s from './Articles.module.scss'

// function ArticleList() {

//   const dispatch = useDispatch()
//   const currentPage = useSelector(selectCurrentPage)
//   const articles = useSelector(selectArticles)
//   const loading = useSelector(selectLoading)

//   // console.log(currentPage)

//   useEffect(() => {
//     dispatch(fetchArticles(currentPage))
//   }, [dispatch, currentPage])

//   return (
//     <div>
//       {loading ? (
//         <Spin tip="Loading" size="large" className={s.spin}/>
//       ) : articles && articles.length > 0 ? (
//         articles.map((article, index) => (
//           // eslint-disable-next-line react/no-array-index-key
//           <section key={index} className={s.article}>
//             <div className={s.article_info}>
//               <div className={s.header}>
//                 <div className={s.header_title}>
//                   <Link to={`/articles/${article.slug}`} className={s.title} state={article}>{article.title}</Link>
//                   <Like 
//                     article={article} 
//                   />
//                 </div>
//                 {article.tagList.length > 0 && (
//                   <div className={s.tags}>
//                     {article.tagList.map((tag) => (
//                       <span key={tag} className={s.tag}>{tag}</span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div className={s.AuthorDetails}>
//                 <div className={s.author_info}>
//                   <span className={s.author}>{article.author.username}</span><br />
//                   <span className={s.date}>
//                     {new Date(article.createdAt).toLocaleDateString('en-US', {
//                       timeZone: 'UTC',
//                       month: 'long',
//                       day: 'numeric',
//                       year: 'numeric',
//                     })}
//                   </span>
//                 </div>
//                 <div className={s.logo}>
//                   <img src={article.author.image}  alt={article.username} className={s.avatar}/>
//                 </div>
//               </div>
//             </div>
//             <div className={s.text}>
//               <p>{article.description}</p>
//             </div>
//           </section>
//         ))
//       ) : (
//         loading && <Alert message="Нет статей для отображения." type="info" />
//       )}
//     </div>
//   )
// }

// export default ArticleList


import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Alert, Spin } from 'antd'

import Like from '../Like'
import { selectArticles, selectLoading } from '../../redux/articlesSelectors'

import s from './Articles.module.scss'

function ArticleList() {

  const articles = useSelector(selectArticles)
  const loading = useSelector(selectLoading)

  return (
    <div>
      {loading ? (
        <Spin tip="Loading" size="large" className={s.spin}/>
      ) : articles && articles.length > 0 ? (
        articles.map((article, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <section key={index} className={s.article}>
            <div className={s.article_info}>
              <div className={s.header}>
                <div className={s.header_title}>
                  <Link to={`/articles/${article.slug}`} className={s.title} state={article}>{article.title}</Link>
                  <Like 
                    article={article} 
                  />
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
        loading && <Alert message="Нет статей для отображения." type="info" />
      )}
    </div>
  )
}

export default ArticleList
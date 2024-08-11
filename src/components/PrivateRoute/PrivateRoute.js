import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ element, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  return element
}

export default PrivateRoute

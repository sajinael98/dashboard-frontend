"use client"

import { useDocumentTitle } from '@mantine/hooks'
import { AuthPage } from '@refinedev/mantine'
import { axiosInstance } from '@refinedev/simple-rest'
import axios from 'axios'
import React, { useEffect } from 'react'

const LoginPage = () => {
  useDocumentTitle('Login')
  return (
    <AuthPage />
  )
}

export default LoginPage
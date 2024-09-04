"use client"

import { useDocumentTitle } from '@mantine/hooks'
import { AuthPage } from '@refinedev/mantine'

const LoginPage = () => {
  useDocumentTitle('Login')
  return (
    <AuthPage />
  )
}

export default LoginPage
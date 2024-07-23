import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Login } from '@/components/auth/login'
 
test('Login', () => {
  render(<Login />)
  expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined()
})
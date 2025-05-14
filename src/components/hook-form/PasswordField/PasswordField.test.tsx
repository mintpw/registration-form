import { render, screen, TestWrapper } from '@/test-utils/render'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { PasswordField } from '.'

const name = 'password'
const label = 'Password'
const value = 'testpassword123'

describe('PasswordField', () => {
  test('should render with label', () => {
    render(
      <TestWrapper>
        {(form) => <PasswordField name={name} control={form.control} label={label} />}
      </TestWrapper>
    )
    expect(screen.getByLabelText(label)).toBeInTheDocument()
  })

  test('should handle user input', async () => {
    const user = userEvent.setup()
    render(
      <TestWrapper>
        {(form) => <PasswordField name={name} control={form.control} label={label} />}
      </TestWrapper>
    )
    const input = screen.getByLabelText('Password')
    await user.type(input, value)
    expect(input).toHaveValue(value)
  })

  test('should toggle password visibility', async () => {
    const user = userEvent.setup()
    render(
      <TestWrapper>
        {(form) => <PasswordField name={name} control={form.control} label={label} />}
      </TestWrapper>
    )
    const input = screen.getByLabelText('Password')
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i })
    expect(input).toHaveAttribute('type', 'password')
    await user.click(toggleButton)
    expect(input).toHaveAttribute('type', 'text')
    await user.click(toggleButton)
    expect(input).toHaveAttribute('type', 'password')
  })
})

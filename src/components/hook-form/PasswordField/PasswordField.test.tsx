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

  // test('should display error message when password is required', async () => {
  //   const schema = z.object({
  //     password: z.string({ required_error: ERROR_MESSAGES.authForm.password.required }),
  //   })

  //   const component = (
  //     <TestWrapper
  //       defaultValues={{ password: '' }}
  //       schema={schema}
  //       formOptions={{ mode: 'onChange' }}
  //     >
  //       {(form) => <PasswordField name={name} control={form.control} label={label} />}
  //     </TestWrapper>
  //   )
  //   render(
  //     <TestWrapper
  //       defaultValues={{ password: '' }}
  //       schema={schema}
  //       formOptions={{ mode: 'onChange' }}
  //     >
  //       {(form) => <PasswordField name={name} control={form.control} label={label} />}
  //     </TestWrapper>
  //   )
  //   const input = screen.getByLabelText('Password')

  //   // await userEvent.type(input, 'some')
  //   // expect(input).toHaveValue('some')

  //   // await userEvent.clear(input)
  //   // expect(input).toHaveValue('')

  //   // await userEvent.tab()

  //   await userEvent.click(input)
  //   await userEvent.tab()
  //   screen.debug() // Inspect the DOM
  //   const errorMessage = await screen.findByText(ERROR_MESSAGES.authForm.password.required)
  //   expect(errorMessage).toBeInTheDocument()
  // })

  // test('should display error message when password is too short', async () => {
  //   const schema = z.object({
  //     password: z.string().min(8, { message: ERROR_MESSAGES.authForm.password.minLength }),
  //   })
  //   render(
  //     <TestWrapper
  //       defaultValues={{ password: '' }}
  //       schema={schema}
  //       formOptions={{ mode: 'onBlur' }}
  //     >
  //       {(form) => <PasswordField name={name} control={form.control} label={label} />}
  //     </TestWrapper>
  //   )
  //   const input = screen.getByLabelText('Password')
  //   await userEvent.type(input, 'short')
  //   await userEvent.tab()
  //   const errorMessage = await screen.findByText(ERROR_MESSAGES.authForm.password.minLength)
  //   expect(errorMessage).toBeInTheDocument()
  // })
})

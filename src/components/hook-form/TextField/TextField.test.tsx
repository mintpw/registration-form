import { render, screen, TestWrapper } from '@/test-utils/render'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { TextField } from '.'

const name = 'testField'
const label = 'Test Label'
const value = 'test value'

describe('TextField', () => {
  test('should render with label', () => {
    render(
      <TestWrapper>
        {(form) => <TextField name={name} control={form.control} label={label} />}
      </TestWrapper>
    )
    const input = screen.getByRole('textbox', { name: /test label/i })
    expect(input).toBeInTheDocument()
  })

  test('should render without label', () => {
    render(<TestWrapper>{(form) => <TextField name={name} control={form.control} />}</TestWrapper>)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  test('should handle user input', async () => {
    const user = userEvent.setup()
    render(
      <TestWrapper>
        {(form) => <TextField name={name} control={form.control} label={label} />}
      </TestWrapper>
    )
    const input = screen.getByRole('textbox')
    await user.type(input, value)
    expect(input).toHaveValue(value)
  })

  test('should display error message when validation fails', async () => {
    render(
      <TestWrapper
        defaultValues={{ testField: '' }}
        formOptions={{ errors: { testField: { message: 'error', type: 'manual' } } }}
      >
        {(form) => <TextField name={name} control={form.control} label={label} />}
      </TestWrapper>
    )

    const errorMessage = await screen.findByText('error')
    expect(errorMessage).toBeInTheDocument()
  })
})

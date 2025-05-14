import { ERROR_MESSAGES } from '@/constants'
import { fireEvent, render, screen, TestWrapper } from '@/test-utils/render'
import '@testing-library/jest-dom'
import { useForm } from 'react-hook-form'
import { describe, expect, it, vi } from 'vitest'
import { AvatarUploadField } from './index'

vi.mock('@chakra-ui/react', async () => {
  const actual = await vi.importActual('@chakra-ui/react')
  return {
    ...actual,
    useFileUploadContext: () => ({
      acceptedFiles: [],
    }),
  }
})

vi.mock('/src/assets/avatar-default.svg', () => 'mocked-avatar-path')

const TestComponent = ({ label = 'Upload Avatar' }) => {
  const { control } = useForm({
    defaultValues: {
      avatar: null,
    },
  })

  return <AvatarUploadField name="avatar" control={control} label={label} />
}

describe('AvatarUploadField', () => {
  it('renders with default label', () => {
    render(<TestComponent />)
    expect(screen.getByText('Upload Avatar')).toBeInTheDocument()
  })

  it('renders with custom label', () => {
    render(<TestComponent label="Custom Label" />)
    expect(screen.getByText('Custom Label')).toBeInTheDocument()
  })

  it('handles file upload', () => {
    render(<TestComponent />)
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    const input = screen.getByRole('button')

    fireEvent.click(input)

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [file] } })
    }

    expect(fileInput?.files?.[0]).toBe(file)
  })

  it('displays error message when validation fails', () => {
    const TestComponentWithError = () => {
      return (
        <TestWrapper
          defaultValues={{ testField: '' }}
          formOptions={{
            errors: {
              testField: { message: ERROR_MESSAGES.authForm.avatar.required, type: 'manual' },
            },
          }}
        >
          {(form) => <AvatarUploadField name="testField" control={form.control} label="Avatar" />}
        </TestWrapper>
      )
    }

    render(<TestComponentWithError />)
    const input = screen.getByRole('button')
    fireEvent.click(input)
    fireEvent.blur(input)

    expect(screen.getByText(ERROR_MESSAGES.authForm.avatar.required)).toBeInTheDocument()
  })
})

import { render, screen } from '@/test-utils/render'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import AvatarUpload from './index'

vi.mock('@/components/hook-form/AvatarUploadField', () => ({
  AvatarUploadField: vi.fn(({ name, label }) => (
    <div data-testid="avatar-upload-field">
      <label>{label}</label>
      <input type="file" name={name} data-testid="avatar-input" />
    </div>
  )),
}))

describe('AvatarUpload', () => {
  const mockOnClickNext = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders the component with all required elements', () => {
    render(<AvatarUpload onClickNext={mockOnClickNext} />)

    expect(screen.getByTestId('avatar-upload-field')).toBeInTheDocument()
    expect(screen.getByText('Upload Avatar')).toBeInTheDocument()
    expect(screen.getByText('Back')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })
})

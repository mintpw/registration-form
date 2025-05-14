import { render, screen } from '@/test-utils/render'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SuccessfulRegistration from '.'

describe('SuccessfulRegistration', () => {
  const mockOnClickDone = vi.fn()

  beforeEach(() => {
    mockOnClickDone.mockClear()
  })

  it('renders the component correctly', () => {
    render(<SuccessfulRegistration onClickDone={mockOnClickDone} />)

    expect(screen.getByText('Registration successful')).toBeInTheDocument()
    expect(
      screen.getByText(
        'You have successfully registered. Please check your email for verification.'
      )
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument()
  })

  it('displays the success check icon', () => {
    render(<SuccessfulRegistration onClickDone={mockOnClickDone} />)

    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('calls onClickDone when Done button is clicked', async () => {
    render(<SuccessfulRegistration onClickDone={mockOnClickDone} />)

    const doneButton = screen.getByRole('button', { name: 'Done' })
    await userEvent.click(doneButton)

    expect(mockOnClickDone).toHaveBeenCalledTimes(1)
  })
})

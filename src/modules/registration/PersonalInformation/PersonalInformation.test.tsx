import useInterests from '@/hooks/useInterests'
import { formSchema } from '@/schemas'
import { render, screen } from '@/test-utils/render'
import type { FormValues } from '@/types'
import { createListCollection, type ListCollection } from '@chakra-ui/react'
import '@testing-library/jest-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import PersonalInformation from './index'

vi.mock('@/hooks/useInterests')

describe('PersonalInformation', () => {
  const mockOnClickNext = vi.fn()
  const mockInterests = {
    items: [
      { id: '1', value: 'coding', label: 'Coding' },
      { id: '2', value: 'reading', label: 'Reading' },
    ],
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the form with all fields', () => {
    vi.mocked(useInterests).mockReturnValue({
      interestsCollection: createListCollection(mockInterests) as ListCollection<unknown>,
      isLoading: false,
      error: null,
    })

    render<FormValues>(<PersonalInformation onClickNext={mockOnClickNext} />, {
      defaultValues: {
        username: '',
        password: '',
        confirmPassword: '',
        interests: [],
      },
      schema: formSchema,
    })

    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirm your password')).toBeInTheDocument()
    expect(screen.getByText('Select your interests')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
  })
})

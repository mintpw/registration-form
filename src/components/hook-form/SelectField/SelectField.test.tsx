import { server } from '@/mocks/server'
import { render, screen, TestWrapper } from '@/test-utils/render'
import { createListCollection, type ListCollection } from '@chakra-ui/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, test } from 'vitest'
import { SelectField } from '.'

const mockCollection = {
  items: [
    { id: '1', value: '1', label: 'Option 1' },
    { id: '2', value: '2', label: 'Option 2' },
    { id: '3', value: '3', label: 'Option 3' },
  ],
}

const TestComponent = ({
  name,
  label,
  collection,
  placeholder,
}: {
  name: string
  label: string
  collection: ListCollection<unknown>
  placeholder: string
}) => {
  return (
    <TestWrapper>
      {(form) => (
        <SelectField
          name={name}
          control={form.control}
          label={label}
          collection={collection}
          placeholder={placeholder}
        />
      )}
    </TestWrapper>
  )
}

describe('SelectField', () => {
  test('renders with label and placeholder', () => {
    server.use(
      http.get('/api/interests', () => {
        return HttpResponse.json(mockCollection)
      })
    )

    const interestsCollection = createListCollection(mockCollection)

    render(
      <TestComponent
        name="test"
        label="Test Label"
        placeholder="Select an option"
        collection={interestsCollection as ListCollection<unknown>}
      />
    )

    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('Select an option')).toBeInTheDocument()
  })

  test('display options when user clicks on the trigger', async () => {
    server.use(
      http.get('/api/interests', () => {
        return HttpResponse.json(mockCollection)
      })
    )

    const interestsCollection = createListCollection(mockCollection)
    const user = userEvent.setup()

    render(
      <TestComponent
        name="test"
        label="Test Label"
        placeholder="Select an option"
        collection={interestsCollection as ListCollection<unknown>}
      />
    )

    const trigger = screen.getByRole('combobox')
    await user.click(trigger)

    const content = await screen.findByRole('listbox')
    expect(content).toBeInTheDocument()

    const options = await screen.findAllByRole('option')
    expect(options).toHaveLength(3)
    expect(options[0]).toHaveTextContent('Option 1')
    expect(options[1]).toHaveTextContent('Option 2')
    expect(options[2]).toHaveTextContent('Option 3')
  })
})

/* eslint-disable react-refresh/only-export-components */
import { Provider } from '@/components/ui/provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { render, type RenderResult } from '@testing-library/react'
import { type JSX, type ReactElement } from 'react'
import {
  type DefaultValues,
  type FieldValues,
  useForm,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form'
import { z } from 'zod'

type TestWrapperProps<T extends FieldValues> = {
  children: (form: UseFormReturn<T>) => ReactElement
  defaultValues?: DefaultValues<T>
  schema?: z.ZodType<T>
  formOptions?: Omit<UseFormProps<T>, 'defaultValues' | 'resolver'>
}

const TestWrapper = <T extends FieldValues>({
  children,
  defaultValues,
  schema,
  formOptions,
}: TestWrapperProps<T>): JSX.Element => {
  const form = useForm<T>({
    defaultValues,
    resolver: schema ? zodResolver(schema) : undefined,
    ...formOptions,
  })

  return <Provider>{children(form)}</Provider>
}

const customRender = <T extends FieldValues>(
  ui: ReactElement,
  options?: Omit<TestWrapperProps<T>, 'children'>
): RenderResult => {
  return render(<TestWrapper {...options}>{() => ui}</TestWrapper>)
}

export * from '@testing-library/react'
export { customRender as render, TestWrapper }

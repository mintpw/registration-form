import { Field, Input, type InputProps } from '@chakra-ui/react'
import { Controller, type FieldValues, type UseControllerProps } from 'react-hook-form'

type TextFieldProps<TFieldValues extends FieldValues> = {
  label?: string
} & UseControllerProps<TFieldValues> &
  Omit<InputProps, 'name'>

export function TextField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  ...inputProps
}: TextFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Field.Root invalid={!!error}>
          {label && <Field.Label>{label}</Field.Label>}
          <Input {...field} {...inputProps} />
          <Field.ErrorText>{error?.message}</Field.ErrorText>
        </Field.Root>
      )}
    />
  )
}

import { Field } from '@chakra-ui/react'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import { PasswordInput, type PasswordInputProps } from '../../ui/password-input'

type PasswordFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
} & Omit<PasswordInputProps, 'name'>

export function PasswordField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  ...inputProps
}: PasswordFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Field.Root invalid={!!error}>
          {label && <Field.Label>{label}</Field.Label>}
          <PasswordInput role="textbox" {...field} {...inputProps} />
          <Field.ErrorText>{error?.message}</Field.ErrorText>
        </Field.Root>
      )}
    />
  )
}

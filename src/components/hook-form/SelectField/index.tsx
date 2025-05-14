import { Field, Portal, Select, type SelectRootProps } from '@chakra-ui/react'
import { Controller, type FieldValues, type UseControllerProps } from 'react-hook-form'

type SelectFieldProps<TFieldValues extends FieldValues> = {
  label?: string
  placeholder?: string
  errors?: string | undefined
  maxSelections?: number
  helpText?: string
} & UseControllerProps<TFieldValues> &
  Omit<SelectRootProps, 'name'>

export function SelectField<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  collection,
  errors,
  helpText,
  maxSelections = 2,
  ...selectFieldProps
}: SelectFieldProps<TFieldValues>) {
  return (
    <Field.Root invalid={errors ? true : false}>
      {label && <Field.Label>{label}</Field.Label>}
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select.Root
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => {
                if (value.length <= maxSelections) {
                  field.onChange(value)
                }
              }}
              onInteractOutside={() => field.onBlur()}
              collection={collection}
              {...selectFieldProps}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder={placeholder} />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {collection.items.map((option) => (
                      <Select.Item item={option} key={option.value}>
                        {option.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
            {helpText && <Field.HelperText>{helpText}</Field.HelperText>}
            <Field.ErrorText>{error?.message}</Field.ErrorText>
          </>
        )}
      />
    </Field.Root>
  )
}

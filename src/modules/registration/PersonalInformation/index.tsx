import { PasswordField, SelectField, TextField } from '@/components/hook-form'
import { INTERESTS_COLLECTION } from '@/constants'
import { formSchema } from '@/schemas'
import { Button, Card, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormValues = z.infer<typeof formSchema>

interface PersonalInformationProps {
  onClickNext: (data: Partial<FormValues>) => void
  registrationData?: Partial<FormValues>
}

const PersonalInformation = ({ onClickNext, registrationData }: PersonalInformationProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: registrationData || {
      username: '',
      password: '',
      confirmPassword: '',
      interests: [],
    },
  })

  const handleNext = handleSubmit((data) => {
    onClickNext(data)
  })

  return (
    <Card.Root width="50vh">
      <Card.Body>
        <form onSubmit={handleNext}>
          <Stack gap="4" align="flex-start" maxW="sm">
            <TextField
              name="username"
              label="Username"
              control={control}
              placeholder="Enter your name"
            />
            <PasswordField
              name="password"
              label="Password"
              control={control}
              placeholder="Enter your password"
            />
            <PasswordField
              name="confirmPassword"
              label="Confirm Password"
              control={control}
              placeholder="Confirm your password"
            />
            <SelectField
              multiple
              name="interests"
              label="Interests"
              placeholder="Select your interests"
              control={control}
              collection={INTERESTS_COLLECTION}
              errors={errors.interests?.message}
            />

            <Button variant="solid" type="submit" alignSelf="end" disabled={!isValid}>
              Next
            </Button>
          </Stack>
        </form>
      </Card.Body>
    </Card.Root>
  )
}

export default PersonalInformation

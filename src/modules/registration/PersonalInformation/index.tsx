import { PasswordField, SelectField, TextField } from '@/components/hook-form'
import useInterests from '@/hooks/useInterests'
import { formSchema } from '@/schemas'
import type { FormValues } from '@/types'
import { Button, Card, Center, createListCollection, Spinner, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface PersonalInformationProps {
  onClickNext: (data: Partial<FormValues>) => void
  registrationData?: Partial<FormValues>
}

const PersonalInformation = ({ onClickNext, registrationData }: PersonalInformationProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
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

  const { interestsCollection, isLoading } = useInterests()

  const handleNext = handleSubmit((data) => {
    onClickNext(data)
  })

  return !isLoading ? (
    <Card.Root boxShadow="lg" maxWidth="md" width="100%">
      <Card.Header>
        <Card.Title>Sign up</Card.Title>
        <Card.Description>Fill in the form below to create an account</Card.Description>
      </Card.Header>
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
            {interestsCollection ? (
              <SelectField
                multiple
                name="interests"
                label="Interests"
                placeholder="Select your interests"
                helpText="Max 2 options"
                control={control}
                collection={createListCollection(interestsCollection)}
                errors={errors.interests?.message}
              />
            ) : null}

            <Button variant="solid" type="submit" alignSelf="end">
              Next
            </Button>
          </Stack>
        </form>
      </Card.Body>
    </Card.Root>
  ) : (
    <Center>
      <Spinner color="teal.500" size="lg" />
    </Center>
  )
}

export default PersonalInformation

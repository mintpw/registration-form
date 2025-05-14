import { AvatarUploadField } from '@/components/hook-form/AvatarUploadField'
import { avatarUploadSchema } from '@/schemas'
import type { AvatarUploadValues } from '@/types'
import { Button, Card, HStack, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type Resolver } from 'react-hook-form'

interface AvatarUploadProps {
  onClickNext: (data: Partial<AvatarUploadValues>) => void
  onClickBack?: (data?: Partial<AvatarUploadValues>) => void
  registrationData?: Partial<AvatarUploadValues>
}

const AvatarUpload = ({ onClickNext, onClickBack, registrationData }: AvatarUploadProps) => {
  const {
    handleSubmit,
    watch,
    control,
    formState: { isValid },
  } = useForm<AvatarUploadValues>({
    resolver: zodResolver(avatarUploadSchema) as Resolver<AvatarUploadValues>,
    mode: 'onChange',
    defaultValues: registrationData || { avatar: undefined },
  })

  const watchAvatar = watch('avatar')

  const onSubmit = handleSubmit((data) => {
    onClickNext(data)
  })

  const handleBack = () => {
    if (onClickBack) {
      onClickBack({ avatar: watchAvatar })
    }
  }

  return (
    <Card.Root width="50vh">
      <Card.Header>
        <Card.Title>Sign up</Card.Title>
        <Card.Description>Upload your avatar</Card.Description>
      </Card.Header>
      <Card.Body>
        <form onSubmit={onSubmit}>
          <VStack justifyContent="center" alignItems="center" gap={4}>
            <AvatarUploadField name="avatar" control={control} label="Upload Avatar" />
            <HStack gap={4} width="100%" justifyContent="space-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" disabled={!isValid}>
                Submit
              </Button>
            </HStack>
          </VStack>
        </form>
      </Card.Body>
    </Card.Root>
  )
}

export default AvatarUpload

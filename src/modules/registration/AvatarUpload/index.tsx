import { AvatarUploadField } from '@/components/hook-form/AvatarUploadField'
import { avatarUploadSchema } from '@/schemas'
import { Button, Card, HStack, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type Resolver } from 'react-hook-form'
import { z } from 'zod'

type FormValues = z.infer<typeof avatarUploadSchema>

interface AvatarUploadProps {
  onClickNext: (data: Partial<FormValues>) => void
  onClickBack?: (data?: Partial<FormValues>) => void
  registrationData?: Partial<FormValues>
}

const AvatarUpload = ({ onClickNext, onClickBack, registrationData }: AvatarUploadProps) => {
  const {
    handleSubmit,
    watch,
    control,
    formState: { isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(avatarUploadSchema) as Resolver<FormValues>,
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
      <Card.Body>
        <form onSubmit={onSubmit}>
          <VStack justifyContent="center" alignItems="center" gap={4}>
            <AvatarUploadField name="avatar" control={control} label="Upload Avatar" />
            <HStack gap={4}>
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

import {
  Box,
  Button,
  Field,
  FileUpload,
  Image,
  useFileUploadContext,
  type FileUploadRootProps,
} from '@chakra-ui/react'
import {
  Controller,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
  type UseControllerProps,
} from 'react-hook-form'
import { LuFileImage } from 'react-icons/lu'

type AvatarUploadField<TFieldValues extends FieldValues> = {
  label?: string
} & UseControllerProps<TFieldValues> &
  Omit<FileUploadRootProps, 'name'>

type FileUploadListProps = {
  prevImage: FileList | null | undefined
}

const FileUploadList = ({ prevImage }: FileUploadListProps) => {
  const fileUpload = useFileUploadContext()
  const files = prevImage ? Array.from(prevImage) : fileUpload.acceptedFiles

  if (files.length === 0) return null

  return (
    <FileUpload.ItemGroup alignItems="center">
      {files.map((file) => (
        <FileUpload.Item
          w="auto"
          boxSize="250px"
          p="2"
          justifyContent="center"
          file={file}
          key={file.name}
        >
          <FileUpload.ItemPreviewImage height="100%" objectFit="contain" />
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  )
}

export function AvatarUploadField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  ...fileUploadProps
}: AvatarUploadField<TFieldValues>) {
  const handleFileChange = (field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      field.onChange(files)
    }
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const onChange = handleFileChange(field)

        return (
          <Field.Root invalid={!!error}>
            <FileUpload.Root
              accept="image/*"
              {...fileUploadProps}
              onChange={onChange}
              alignItems="center"
            >
              <FileUpload.HiddenInput />
              {field.value ? (
                <FileUploadList prevImage={field.value} />
              ) : (
                <Box border="1px solid" borderColor="gray.200" boxSize="250px">
                  <Image
                    alt="avatarFallBack"
                    src="/src/assets/avatar-default.svg"
                    boxSize="250px"
                    objectFit="contain"
                  />
                </Box>
              )}
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="sm">
                  <LuFileImage /> {label}
                </Button>
              </FileUpload.Trigger>
            </FileUpload.Root>
            <Field.ErrorText alignSelf="center">{error?.message}</Field.ErrorText>
          </Field.Root>
        )
      }}
    />
  )
}

import {
  Button,
  Field,
  FileUpload,
  Float,
  useFileUploadContext,
  type FileUploadRootProps,
} from '@chakra-ui/react'
import { Controller, type FieldValues, type UseControllerProps } from 'react-hook-form'
import { LuFileImage, LuX } from 'react-icons/lu'

type AvatarUploadField<TFieldValues extends FieldValues> = {
  label?: string
  onFileChange?: (files: FileList | null) => void
  prevImage: File | null | undefined
} & UseControllerProps<TFieldValues> &
  Omit<FileUploadRootProps, 'name'>

type FileUploadList = {
  prevImage: File | null | undefined
}

const FileUploadList = ({ prevImage }: FileUploadList) => {
  const fileUpload = useFileUploadContext()
  const files = prevImage ? [prevImage] : fileUpload.acceptedFiles

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
          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  )
}

export function AvatarUploadField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  onFileChange,
  prevImage,
  ...fileUploadProps
}: AvatarUploadField<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const files = event.target.files
          console.log('FileList:', files)
          field.onChange(files)
          if (onFileChange) {
            onFileChange(files)
          }
        }

        return (
          <Field.Root invalid={!!error}>
            <FileUpload.Root accept="image/*" {...fileUploadProps} onChange={handleFileChange}>
              <FileUpload.HiddenInput />
              <FileUploadList prevImage={prevImage} />
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="sm">
                  <LuFileImage /> {label}
                </Button>
              </FileUpload.Trigger>
            </FileUpload.Root>
            <Field.ErrorText>{error?.message}</Field.ErrorText>
          </Field.Root>
        )
      }}
    />
  )
}

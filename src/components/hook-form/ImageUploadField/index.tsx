import { Button, FileUpload, Float, useFileUploadContext } from '@chakra-ui/react'
import { type UseFormRegisterReturn } from 'react-hook-form'
import { LuFileImage, LuX } from 'react-icons/lu'

interface ImageUploadFieldProps {
  register?: UseFormRegisterReturn
}

const FileUploadList = () => {
  const fileUpload = useFileUploadContext()
  const files = fileUpload.acceptedFiles

  if (files.length === 0) return null
  return (
    <FileUpload.ItemGroup>
      {files.map((file) => (
        <FileUpload.Item w="auto" p="2" file={file} key={file.name}>
          <FileUpload.ItemPreviewImage height="60px" />
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

export function ImageUploadField({ register }: ImageUploadFieldProps) {
  return (
    <FileUpload.Root accept="image/*" alignItems="center">
      <FileUploadList />
      <FileUpload.HiddenInput {...register} />
      <FileUpload.Trigger asChild>
        <Button>
          <LuFileImage /> Upload Image
        </Button>
      </FileUpload.Trigger>
    </FileUpload.Root>
  )
}

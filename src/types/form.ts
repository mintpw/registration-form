import type { avatarUploadSchema, formSchema } from '@/schemas'
import type { z } from 'zod'

export type FormDataValues = z.infer<typeof formSchema> & z.infer<typeof avatarUploadSchema>
export type FormValues = z.infer<typeof formSchema>
export type AvatarUploadValues = z.infer<typeof avatarUploadSchema>

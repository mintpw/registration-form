import { ERROR_MESSAGES } from '@/constants'
import * as z from 'zod'

export const formSchema = z
  .object({
    username: z
      .string({ required_error: ERROR_MESSAGES.authForm.username.required })
      .min(3, { message: ERROR_MESSAGES.authForm.username.minLength })
      .max(20, { message: ERROR_MESSAGES.authForm.username.maxLength })
      .regex(/^[a-zA-Z0-9_-]+$/, {
        message: ERROR_MESSAGES.authForm.username.regex,
      }),
    password: z
      .string({ required_error: ERROR_MESSAGES.authForm.password.required })
      .min(8, { message: ERROR_MESSAGES.authForm.password.minLength })
      .regex(/[A-Z]/, { message: ERROR_MESSAGES.authForm.password.uppercase })
      .regex(/[a-z]/, { message: ERROR_MESSAGES.authForm.password.lowercase })
      .regex(/[0-9]/, { message: ERROR_MESSAGES.authForm.password.number })
      .regex(/[^A-Za-z0-9]/, { message: ERROR_MESSAGES.authForm.password.specialCharacter }),
    confirmPassword: z
      .string({
        required_error: ERROR_MESSAGES.authForm.confirmPassword.required,
      })
      .min(8, { message: ERROR_MESSAGES.authForm.confirmPassword.minLength })
      .regex(/[A-Z]/, { message: ERROR_MESSAGES.authForm.confirmPassword.uppercase })
      .regex(/[a-z]/, { message: ERROR_MESSAGES.authForm.confirmPassword.lowercase })
      .regex(/[0-9]/, { message: ERROR_MESSAGES.authForm.confirmPassword.number })
      .regex(/[^A-Za-z0-9]/, {
        message: ERROR_MESSAGES.authForm.confirmPassword.specialCharacter,
      }),
    interests: z
      .array(z.string(), {
        required_error: ERROR_MESSAGES.authForm.interests.required,
      })
      .min(1, { message: ERROR_MESSAGES.authForm.interests.minLength }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERROR_MESSAGES.authForm.confirmPassword.mismatch,
        path: ['confirmPassword'],
      })
    }
  })

export const avatarUploadSchema = z.object({
  avatar: z
    .custom<FileList>()
    .refine(
      (fileList) => {
        if (!fileList) return false
        return fileList instanceof FileList && fileList.length > 0
      },
      {
        message: ERROR_MESSAGES.authForm.avatar.required,
      }
    )
    .refine(
      (fileList) => {
        if (!fileList || fileList.length === 0) return false
        const file = fileList[0]
        const maxSize = 5 * 1024 * 1024 // 5MB in bytes
        return file.size <= maxSize
      },
      {
        message: ERROR_MESSAGES.authForm.avatar.maxSize,
      }
    ),
})

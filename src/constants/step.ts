import AvatarUpload from '@/modules/registration/AvatarUpload'
import PersonalInformation from '@/modules/registration/PersonalInformation'

export const FORM_STEPS = [
  {
    id: 'personal',
    component: PersonalInformation,
    title: 'Personal Information',
  },
  {
    id: 'avatar',
    component: AvatarUpload,
    title: 'Avatar Upload',
  },
] as const

export const ERROR_MESSAGES = {
  authForm: {
    username: {
      required: 'Username is required',
      minLength: 'Username must be at least 3 characters',
      maxLength: 'Username must not exceed 20 characters.',
      regex: 'Allowed characters for usernames: a-z, A-Z, 0-9, _, and -',
    },
    password: {
      required: 'Password is required',
      minLength: 'Password must be at least 8 characters',
      uppercase: 'Password must contain at least one uppercase letter',
      lowercase: 'Password must contain at least one lowercase letter',
      number: 'Password must contain at least one number',
      specialCharacter: 'Password must contain at least one special character',
    },
    confirmPassword: {
      required: 'Confirm password is required',
      minLength: 'Password must be at least 8 characters',
      uppercase: 'Confirm password must contain at least one uppercase letter',
      lowercase: 'Confirm password must contain at least one lowercase letter',
      number: 'Confirm password must contain at least one number',
      specialCharacter: 'Confirm password must contain at least one special character',
      mismatch: "Passwords don't match",
    },
    interests: {
      required: 'Interests are required',
      minLength: 'At least one interest is required',
    },
    avatar: {
      required: 'Avatar image is required',
      maxSize: 'Avatar file size must be less than 5MB',
    },
  },
} as const

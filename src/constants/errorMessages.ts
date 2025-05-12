export const ERROR_MESSAGES = {
  authForm: {
    username: {
      required: 'Username is required',
      minLength: 'You must enter a username',
    },
    password: {
      required: 'Password is required',
      minLength: 'Password must be at least 8 characters',
    },
    confirmPassword: {
      required: 'Confirm password is required',
      minLength: 'Password must be at least 8 characters',
      mismatch: "Passwords don't match",
    },
    interests: {
      required: 'Interests are required',
      minLength: 'At least one interest is required',
    },
    avatar: {
      required: 'Avatar image is required',
    },
  },
} as const

import { http, HttpResponse } from 'msw'

export const submissionHandlers = [
  http.post('/api/submission', async ({ request }) => {
    const formData = await request.formData()

    const username = formData.get('username')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    const interestsRaw = formData.get('interests')
    const interests = interestsRaw ? JSON.parse(interestsRaw as string) : []
    const avatar = formData.get('avatar')

    if (password !== confirmPassword) {
      return HttpResponse.json({ error: 'Passwords do not match' }, { status: 400 })
    }

    return HttpResponse.json({
      message: 'User registered successfully',
      user: {
        username,
        interests,
        avatar: avatar instanceof File ? avatar.name : null,
      },
    })
  }),
]

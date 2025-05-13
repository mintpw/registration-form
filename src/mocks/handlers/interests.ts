import { http, HttpResponse } from 'msw'
import { mockInterests } from '../data'

export const interestsHandlers = [
  http.get('/api/interests', () => {
    return HttpResponse.json({ items: mockInterests })
  }),
]

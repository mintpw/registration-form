import { API } from '@/constants'
import type { ListCollection } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const useInterests = () => {
  const [interestsCollection, setInterestCollection] = useState<ListCollection<unknown>>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get(API.interests.root)
        setInterestCollection(data)
        setError(null)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err : new Error('Failed to fetch interests'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchInterests()
  }, [])

  return { interestsCollection, isLoading, error }
}

export default useInterests

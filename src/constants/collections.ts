import { createListCollection } from '@chakra-ui/react'

export const INTERESTS_COLLECTION = createListCollection({
  items: [
    { label: 'Sports', value: 'sports' },
    { label: 'Music', value: 'music' },
    { label: 'Dancing', value: 'dancing' },
    { label: 'Games', value: 'games' },
    { label: 'Reading', value: 'reading' },
    { label: 'Travel', value: 'travel' },
    { label: 'Cooking', value: 'cooking' },
    { label: 'Photography', value: 'photography' },
    { label: 'Movies', value: 'movies' },
    { label: 'Hiking', value: 'hiking' },
    { label: 'Painting', value: 'painting' },
    { label: 'Writing', value: 'writing' },
    { label: 'Gardening', value: 'gardening' },
    { label: 'Technology', value: 'technology' },
    { label: 'Fashion', value: 'fashion' },
    { label: 'Fitness', value: 'fitness' },
    { label: 'Astronomy', value: 'astronomy' },
    { label: 'History', value: 'history' },
    { label: 'Languages', value: 'languages' },
    { label: 'Volunteering', value: 'volunteering' },
  ] as const,
} as const)

import { Box, Button, Card } from '@chakra-ui/react'
import { BsFillPatchCheckFill } from 'react-icons/bs'

interface SuccessfulRegistrationProps {
  onClickDone: () => void
}

const SuccessfulRegistration = ({ onClickDone }: SuccessfulRegistrationProps) => {
  return (
    <Card.Root maxW="sm" overflow="hidden" alignItems="center" boxShadow="lg">
      <Box p={4}>
        <BsFillPatchCheckFill size={200} color="#4ade80" />
      </Box>
      <Card.Body gap="2" textAlign="center">
        <Card.Title>Registration successful</Card.Title>
        <Card.Description>
          You have successfully registered. Please check your email for verification.
        </Card.Description>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid" onClick={onClickDone}>
          Done
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}

export default SuccessfulRegistration

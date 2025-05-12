import { FORM_STEPS } from '@/constants'
import { formSchema } from '@/schemas'
import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { z } from 'zod'

type FormValues = z.infer<typeof formSchema>

const Registration = () => {
  const [stepIndex, setStepIndex] = useState<number>(0)
  const [registrationData, setRegistrationData] = useState<Partial<FormValues>>({})

  const currentStep = FORM_STEPS[stepIndex]
  const isLastStep = stepIndex === FORM_STEPS.length - 1

  const handleNext = (data: Partial<FormValues>) => {
    setRegistrationData((prev) => ({ ...prev, ...data }))

    if (!isLastStep) {
      setStepIndex((prev) => prev + 1)
    } else {
      console.log('Final submission:', data)
    }
  }

  const handleBack = (data: Partial<FormValues>) => {
    if (stepIndex > 0) {
      if (data) {
        setRegistrationData((prev) => ({ ...prev, ...data }))
      }
      setStepIndex((prev) => prev - 1)
    }
  }

  console.log('registrationData', registrationData)

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" height="100%">
      <currentStep.component
        onClickNext={handleNext}
        onClickBack={stepIndex > 0 ? (data) => handleBack(data as Partial<FormValues>) : undefined}
        registrationData={registrationData}
      />
    </Flex>
  )
}

export default Registration

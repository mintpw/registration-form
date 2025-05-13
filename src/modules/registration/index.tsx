import { Toaster, toaster } from '@/components/ui/toaster'
import { API, FORM_STEPS } from '@/constants'
import type { FormDataValues } from '@/types'
import { objectToFormData } from '@/utils'
import { Flex } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'

const Registration = () => {
  const [stepIndex, setStepIndex] = useState<number>(0)
  const [registrationData, setRegistrationData] = useState<Partial<FormDataValues>>({})

  const currentStep = FORM_STEPS[stepIndex]
  const isLastStep = stepIndex === FORM_STEPS.length - 1

  const handleSubmit = async (data: FormDataValues) => {
    const formData = objectToFormData(data)

    try {
      const response = await axios.post(API.submission.root, formData)
      console.log('response', response)
      toaster.create({
        title: 'User registered successfully',
        type: 'success',
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleNext = (data: Partial<FormDataValues>) => {
    setRegistrationData((prevData) => ({ ...prevData, ...data }))
    if (isLastStep) {
      const completeData = { ...registrationData, ...data } as FormDataValues
      handleSubmit(completeData)
      return
    }
    setStepIndex((currentIndex) => currentIndex + 1)
  }

  const handleBack = (data: Partial<FormDataValues>) => {
    if (stepIndex <= 0) {
      return
    }
    if (data) {
      setRegistrationData((prevData) => ({ ...prevData, ...data }))
    }
    setStepIndex((currentIndex) => currentIndex - 1)
  }

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" height="100%">
      <currentStep.component
        onClickNext={handleNext}
        onClickBack={
          stepIndex > 0 ? (data) => handleBack(data as Partial<FormDataValues>) : undefined
        }
        registrationData={registrationData}
      />
      <Toaster />
    </Flex>
  )
}

export default Registration

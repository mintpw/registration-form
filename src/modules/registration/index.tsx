import { Toaster, toaster } from '@/components/ui/toaster'
import { API, FORM_STEPS } from '@/constants'
import type { FormDataValues } from '@/types'
import { objectToFormData } from '@/utils'
import { Flex } from '@chakra-ui/react'
import axios from 'axios'
import { useCallback, useState } from 'react'
import SuccessfulRegistration from './SuccessfulRegistration'

const Registration = () => {
  const [stepIndex, setStepIndex] = useState<number>(0)
  const [registrationData, setRegistrationData] = useState<Partial<FormDataValues>>({})
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState<boolean>(false)

  const currentStep = FORM_STEPS[stepIndex]
  const isLastStep = stepIndex === FORM_STEPS.length - 1

  const handleSubmit = useCallback(async (data: FormDataValues) => {
    const formData = objectToFormData(data)
    try {
      await axios.post(API.submission.root, formData)
      toaster.create({
        title: 'User registered successfully',
        type: 'success',
      })
      setIsRegistrationSuccessful(true)
    } catch (error) {
      console.error('Error:', error)
      toaster.create({
        title: 'Error registering user',
        type: 'error',
      })
    }
  }, [])

  const handleNext = useCallback(
    (data: Partial<FormDataValues>) => {
      setRegistrationData((prevData) => ({ ...prevData, ...data }))
      if (isLastStep) {
        const completeData = { ...registrationData, ...data } as FormDataValues
        handleSubmit(completeData)
        return
      }
      setStepIndex((currentIndex) => currentIndex + 1)
    },
    [registrationData, isLastStep, handleSubmit]
  )

  const handleBack = useCallback(
    (data: Partial<FormDataValues>) => {
      if (stepIndex <= 0) {
        return
      }
      if (data) {
        setRegistrationData((prevData) => ({ ...prevData, ...data }))
      }
      setStepIndex((currentIndex) => currentIndex - 1)
    },
    [stepIndex]
  )

  const handleDone = useCallback(() => {
    setIsRegistrationSuccessful(false)
    setRegistrationData({})
    setStepIndex(0)
  }, [])

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" height="100%">
      {!isRegistrationSuccessful ? (
        <currentStep.component
          onClickNext={handleNext}
          onClickBack={
            stepIndex > 0 ? (data) => handleBack(data as Partial<FormDataValues>) : undefined
          }
          registrationData={registrationData}
        />
      ) : (
        <SuccessfulRegistration onClickDone={handleDone} />
      )}
      <Toaster />
    </Flex>
  )
}

export default Registration

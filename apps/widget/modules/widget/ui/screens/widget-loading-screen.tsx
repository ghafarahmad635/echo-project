'use client'
import React, { useEffect, useState } from 'react'
import { WidgetHeader } from '../components/widget-header'
import { LoaderIcon } from 'lucide-react'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  contactSessionIdAtomFamily,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom
} from '../../atoms/widget-atoms'
import { useAction, useMutation } from 'convex/react'
import { api } from '@workspace/backend/_generated/api'

type InitStep = 'org' | 'session' | 'settings' | 'vapi' | 'done'

interface Props {
  organizationId: string | null
}

const WidgetLoadingScreen = ({ organizationId }: Props) => {
  const [step, setStep] = useState<InitStep>('org')
  const [sessionValid, setSessionValid] = useState(false)

  const loadingMessage = useAtomValue(loadingMessageAtom)
  const setLoadingMessage = useSetAtom(loadingMessageAtom)
  const setErrorMessage = useSetAtom(errorMessageAtom)
  const setScreen = useSetAtom(screenAtom)
  const setOrganizationId = useSetAtom(organizationIdAtom)

  const validateOrganization = useAction(api.public.organizations.validate)
  const validateContactSession = useMutation(api.public.contactSessions.validate)

  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || '')
  )

  // Step 1 validate organization
  useEffect(() => {
    if (step !== 'org') return

    setLoadingMessage('Finding organization ID...')
    if (!organizationId) {
      setErrorMessage('Organization ID is required')
      setScreen('error')
      return
    }

    setLoadingMessage('Verifying organization...')
    validateOrganization({ organizationId })
      .then(result => {
        console.log('Validation result', result)
        if (result.valid) {
          setOrganizationId(organizationId)
          setStep('session')
        } else {
          setErrorMessage(result.reason || 'Invalid configuration')
          setScreen('error')
        }
      })
      .catch(() => {
        setErrorMessage('Unable to verify organization')
        setScreen('error')
      })
  }, [
    step,
    organizationId,
    setLoadingMessage,
    setErrorMessage,
    setScreen,
    validateOrganization,
    setOrganizationId
  ])

  // Step 2 validate existing session if any
  useEffect(() => {
    if (step !== 'session') return

    setLoadingMessage('Finding contact session ID...')
    if (!contactSessionId) {
      console.log('No contact session ID')
      setSessionValid(false)
      setStep('done')
      return
    }

    setLoadingMessage('Validating session...')
    validateContactSession({ contactSessionId })
      .then(result => {
        setSessionValid(result.valid)
        setStep('done')
      })
      .catch(() => {
        setSessionValid(false)
        setStep('done')
      })
  }, [
    step,
    contactSessionId,
    setLoadingMessage,
    setSessionValid,
    setStep,
    validateContactSession
  ])

  // Step 3 route to next screen
  useEffect(() => {
    if (step !== 'done') return
    const hasValidSession = Boolean(contactSessionId && sessionValid)
    setScreen(hasValidSession ? 'selection' : 'auth')
  }, [step, contactSessionId, sessionValid, setScreen])

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>

      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <LoaderIcon className="animate-spin" />
        <p className="text-sm">{loadingMessage || 'Loading...'}</p>
      </div>
    </>
  )
}

export default WidgetLoadingScreen

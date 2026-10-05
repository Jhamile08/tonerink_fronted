import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, H2, Input, Label, Paragraph, Spinner, YStack } from 'tamagui'
import { PrimaryButton } from '../components/ui'
import { login } from '../api/client'
import { URL_AUTH } from '../api/urls'
import { useAuth } from '../context/AuthContext'
import { brand } from '../tamagui.config'

export default function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle')
  const [alert, setAlert] = useState<string | null>(null)

  async function handleSubmit() {
    setAlert(null)
    setStatus('submitting')
    try {
      const { token } = await login(userName, password, URL_AUTH)
      signIn(token)
      navigate('/admin', { replace: true })
    } catch (cause) {
      console.error('Error al iniciar sesión:', cause)
      setAlert('Credenciales inválidas. Inténtalo de nuevo.')
    } finally {
      setStatus('idle')
    }
  }

  return (
    <YStack
      width="100%"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#f0f8ff"
      padding="$4"
    >
      <Form
        onSubmit={handleSubmit}
        width="100%"
        maxWidth={400}
        gap="$3"
        padding={24}
        backgroundColor="white"
        borderWidth={1}
        borderColor="#b0c4de"
        borderRadius={10}
        shadowColor="#0000001a"
        shadowRadius={8}
        shadowOffset={{ width: 0, height: 4 }}
      >
        <Link to="/" style={{ alignSelf: 'center' }}>
          <img src="/imgs/toner%20ink.png" alt="Tonerink" style={{ height: 56 }} />
        </Link>

        <H2 fontSize={24} color={brand.blueSoft} textAlign="center">
          Acceso administrador
        </H2>

        <YStack gap="$2">
          <Label htmlFor="username" color={brand.blueSoft} fontWeight="700">
            Usuario
          </Label>
          <Input
            id="username"
            value={userName}
            onChangeText={setUserName}
            autoComplete="username"
            borderColor="#b0c4de"
            focusStyle={{ borderColor: brand.blueSoft }}
          />
        </YStack>

        <YStack gap="$2">
          <Label htmlFor="password" color={brand.blueSoft} fontWeight="700">
            Contraseña
          </Label>
          <Input
            id="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="current-password"
            borderColor="#b0c4de"
            focusStyle={{ borderColor: brand.blueSoft }}
          />
        </YStack>

        <Form.Trigger asChild disabled={status === 'submitting'}>
          <PrimaryButton
            backgroundColor={brand.blueSoft}
            icon={status === 'submitting' ? <Spinner /> : undefined}
          >
            Entrar
          </PrimaryButton>
        </Form.Trigger>

        {alert ? (
          <Paragraph
            role="alert"
            backgroundColor="#f8d7da"
            color="#721c24"
            borderWidth={1}
            borderColor="#f5c6cb"
            borderRadius={5}
            padding={10}
            textAlign="center"
          >
            {alert}
          </Paragraph>
        ) : null}
      </Form>
    </YStack>
  )
}

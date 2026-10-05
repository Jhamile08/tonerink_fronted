import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui'

/**
 * Paleta de Tonerink, tomada del `--blue` y los colores del CSS original.
 * Se expone como objeto (para usar en `style`/props sueltas) y como tokens
 * de Tamagui, de modo que `color="$blue"` también funcione.
 */
export const brand = {
  blue: '#03436D',
  blueLight: '#3a7bd5',
  blueSoft: '#4682b4',
  grayBg: '#EAEBEF',
  white: '#FFFFFF',
  border: '#D3D1D1',
} as const

export const config = createTamagui({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    color: brand,
  },
  settings: {
    ...defaultConfig.settings,
    // El CSS original usa unidades web (100vh, rem, %), así que mantenemos
    // la variante "web" que las acepta.
    allowedStyleValues: 'somewhat-strict-web',
    // Permite escribir tanto `backgroundColor` como `bg`.
    onlyAllowShorthands: false,
  },
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config

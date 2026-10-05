import { Input, XStack } from 'tamagui'
import type { ViewProps } from 'tamagui'
import { brand } from '../tamagui.config'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxWidth?: ViewProps['width']
}

/**
 * El filtrado es en vivo mientras se escribe, así que la lupa es decorativa
 * (en el HTML original el botón tampoco disparaba nada).
 */
export function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar producto…',
  maxWidth = '60%',
}: SearchBarProps) {
  return (
    <XStack width={maxWidth} maxWidth={760} alignItems="stretch" $maxSm={{ width: '90%' }}>
      <Input
        flex={1}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        aria-label="Buscar producto"
        backgroundColor="white"
        borderWidth={0}
        borderTopLeftRadius={50}
        borderBottomLeftRadius={50}
        borderTopRightRadius={0}
        borderBottomRightRadius={0}
        paddingHorizontal={16}
        fontSize={16}
      />
      <XStack
        width={44}
        backgroundColor="white"
        alignItems="center"
        justifyContent="center"
        borderTopRightRadius={50}
        borderBottomRightRadius={50}
      >
        <XStack
          width={32}
          height={32}
          borderRadius={999}
          backgroundColor={brand.blue}
          alignItems="center"
          justifyContent="center"
        >
          <i
            className="fa-solid fa-magnifying-glass"
            aria-hidden="true"
            style={{ color: '#fff', fontSize: 15 }}
          />
        </XStack>
      </XStack>
    </XStack>
  )
}

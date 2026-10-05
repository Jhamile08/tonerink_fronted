import { Label, Paragraph, Select, YStack } from 'tamagui'
import type { ViewProps } from 'tamagui'
import { brand } from '../../tamagui.config'

export type SelectOption = { value: string; label: string }

type SelectFieldProps = {
  id: string
  label: string
  placeholder: string
  value: string
  options: readonly SelectOption[]
  onChange: (value: string) => void
  width?: ViewProps['width']
}

/**
 * `<select>` del formulario original, ahora con el Select de Tamagui:
 * mismo comportamiento con teclado y menú desplegable animado.
 */
export function SelectField({
  id,
  label,
  placeholder,
  value,
  options,
  onChange,
  width = '100%',
}: SelectFieldProps) {
  return (
    <YStack gap="$2" width={width}>
      <Label htmlFor={id} fontWeight="600">
        {label}
      </Label>

      <Select id={id} value={value} onValueChange={onChange} disablePreventBodyScroll>
        <Select.Trigger
          width="100%"
          borderWidth={1}
          borderColor="black"
          borderRadius={5}
          backgroundColor="white"
          paddingHorizontal={10}
          iconAfter={<Select.Icon />}
        >
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>

        <Select.Content>
          <Select.ScrollUpButton />
          <Select.Viewport minWidth={240}>
            <Select.Group>
              <Select.Label>{label}</Select.Label>
              {options.map((option, index) => (
                <Select.Item key={option.value} index={index} value={option.value}>
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator marginLeft="auto">
                    <Paragraph color={brand.blue}>✓</Paragraph>
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select>
    </YStack>
  )
}

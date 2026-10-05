import { Accordion, Button, Paragraph, Square, XStack, YStack, styled } from 'tamagui'
import { brand } from '../tamagui.config'
import { ALL_FILTER, CATALOG_MENU, filterId } from '../data/catalogMenu'
import type { CatalogFilter } from '../data/catalogMenu'

const MenuButton = styled(Button, {
  name: 'MenuButton',
  unstyled: true,
  cursor: 'pointer',
  textAlign: 'left',
  justifyContent: 'flex-start',
  color: '#000',
  fontSize: 17,
  paddingVertical: 10,
  paddingHorizontal: 20,
  width: '100%',
  borderRadius: 8,
  hoverStyle: { backgroundColor: '#F6F8FA' },
  variants: {
    active: {
      true: { backgroundColor: '#E3EAF2', color: brand.blue, fontWeight: '700' },
    },
    inside: {
      true: { fontSize: 16, paddingVertical: 8 },
    },
  } as const,
})

type CategorySidebarProps = {
  value: CatalogFilter
  onChange: (filter: CatalogFilter) => void
}

export function CategorySidebar({ value, onChange }: CategorySidebarProps) {
  const selected = filterId(value)

  return (
    <YStack
      render="aside"
      width={340}
      flexShrink={0}
      $maxMd={{ width: '100%' }}
    >
      <YStack
        render="nav"
        backgroundColor="white"
        borderTopRightRadius={16}
        borderBottomRightRadius={16}
        paddingVertical={20}
        paddingHorizontal={24}
        $maxMd={{ borderRadius: 0, paddingHorizontal: 12 }}
      >
        <Paragraph fontSize={20} fontWeight="900" marginBottom="$3">
          Empresas y hogares
        </Paragraph>

        <MenuButton
          active={selected === 'TODOS'}
          onPress={() => onChange(ALL_FILTER)}
          fontWeight="600"
        >
          Todos
        </MenuButton>

        <Accordion type="multiple" width="100%" overflow="hidden">
          {CATALOG_MENU.map((group) => (
            <Accordion.Item key={group.type} value={group.type}>
              <Accordion.Trigger
                unstyled
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                cursor="pointer"
                paddingVertical={12}
                paddingHorizontal={20}
                backgroundColor="transparent"
                borderWidth={0}
                hoverStyle={{ backgroundColor: '#F6F8FA' }}
              >
                {({ open }: { open: boolean }) => (
                  <>
                    <Paragraph fontSize={17} textAlign="left" flex={1}>
                      {group.label}
                    </Paragraph>
                    <Square transition="quick" rotate={open ? '90deg' : '0deg'} size={16}>
                      <img src="/imgs/arrow.svg" alt="" width={16} height={16} />
                    </Square>
                  </>
                )}
              </Accordion.Trigger>

              <Accordion.HeightAnimator transition="medium">
                <Accordion.Content
                  transition="medium"
                  exitStyle={{ opacity: 0 }}
                  padding={0}
                  backgroundColor="transparent"
                >
                  <YStack
                    width="85%"
                    marginLeft="auto"
                    borderLeftWidth={2}
                    borderLeftColor="#303440"
                  >
                    <MenuButton
                      inside
                      active={selected === `${group.type}-TODOS`}
                      onPress={() => onChange({ kind: 'type', type: group.type })}
                    >
                      Todos
                    </MenuButton>
                    {group.variants.map((variant) => (
                      <MenuButton
                        key={variant.label}
                        inside
                        active={
                          selected === `${group.type}-${variant.brand}-${variant.quality}`
                        }
                        onPress={() =>
                          onChange({
                            kind: 'variant',
                            type: group.type,
                            brand: variant.brand,
                            quality: variant.quality,
                          })
                        }
                      >
                        {variant.label}
                      </MenuButton>
                    ))}
                  </YStack>
                </Accordion.Content>
              </Accordion.HeightAnimator>
            </Accordion.Item>
          ))}
        </Accordion>

        <XStack marginTop="$3">
          <Paragraph fontSize={16} fontWeight="700">
            *Empresa con facturación electrónica y hogar sin factura electrónica
          </Paragraph>
        </XStack>
      </YStack>
    </YStack>
  )
}

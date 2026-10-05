import { H2, Paragraph, Separator, XStack, YStack } from 'tamagui'
import { Carousel } from './Carousel'
import { SectionTitle, SurfaceCard } from './ui'

const VALUES = [
  {
    title: 'Envíos rápidos',
    text: 'Envíos a todo Colombia.',
    img: '/imgs/icono-envio.png',
  },
  {
    title: 'Crédito',
    text: 'Posibilidad de crédito para empresas.',
    img: '/imgs/png-transparent-credit-card-computer-icons-credit-card-hand-apartment-internet-removebg-preview.png',
  },
  {
    title: 'Garantía',
    text: 'Nuestros suministros tienen garantía 100%.',
    img: '/imgs/sticker-png-money-back-guarantee-logo-graphy-others-emblem-label-service-logo-removebg-preview.png',
  },
  {
    title: 'Suministros de calidad',
    text: 'Trabajamos con las mejores marcas.',
    img: '/imgs/png-transparent-quality-assurance-service-organization-quality-assurance-service-grass-quality-removebg-preview.png',
  },
  {
    title: 'Asesoría personalizada',
    text: 'Estamos al tanto para cualquier duda.',
    img: '/imgs/295-2953917_telemarketing-png-download-call-center-desenho-png-removebg-preview.png',
  },
] as const

type Value = (typeof VALUES)[number]

function ValueCard({ value }: { value: Value }) {
  return (
    <SurfaceCard height={400} padding={10} justifyContent="flex-start">
      <XStack height="59%" alignItems="center" justifyContent="center">
        <img
          src={value.img}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </XStack>
      <Separator borderColor="black" width="80%" alignSelf="center" marginBottom={8} />
      <H2 textAlign="center" fontSize={26} lineHeight={32} fontWeight="900">
        {value.title}
      </H2>
      <Paragraph textAlign="center" fontSize={20} lineHeight={26} paddingHorizontal={20}>
        {value.text}
      </Paragraph>
    </SurfaceCard>
  )
}

export function ValueProposition() {
  return (
    <YStack
      render="section"
      id="about-us"
      alignItems="center"
      gap="$5"
      paddingVertical="5rem"
      paddingHorizontal="7rem"
      $maxSm={{ paddingHorizontal: '2rem' }}
      $maxLg={{ paddingHorizontal: '4rem' }}
      $2xl={{ paddingHorizontal: '13rem' }}
    >
      <SectionTitle>Nuestra propuesta de valor</SectionTitle>
      <Carousel
        items={VALUES}
        itemKey={(value) => value.title}
        renderItem={(value) => <ValueCard value={value} />}
        perPage={{ base: 1, sm: 2, md: 3, lg: 3 }}
        gap={40}
        autoPlayMs={6000}
      />
    </YStack>
  )
}

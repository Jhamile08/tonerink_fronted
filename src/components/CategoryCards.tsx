import { useState } from 'react'
import { Link } from 'react-router-dom'
import { H2, Paragraph, YStack } from 'tamagui'
import { SectionTitle } from './ui'

const CATEGORIES = [
  {
    title: 'Cartuchos',
    img: '/imgs/cartucho-about-product.jpg',
    info: 'Manejamos varias marcas que sirven para suministrar las impresoras como impresora multifuncional HP, Epson, Lexmark y Brother Industries.',
    to: '/catalogo?categoria=CARTUCHO',
    wide: true,
  },
  {
    title: 'Tóners',
    img: '/imgs/toner-about-product.jpg',
    info: 'Hecho de plásticos granulados está almacenado en un solo cartucho, y permite un mayor grado de control y rendimiento.',
    to: '/catalogo?categoria=TONER',
    wide: false,
  },
  {
    title: 'Botellas de tinta',
    img: '/imgs/fotocopiadora-about-products.jpeg',
    info: 'Su funcionamiento principal es la superficie para obtener un texto, imagen o patrón, con un alto rendimiento.',
    to: '/catalogo?categoria=BOTELLA_TINTA',
    wide: false,
  },
] as const

type Category = (typeof CATEGORIES)[number]

function CategoryCard({ category }: { category: Category }) {
  // El CSS original revelaba `.card-body` con `:hover`. Aquí lo controlamos
  // con estado para que también aparezca al navegar con el teclado.
  const [revealed, setRevealed] = useState(false)

  return (
    <YStack
      width={category.wide ? '80%' : '38%'}
      height="13.5rem"
      borderRadius={20}
      overflow="hidden"
      position="relative"
      transition="medium"
      scale={revealed ? 1.05 : 1}
      shadowColor="#00000030"
      shadowRadius={20}
      shadowOffset={{ width: 0, height: 10 }}
      $maxSm={{ width: '85%' }}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      onFocus={() => setRevealed(true)}
      onBlur={() => setRevealed(false)}
    >
      <img
        src={category.img}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 15 }}
      />

      <YStack
        position="absolute"
        top={0}
        bottom={0}
        width="100%"
        padding="8%"
        justifyContent="center"
        borderRadius={10}
        backgroundColor="#00000060"
        transition="lazy"
        x={revealed ? '0%' : '100%'}
        style={{ backdropFilter: 'blur(5px)' }}
      >
        <H2 color="white" fontSize={30} lineHeight={36} fontWeight="500" textTransform="uppercase">
          {category.title}
        </H2>
        <Paragraph color="white" fontSize={18} lineHeight={24} $maxSm={{ display: 'none' }}>
          {category.info}
        </Paragraph>
        <Link
          to={category.to}
          style={{ color: '#9fd2ff', fontSize: 20, fontWeight: 700, textDecoration: 'none' }}
        >
          Catálogo -&gt;
        </Link>
      </YStack>
    </YStack>
  )
}

export function CategoryCards() {
  return (
    <YStack render="section" id="about-products" paddingVertical="3rem" gap="$5" alignItems="center">
      <SectionTitle>Categorías con las que trabajamos</SectionTitle>
      <YStack
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap="1.5rem"
        width="100%"
      >
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.title} category={category} />
        ))}
      </YStack>
    </YStack>
  )
}

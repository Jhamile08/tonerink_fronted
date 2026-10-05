import { YStack } from 'tamagui'
import { BrandsMarquee } from '../components/BrandsMarquee'
import { CategoryCards } from '../components/CategoryCards'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { ValueProposition } from '../components/ValueProposition'

export default function Home() {
  return (
    <YStack width="100%">
      <Hero />
      <YStack render="main" width="100%">
        <CategoryCards />
        <BrandsMarquee />
        <ValueProposition />
      </YStack>
      <Footer />
    </YStack>
  )
}

import Head from 'next/head'
import styles from './home.module.scss'
import { SubscribeButton } from '@/components/SubscribeButton'
import { GetStaticProps } from 'next'
import { stripe } from '@/services/stripe'

interface HomeProps {
  product: {
    priceId: string
    amount: number
  }
}

// Client side - quando a info é carregada por alguma ação de um user
// Server side - gerar html dinamico para o usuário realtime
// Static site generation - gerar html do mesmo jeito para varias pessoas

// Post do blog
// conteudo (SSG)
// comentarios (Client-side) - é somente após a pagina carregar se for fazer com SSR ele vai mostrar a pagina somente quando o conteudo e comentario tiver carregado

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="=Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1MoYAYKkqm70bGcPWUVay8JM')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}

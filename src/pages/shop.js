import * as React from 'react'
import { Fade } from 'react-awesome-reveal'
import * as styles from '../components/shop.module.css'
import Seo from '../components/seo'

const Shop = () => {
  return (
    <div className={styles.shopMain}>
      <Fade triggerOnce={true} className={styles.shopHeadContainer}>
        <div className={styles.shopHead}>
          <h1 className='heading center'>Shop</h1>
        </div>
      </Fade>
      <Fade triggerOnce={true}>
        <div className={styles.headline}>Coming soon...</div>
      </Fade>
    </div>
  )
}

export const Head = () => <Seo title='Shop' />

export default Shop

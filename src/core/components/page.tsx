import React from 'react'
import styles from './page.module.css'
import { bind } from '../utils/bind'
import { Header } from './header'

const cx = bind(styles)

export const Page: React.FC = ({ children }) => {
  return (
    <main className={cx('main')}>
      <Header/>
      <section className={cx('page')}>
        <div className={cx('wrapper')}>{children}</div>
      </section>
      <footer className={cx('footer')}>
        <p>
          Made with{' '}
          <span role="img" aria-label="Love">
            ❤
          </span>
          ️ from <a href="https://twitter.com/cesalberca">César Alberca</a> and{' '}
          <a href="https://twitter.com/gregg_aisha">Aisha Gregg</a>
        </p>
      </footer>
    </main>
  )
}

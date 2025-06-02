import styles from './index.module.scss'

import appConfig from '#/app.json' assert { type: 'json' }

const Home: React.FC = () => (
  <>
    <header className={styles.header}>
      <section>
        <h1 data-bold>{appConfig.shortName}</h1>
        <p>{appConfig.description}</p>
      </section>
    </header>
  </>
)

export default Home

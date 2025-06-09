import styles from './layout.module.scss'

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <main className={styles.root}>{children}</main>
}

export default AuthLayout

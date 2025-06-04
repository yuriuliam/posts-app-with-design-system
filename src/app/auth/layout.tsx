import styles from './index.module.scss'

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <main className={styles.authLayout}>{children}</main>
}

export default AuthLayout

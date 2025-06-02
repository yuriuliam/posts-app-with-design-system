import styles from './index.module.scss'

/** A Dev tool to help align your interface with the given design system! */
const LayoutGrid: React.FC = () => {
  return (
    <span aria-label="dev layout grid" className={styles.root}>
      <div>
        {Array.from({ length: 12 }).map((_, idx) => (
          <span key={`column-${idx}`} />
        ))}
      </div>
    </span>
  )
}

export { LayoutGrid }

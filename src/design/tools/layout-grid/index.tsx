import styles from './index.module.scss'

type LayoutGridProps = {
  hasSidebar?: boolean
}

/** A Dev tool to help align your interface with the given design system! */
const LayoutGrid: React.FC<LayoutGridProps> = ({ hasSidebar }) => {
  return (
    <span aria-label="dev layout grid" className={styles.root}>
      {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
      <div data-sidebar={hasSidebar || undefined}>
        {Array.from({ length: 12 }).map((_, idx) => (
          <span key={`column-${idx}`} />
        ))}
      </div>
    </span>
  )
}

export { LayoutGrid }

import styles from './layout-grid-columns.module.scss'

type LayoutGridColumnsProps = { hasSidebar?: boolean }

/** A Dev tool to help align your interface with the given design system! */
const LayoutGridColumns: React.FC<LayoutGridColumnsProps> = ({
  hasSidebar,
}) => (
  <span aria-label="dev grid columns" className={styles.root}>
    <div data-sidebar={hasSidebar || undefined}>
      {Array.from({ length: 12 }).map((_, idx) => (
        <span key={`column-${idx}`} />
      ))}
    </div>
  </span>
)

export { LayoutGridColumns }

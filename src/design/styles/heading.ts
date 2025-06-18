import { cva } from 'class-variance-authority'

import styles from './heading.module.scss'

const heading = cva(undefined, {
  variants: {
    size: {
      xl: styles.sizeXl,
      lg: styles.sizeLg,
      md: styles.sizeMd,
      sm: styles.sizeSm,
    },
  },

  defaultVariants: { size: 'xl' },
})

export { heading }

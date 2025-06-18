import React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { definePortfolioDisplayName } from '~/shared/helpers/displayName'

import styles from './button.module.scss'

type ButtonProps = React.ComponentProps<'button'> & VariantProps<typeof button>

const button = cva(styles.root, {
  variants: {
    centered: { true: styles.centerTrue },
    intent: {
      neutral: styles.intentNeutral,
      brand: styles.intentBrand,
      info: styles.intentInfo,
      success: styles.intentSuccess,
      warning: styles.intentWarning,
      critical: styles.intentCritical,
      secondary: styles.intentSecondary,
      tertiary: styles.intentTertiary,
    },
    justified: { true: styles.justifyTrue },
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
      xl: styles.sizeXl,
    },
  },
  defaultVariants: {
    centered: false,
    intent: 'neutral',
    justified: false,
    size: 'md',
  },
})

const Button = React.forwardRef<React.ComponentRef<'button'>, ButtonProps>(
  (
    { children, className, centered, intent, justified, size, ...props },
    ref,
  ) => (
    <button
      {...props}
      className={button({ className, centered, intent, justified, size })}
      ref={ref}
    >
      {children}
    </button>
  ),
)
Button.displayName = definePortfolioDisplayName('Button')

export { Button }

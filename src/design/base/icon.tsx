/*
 * ATTENTION! This file is consumed by `scripts/generate-icons.ts` to serve all
 * the generated icons. Consider the impact when changing stuff around here.
 */
import React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { definePortfolioDisplayName } from '~/shared/helpers/displayName'

import styles from './icon.module.scss'

type IconRef = React.ComponentRef<'svg'>

type SVGSVGProps = React.ComponentProps<'svg'>
type IconProps = SVGSVGProps & VariantProps<typeof iconBase>

const iconBase = cva(styles.root, {
  variants: {
    intent: {
      current: styles.intentCurrent,
      primary: styles.intentPrimary,
      secondary: styles.intentSecondary,
      tertiary: styles.intentTertiary,
      info: styles.intentInfo,
      success: styles.intentSuccess,
      warning: styles.intentWarning,
      critical: styles.intentCritical,
    },
    size: {
      xs: styles.sizeXs,
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
      xl: styles.sizeXl,
      '2xl': styles.size2Xl,
      '3xl': styles.size3Xl,
      '4xl': styles.size4Xl,
      '5xl': styles.size5Xl,
    },
  },

  defaultVariants: { intent: 'current', size: 'md' },
})

const IconBase = React.forwardRef<IconRef, IconProps>(
  ({ children, className, intent, size, ...rest }, ref) => (
    <svg
      {...rest}
      className={iconBase({ className, intent, size })}
      data-portfolio-id="icon"
      ref={ref}
    >
      {children}
    </svg>
  ),
)
IconBase.displayName = definePortfolioDisplayName('IconBase')

export { IconBase }

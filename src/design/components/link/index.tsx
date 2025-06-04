import { forwardRef } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import NextLink from 'next/link'

import { definePortfolioDisplayName } from '~/shared/helpers/displayName'

import styles from './index.module.scss'

type LinkVariantProps = VariantProps<typeof link>

const link = cva(styles.root, {
  variants: {
    size: {
      lg: styles.sizeLg,
      md: styles.sizeMd,
      sm: styles.sizeSm,
      xs: styles.sizeXs,
    },
  },
  defaultVariants: { size: 'md' },
})

const AnchorLink = forwardRef<
  React.ComponentRef<'a'>,
  React.ComponentProps<'a'> & LinkVariantProps
>(({ className, size, ...props }, ref) => (
  <a {...props} className={link({ className, size })} ref={ref} /> // eslint-disable-line jsx-a11y/anchor-has-content
))
AnchorLink.displayName = definePortfolioDisplayName('Link.Anchor')

const StyledNextLink: React.FC<
  React.ComponentProps<typeof NextLink> & LinkVariantProps
> = ({ className, size, ...props }) => (
  <NextLink {...props} className={link({ className, size })} />
)
StyledNextLink.displayName = definePortfolioDisplayName('Link.Next')

const Link = Object.freeze({
  Anchor: AnchorLink,
  Next: StyledNextLink,
})

export { Link }

import React from 'react'

import { Field as ArkField } from '@ark-ui/react/field'
import { cva, cx, type VariantProps } from 'class-variance-authority'

import { definePortfolioDisplayName } from '~/shared/helpers/displayName'

import styles from './field.module.scss'

type SupportedInputTypes = Extract<
  React.HTMLInputTypeAttribute,
  'email' | 'password' | 'search' | 'tel' | 'text' | 'url'
>

type InputFieldVariantProps = VariantProps<typeof field> &
  VariantProps<typeof label>

const label = cva(styles.label, {
  variants: {
    minimizeLabel: { true: styles.minimalLabel, false: styles.maximumLabel },
  },
})

const field = cva(styles.root, {
  variants: {
    size: { lg: styles.sizeLg, md: styles.sizeMd },
  },
  defaultVariants: { size: 'lg' },
})

const FieldRootSlot = React.forwardRef<
  React.ComponentRef<typeof ArkField.Root>,
  ArkField.RootProps & VariantProps<typeof field>
>(({ children, className, size, ...props }, forwardedRef) => (
  <ArkField.Root
    {...props}
    className={field({ className, size })}
    ref={forwardedRef}
  >
    {children}
  </ArkField.Root>
))
FieldRootSlot.displayName = definePortfolioDisplayName('Field.Root')

const FieldLabelSlot = React.forwardRef<
  React.ComponentRef<typeof ArkField.Label>,
  ArkField.LabelProps & VariantProps<typeof label>
>(({ children, className, minimizeLabel, ...props }, forwardedRef) => (
  <ArkField.Label
    {...props}
    className={label({ className, minimizeLabel })}
    ref={forwardedRef}
  >
    {children}
  </ArkField.Label>
))
FieldLabelSlot.displayName = definePortfolioDisplayName('Field.Label')

const FieldInputSlot = React.forwardRef<
  React.ComponentRef<typeof ArkField.Input>,
  Omit<ArkField.InputProps, 'size' | 'type'> & { type?: SupportedInputTypes }
>(({ className, ...props }, forwardedRef) => (
  <ArkField.Input
    {...props}
    className={cx(styles.input, className)}
    ref={forwardedRef}
  />
))
FieldInputSlot.displayName = definePortfolioDisplayName('Field.Input')

const Field = Object.freeze({
  Label: FieldLabelSlot,
  Input: FieldInputSlot,
  Root: FieldRootSlot,
})

export { Field }
export type { SupportedInputTypes, InputFieldVariantProps }

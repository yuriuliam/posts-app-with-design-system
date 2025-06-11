import React from 'react'

import { Field as ArkField } from '@ark-ui/react/field'
import { cva } from 'class-variance-authority'

import { definePortfolioDisplayName } from '~/shared/helpers/displayName'

import styles from './field.module.scss'

type FieldProps = ArkField.InputProps & {
  label: string
  containerRef?: React.Ref<React.ComponentRef<'div'>>
}

const input = cva(styles.root, {
  variants: {},
  defaultVariants: {},
})

const Field = React.forwardRef<React.ComponentRef<'input'>, FieldProps>(
  ({ containerRef, id, label, ...props }, ref) => {
    const internalInputId = React.useId()
    const inputId = id ?? internalInputId

    return (
      <ArkField.Root className={input({})} ref={containerRef}>
        <span>
          <ArkField.Label htmlFor={inputId}>{label}</ArkField.Label>
          <ArkField.Input {...props} id={inputId} ref={ref} />
        </span>
      </ArkField.Root>
    )
  },
)
Field.displayName = definePortfolioDisplayName('Field')

export { Field }

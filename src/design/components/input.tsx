'use client'
'use memo'
import React from 'react'

import { isUndefined } from 'es-toolkit'

import { Field, type InputFieldVariantProps } from '~/design/base/field'
import { composeEventHandlers } from '~/shared/helpers/composeEventHandlers'
import { composeRefs } from '~/shared/helpers/composeRefs'
import { definePortfolioDisplayName } from '~/shared/helpers/displayName'
import { unsafe__noThrow } from '~/shared/helpers/noThrow'

type InputProps = React.ComponentProps<typeof Field.Input> &
  InputFieldVariantProps & {
    containerRef?: React.Ref<HTMLDivElement>
    label: string
  }

const Input = React.forwardRef<
  React.ComponentRef<typeof Field.Input>,
  InputProps
>(({ containerRef, id, label, size, ...inputProps }, forwardedRef) => {
  const internalInputRef = React.useRef<HTMLInputElement>(null)

  const internalInputId = React.useId()
  const inputId = id ?? internalInputId

  const [isFocused, setIsFocused] = React.useState<boolean | undefined>()
  const [hasValue, setHasValue] = React.useState<boolean | undefined>()

  const focusState = React.useDeferredValue(isFocused)
  const shrinkState =
    isUndefined(focusState) && isUndefined(hasValue)
      ? undefined
      : !!(focusState || hasValue)

  return (
    <Field.Root
      data-slot="root"
      onPointerDown={event => {
        const target = event.target as HTMLElement
        if (target.closest('input, button, a')) return

        const input = internalInputRef.current
        if (!input) return

        const isRightSlot = target.closest(`
              [data-slot='slot'][data-side='right'],
              [data-slot='slot']:not([data-side='right']) ~ [data-slot='slot']:not([data-side='left'])
            `)

        const cursorPosition = isRightSlot ? input.value.length : 0

        requestAnimationFrame(() => {
          // Only some input types support this, browsers will throw an error if not supported
          // See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange#:~:text=Note%20that%20according,not%20support%20selection%22.
          unsafe__noThrow(() =>
            input.setSelectionRange?.(cursorPosition, cursorPosition),
          )
          input.focus()
        })
      }}
      size={size}
      ref={containerRef}
    >
      <span data-slot="input-wrapper">
        <Field.Label
          aria-label={label}
          data-shrink={shrinkState}
          htmlFor={inputId}
        >
          {label}
        </Field.Label>

        <Field.Input
          {...inputProps}
          id={inputId}
          onBlur={composeEventHandlers(
            inputProps.onBlur,
            () => void setIsFocused(false),
          )}
          onChange={composeEventHandlers(
            inputProps.onChange,
            evt => void setHasValue(!!evt.target.value),
          )}
          onFocus={composeEventHandlers(
            inputProps.onFocus,
            () => void setIsFocused(true),
          )}
          ref={composeRefs(internalInputRef, forwardedRef)}
        />
      </span>
    </Field.Root>
  )
})
Input.displayName = definePortfolioDisplayName('Input')

export { Input }

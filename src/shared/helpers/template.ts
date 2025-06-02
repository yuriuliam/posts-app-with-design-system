import dedent from 'dedent'
import { isString } from 'es-toolkit'
import { template } from 'es-toolkit/compat'

type EnumerablePropertyKey = Extract<PropertyKey, string | number>

type ApplyTemplateFn<TData extends Record<EnumerablePropertyKey, unknown>> = (
  data: TData,
) => string

/**
 * @example
 * const greetingsTo = defineTemplate('Greetings, <%= data.name %>!')
 *
 * console.log(greetingsTo({ name: 'Joe' })) // Greetings, Joe!
 *
 * // ==============
 *
 * // You can also use template string!
 * const createEmailBody = defineTemplate<{
 *  user: { firstName: string },
 *  team: { name: string }
 * }>`
 *  Hello, <%= data.user.firstName %>!
 *
 *  This is a greeting message from <%= data.team.name %>.
 *
 *  Feel free to use it as you please!
 * `
 *
 * const emailBody = createEmailBody({
 *  user: { firstName: 'Bob' },
 *  team: { name: 'Support' }
 * })
 */
const defineTemplate = <TData extends Record<EnumerablePropertyKey, unknown>>(
  sample: TemplateStringsArray | string,
) =>
  template(isString(sample) ? sample : dedent(sample), {
    variable: 'data',
  }) as ApplyTemplateFn<TData>

export { defineTemplate }

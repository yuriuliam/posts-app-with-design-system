const PORTFOLIO_PREFIX = 'PortfolioUI'

type PortfolioDisplayName<SubName extends string> =
  `${typeof PORTFOLIO_PREFIX}.${SubName}`

const definePortfolioDisplayName = <SubName extends string>(
  subName: SubName,
): PortfolioDisplayName<SubName> => `${PORTFOLIO_PREFIX}.${subName}`

const getComponentDisplayName = (Component?: React.ComponentType | string) =>
  typeof Component === 'string'
    ? Component
    : (Component?.displayName ?? Component?.name ?? '') || 'Component'

export { definePortfolioDisplayName, getComponentDisplayName }

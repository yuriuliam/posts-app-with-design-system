import { TRPCReactProvider } from '~/trpc/react'

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <TRPCReactProvider>{children}</TRPCReactProvider>
)
AppProvider.displayName = 'App.Provider'

export { AppProvider }

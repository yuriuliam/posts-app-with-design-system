import { ClerkProvider } from '@clerk/nextjs'

import { TRPCReactProvider } from '~/trpc/react'

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ClerkProvider>
    <TRPCReactProvider>{children}</TRPCReactProvider>
  </ClerkProvider>
)
AppProvider.displayName = 'App.Provider'

export { AppProvider }

import '~/styles/design/scheme.css'
import '~/styles/design/variables.css'

import '~/styles/reset.css'

import '~/styles/base.scss'

import { ClerkProvider } from '@clerk/nextjs'

import { LayoutGrid } from '~/design/tools/layout-grid'
import { env } from '~/env'
import { nextFontFaceClassNames } from '~/styles/fonts'
import { TRPCReactProvider } from '~/trpc/react'

import appConfig from '#/app.json' assert { type: 'json' }

export const metadata = {
  title: { default: appConfig.name.default, template: appConfig.name.template },
  description: appConfig.description,
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ClerkProvider>
    <html className={nextFontFaceClassNames} lang="en" dir="ltr">
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        {env.NODE_ENV === 'development' && <LayoutGrid />}
      </body>
    </html>
  </ClerkProvider>
)

export default RootLayout

'use client'
import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'

import { Button } from '~/design/components/button'
import { IconFilledGoogle } from '~/design/icons/icon-filled-google'
import { heading } from '~/design/styles/heading'

import styles from './page.module.scss'

const SignInPage: React.FC = () => (
  <SignIn.Root>
    <SignIn.Step name="start" className={styles.signInStart}>
      <h1 data-bold className={heading({ size: 'sm' })}>
        Log In
      </h1>

      <div>
        <Clerk.Connection name="google" asChild>
          <Button intent="secondary" centered>
            <IconFilledGoogle />
            Sign In with Google
          </Button>
        </Clerk.Connection>
      </div>
    </SignIn.Step>
  </SignIn.Root>
)

export default SignInPage

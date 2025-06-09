'use client'
import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'

import { Button } from '~/design/components/button'
import { IconFilledGoogle } from '~/design/icons/icon-filled-google'
import { heading } from '~/design/styles/heading'

import styles from './page.module.scss'

const SignUpPage: React.FC = () => (
  <SignUp.Root>
    <SignUp.Step name="start" className={styles.signUpStart}>
      <h1 data-bold className={heading({ size: 'sm' })}>
        Sign up
      </h1>

      <div>
        <Clerk.Connection name="google" asChild>
          <Button intent="secondary" centered>
            <IconFilledGoogle />
            Sign Up with Google
          </Button>
        </Clerk.Connection>
      </div>
    </SignUp.Step>
  </SignUp.Root>
)

export default SignUpPage

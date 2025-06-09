import React from 'react'

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs'

import { Button } from '~/design/components/button'

import { Posts } from './_components/posts'
import styles from './page.module.scss'

import appConfig from '#/app.json' assert { type: 'json' }

const Home: React.FC = async () => {
  return (
    <>
      <header className={styles.root}>
        <section>
          <h1 data-bold>{appConfig.shortName}</h1>
          <p>{appConfig.description}</p>

          <span>
            <SignedOut>
              <SignInButton>
                <Button intent="brand">Sign In</Button>
              </SignInButton>

              <SignUpButton>
                <Button intent="brand">Sign up</Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </span>

          <SignedIn>
            <Posts />
          </SignedIn>
        </section>
      </header>
    </>
  )
}

export default Home

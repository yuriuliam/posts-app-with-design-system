import React from 'react'

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs'

import { auth } from '@clerk/nextjs/server'

import { Button } from '~/design/components/button'
import { api } from '~/trpc/server'

import { Posts } from './_components/posts'
import styles from './index.module.scss'

import appConfig from '#/app.json' assert { type: 'json' }

const Home: React.FC = async () => {
  const session = await auth()

  if (session.userId) void api.post.getLatest.prefetch()

  return (
    <>
      <header className={styles.header}>
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

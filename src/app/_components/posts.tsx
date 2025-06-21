'use client'
import React from 'react'

import { Button } from '~/design/components/button'
import { Input } from '~/design/components/input'
import { api } from '~/trpc/react'

import styles from './posts.module.scss'

export const Posts: React.FC = () => {
  const [latestPost] = api.post.getLatest.useSuspenseQuery()

  const [name, setName] = React.useState('')

  const utils = api.useUtils()
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate()
      setName('')
    },
  })

  return (
    <div className={styles.postForm}>
      <form
        onSubmit={e => {
          e.preventDefault()
          createPost.mutate({ name })
        }}
      >
        <Input
          label="Post"
          name="post"
          size="lg"
          value={name}
          onChange={evt => setName(evt.target.value)}
        />

        <Button size="sm" type="submit" disabled={createPost.isPending}>
          {createPost.isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>

      {latestPost ? (
        <p>Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  )
}

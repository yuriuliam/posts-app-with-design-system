'use client'
import React from 'react'

import { Button } from '~/design/components/button'
import { api } from '~/trpc/react'

import styles from './posts.module.scss'

export const Posts: React.FC = () => {
  // Can't use "useSuspenseQuery"
  const { data: latestPost, isLoading } = api.post.getLatest.useQuery()

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
        <input
          name="post"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Button size="sm" type="submit" disabled={createPost.isPending}>
          {createPost.isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>

      {latestPost ? (
        <p>Your most recent post: {latestPost.name}</p>
      ) : (
        <>
          {isLoading ? <p>Fetching posts...</p> : <p>You have no posts yet.</p>}
        </>
      )}
    </div>
  )
}

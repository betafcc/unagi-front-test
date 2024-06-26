import React, { useState } from 'react'

import { Card, CardSkeleton } from '../components/Card'
import { CreateCard } from '../components/CreateCard'
import { useCollection } from '../lib/useCollection'

import './Collection.css'

export const Collection = () => {
  const [state, cmd] = useCollection()

  const content = (() => {
    switch (state.type) {
      case 'loading':
        return <CardSkeleton />
      case 'error':
        return <h1>Server response error, try again later</h1>
      case 'idle':
      case 'creating':
        return (
          <>
            <button onClick={cmd.openCreate}>Create card</button>
            {state.cards.map((card) => (
              <Card key={card.id} {...card} />
            ))}
            <CreateCard
              open={state.type === 'creating'}
              onClose={cmd.cancelCreate}
              onConfirm={cmd.create}
            />
          </>
        )
    }
  })()

  return <div>{content}</div>
}

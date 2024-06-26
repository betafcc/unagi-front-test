import React, { useState } from 'react'

import { Card, CardSkeleton } from '../components/Card'
import { CreateCard } from '../components/CreateCard'
import { useCollection } from '../lib/useCollection'

import './Collection.css'
import { Actions } from '../components/Actions'

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
            <Actions openCreate={cmd.openCreate} orderBy={cmd.orderBy} />
            <main className="collection__cards">
              {state.cards.length === 0 ? (
                <h1>No cards yet</h1>
              ) : (
                state.cards.map((card) => <Card key={card.id} {...card} />)
              )}
              <CreateCard
                open={state.type === 'creating'}
                onClose={cmd.cancelCreate}
                onConfirm={cmd.create}
              />
            </main>
          </>
        )
    }
  })()

  return (
    <div className="collection">
      <div className="collection__container">{content}</div>
    </div>
  )
}

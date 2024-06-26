import React, { useEffect, useState } from 'react'

import { CollectionData, fetchAll } from '../lib/collection'

import './Collection.css'
import { Card, CardSkeleton } from '../components/Card'
import { CreateCard } from '../components/CreateCard'

export const Collection = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [cards, setCards] = useState<CollectionData>([])

  useEffect(() => {
    fetchAll().then(
      (r) => {
        setCards(r)
        setLoading(false)
      },
      (e) => {
        setError(e)
        setLoading(false)
      }
    )
  }, [])

  const [modal, setModal] = useState(false)

  return (
    <div>
      {/* <button onClick={() => setModal(!modal)}>Open Modal</button> */}
      <CreateCard open />
      {loading && <CardSkeleton />}
      {error && <h1>Server response error, try again later</h1>}
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  )
}

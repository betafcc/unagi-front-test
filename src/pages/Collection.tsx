import React, { useEffect, useState } from 'react'

import { CollectionData, fetchCollection } from '../lib/collection'

import './Collection.css'
import { Card, CardSkeleton } from '../components/Card'

export const Collection = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [cards, setCards] = useState<CollectionData>([])

  useEffect(() => {
    fetchCollection().then(
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

  return (
    <div>
      {loading && <CardSkeleton />}
      {error && <h1>Server response error, try again later</h1>}
      {cards.map((card) => (
        <Card {...card} />
      ))}
    </div>
  )
}

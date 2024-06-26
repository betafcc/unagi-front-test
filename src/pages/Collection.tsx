import React, { useEffect, useState } from 'react'

import { CollectionData, fetchCollection } from '../lib/collection'

import './Collection.css'
import { Card } from '../components/Card'

export const Collection = () => {
  const [cards, setCards] = useState<CollectionData>([])

  useEffect(() => {
    fetchCollection().then(setCards)
  }, [])

  /**
   * Step 1: Render the card
   */
  return (
    <div>
      {cards.map((card) => (
        <Card {...card} />
      ))}
    </div>
  )
}

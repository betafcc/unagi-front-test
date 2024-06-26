import React from 'react'

import { fetchCollection } from '../lib/collection'

import './Collection.css'
import { Card } from './Card'

export const Collection = () => {
  const collection = fetchCollection()
  const card = collection[0]

  /**
   * Step 1: Render the card
   */
  return (
    <div>
      <Card {...card} />
    </div>
  )
}

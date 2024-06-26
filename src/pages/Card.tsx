import React, { ComponentProps, FC } from 'react'
import { formatDate } from '../lib/util'

import './Card.css'

export type CardData = {
  id: number
  player: {
    firstname: string
    lastname: string
    birthday: string
    image: string
  }
}

export const formatName = (
  p: Pick<CardData['player'], 'firstname' | 'lastname'>
) => (p.lastname ? `${p.firstname} ${p.lastname}` : p.firstname)

export const Card: FC<CardData & Omit<ComponentProps<'div'>, keyof CardData>> =
  ({ id, player, className, ...props }) => {
    return (
      <div className="card" {...props}>
        <img
          className="card__image"
          src={`https://images.fotmob.com/image_resources/playerimages/${id}.png`}
          alt={formatName(player)}
        />
        <h2 className="card__title">{formatName(player)}</h2>
        <h3 className="card__subtitle">
          {formatDate(new Date(), 'fr')}
        </h3>
      </div>
    )
  }

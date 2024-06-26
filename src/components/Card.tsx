import React, { ComponentProps, FC } from 'react'
import { formatDate } from '../lib/util'

import { LazyImage } from './LazyImage'
import { CardData } from '../lib/collection'
import * as fotmob from '../lib/fotmob'
import Skeleton from 'react-loading-skeleton'

import './Card.css'

const formatName = (p: Pick<CardData['player'], 'firstname' | 'lastname'>) =>
  p.lastname ? `${p.firstname} ${p.lastname}` : p.firstname

export const Card: FC<
  CardData & Omit<ComponentProps<'div'>, keyof CardData>
> = ({ id, player, ...props }) => {
  return (
    <div className="card" {...props}>
      <LazyImage
        className="card__image"
        src={fotmob.imageSrc(id)}
        alt={formatName(player)}
        onError={e => {
          // FIXME: fast trick to avoid broken images
          e.currentTarget.src =
            'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        }}
      />
      <h2 className="card__title">{formatName(player)}</h2>
      <h3 className="card__subtitle">{formatDate(new Date())}</h3>
    </div>
  )
}

export const CardSkeleton: FC<{ enableAnimation?: boolean }> = ({
  enableAnimation,
}) => (
  <div className="card">
    <Skeleton
      enableAnimation={enableAnimation}
      className="card__image"
      baseColor="#1a1a1a"
      highlightColor="#6a6a6a"
      style={{ backgroundColor: 'transparent' }}
    />

    <h2 className="card__title">
      <Skeleton
        enableAnimation={enableAnimation}
        baseColor="#1a1a1a"
        highlightColor="#6a6a6a"
        width={'10rem'}
        height={'100%'}
      />
    </h2>
    <h3 className="card__subtitle">
      <Skeleton
        enableAnimation={enableAnimation}
        baseColor="#1a1a1a"
        highlightColor="#6a6a6a"
        width={'8rem'}
        height={'100%'}
      />
    </h3>
  </div>
)

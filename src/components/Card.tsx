import React, {
  ComponentProps,
  ComponentRef,
  FC,
  memo,
  useRef,
  useState,
} from 'react'
import { formatDate } from '../lib/util'

import { LazyImage } from './LazyImage'
import { CardData } from '../lib/collection'
import * as fotmob from '../lib/fotmob'
import Skeleton from 'react-loading-skeleton'

import './Card.css'

const formatName = (p: Pick<CardData['player'], 'firstname' | 'lastname'>) =>
  p.lastname ? `${p.firstname} ${p.lastname}` : p.firstname

/**
 * helper to use the id to generate a background gradient
 */
const idToGradient = (id: string) => {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i)
    hash = hash & hash
  }

  const color = (seed: number) =>
    '#' +
    [
      (seed & 0xff0000) >> 16, // R
      (seed & 0x00ff00) >> 8, // G
      seed & 0x0000ff, // B
    ]
      .map((n) => n.toString(16).padStart(2, '0'))
      .join('')

  return `linear-gradient(to right, ${color(hash)}, ${color(~hash)})`
}

export const Card: FC<
  CardData & Omit<ComponentProps<'div'>, keyof CardData>
> = memo(({ id, player, ...props }) => {
  // mouse vector with origin in middle of card
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const elementRef = useRef<ComponentRef<'div'>>(null)

  return (
    // dummy wrapper for perspective on the 3d transforms
    <div style={{ perspective: '2000px' }}>
      <div
        className="card"
        ref={elementRef}
        onMouseLeave={() => setMouse({ x: 0, y: 0 })}
        onMouseMove={(e) => {
          if (!elementRef.current) return

          // maybe hoist this to useEffect on mount?
          const { left, top, width, height } =
            elementRef.current.getBoundingClientRect()

          const cx = left + width / 2
          const cy = top + height / 2

          setMouse({
            x: (2 * (e.clientX - cx)) / width,
            y: (2 * (e.clientY - cy)) / height,
          })
        }}
        style={{
          transform: `rotateY(${mouse.x * 10}deg) rotateX(${-mouse.y * 10}deg)`,
        }}
        {...props}
      >
        <LazyImage
          className="card__image"
          src={fotmob.imageSrc(id)}
          alt={formatName(player)}
          style={{ backgroundImage: idToGradient(id.toString()) }}
          onError={(e) => {
            // FIXME: fast trick to avoid broken images
            e.currentTarget.src =
              'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
          }}
        />
        <h2 className="card__title">{formatName(player)}</h2>
        <h3 className="card__subtitle">{formatDate(new Date())}</h3>
        <div
          style={{
            position: 'absolute',
            height: '300px',
            width: '1000px',
            transformOrigin: 'center',
            transform: `rotateZ(-${45 + Math.round(mouse.x * 20)}deg)`,
            pointerEvents: 'none',
            transition:
              'top 200ms linear, left 200ms linear, transform 200ms linear',
            top: `calc(100% - ${Math.round(mouse.y * 300)}% + 300px)`,
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(255,255,255, 0.3), rgba(0, 0, 0, 0))`,
          }}
        ></div>
      </div>
    </div>
  )
})

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

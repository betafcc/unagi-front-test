import React, { FC, useState } from 'react'
import { fetchFotmobCard } from '../lib/fotmob'
import { Card, CardSkeleton } from './Card'
import { CardSuggest } from './CardSuggest'
import { Modal } from './Modal'
import { CardData } from '../lib/collection'

export const CreateCard: FC<{
  open?: boolean
  onClose?: () => void
  onConfirm?: (player: CardData) => void
}> = ({ open, onClose, onConfirm }) => {
  const [player, setPlayer] = useState<null | CardData>(null)

  return (
    <Modal
      title="Create a new Card"
      open={open}
      onClose={() => {
        onClose?.()
        setPlayer(null)
      }}
      onConfirm={() => player && onConfirm?.(player)}
    >
      <div className="flex flex-col items-center gap-4">
        <CardSuggest
          onSelect={(id) => fetchFotmobCard(id, true).then(setPlayer)}
        />
        {player ? (
          <Card {...player} />
        ) : (
          <CardSkeleton enableAnimation={false} />
        )}
      </div>
    </Modal>
  )
}

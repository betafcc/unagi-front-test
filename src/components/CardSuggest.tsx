import React, { FC, useEffect, useState } from 'react'
import * as fotmob from '../lib/fotmob'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'

import './CardSuggest.css'

export const CardSuggest: FC<{ onSelect: (id: number) => void }> = ({
  onSelect,
}) => {
  const [people, setPeople] = useState<Array<fotmob.CardSuggestData>>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (query) fotmob.fetchCardSuggest(query).then(setPeople)
    else setPeople([])
  }, [query])

  return (
    <div className="card_suggest">
      <Combobox
        onChange={(p: fotmob.CardSuggestData) => onSelect(p.id)}
        onClose={() => setQuery('')}
      >
        <ComboboxInput
          className="card_suggest__input"
          autoComplete="off"
          aria-label="Player"
          placeholder="Enter player name..."
          displayValue={(person: fotmob.CardSuggestData) => person?.name}
          autoFocus
          onChange={event => setQuery(event.target.value)}
        />
        <ComboboxOptions
          anchor="bottom"
          style={{ width: 'var(--input-width)' }}
        >
          {people.map(person => (
            <ComboboxOption
              key={person.id}
              value={person}
              className="card_suggest__option"
            >
              <img
                src={fotmob.imageSrc(person.id)}
                className="card_suggest__img"
                onError={e => {
                  // FIXME: fast trick to avoid broken images
                  e.currentTarget.src =
                    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
                }}
              />
              <span>{person.name}</span>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}

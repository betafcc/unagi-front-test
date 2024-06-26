export type CollectionData = Array<CardData>

export type CardData = {
  id: number
  player: {
    firstname: string
    lastname: string
    birthday: string
    image: string
  }
}

export const enpoint = 'http://localhost:8001/cards'

export const fetchAll = (): Promise<CollectionData> =>
  fetch(enpoint).then((r) => r.json())

export const fetchOne = (id: number): Promise<CardData> =>
  fetch(`${enpoint}/${id}`).then((r) => r.json())

export const create = (data: CardData): Promise<CardData> =>
  fetch(enpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => r.json())

export const remove = (id: number): Promise<void> =>
  fetch(`${enpoint}/${id}`, { method: 'DELETE' }).then((r) => r.json())

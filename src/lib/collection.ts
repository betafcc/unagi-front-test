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

export const fetchCollection = (): Promise<CollectionData> =>
  fetch('http://localhost:8001/cards').then((r) => r.json())

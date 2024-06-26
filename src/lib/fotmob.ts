import { CardData } from './collection'

export type FotmobPlayerResponse = {
  id: number
  name: string
  birthDate: {
    utcTime: string
    timezone: string
  }
}

export const fetchFotmobPlayer = (
  id: number | string
): Promise<FotmobPlayerResponse> =>
  fetch(`https://www.fotmob.com/api/playerData?id=${id}`).then((r) => r.json())

export const fetchFotmobCard = (id: number | string): Promise<CardData> =>
  fetchFotmobPlayer(id).then((r) => ({
    id: r.id,
    player: {
      firstname: r.name.split(' ')[0],
      lastname: r.name.split(' ').slice(1).join(' '),
      birthday: r.birthDate.utcTime,
      image: `https://images.fotmob.com/image_resources/playerimages/${id}.png`,
    },
  }))

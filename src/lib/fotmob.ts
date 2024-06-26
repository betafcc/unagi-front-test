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
  id: number | string,
  cors = false
): Promise<FotmobPlayerResponse> =>
  fetch(
    (cors ? 'https://corsproxy.io/?' : '') +
      `https://www.fotmob.com/api/playerData?id=${id}`
  ).then((r) => r.json())

export const fetchFotmobCard = (
  id: number | string,
  cors = false
): Promise<CardData> =>
  fetchFotmobPlayer(id, cors).then((r) => ({
    id: r.id,
    player: {
      firstname: r.name.split(' ')[0],
      lastname: r.name.split(' ').slice(1).join(' '),
      birthday: r.birthDate.utcTime,
      image: imageSrc(r.id),
    },
  }))

export const imageSrc = (id: number | string) =>
  `https://images.fotmob.com/image_resources/playerimages/${id}.png`

export type CardSuggestData = {
  id: number
  name: string
  image: string
}

export const fetchCardSuggest = (
  query: string
): Promise<Array<CardSuggestData>> =>
  fetchFotmobSuggest(query).then(
    (r) =>
      r.squadMemberSuggest
        ?.flatMap((s) => s.options)
        .map((o) => {
          const [name, id] = o.text.split('|')
          return { id: Number.parseInt(id), name, image: imageSrc(id) }
        }) || []
  )

export type SuggestData = {
  squadMemberSuggest?: Array<{
    options: Array<{ text: string }>
  }>
}

export const fetchFotmobSuggest = (query: string): Promise<SuggestData> =>
  fetch(
    `https://apigw.fotmob.com/searchapi/suggest?term=${query}&lang=en-GB`
  ).then((r) => r.json())

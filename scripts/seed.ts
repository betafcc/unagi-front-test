import { CardData } from '../src/lib/collection'
import { fetchFotmobCard } from '../src/lib/fotmob'

export const ids = [
  30981, // Lionel Messi
  26166, // Karim Benzema
  31097, // Luka Modrić
  30893, // Cristiano Ronaldo
  737066, // Erling Haaland
  93447, // Robert Lewandowski
  184138, // Antoine Griezmann
  19533, // Neymar
  209405, // Virgil van Dijk
  303339, // Sadio Mané
  169200, // Kevin de Bruyne
  701154, // Kylian Mbappé
]

const main = async () => {
  const cards: Array<CardData> = []

  // seeding in serial to not bomb the api
  for (const id of ids) cards.push(await fetchFotmobCard(id))

  console.log(JSON.stringify({ cards }, null, 2))
}

main()

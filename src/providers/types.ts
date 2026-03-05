export interface Artwork {
  id: string
  source: string
  title: string
  artist: string
  date: string
  medium?: string
  dimensions?: string
  department?: string
  artworkTypeId?: number
  artworkType?: string
  termTitles?: string[]
  placeOfOrigin?: string
  description?: string
  imageUrl?: string
  thumbnailLqip?: string
}

export interface ArtworkProvider {
  name: string
  getRandomArtwork: () => Promise<Artwork>
}

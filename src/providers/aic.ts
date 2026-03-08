import type { Artwork, ArtworkProvider } from './types'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

const ARTWORKS_DIR = join(import.meta.dir, '../../data/artic-api-data/json/artworks')
const IMAGE_BASE_URL = 'https://www.artic.edu/iiif/2'

function buildImageUrl(imageId: string): string {
  return `${IMAGE_BASE_URL}/${imageId}/full/843,/0/default.jpg`
}

const artworkIds = readdirSync(ARTWORKS_DIR)
  .filter(f => f.endsWith('.json'))
  .map(f => f.replace('.json', ''))

export const aicProvider: ArtworkProvider = {
  name: 'aic',

  async getRandomArtwork(): Promise<Artwork> {
    const randomId = artworkIds[Math.floor(Math.random() * artworkIds.length)]
    const file = Bun.file(join(ARTWORKS_DIR, `${randomId}.json`))
    const raw = await file.json()

    return {
      id: String(raw.id),
      source: 'aic',
      title: raw.title,
      artist: raw.artist_display ?? raw.artist_title ?? 'Unknown',
      date: raw.date_display ?? '',
      medium: raw.medium_display ?? undefined,
      dimensions: raw.dimensions ?? undefined,
      department: raw.department_title ?? undefined,
      artworkTypeId: raw.artwork_type_id ?? undefined,
      artworkType: raw.artwork_type_title ?? undefined,
      termTitles: raw.term_titles?.length ? raw.term_titles : undefined,
      placeOfOrigin: raw.place_of_origin ?? undefined,
      description: raw.short_description ?? raw.description ?? undefined,
      imageUrl: raw.image_id ? buildImageUrl(raw.image_id) : undefined,
      thumbnailLqip: raw.thumbnail?.lqip ?? undefined,
    }
  },
}

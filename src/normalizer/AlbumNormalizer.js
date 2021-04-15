import AlbumDto from '@/dto/AlbumDto'

class AlbumNormalizer {
  normalize(spotifyAlbum) {
    return new AlbumDto({
      id: spotifyAlbum.id,
      name: spotifyAlbum.name,
      artists: spotifyAlbum.artists.map(
        ({ name, external_urls: { spotify: href } }) => ({ name, href })
      ),
      imageUrl: spotifyAlbum.images?.[1]?.url, // 300x300
      trackUris: spotifyAlbum.tracks.items.map(({ uri }) => uri)
    })
  }
}

export default new AlbumNormalizer()

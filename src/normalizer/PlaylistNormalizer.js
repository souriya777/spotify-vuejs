import PlaylistDto from '@/dto/PlaylistDto'

class PlaylistNormalizer {
  normalize(spotifyPlaylist) {
    const artists =
      spotifyPlaylist.description != ''
        ? spotifyPlaylist.description
        : 'Par '.concat(spotifyPlaylist?.owner?.display_name)

    // 300x300 or default image
    const imageUrl =
      spotifyPlaylist.images.length > 1
        ? spotifyPlaylist.images[1]?.url
        : spotifyPlaylist.images[0]?.url

    return new PlaylistDto({
      id: spotifyPlaylist.id,
      name: spotifyPlaylist.name,
      artists: [{ name: artists, href: spotifyPlaylist.href }],
      imageUrl,
      trackUris: []
    })
  }
}

export default new PlaylistNormalizer()

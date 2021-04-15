import TrackDto from '@/dto/TrackDto'

class TrackNormalizer {
  normalize(spotifyTrack) {
    return new TrackDto({
      id: spotifyTrack.id,
      name: spotifyTrack.name,
      artists: spotifyTrack.artists.map(
        ({ name, external_urls: { spotify: href } }) => ({ name, href })
      ),
      imageUrl: spotifyTrack.album.images?.[1]?.url, // 300x300
      trackUri: spotifyTrack?.uri,
      albumUri: spotifyTrack?.album?.uri
    })
  }
}

export default new TrackNormalizer()

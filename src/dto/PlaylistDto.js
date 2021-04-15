export default class PlaylistDto {
  id
  name
  artists
  imageUrl
  trackUris

  constructor(src) {
    Object.assign(this, src)
  }
}

export default class AlbumDto {
  id
  name
  artists
  imageUrl
  trackUris

  constructor(src) {
    Object.assign(this, src)
  }
}

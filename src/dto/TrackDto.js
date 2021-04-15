export default class TrackDto {
  id
  name
  artists
  imageUrl
  trackUri
  albumUri

  constructor(src) {
    Object.assign(this, src)
  }
}

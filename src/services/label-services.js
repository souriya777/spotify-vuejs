export function getImageAlt(name = '', artists = []) {
  return name + ' - ' + artists.join(', ')
}

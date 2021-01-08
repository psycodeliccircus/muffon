import axios from 'axios'

export default function getBandcampAlbumData (albumLink) {
  const startState = { error: null, isLoading: true }

  this.setState(startState)

  const albumLinkEncoded = encodeURIComponent(albumLink)
  const url = `/bandcamp/albums/${albumLinkEncoded}`

  const cancelToken = this.request.token
  const extra = { cancelToken }

  const finishState = { isLoading: false, isLoaded: true }

  const handleSuccess = resp => {
    const data = resp.data.album
    const { artist, title } = data

    const successState = { data, albumSource: 'bandcamp', ...finishState }

    this.setState(successState)

    this.setNavSections(artist, title)
  }

  const handleError = error => {
    const errorState = { data: null, error, ...finishState }

    !axios.isCancel(error) && this.setState(errorState)
  }

  axios.get(url, extra).then(handleSuccess).catch(handleError)
}
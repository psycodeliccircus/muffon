import axios from 'axios'

export default function getData (page) {
  const { artistName, trackTitle } = this.params()

  const startState = {
    error: null,
    responsePage: page || 1,
    isLoading: true
  }

  this.setState(startState)

  const isTrackPage = this.dataName === 'track'
  const trackUrl = `/lastfm/artists/${artistName}/tracks/${trackTitle}`
  const url = isTrackPage ? trackUrl : trackUrl + `/${this.dataName}`

  const limit = this.clientPageLimit
  const params = { page, limit }
  const cancelToken = this.request.token
  const extra = { params, cancelToken }

  const finishState = { isLoading: false, isLoaded: true }

  const handleSuccess = resp => {
    const { track } = resp.data
    const { artist, title } = track

    const data = isTrackPage ? track : track[this.dataName]
    const responseTotalPages = track.total_pages

    const successState = { data, responseTotalPages, ...finishState }

    this.setState(successState)

    this.setNavSections(artist, title)

    scrollToTop()
  }

  const scrollToTop = () => window.scrollTo(0, 0)

  const handleError = error => {
    const errorState = { error, ...finishState }

    !axios.isCancel(error) && this.setState(errorState)

    scrollToTop()
  }

  axios.get(url, extra).then(handleSuccess).catch(handleError)
}
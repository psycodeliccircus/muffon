import React from 'react'
import axios from 'axios'
import Tags from 'global/Tags'
import handleAlbumChange from './functions/handleAlbumChange'
import setNavSections from './functions/setNavSections'
import getData from './functions/getData'
import pageData from './functions/pageData'
import segmentData from './functions/segmentData'

export default class AlbumTags extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {}

    this.handleAlbumChange = handleAlbumChange.bind(this)
    this.setNavSections = setNavSections.bind(this)
    this.getData = getData.bind(this)
    this.pageData = pageData.bind(this)
    this.segmentData = segmentData.bind(this)
  }

  componentDidMount () {
    this.request = axios.CancelToken.source()

    const { artistName, albumTitle } = this.params()

    this.setNavSections(artistName, albumTitle)
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleAlbumChange(prevProps)
  }

  componentWillUnmount () {
    this.request.cancel()
  }

  dataName = 'tags'
  navSectionData = 'Tags'

  params = () => this.props.match.params

  contentData () {
    const tagsProps = { tags: this.state.data }

    return <Tags {...tagsProps} />
  }

  render () {
    return <React.Fragment>{this.pageData()}</React.Fragment>
  }
}
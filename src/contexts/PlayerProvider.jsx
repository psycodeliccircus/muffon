import React from 'react'
import PlayerContext from 'contexts/PlayerContext'

export default class PlayerProvider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      toggleAudio: this.toggleAudio,
      stopAudio: this.stopAudio,
      setPlayingNowTrack: this.setPlayingNowTrack,
      toggleAudioButtonIcon: this.toggleAudioButtonIcon,
      toggleMute: this.toggleMute,
      muted: false,
      volume: 100,
      changeVolume: this.changeVolume,
      handleVolumeChange: this.handleVolumeChange,
      shuffle: false,
      toggleShuffle: this.toggleShuffle,
      repeat: false,
      toggleRepeat: this.toggleRepeat,
      currentTime: 0,
      duration: 0,
      handleLoadStart: this.handleLoadStart,
      handleProgress: this.handleProgress,
      handleTimeUpdate: this.handleTimeUpdate,
      handleAudioEnd: this.handleAudioEnd,
      secondsLoaded: 0,
      changeTime: this.changeTime,
      startTimeChange: this.startTimeChange,
      endTimeChange: this.endTimeChange
    }
  }

  toggleAudio = () => {
    switch (this.state.audioStatus) {
      case 'play':
        return this.pauseAudio()
      case 'pause':
        return this.playAudio()
    }
  }

  pauseAudio () {
    this.audio().pause()

    this.setState({ audioStatus: 'pause' })
  }

  audio () {
    return document.getElementById('playerPanelAudio')
  }

  playAudio () {
    this.audio().play()

    this.setState({ audioStatus: 'play' })
  }

  stopAudio = () => {
    this.setState({
      playingNowTrack: null,
      audioStatus: 'stop'
    })
  }

  setPlayingNowTrack = track => {
    this.setState({ playingNowTrack: track })

    this.audio().src = track.link

    this.playAudio()
  }

  toggleAudioButtonIcon = () => {
    switch (this.state.audioStatus) {
      case 'play':
        return 'pause'
      case 'pause':
        return 'play'
      default:
        return 'pause'
    }
  }

  toggleMute = () => {
    const mutedValue = !this.state.muted

    this.audio().muted = mutedValue

    this.setState({ muted: mutedValue })
  }

  changeVolume = e => {
    const volume = parseInt(e.target.value)
    const muted = volume === 0

    this.audio().volume = volume / 100
    this.audio().muted = muted
  }

  handleVolumeChange = e => {
    const volume = Math.floor(e.target.volume * 100)

    this.setState({ volume: volume })
  }

  toggleShuffle = () => {
    this.setState({ shuffle: !this.state.shuffle })
  }

  toggleRepeat = () => {
    const repeat = !this.state.repeat

    this.audio().loop = repeat

    this.setState({ repeat: repeat })
  }

  handleLoadStart = () => {
    this.setState({ duration: 0, secondsLoaded: 0 })
  }

  handleProgress = e => {
    this.setState({
      secondsLoaded: this.secondsLoaded(e.target),
      duration: e.target.duration
    })
  }

  secondsLoaded (audio) {
    const loaded = audio.buffered
    const indexLoaded = loaded.length - 1

    return loaded.end(indexLoaded)
  }

  handleTimeUpdate = e => {
    this.setState({ currentTime: e.target.currentTime })
  }

  handleAudioEnd = e => {
    e.target.currentTime = 0

    this.pauseAudio()
  }

  changeTime = e => {
    this.audio().currentTime = e.target.value
  }

  startTimeChange = () => {
    this.audio().pause()
  }

  endTimeChange = () => {
    this.audio().currentTime = this.state.currentTime
    this.audio()[this.state.audioStatus]()
  }

  render () {
    return (
      <PlayerContext.Provider value={this.state}>
        {this.props.children}
      </PlayerContext.Provider>
    )
  }
}
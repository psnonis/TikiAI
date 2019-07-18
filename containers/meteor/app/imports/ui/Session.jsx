import React            from 'react'
import Webcam           from 'react-webcam'
import { ReactMicPlus } from 'react-mic-plus'

export default class Session extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      record: false
    }
   }
 
  setRef = webcam => {
    this.webcam = webcam
  }

  capturePicture = () => {
    const picture = this.webcam.getScreenshot()
  }

  startRecording = () => {
    this.setState({
      record: true
    })
  }
 
  stopRecording = () => {
    this.setState({
      record: false
    })
  }
 
  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }

  render() {

    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    }

    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capturePicture}>Capture Picture</button>
        <ReactMicPlus
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081"
          nonstop={true}
          duration={5} />
        <button onTouchTap={this.startRecording} type="button">Start</button>
        <button onTouchTap={this.stopRecording} type="button">Stop</button>
      </div>
    )
  }
}

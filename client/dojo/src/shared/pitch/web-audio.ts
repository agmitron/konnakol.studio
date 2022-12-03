export interface IWebAudioAPI {
  audioContext: AudioContext
  sourceAudioNode: MediaStreamAudioSourceNode
  analyserAudioNode: AnalyserNode
  buffer: Float32Array
}

export async function initializeWebAudioApi(): Promise<IWebAudioAPI> {
  const audioContext = new window.AudioContext()
  const micStream = await window.navigator.mediaDevices.getUserMedia({
    audio: true,
  })

  const analyserAudioNode = audioContext.createAnalyser()
  analyserAudioNode.fftSize = 2048
  analyserAudioNode.minDecibels = -100
  analyserAudioNode.maxDecibels = -10
  analyserAudioNode.smoothingTimeConstant = 0.85

  const sourceAudioNode = audioContext.createMediaStreamSource(micStream)
  sourceAudioNode.connect(analyserAudioNode)

  const buffer = new Float32Array(analyserAudioNode.fftSize)

  return {
    audioContext,
    sourceAudioNode,
    analyserAudioNode,
    buffer
  }
}

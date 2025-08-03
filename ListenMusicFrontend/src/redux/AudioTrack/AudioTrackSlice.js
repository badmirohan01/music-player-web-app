import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    audioTrackData: {}
}

export const AudioTrackSlice = createSlice({
  name: 'audioTrack',
  initialState,
  reducers: {
    setAudioTrackData: (state, action) => { state.audioTrackData = action.payload }
  }
})

export const { setAudioTrackData } = AudioTrackSlice.actions
export default AudioTrackSlice.reducer
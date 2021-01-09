import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    amplitude: 105,
    frequency: 44,
    noise: 15,
    waveChoice: 0,
    widthLimit: null,
    heightLimit: null
  },
  mutations: {
    updateAmplitude (state, amplitude) {
      state.amplitude = amplitude
    },
    updateFrequency (state, frequency) {
      state.frequency = frequency
    },
    updateNoise (state, noise) {
      state.noise = noise
    },
    updateWaveChoice (state, waveChoice) {
      state.waveChoice = waveChoice
    },
    updateWidthLimit (state, widthLimit) {
      state.widthLimit = widthLimit
    },
    updateHeightLimit (state, heightLimit) {
      state.heightLimit = heightLimit
    }
  }
})

<template>
  <fieldset class="module-area">
    <legend class="fieldset-legend">OSCILLATOR</legend>
    <div class="row">
      <label class="range-labels">
        <input
          type="range"
          min="0"
          :max="heightLimit"
          step="1"
          v-model.number="amplitude"
        />AMPLITUDE</label>
    </div>
    <div class="row">
      <label class="range-labels">
        <input
          type="range"
          min="1"
          :max="widthLimit"
          step="1"
          v-model.number="frequency"
        />FREQUENCY</label>
    </div>
    <div class="row">
      <label class="radio-labels container" v-for="(key, value) in waveType" :key="key">
        <input
          type="radio"
          v-model.number="waveChoice"
          name="val"
          :value="key"
          class="checkmark"
        /><span class="checkmark"></span>
        {{ value }}
      </label>
    </div>
  </fieldset>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      waveType: {
        sine: 0,
        square: 1,
        triangular: 2,
        saw: 3
      }
    }
  },
  computed: {
    amplitude: {
      get () {
        return this.$store.state.amplitude
      },
      set (value) {
        this.$store.commit('updateAmplitude', value)
      }
    },
    frequency: {
      get () {
        return this.$store.state.frequency
      },
      set (value) {
        this.$store.commit('updateFrequency', value)
      }
    },
    waveChoice: {
      get () {
        return this.$store.state.waveChoice
      },
      set (value) {
        this.$store.commit('updateWaveChoice', value)
      }
    },
    ...mapState([
      'widthLimit',
      'heightLimit'
    ])
  }
}
</script>

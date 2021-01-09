<template>
  <div id="app">
    <div class="header">
      <h1>wave oscillator</h1>
    </div>
    <div class="row">
      <div class='column'>
        <Oscilloscope/>
      </div>
      <div class='column'>
        <Oscillator/>
        <Noise/>
      </div>
    </div>
  </div>
</template>

<script>
import Oscilloscope from '@/components/Oscilloscope.vue'
import Noise from '@/components/Noise.vue'
import Oscillator from '@/components/Oscillator.vue'

export default {
  name: 'App',
  components: { Oscilloscope, Noise, Oscillator }
}
</script>

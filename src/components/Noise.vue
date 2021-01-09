<template>
  <fieldset class="module-area">
    <legend class="fieldset-legend">NOISE</legend>
    <div class="row">
      <label class="range-labels">
        <input type="range" min="0" max="50" step="1" v-model.number="noise">LEVEL</label>
    </div>
  </fieldset>
</template>

<script>
export default {
  computed: {
    noise: {
      get () {
        return this.$store.state.noise
      },
      set (value) {
        this.$store.commit('updateNoise', value)
      }
    }
  }
}
</script>

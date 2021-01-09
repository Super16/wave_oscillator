<template>
  <fieldset class="module-area">
    <legend class="fieldset-legend">OSCILLOSCOPE</legend>
    <canvas id="waveCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </fieldset>
</template>

<script>
import randomNoise from '@/utils/randomNoise'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      vueCanvas: null,
      windowWidth: window.innerWidth,
      canvasWidth: null,
      canvasHeight: null
    }
  },
  methods: {
    plotSine (ctx, amplitude, frequency, width, height, x, y) {
      while (x < width) {
        x += randomNoise(this.noise)
        y = height / 2 + amplitude * Math.sin(2 * Math.PI * x / frequency)
        y += randomNoise(this.noise)
        ctx.lineTo(x, y)
        x = x + 1
      }
      ctx.stroke()
    },
    plotSquare (ctx, amplitude, frequency, width, height, x, y) {
      while (x < width) {
        x += randomNoise(this.noise)
        y = height / 2 + Math.sign(Math.sin(2 * Math.PI * x / frequency)) * amplitude
        y += randomNoise(this.noise)
        ctx.lineTo(x, y)
        x = x + 1
      }
      ctx.stroke()
    },
    plotTriangle (ctx, amplitude, frequency, width, height, x, y) {
      while (x < width) {
        x += randomNoise(this.noise)
        y = height / 2 + 4 * amplitude / frequency * Math.abs((((x - frequency / 4) % frequency) +
          frequency) % frequency - frequency / 2) - amplitude
        y += randomNoise(this.noise)
        ctx.lineTo(x, y)
        x = x + 1
      }
      ctx.stroke()
    },
    plotSaw (ctx, amplitude, frequency, width, height, x, y) {
      while (x < width) {
        x += randomNoise(this.noise)
        y = height / 2 + ((2 * amplitude) / Math.PI) * Math.atan(1 / Math.tan((x * Math.PI) / frequency))
        y += randomNoise(this.noise)
        ctx.lineTo(x, y)
        x = x + 1
      }
      ctx.stroke()
    },
    plotting () {
      var c = document.getElementById('waveCanvas')
      var ctx = c.getContext('2d')
      var width = ctx.canvas.width
      var height = ctx.canvas.height
      ctx.clearRect(0, 0, width, height)
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.strokeStyle = 'gray'
      for (var i = 0; i < width; i += 25) {
        for (var j = 0; j < height; j += 25) {
          ctx.strokeRect(i, j, 25, 25)
        }
      }
      ctx.strokeStyle = 'gray'
      ctx.moveTo(0, height / 2)
      ctx.lineWidth = 5
      ctx.lineTo(width, height / 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 3
      ctx.strokeStyle = 'white'
      var x = 0
      var y = 0
      if (this.waveChoice === 0) {
        this.plotSine(ctx, this.amplitude, this.frequency, width, height, x, y)
      } else if (this.waveChoice === 1) {
        this.plotSquare(ctx, this.amplitude, this.frequency, width, height, x, y)
      } else if (this.waveChoice === 2) {
        this.plotTriangle(ctx, this.amplitude, this.frequency, width, height, x, y)
      } else {
        this.plotSaw(ctx, this.amplitude, this.frequency, width, height, x, y)
      }
    },
    resizingCanvas () {
      if (window.innerWidth <= 480) {
        this.canvasWidth = 300
        this.canvasHeight = 250
      } else if (window.innerWidth > 480 && window.innerWidth <= 992) {
        this.canvasWidth = 680
        this.canvasHeight = 350
      } else {
        this.canvasWidth = 800
        this.canvasHeight = 500
      }
      this.$store.commit('updateWidthLimit', this.canvasWidth)
      this.$store.commit('updateHeightLimit', this.canvasHeight / 2)
    }
  },
  watch: {
    amplitude () {
      this.plotting()
    },
    frequency () {
      this.plotting()
    },
    waveChoice () {
      this.plotting()
    }
  },
  computed: {
    ...mapState([
      'amplitude',
      'frequency',
      'waveChoice',
      'noise'
    ])
  },
  created () {
    this.resizingCanvas()
  },
  mounted () {
    this.plotting()
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
      this.resizingCanvas()
    })
    this.timer = setInterval(this.plotting, 25)
  }
}
</script>

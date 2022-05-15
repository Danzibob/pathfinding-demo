<template>
    <div>

    </div>
</template>

<script>
export default {
  name: 'CanvasComponent',
  props: {
    msg: String
  },
  mounted() {
    const script = (p5) => {
      p5.setup = () => {
        // Clean up old canvas (only needed in dev)
        let existingCanvas = document.getElementsByTagName("canvas")
        existingCanvas.remove()
        
        // Create new canvas
        p5.createCanvas(400,400)
      }

      p5.draw = () => {
        p5.background(51);
        p5.fill(0)
        p5.circle(p5.mouseX, p5.mouseY, 50)
      }
    }

    const P5 = require("p5")
    new P5(script)
  }
}
</script>

<style>

</style>
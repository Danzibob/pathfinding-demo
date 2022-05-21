<template>
  <div></div>
</template>

<script>
  import {placePoints} from  "../lib/map_gen"
  import {Drone} from "../lib/drone"
  import {Vec} from "../lib/vec"
  import {Turbine} from "../lib/turbine"
  import {makeHull} from "../lib/ConvexHull"
  const P5 = require("p5")
  export default {
    name: "CanvasComponent",
    props: {
      msg: String
    },
    data () {
      return {
        points:[],
      } 
    },
    mounted() {
      if(window.cnv) window.cnv.forEach(x => x.remove())
      window.cnv = []
      window.cnv.push(make_p5(P5))
    }
  }

  function make_p5(P5){
    return new P5((p5) => {
      let points, drones
      p5.setup = () => {
        // Create new canvas
        p5.createCanvas(600,400)
        // p5.frameRate(5)
        points = placePoints(350,25,10).map(x => new Turbine(x))
        drones = []
        for(let i = 0; i < 6; i++){
          drones.push(new Drone(new Vec(100,100)))
        }
        makeHull(points).forEach(x => points[x.idx].hull = true)
        allocatePaths(new Vec(100,100), drones, points)
      }

      p5.draw = () => {
        p5.translate(125,25)
        p5.background(51);
        p5.fill(0)
        for(let p of points)
          p.draw(p5)
        for(let drone of drones){
          drone.step()
          drone.draw(p5, true)
        }
      }
    })
  }

  function allocatePaths(start, drones, turbines){
    // Greedy allocation because it's cheap
    // Assumes all drones start at the same point (The boat)
    let hasBatt = drones.slice();
    let cnt = 0
    for(let i = 0; hasBatt.length > 0; i = (i+1)%hasBatt.length){
      let drone = hasBatt[i]
      let pos = drone.plan.length > 0 ? drone.plan[drone.plan.length - 1].pos : start
      console.log(pos)
      let T = turbines.filter(x => !x.plan && x.last_inspected == 0)
                      .sort((a,b) => a.local_score(pos) - b.local_score(pos))
      drone.plan.push(T[0])
      drone.plan_batt += pos.sub(T[0].pos).mag()
      if(drone.plan_batt > 500) hasBatt.splice(i, 1)
      T[0].plan = true
      console.log(`Selected turbine ${T[0]} for drone #${i}, ${(1000 - drone.plan_batt)/10}% battery remains`)
      // if (cnt++ > 10) break
    }

  }
</script>

<style>

</style>
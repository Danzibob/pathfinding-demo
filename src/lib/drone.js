import { Vec } from "./vec"

export class Drone{
    constructor(pos) {
        this.pos = pos
        this.vel = new Vec(0,0)
        this.target = undefined
        this.battery = 1000

        this.max_speed = 2.5

        this.plan = []
        this.plan_batt = 0
    }

    // Returns false if the target was reached
    step() {
        if(!this.target) this.set_target()
        if (this.battery <= 0) return true
        // Calculate new velocity
        if (this.target){
            let delta = this.target.sub(this.pos)
            let m = delta.mag()
            if(m < 0.1){
                this.target = false
                this.set_target()
                return true
            } else if (m> this.max_speed) {
                delta.set_mag(this.max_speed)
            }
            this.vel = delta
        } else {
            this.vel = new Vec(0,0)
        }
        // Update position
        this.pos = this.pos.add(this.vel)
        this.battery -= this.vel.mag()
        return true
    }

    set_target() {
        if (this.plan.length > 0) this.target = this.plan.splice(0,1)[0].pos
    }

    draw(p5, battery=false) {
        p5.push()
        p5.fill(255)
        p5.circle(this.pos.x, this.pos.y, 10)
        if (this.target){
            p5.stroke(255,0,0)
            p5.noFill()
            p5.circle(this.target.x, this.target.y, 10)
            p5.stroke(100)
            p5.line(this.target.x, this.target.y, this.pos.x, this.pos.y)
        }



        if(battery) {
            let battery_level = this.battery / 1000
            p5.push()

            p5.translate(this.pos.x, this.pos.y)
            p5.scale(1,-1)

            p5.noFill()
            p5.stroke(200)
            p5.rect(8,-5,5,20)

            p5.fill(255*(1.2-battery_level),255*battery_level,0)
            p5.noStroke()
            p5.rect(8,-5,5,20*battery_level)

            p5.pop()
        }
        p5.pop()
    }
}


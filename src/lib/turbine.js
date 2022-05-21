export class Turbine{
    constructor(pos) {
        this.pos = pos
        this.last_inspected = 0

        this.borked = Math.random()

        this.plan = false
    }

    // Calculate score of turbine irrelevant to drones
    // 0-1, smaller is more urgent
    global_score() {
        return this.hull ? 1 : 2
    }

    // Calculate a score that accounts for drone position
    // Proportional to distance, smaller is better
    local_score(pos) {
        return pos.sub(this.pos).mag() * this.global_score()
    }

    draw(p5){
        p5.stroke(this.plan ? 255 : 0)
        p5.fill(255 * this.global_score(),0,0)
        p5.circle(this.pos.x, this.pos.y, 5)
        
    }
}
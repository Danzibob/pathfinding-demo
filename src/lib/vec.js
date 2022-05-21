export class Vec{
	constructor(x,y){
		this.x = x
		this.y = y
	}

	mag() {
		return Math.sqrt(this.x*this.x + this.y*this.y)
	}

	dist(other){
		let x = this.x - other.x
		let y = this.y - other.y
		return Math.sqrt(x*x + y*y)
	}

    add(other){
        return new Vec(
            this.x + other.x,
            this.y + other.y
        )
    }

    sub(other){
        return new Vec(
            this.x - other.x,
            this.y - other.y
        )
    }

    set_mag(mag){
        let m = this.mag()
        if (m > 0.001){
            let scalar = mag / m
            this.x *= scalar
            this.y *= scalar
        }
        return this
    }
}
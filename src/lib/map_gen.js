import {Vec} from "./vec.js"
export function placePoints(size, seperation=1, max_tries=10){
	let tries = 0
	let points = []
	while(tries < max_tries){
		let new_point = new Vec(Math.random()*size, Math.random()*size)
		if (points.every(other => other.dist(new_point) > seperation)) {
			points.push(new_point)
			tries = 0
		} else {
			tries += 1
		}
	}
	return points
}
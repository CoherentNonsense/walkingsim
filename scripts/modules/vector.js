/*
 * (I did make this)
 * 
 * new Vector(int, int)
 * makes a 2d object for abstracting posistioning
*/

class Vector {
    _position = {
        x: 0,
        y: 0
    }

    constructor(x, y) {
        this._position.x = x
        this._position.y = y
    }

    get position() {
        return this._position
    }

    get x() {
        return this._position.x
    }

    get y() {
        return this._position.y
    }

    set x(x) {
        this._position.x = x
    }

    set y(y) {
        this._position.y = y
    }
    
    set position(position) {
        this._position.x = position.x
        this._position.y = position.y
    }

    /*
     * Get the distance to the target squared
     * @param {Vector} target - The target you want to find the distance to
     */
    getSqrDistance(target) {
        const xOffset = target.x - this._position.x
        const yOffset = target.y - this._position.y
        const sqrOffset = (xOffset * xOffset) + (yOffset * yOffset)
        return sqrOffset
    }

    /*
     * Get the distance to the target
     * @param {Vector} target - The target you want to find the distance to
     */
    getDistance(target) {
        const xOffset = target.x - this._position.x
        const yOffset = target.y - this._position.y
        const sqrOffset = xOffset * xOffset + yOffset * yOffset
        return Math.sqrt(sqrOffset)
    }

    add(vector) {
        const finalX = vector.x + this._position.x
        const finalY = vector.y + this._position.y
        return {
            x: finalX,
            y: finalY
        }
    }
}
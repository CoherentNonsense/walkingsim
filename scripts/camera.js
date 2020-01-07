class Camera {
    _position = new Vector(0, 0)

    get position() {
        return this._position
    }

    set position({x, y}) {
        this._position.x = x
        this._position.y = y
    }

    /*
     * Smoothly move towards a target
     * @params {Vector} target - The target you want to move towards
     */
    smoothFollow(target) {
        const xDir = (target.position.x - this._position.x) * 0.1
        const yDir = (target.position.y - this._position.y) * 0.1
        
        this._position.position = {
            x: this._position.x + xDir,
            y: this._position.y + yDir
        }

        // if (this._position.getSqrDistance(target) <= 0.01) {
        //     this._position = target
        //     return
        // }
    }
}
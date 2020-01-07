/*
 * (I also made this)
 * 
 * new TileMap(int)
 * makes a 2d array for abstracting a board
*/

class TileMap {
    _size = 48
    _array
    _centerPos
    _chunks = {}

    constructor() {
        this._array = new Array(this._size)
        for (let i = 0; i < this._array.length; i++) {
            this._array[i] = new Array(this._size)
        }
        this._centerPos = new Vector(0,0)
    }

    update(position) {
        // perlin
        for (let x = -24; x < this._array.length - 24; x++) {
            for (let y = -24; y < this._array.length - 24; y++) {
                let value = noise.simplex2((x + position.x) / 75, (y + position.y) / 75)

                if (value > 0.75) {
                    value = 4
                } else if (value > -0.25) {
                    if (noise.simplex2((x + position.x), (y + position.y)) < 0.75 || value < .25) {
                        value = 1
                    } else {
                        value = 3
                    }
                } else {
                    value = 2
                }
                this._array[x + 24][y + 24] = value
            }
        }
        // entity
        // const xPos = Math.floor(position.x / 16) * 16
        // const yPos = Math.floor(position.y / 16) * 16
        // const chunkPos = new Vector(xPos, yPos)
        // for (let x = -1; x < 2; x++) {
        //     for (let y = -1; y < 2; y++) {
        //         if (xPo)
        //     }
        // }
    }


    /**
     * Iterate and assign over array2d
     * 
     * @param {function(int, int)} callback - A callback that iterates over every tile in the array and applies the return value to it.
     */
    iterate(cb) {
        for (let x = 0; x < this._array.length; x++) {
            for (let y = 0; y < this._array.length; y++) {
                this._array[x][y] = cb({x, y})
            }
        }
    }
    iterateGet(cb) {
        for (let x = 0; x < this._array.length; x++) {
            for (let y = 0; y < this._array.length; y++) {
                cb(this._array[y][x])
            }
        }
    }

    insert({x, y}, value) {
        this._array[x + 24][y + 24] = value
    }

    get centerPos() {
        return this._centerPos
    }

    get centerPosValue() {
        return this._array[24][24]
    }

    set centerPos({x,y}) {
        this._centerPos.position = {x,y}
    }
}
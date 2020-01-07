/**
 * This object is responsible for taking in user input
 * and then returning the state of the game
 * 
 * state holds all data to render
 * start() is called on the first frame
 * update() is called at a fixed rate
*/

class GameManager {
    _state = {
        player: new Player(),
        camera: new Camera(),
        tileMap: new TileMap()
    }

    _chunkSize = 16
    _seed = Math.random()
    groundSpeed = 0.25
    shoeSpeed = 0.1
    waterSpeed = 1
    currentSpeed = 0
    nextMove = 0
    moistness = 0
    snowPos = -5000
    stomach = 3000
    inventory = {
        wood: 0,
        stone: 0,
        leaves: 0,
        axe: false,
        boat: false,
        shoes: false,
        pole: false
    }

    willMoveDir = -1
    highscore = 0

    // privates
    gavehint = false

    start() {
        noise.seed(this._seed)
        messageBoard.init()
        this._state.tileMap.update(this._state.player.position.position)
    }

    _gameover(reason) {
        alert(reason + "\nYou made it " + this._state.player.position.y + "m")
        document.location.reload()
    }

    update(input) {
        let isMoving = false
        if (input.up) isMoving = true
        if (input.right) isMoving = true
        if (input.down) isMoving = true
        if (input.left) isMoving = true

        if (this.nextMove < Date.now() && isMoving) {
            if(input.up) this._state.player.position.y--
            if(input.right) this._state.player.position.x++
            if(input.down) this._state.player.position.y++
            if(input.left) this._state.player.position.x--

            this._state.tileMap.centerPos = this._state.player.position
            this._state.tileMap.update(this._state.player.position.position)

            const currentTile = this._state.tileMap.centerPosValue

            // instant checks
            if (currentTile == 2) {
                if (!this.inventory.boat) {
                    this.currentSpeed = this.waterSpeed
                    if (this.moistness <= 100) {
                        messageBoard.newMessage('admin', 'You are soaked by the double u\'s.')
                    }
                    this.moistness = 750
                } else {
                    this.currentSpeed = this.shoeSpeed
                    this.moistness = 0    
                }
                if (this.inventory.pole && Math.random() < 0.05) {
                    this.stomach += 100
                    messageBoard.newMessage('', `You caught a fish. (food +200s total: ${this.stomach})`)
                }
            } else if (currentTile == 1) {
                this.currentSpeed = this.groundSpeed
            } else if (currentTile == 3) {
                let randomChance
                if (this.inventory.axe) {
                    randomChance = 6
                } else {
                    randomChance = 11
                }
                const random = Math.floor(Math.random() * randomChance)
                if (random == 1) {
                    const amount = Math.floor(Math.random() * 2) + 1
                    this.inventory.wood += amount
                    messageBoard.newMessage('', `You tore off a branch. (wood +${amount})`)
                } else if (random == 2) {
                    const amount = Math.floor(Math.random() * 3) + 1
                    this.stomach += amount * 60
                    messageBoard.newMessage('', `You picked an apple. (food +${amount} total: ${this.stomach})`)
                } else if (random == 3) {
                    this.inventory.leaves += 1
                    messageBoard.newMessage('', 'You pulled off some leaves. (leaves +1)')
                }
            } else if (currentTile == 4) {
                if (Math.random() > 0.9) {
                    this.inventory.stone += 1
                    messageBoard.newMessage('', 'You picked up a stone. (stone +1)')
                }
            }

            if (this.inventory.shoes && currentTile == 1) {
                this.currentSpeed = this.shoeSpeed
            }
            this.nextMove = Date.now() + this.currentSpeed * 1000 + (this.moistness * 0.5)
        }

        // moisly
        if (this.moistness > 0) {
            this.moistness --

            if (this.moistness < 251 && this.moistness > 249) {
                messageBoard.newMessage('admin', 'You are just a little soggy.')
            } else if (this.moistness <= 0) {
                messageBoard.newMessage('admin', 'You are now completely dry.')
            }
        }

        // hungry guy
        this.stomach--
        if (this.stomach == 1250) {
            messageBoard.newMessage('admin', 'You are a little peckish.')
        } else if (this.stomach == 750) {
            messageBoard.newMessage('admin', 'You are getting pretty hungry.')
        } else if (this.stomach == 300) {
            messageBoard.newMessage('admin', 'You are starving.')
        } else if (this.stomach <= 0) {
            this._gameover('GAME OVER: TOO HUNGRY')
        }

        // idot plaer
        if (this._state.player.position.y == -50 && !this.gavehint) {
            this.gavehint = true
            messageBoard.newMessage('admin', 'Hint: South is down.')
        }

        // craft
        if (!this.inventory.axe && this.inventory.stone >= 6 && this.inventory.wood >= 6) {
            this.inventory.axe = true
            this.inventory.stone -= 6
            this.inventory.wood -= 6
            messageBoard.newMessage('admin', 'You crafted an axe. (wood -6, stone -6, axe +1)')
        } else if (!this.inventory.boat && this.inventory.wood >= 20) {
            this.inventory.wood -= 20
            this.inventory.boat = true
            messageBoard.newMessage('admin', 'You crafted a boat. (wood -20, boat +1)')
        } else if (!this.inventory.shoes && this.inventory.leaves >= 25) {
            this.inventory.leaves -= 25
            this.inventory.shoes = true
            messageBoard.newMessage('admin', 'You crafted shoes. (leaves -25, shoes +1)')
        } else if (!this.inventory.pole && this.inventory.wood >= 15) {
            this.inventory.wood -= 15
            this.inventory.pole = true
            messageBoard.newMessage('admin', 'You crafted a fishing pole. (wood -15, pole +1)')
        }

        // big cold
        this.snowPos++
        let snowDist = this._state.player.position.y - this.snowPos
        if (snowDist == 3500) {
            messageBoard.newMessage('admin', 'You feel a little chilly.')
        } else if (snowDist == 2000) {
            messageBoard.newMessage('admin', 'It is pretty cold now.')
        } else if (snowDist == 1000) {
            messageBoard.newMessage('admin', 'It is so cold.')
        } else if (snowDist <= 0) {
            this._gameover('GAME OVER: TOO COLD')
        }

        // highscore
        if (this._state.player.position.y === 50 && this.highscore === 0) {
            this.highscore = 50
            messageBoard.newMessage('admin', 'You made it 50m')
        }
        if (this._state.player.position.y === 100 && this.highscore === 50) {
            this.highscore = 100
            messageBoard.newMessage('admin', 'You made it 100m')
        }
        if (this._state.player.position.y === 200 && this.highscore === 100) {
            this.highscore = 200
            messageBoard.newMessage('admin', 'You made it 200m')
        }
        if (this._state.player.position.y === 500 && this.highscore === 200) {
            this.highscore = 500
            messageBoard.newMessage('admin', 'You made it 500m')
        }
        if (this._state.player.position.y === 750 && this.highscore === 500) {
            this.highscore = 750
            messageBoard.newMessage('admin', 'You made it 750m')
        }
        if (this._state.player.position.y === 1000 && this.highscore === 750) {
            this.highscore = 1000
            messageBoard.newMessage('admin', 'You made it ``000m')
        }

        this._state.camera.smoothFollow(this._state.player.position)
    }
}
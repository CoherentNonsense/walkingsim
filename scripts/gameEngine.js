const input = new Input()
const game = new GameManager()
const view = new View()

class GameEngine {
    _animationReq
    _lastTime = 0
    _timeOverflow = 0
    _timeBetweenFrames = 33

    start() {
        window.addEventListener('keydown', e => input.onKeypress(e))
        window.addEventListener('keyup', e => input.onKeypress(e))

        this._animationReq = requestAnimationFrame(timestamp => {
            this._lastTime = timestamp
            game.start()
            this._loop(timestamp)
        })
    }

    stop() {
        cancelAnimationFrame(this._animationReq)
    }
    resume() {
        this._animationReq = requestAnimationFrame(timestamp => {
            this._lastTime = timestamp
            game.start()
            this._loop(timestamp)
        })
    }

    _loop(timestamp) {
        let updated = false
        // time config
        const offset = timestamp - this._lastTime
        this._lastTime = timestamp
        this._timeOverflow += offset

        // application logic
        while (this._timeOverflow > this._timeBetweenFrames) {
            this._timeOverflow -= this._timeBetweenFrames
            updated = true
            game.update(input.input)
        }
        // render logic
        if (updated) {
            view.render(game._state)
        }
        
        // request next frame
        this._animationReq = requestAnimationFrame(timestamp => this._loop(timestamp))
    }
}
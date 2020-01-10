const input = new Input()
const game = new GameManager()
const view = new View()

class GameEngine {
    _animationReq
    _lastTime = 0
    _timeOverflow = 0
    _timeBetweenFrames = 33

    // is called when the start button is pushed
    start() {
        window.addEventListener('keydown', e => input.onKeypress(e))
        window.addEventListener('keyup', e => input.onKeypress(e))

        this._animationReq = requestAnimationFrame(timestamp => {
            this._lastTime = timestamp
            game.start()
            this._loop(timestamp)
        })
    }

    // the game loop (is called every frame recursively)
    _loop(timestamp) {
        let updated = false
        // time config
        const offset = timestamp - this._lastTime
        this._lastTime = timestamp
        this._timeOverflow += offset

        // runs the game manager update function at a consistent rate
        while (this._timeOverflow > this._timeBetweenFrames) {
            this._timeOverflow -= this._timeBetweenFrames
            updated = true
            game.update(input.input)
        }
        // runs the view render function everytime the game manager is updated
        if (updated) {
            view.render(game._state)
        }
        
        // request next frame
        this._animationReq = requestAnimationFrame(timestamp => this._loop(timestamp))
    }
}

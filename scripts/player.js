class Player {
    position = new Vector(0, 0)
    nextMoveTime = 0
    timeBetweenMoves = 1

    moveplayer(dir) {
        if (Date.now() > nextMoveTime)
        this._position.add(dir)
        nextMoveTime = Date.now() + timeBetweenMoves
    }
}
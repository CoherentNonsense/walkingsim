/*
 * This object is responsible for rendering everything
 * in the "screen-container"
 * 
 * render() is called every frame and passed the game state
*/
class View {
    

    render(state) {
        this.renderChunks(state.tileMap, state.camera.position)
    }

    renderChunks(tileMap, cameraPos) {
        const renderX = tileMap.centerPos.x - cameraPos.x - 4
        const renderY = tileMap.centerPos.y - cameraPos.y - 4

        let chunkHTML = document.getElementById(`chunk`)
        let chunkString = ""

        // display correct things
        tileMap.iterateGet(value => {
             if (value == 1) {
                chunkString += '.'

            } else if (value == 2) {
                chunkString += 'w'
            } else if (value == 3) {
                chunkString += 'A'
            } else if (value == 4) {
                chunkString += '"'
            }
        })

        const playerChunk = chunkString.substr(0, 48 * 24 + 24) + '<span class="player-tile">P</span>' + chunkString.substr(48 * 24 + 25)
        chunkHTML.innerHTML = playerChunk

        // position
        chunkHTML.style.top = `${renderY}rem`
        chunkHTML.style.left = `${renderX}rem`
    }
}
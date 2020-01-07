/*
 * This object is responsible for holding the
 * current state of the input
*/
class Input {
    input = {
        up: false,
        right: false,
        down: false,
        left: false
    }

    onKeypress(e) {
        const keycode = e.keyCode | e.which
        let isPressed = false
        if (e.type == "keydown") isPressed = true
        switch(keycode) {
            case 87:
                this.input.up = isPressed
                break
            case 68:
                this.input.right = isPressed
                break
            case 83:
                this.input.down = isPressed
                break
            case 65:
                this.input.left = isPressed
        }
    }
}
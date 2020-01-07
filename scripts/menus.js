$(document).ready(() => {
    const manager = new GameEngine()


    let $game = $("#game-template").html()
    let $menu = $("#menu-template").html()
    let $howToPlay = $("#how-to-play-template").html()

    $(document).on('click', '.menu-button', () => {
        document.location.reload()
    })
    $(document).on('click', '#continue-button', () => {
        changePage($game)
        inGame = true
        manager.start()
    })
    $(document).on('click', '#tutorial-button', () => changePage($howToPlay))

    // initial page
    changePage($menu)

    // switch out the template and reassign the on click events
    function changePage($el) {
        
        $("#app").html($el)

    }
})
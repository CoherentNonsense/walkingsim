# Notes

## Change log
Change Log:
- November 19: Init | Thought about what to make
- November 20: Pondered about what to make
- November 21: made css and html menu while deciding what to make
- November 22: made a bunch of js files and brainstormed ideas to make
- November 28: decided to try make a top down open world something
- November 29: idek where to start
- November 32: making a bunch of files i think ill use but mostly just procrastinating
- November 33: making the outline of the update loop
- November 34: making a bunch of comments because good practice also easier than actual code
- December 04: i forgot how dates work
- December 05: thought about how chunks will load
- December 06: the menu was lagging after navigating around a little. fixed it by setting the event listener on the document rather than the individual buttons each time
- December 07: camera time
- December 09: hooked up basic chunks with the renderer
- December 10: scrapped chunk stuff
- December 11: Finished world gen
- December 16-January 6: Some random game rules to make it not just a walking simulator
- January 7: Its still basically a walking simulator

## Game

Flow
1.  Load current chunk and adjacent chunks (40x40 saved in 2d arrays of Ints)<br>
    Load current entity chunks (if no entity chunk exists in specific area, create one and save to user data)
2.  Parse user input
3.  Translate that into game logic
4.  Move player based on game logic

### World Gen
- perlin noise
- load chunks and translate world?
- world will be stored in a series of Array2D of Ints

### Items
- resources (for crafting)
- tools
- food

### Inventory
- Holds item

### Crafting
- combine two items into another

### Modding
- name
- craftable
- tool/resource/food

----

## User
- name
- password
- save text
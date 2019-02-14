//For Microsoft Makecode
player.onChat("run", function () {
    let xpos = player.position().getValue(Axis.X)
    let ypos = player.position().getValue(Axis.Y)
    let zpos = player.position().getValue(Axis.Z)
    let z = 0
    for (z = -50; z < 50; z++) {
        loops.runInBackground(function () {
            let zs = z
            draw(xpos, ypos, zpos, z)
        })
        loops.pause(1000)
    }
})
function draw(xpos: number, ypos: number, zpos: number, z: number) {
    for (let x = -50; x < 50; x++) {
        let y = x ^ z
        blocks.place(152, positions.createWorld(xpos + x, ypos + y, zpos + z))
    }
}
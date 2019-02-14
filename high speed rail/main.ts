player.onChat("run", function (len: number) {
    let cpos = player.position()
    let x = cpos.getValue(Axis.X)
    let y = cpos.getValue(Axis.Y)
    let z = cpos.getValue(Axis.Z)
    while (x < cpos.getValue(Axis.X) + len) {
        let yg = positions.groundPosition(positions.createWorld(x, y, z)).getValue(Axis.Y)
        if (y - yg < 10) {
            loops.runInBackground(function () {
                let xs = x
                let ys = y
                let zs = z
                isolation(xs, ys, zs)
            })
        }
        if (y > yg) {
            loops.runInBackground(function () {
                let xs = x
                let ys = y
                let zs = z
                bridge(xs, ys, zs)
            })

        } else {
            loops.runInBackground(function () {
                let xs = x
                let ys = y
                let zs = z
                ground(xs, ys, zs)
            })
        }
        player.teleport(positions.createWorld(x, y, z))
        loops.pause(100)
        x++
    }
})
function pillar(x: number, y: number, z: number) {
    settile(Block.IronBars, x, y + 2, z + 1)
    settile(Block.IronBars, x, y + 3, z + 1)
    settile(Block.Glowstone, x, y + 3, z)
    settile(Block.Anvil, x, y, z)
    loops.pause(1000)
    settile(Block.RedstoneBlock, x, y, z)
    settile(Block.PoweredRail, x, y + 1, z)
    let ys = y
    let leng = 0
    while (ys > 0 && blocks.testForBlock(Block.Anvil, positions.createWorld(x, ys - 1, z)) != true) {
        ys--
        leng++
        settile(Block.PurpurPillar, x, ys, z)
    }
    ys--
    leng++
    settile(Block.PurpurPillar, x, ys, z)
    for (let i = ys; i < y - leng / 3; i++) {
        settilewd(1, 4, x, i, z + 1)
        settilewd(1, 4, x - 1, i, z)
        settilewd(1, 4, x, i, z - 1)
        settilewd(1, 4, x + 1, i, z)
    }
    for (let i = ys; i < y - leng / 1.732050807568877; i++) {
        settile(Block.PurpurPillar, x + 1, i, z + 1)
        settile(Block.PurpurPillar, x - 1, i, z - 1)
        settile(Block.PurpurPillar, x - 1, i, z + 1)
        settile(Block.PurpurPillar, x + 1, i, z - 1)
    }
    for (let i = ys; i < y - leng / 1.316074012952492; i++) {
        settilewd(1, 4, x, i, z + 2)
        settilewd(1, 4, x - 2, i, z)
        settilewd(1, 4, x, i, z - 2)
        settilewd(1, 4, x + 2, i, z)
    }
}
function ground(x: number, y: number, z: number) {
    settilewd(Block.Gravel, 0, x, y, z)
    settile(Block.Rail, x, y + 1, z)
}
function bridge(x: number, y: number, z: number) {
    clear(x, y, z)
    settilewd(1, 4, x, y, z)
    settile(Block.Rail, x, y + 1, z)
    settile(Block.IronBars, x, y + 1, z - 1)
    settile(Block.IronBars, x, y + 3, z)
    settile(Block.IronBars, x, y + 1, z + 1)
    if ((x + z) % 10 == 0) {
        loops.runInBackground(function () {
            pillar(x, y, z)
        })
    }
}
function isolation(x: number, y: number, z: number) {
    clear(x, y, z)
    settile(Block.IronBars, x, y + 3, z)
    if ((x + z) % 10 == 0) {
        settile(Block.IronBars, x, y, z + 1)
        settile(Block.IronBars, x, y + 1, z + 1)
        settile(Block.IronBars, x, y + 2, z + 1)
        settile(Block.IronBars, x, y + 3, z + 1)
        settile(Block.Glowstone, x, y + 3, z)
        settile(Block.RedstoneBlock, x, y, z)
        settile(Block.PoweredRail, x, y + 1, z)
    }
    let yg = positions.groundPosition(positions.createWorld(x, y, z)).getValue(Axis.Y)
    if (y > yg || y == yg) {
        let y1 = positions.groundPosition(positions.createWorld(x, y, z - 6)).getValue(Axis.Y)
        let y2 = positions.groundPosition(positions.createWorld(x, y, z + 6)).getValue(Axis.Y)
        filltile(x, y2, z + 6, x, y2 + 3, z + 6, 1, 4)
        filltile(x, y1, z - 6, x, y1 + 3, z - 6, 1, 4)
        settile(Block.Sand, x, y2 + 4, z + 6)
        settile(Block.StoneSlab, x, y2 + 4, z + 7)
        settile(Block.Sand, x, y1 + 4, z - 6)
        settile(Block.StoneSlab, x, y1 + 4, z - 7)
        if (x % 2 == 1) {
            settile(Block.Cactus, x, y2 + 5, z + 6)
            settile(Block.Cactus, x, y1 + 5, z - 6)
        } else {
            settile(Block.Torch, x, y2 + 5, z + 6)
            settile(Block.Torch, x, y1 + 5, z - 6)
        }
    }
}
function settile(b: Block, x: number, y: number, z: number) {
    blocks.place(b, positions.createWorld(x, y, z))
}
function settilewd(b: Block, d: number, x: number, y: number, z: number) {
    blocks.place(blocks.blockWithData(b, d), positions.createWorld(x, y, z))
}
function filltile(x: number, y: number, z: number, x2: number, y2: number, z2: number, b: Block, d = 0) {
    blocks.fill(blocks.blockWithData(b, d), positions.createWorld(x, y, z), positions.createWorld(x2, y2, z2))
}
function repltile(x: number, y: number, z: number, x2: number, y2: number, z2: number, b: Block, b2: Block) {
    blocks.replace(b, b2, positions.createWorld(x, y, z), positions.createWorld(x2, y2, z2))
}
function clear(x: number, y: number, z: number) {
    player.execute("fill " + x + " " + (y - 5) + " " + (z + 9) + " " + (x + 5) + " " + (y + 20) + " " + (z - 9) + " air 0 replace leaves")
    player.execute("fill " + x + " " + (y - 5) + " " + (z + 9) + " " + (x + 5) + " " + (y + 20) + " " + (z - 9) + " air 0 replace leaves2")
    player.execute("fill " + x + " " + (y - 5) + " " + (z + 9) + " " + (x + 5) + " " + (y + 20) + " " + (z - 9) + " air 0 replace log")
    player.execute("fill " + x + " " + (y - 5) + " " + (z + 9) + " " + (x + 5) + " " + (y + 20) + " " + (z - 9) + " air 0 replace log2")
}
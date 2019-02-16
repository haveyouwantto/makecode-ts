player.onChat("run", function (len: number) {
    let cpos = player.position()
    let x = cpos.getValue(Axis.X)//PlayerX
    let y = cpos.getValue(Axis.Y)//PlayerY
    let z = cpos.getValue(Axis.Z)//PlayerZ
    while (x < cpos.getValue(Axis.X) + len) {
        let yg = positions.groundPosition(positions.createWorld(x, y + 1, z)).getValue(Axis.Y)//Get ground Y position
        let leng = -(cpos.getValue(Axis.X) - x)
        loops.runInBackground(function () {
            tooltip(yg + "\n" + leng + "/" + len)
        })
        //if (y - yg < 15) {
        loops.runInBackground(function () {
            let xs = x
            let ys = y
            let zs = z
            isolation(xs, ys + 15, zs)
        })
        //}
        if (y > yg + 3) {
            loops.runInBackground(function () {
                let xs = x
                let ys = y
                let zs = z
                bridge(xs, ys, zs)
            })

        } else if (y == yg) {
            loops.runInBackground(function () {
                let xs = x
                let ys = y
                let zs = z
                ground(xs, ys, zs)
            })
        } else if (y > yg && y <= yg + 3) {
            loops.runInBackground(function () {
                let xs = x
                let ys = y
                let zs = z
                let g = yg
                ground2(xs, ys, zs, g)
            })
        } else {
            loops.runInBackground(function () {
                let xs = x
                let ys = y
                let zs = z
                tunnel(xs, ys, zs)
            })
        }
        loops.runInBackground(function () {
            player.teleport(positions.createWorld(x - 12, y + 1, z))
        })
        loops.pause(200)
        x++
    }
})
//Build pillars for bridge
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
    power(x, y, z)
}
//Build basic railway
function ground(x: number, y: number, z: number) {
    clear(x, y, z)
    settile(Block.Dirt, x, y - 1, z)
    settilewd(Block.Gravel, 0, x, y, z)
    settile(Block.Rail, x, y + 1, z)
    power(x, y, z)
}
function ground2(x: number, y: number, z: number, g: number) {
    clear(x, y, z)
    settile(Block.Dirt, x, y - 1, z)
    filltile(x, g, z + 1, x, y - 1, z - 1, Block.Dirt)
    settilewd(Block.Gravel, 0, x, y, z)
    settile(Block.Rail, x, y + 1, z)
    power(x, y, z)
}
//Build bridges
function bridge(x: number, y: number, z: number) {
    clear(x, y, z)
    settile(Block.IronBars, x, y + 3, z)
    settilewd(1, 4, x, y, z)
    settile(Block.Rail, x, y + 1, z)
    settile(Block.CobblestoneWall, x, y + 1, z - 1)
    settile(Block.CobblestoneWall, x, y + 1, z + 1)
    if ((x + z) % 10 == 0) {
        loops.runInBackground(function () {
            pillar(x, y, z)
        })
    }
}
function tunnel(x: number, y: number, z: number) {
    clear(x, y, z)
    settile(Block.GlassPane, x, y + 1, z - 1)
    settile(Block.GlassPane, x, y + 1, z + 1)
    settilewd(Block.Gravel, 0, x, y, z)
    settile(Block.Rail, x, y + 1, z)
    power(x, y, z)
}
//Power up rail
function power(x: number, y: number, z: number) {
    settile(Block.IronBars, x, y + 3, z)
    settile(Block.Air, x, y + 2, z)
    if ((x + z) % 10 == 0) {
        settile(Block.IronBars, x, y, z + 1)
        settile(Block.IronBars, x, y + 1, z + 1)
        settile(Block.IronBars, x, y + 2, z + 1)
        settile(Block.IronBars, x, y + 3, z + 1)
        settile(Block.Glowstone, x, y + 3, z)
        settile(Block.RedstoneBlock, x, y, z)
        settilewd(Block.PoweredRail, 9, x, y + 1, z)
    }
}
//Build a wall for protection
function isolation(x: number, y: number, z: number) {
    let yg = positions.groundPosition(positions.createWorld(x, y, z)).getValue(Axis.Y)
    if (y > yg || y == yg) {
        let y1 = positions.groundPosition(positions.createWorld(x, y, z - 6)).getValue(Axis.Y)
        let y2 = positions.groundPosition(positions.createWorld(x, y, z + 6)).getValue(Axis.Y)
        if (y1 < 62) {
            y1 = 62
        }
        if (y2 < 62) {
            y2 = 62
        }
        filltile(x, y2, z + 6, x, y2 + 3, z + 6, 1, 4)
        filltile(x, y1, z - 6, x, y1 + 3, z - 6, 1, 4)
        settile(Block.Dirt, x, y2 + 4, z + 6)
        settile(Block.StoneSlab, x, y2 + 4, z + 7)
        settile(Block.Dirt, x, y1 + 4, z - 6)
        settile(Block.StoneSlab, x, y1 + 4, z - 7)
        settilebyid("sweet_berry_bush", 1, x, y2 + 5, z + 6)
        settilebyid("sweet_berry_bush", 1, x, y1 + 5, z - 6)
        if ((x + z) % 10 == 0) {
            settile(Block.Glowstone, x, y2 + 4, z + 5)
            settile(Block.Glowstone, x, y2 + 4, z - 5)
        }
    }
}
//Place a single block
function settile(b: Block, x: number, y: number, z: number) {
    blocks.place(b, positions.createWorld(x, y, z))
}
//Place a single block by ID
function settilebyid(b: string, d: number, x: number, y: number, z: number) {
    player.execute("setblock " + x + " " + y + " " + z + " " + b + " " + d)
}
//Place a single block with data
function settilewd(b: Block, d: number, x: number, y: number, z: number) {
    blocks.place(blocks.blockWithData(b, d), positions.createWorld(x, y, z))
}
//Fill blocks with data
function filltile(x: number, y: number, z: number, x2: number, y2: number, z2: number, b: Block, d = 0) {
    blocks.fill(blocks.blockWithData(b, d), positions.createWorld(x, y, z), positions.createWorld(x2, y2, z2))
}
//Replace blocks
function repltile(x: number, y: number, z: number, x2: number, y2: number, z2: number, b: Block, b2: Block) {
    blocks.replace(b, b2, positions.createWorld(x, y, z), positions.createWorld(x2, y2, z2))
}
//Clear blocks
function clear(x: number, y: number, z: number) {
    player.execute("fill " + x + " " + (y - 5) + " " + (z + 9) + " " + (x + 5) + " " + (y + 20) + " " + (z - 9) + " air 0 replace leaves")
    player.execute("fill " + x + " " + (y - 5) + " " + (z + 9) + " " + (x + 5) + " " + (y + 20) + " " + (z - 9) + " air 0 replace leaves2")
    player.execute("fill " + x + " " + (y - 5) + " " + (z + 9) + " " + (x + 5) + " " + (y + 20) + " " + (z - 9) + " air 0 replace log")
    player.execute("fill " + x + " " + (y - 5) + " " + (z + 9) + " " + (x + 5) + " " + (y + 20) + " " + (z - 9) + " air 0 replace log2")
    player.execute("fill " + x + " " + (y - 5) + " " + (z + 9) + " " + (x + 5) + " " + (y + 20) + " " + (z - 9) + " air 0 replace water")
    filltile(x, y + 3, z + 1, x, y, z - 1, Block.Air)
}
function tooltip(info: string) {
    player.execute('/titleraw @a actionbar {"rawtext":[{"text":"' + info + '"}]}')
}
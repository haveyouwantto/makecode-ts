let monsteroverworld: number[] = []
let xtemp = 0
let I = 0
let c = 0
let ya = 0
let xa = 0
let magn = 0
let ym = 0
let xm = 0
let maxiter = 0
let z1 = 0
let y1 = 0
let x1 = 0
let sizey = 0
let palette: number[] = []
let sizex = 0
let y = 0
let x = 0
let precision = 0
let scale = 0
let posz = 0
let pos: Position = null
let posy = 0
let temppos: Position = null
let posx = 0
let data = 0
let z = 0
let a = 0
let b = 0
let rand = 0
let died: boolean = false
let p2: Position = null
let p1: Position = null
let t = 0
player.onChat(".mdb", function () {
    custom.mandelbrot(0, 0, 1)
})
player.onTravelled(TravelMethod.Walk, function () {
    if (died = true) {
        let died = false
        //player.tell(mobs.target(TargetSelectorKind.LocalPlayer), "§c您已死亡。输入.back回到死亡地点。")
    }
})
player.onChat(".cl", function () {
    player.runChatCommand(".clearlag")
})
player.onChat(".fill", function (blocktofill, data) {
    blocks.fill(
        blocks.blockWithData(blocktofill, data),
        p1,
        p2,
        FillOperation.Replace
    )
    player.say("§d已填充 " + blocks.blockWithData(blocktofill, data))
})
player.onChat(".axis", function () {
    blocks.print(
        "" + player.position(),
        blocks.block(Block.RedstoneBlock),
        positions.create(0, 0, 0),
        CompassDirection.West
    )
})
player.onChat(".clearlag", function () {
    player.execute(
        "kill @e[type=item]"
    )
    player.say("§d已清除掉落物品")
})
player.onChat(".randpaint", function (t) {
    posx = player.position().getValue(Axis.X)
    posy = player.position().getValue(Axis.Y)
    posz = player.position().getValue(Axis.Z)
    for (let i = 0; i < t; i++) {
        rand = Math.randomRange(0, 2)
        switch (rand) {
            case 0:
                z++
                break
            case 1:
                a++
                break
            case 2:
                b++
                break
        }
        blocks.place(palette[z % 29], positions.createWorld(posx + x1, posy + y1, posz + z1))
    }
})
player.onChat(".suicide", function () {
    mobs.kill(
        mobs.target(TargetSelectorKind.NearestPlayer)
    )
})
player.onChat(".explode", function (t, data) {
    if (t == 0 || data == 0) {
        player.tell(mobs.target(TargetSelectorKind.LocalPlayer), "§c用法： .explode <SizeX> <SizeY>")
    } else {
        temppos = player.position()
        for (let cx = 0; cx <= t; cx++) {
            for (let cz = 0; cz <= data; cz++) {
                mobs.spawn(mobs.projectile(ProjectileMob.PrimedTnt), positions.createWorld(temppos.getValue(Axis.X) + cx, temppos.getValue(Axis.Y) + 10, temppos.getValue(Axis.Z) + cz))
            }
            player.tell(mobs.target(TargetSelectorKind.LocalPlayer), "" + cx + " / " + t)
        }
    }
})
player.onChat(".set", function (t) {
    switch (t) {
        case 1:
            p1 = player.position()
            player.tell(mobs.target(TargetSelectorKind.LocalPlayer), "§d第一坐标已设置为 (" + player.position() + ")")
            break
        case 2:
            p2 = player.position()
            player.tell(mobs.target(TargetSelectorKind.LocalPlayer), "§d第二坐标已设置为 (" + player.position() + ")")
            break
    }
})
player.onChat(".dome", function (num1) {
    shapes.sphere(
        blocks.block(Block.Glass),
        positions.create(0, 0, 0),
        num1,
        ShapeOperation.Hollow
    )
})
player.onChat(".here", function () {
    agent.teleportToPlayer()
})
player.onChat(".draw", function () {
    posx = player.position().getValue(Axis.X)
    posy = player.position().getValue(Axis.Y)
    posz = player.position().getValue(Axis.Z)
    scale = 10
    precision = 20
    x = 0 - scale
    while (x < scale) {
        y = Math.tan(x)
        blocks.place(blocks.block(Block.Cobblestone), positions.createWorld(posx + x * precision, posy, posz + y * (-1 * precision)))
        x = x + 1 / precision
    }
})
player.onChat(".back", function () {
    player.teleport(pos)
})
player.onDied(function () {
    died = true
    pos = player.position()
})
sizex = 0
sizey = 0
maxiter = 0
xm = 0
ym = 0
magn = 0
xa = 0
ya = 0
c = 0
I = 0
xtemp = 0
monsteroverworld = [mobs.monster(MonsterMob.Zombie), mobs.monster(MonsterMob.Creeper)]

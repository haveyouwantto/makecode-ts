//Microsoft Makecode For Minecraft
let xtemp = 0
let I = 0
let c = 0
let ya = 0
let xa = 0
let magn = 0
let ym = 0
let y = 0
let xm = 0
let x = 0
let precision = 0
let scale = 0
let maxiter = 0
let posz = 0
let temppos: Position = null
let sizey = 0
let posy = 0
let monsteroverworld: number[] = []
let pos: Position = null
let sizex = 0
let posx = 0
let palette: number[] = []
let num1 = 0
player.onChat(".cl", function () {
    player.runChatCommand(".clearlag")
})
player.onChat(".explode", function (num1, num2) {
    if (num1 == 0 || num2 == 0) {
        player.tell(mobs.target(TargetSelectorKind.LocalPlayer), "§c用法： .explode <SizeX> <SizeY>")
    } else {
        temppos = player.position()
        for (let cx = 0; cx <= num1; cx++) {
            for (let cz = 0; cz <= num2; cz++) {
                mobs.spawn(mobs.projectile(ProjectileMob.PrimedTnt), positions.createWorld(temppos.getValue(Axis.X) + cx, temppos.getValue(Axis.Y) + 10, temppos.getValue(Axis.Z) + cz))
            }
            player.tell(mobs.target(TargetSelectorKind.LocalPlayer), "" + cx + " / " + num1)
        }
    }
})
player.onChat(".clearlag", function () {
    player.execute(
    "kill @e[type=item]"
    )
    player.say("§7已清除掉落物品")
})
player.onChat(".suicide", function () {
    mobs.kill(
    mobs.target(TargetSelectorKind.NearestPlayer)
    )
})
player.onChat(".mdb", function () {
    sizex = 16
    sizey = 16
    maxiter = 1000
    posx = player.position().getValue(Axis.X)
    posy = player.position().getValue(Axis.Y)
    posz = player.position().getValue(Axis.Z)
    xm = -0.1
    ym = 0
    magn = 1
    xa = -2 / magn + xm
    ya = -2 / magn + ym
    while (ya < 2 / magn + ym) {
        c = x * x + y * y
        I = 1
        while (c < 4 && I < maxiter) {
            c = x * x + y * y
            xtemp = x * x - y * y
            y = 2 * x * y + ya
            x = xtemp + xa
            I = I + 1
        }
        if (I != maxiter) {
            blocks.place(palette[I % 29], positions.createWorld(posx + 1 + (xa + 2 / magn - xm) * sizex * magn, posy, posz + 1 + (ya + 2 / magn - ym) * sizey * magn))
        } else {
            blocks.place(blocks.block(Block.BlackConcrete), positions.createWorld(posx + 1 + (xa + 2 / magn - xm) * sizex * magn, posy, posz + 1 + (ya + 2 / magn - ym) * sizey * magn))
        }
        c = 0
        I = 0
        xa = xa + 1 / sizex / magn
        if (xa >= 2 / magn + xm) {
            xa = -2 / magn + xm
            ya = ya + 1 / sizey / magn
        }
        x = xa
        y = ya
    }
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
player.onChat(".axis", function () {
    blocks.print(
    "" + player.position(),
    blocks.block(Block.RedstoneBlock),
    positions.create(0, 0, 0),
    CompassDirection.West
    )
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
player.onChat(".back", function () {
    player.teleport(pos)
})
player.onDied(function () {
    pos = player.position()
    player.tell(mobs.target(TargetSelectorKind.LocalPlayer), "§c您已死亡。输入.back回到死亡地点。")
})
palette = [blocks.block(Block.RedConcrete), blocks.block(Block.RedTerracotta), blocks.block(Block.OrangeTerracotta), blocks.block(Block.OrangeConcrete), blocks.block(Block.YellowTerracotta), blocks.block(Block.YellowConcrete), blocks.block(Block.LimeTerracotta), blocks.block(Block.LimeConcrete), blocks.block(Block.GreenTerracotta), blocks.block(Block.GreenConcrete), blocks.block(Block.CyanTerracotta), blocks.block(Block.LightBlueTerracotta), blocks.block(Block.LightBlueConcrete), blocks.block(Block.CyanConcrete), blocks.block(Block.BlueConcrete), blocks.block(Block.BlueTerracotta), blocks.block(Block.PurpleTerracotta), blocks.block(Block.PurpleConcrete), blocks.block(Block.MagentaTerracotta), blocks.block(Block.PinkTerracotta), blocks.block(Block.PinkConcrete), blocks.block(Block.PinkConcrete), blocks.block(Block.WhiteConcrete), blocks.block(Block.WhiteTerracotta), blocks.block(Block.LightGrayConcrete), blocks.block(Block.LightGrayTerracotta), blocks.block(Block.GrayConcrete), blocks.block(Block.GrayTerracotta), blocks.block(Block.BlackTerracotta)]
monsteroverworld = [mobs.monster(MonsterMob.Zombie), mobs.monster(MonsterMob.Creeper)]

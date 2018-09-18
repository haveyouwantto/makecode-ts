/*
HYWT's Machine
Microsoft MakeCode JavaScript
*/
let monsteroverworld = [mobs.monster(MonsterMob.Zombie), mobs.monster(MonsterMob.Creeper)]
let xtemp = 0
let I = 0
let c = 0
let ya = 0
let xa = 0
let magn = 0
let ym = 0
let xm = 0
let maxiter = 0
let sizey = 0
let sizex = 0
let died2 = false
let z1 = 0
let y1 = 0
let x1 = 0
let list: number[] = []
let palette: number[] = []
let y = 0
let x = 0
let precision = 0
let scale = 0
let posz = 0
let temppos: Position = null
let pos: Position = null
let posy = 0
let posx = 0
let data = 0
let mathdiff = 1
let stop = 0
let t = 0
let p1: Position = null
let p2: Position = null
let died: boolean = false
let rand = 0
let b = 0
let a = 0
let z = 0
let mathe = false
let md = 0
let ma1 = 0
let ma2 = 0
let mode = ""
let directions = [SixDirection.Forward, SixDirection.Back, SixDirection.Left, SixDirection.Right, SixDirection.Up]
let mathdiffs = ["简单", "中等", "困难", "宇宙超级霹雳无敌难度模式"]
let breaks = false

//设置区
let pausetime = 50//设置命令的执行速度,越小越吃性能（推荐50）
let mandelx = -1.542289//Mandelbrot集的X坐标
let mandely = 0//Mandelbrot集的Y坐标
let mandelmagn = 9759.153842325255//Mandelbrot集的放大倍数
//以上为设置区

function mathright(exp: number) {
    if (mathdiff == 4) {
        exp = exp * exp
        player.execute("xp " + exp)
        player.say("§a正确答案！ §l§6经验+" + exp)
    } else {
        player.execute("xp " + exp)
        player.say("§a正确答案！ §l§6经验+" + exp)
    }
}
function mathwrong(ma1: number, ma2: number, mode: string) {
    let ans = 0
    switch (mode) {
        case "+":
            ans = ma1 + ma2
            break
        case "-":
            ans = ma1 - ma2
            break
        case "×":
            ans = ma1 * ma2
            break
        case "÷":
            ans = parseInt(ma1 / ma2 + "")
    }
    player.say("§c错误答案！ 正确答案为§6§l" + ans)
}
player.onChat(".break", function () {
    breaks == true
    loops.pause(5000)
    breaks == false
})
player.onChat(".randshoot", function (count: number) {
    for (let i = 0; i < count; i++) {
        if (breaks == true) { return; }
        let v1 = 5
        let v2 = 0.5
        let v3 = 0.00001
        let v4 = 0.1
        let m = 0
        let n = 0
        let x = 0
        let y = 0
        let z = 0
        let i = 0
        let t = false
        m = ran() * PI() * 2; n = -ran() * PI() / 4 - PI() / 4
        x = custom.getPlayerX() + 2 * v1 * ran() - v1
        y = custom.getPlayerY() + 2 * v2 * ran() - v1 + 20
        z = custom.getPlayerZ() + 2 * v1 * ran() - v1
        i = 0
        t = false
        while (i < 300 && t == false) {
            i++
            let X1 = v4 * i * cos(n) * sin(m) + x
            let Y1 = v4 * i * sin(n) + y
            let Z1 = v4 * i * cos(n) * cos(m) + z
            let X = floor(X1)
            let Y = floor(Y1)
            let Z = floor(Z1)

            for (let d = 0; d < 1; d++) {
                let xs = X1 + 2 * ran() * v3 - v3
                let ys = Y1 + 2 * ran() * v3 - v3
                let zs = Z1 + 2 * ran() * v3 - v3
                loops.runInBackground(function () {
                    loops.pause(100)

                    player.execute("summon evocation_fang " + xs + " " + ys + " " + zs)
                })

                loops.runInBackground(function () {
                    if (!blocks.testForBlock(0, positions.createWorld(X, Y, Z))) {

                        mobs.spawn(mobs.projectile(ProjectileMob.LightningBolt), positions.createWorld(X, Y, Z))
                    }
                    loops.pause(100)
                })
            }

        }
    }
})

function ran() { return Math.random() }
function PI() { return 3.1415926535897932 }
function sin(a: number) { return Math.sin(a) }
function cos(a: number) { return Math.cos(a) }
function floor(a: number) { return Math.floor(a) }

player.onChat(".mathdiff", function (diff: number) {
    if (diff < 1) {
        player.say("§c你输入的数字(" + diff + ")太小了，它至少要为1")
    }
    else if (diff > 4) {
        player.say("§c你输入的数字(" + diff + ")太大了，它最大只能为4")
    } else {
        mathdiff = diff
        player.say("§d题目难度已设置为" + mathdiffs[diff - 1])
    }
})
player.onChat(".math", function (ans: number) {
    if (mathe == false) {
        mathe = true
        switch (mathdiff) {
            case 1:
                md = Math.randomRange(0, 1)
                if (md == 1) {
                    ma1 = Math.randomRange(0, 20)
                    ma2 = Math.randomRange(0, 10)
                    mode = "-"
                } else {
                    ma1 = Math.randomRange(0, 20)
                    ma2 = Math.randomRange(0, 20)
                    mode = "+"
                }
                break
            case 2:
                md = Math.randomRange(0, 2)
                if (md == 1) {
                    ma1 = Math.randomRange(0, 20) * Math.randomRange(0, 16)
                    ma2 = Math.randomRange(0, 10) * Math.randomRange(0, 16)
                    mode = "-"
                } else if (md == 2) {
                    ma1 = Math.randomRange(0, 20)
                    ma2 = Math.randomRange(0, 20)
                    mode = "×"
                } else {
                    ma1 = Math.randomRange(0, 20) * Math.randomRange(0, 16)
                    ma2 = Math.randomRange(0, 20) * Math.randomRange(0, 16)
                    mode = "+"
                }
                break
            case 3:
                md = Math.randomRange(0, 3)
                if (md == 1) {
                    ma1 = Math.randomRange(0, 500)
                    ma2 = Math.randomRange(0, 200)
                    mode = "-"
                } else if (md == 2) {
                    ma1 = Math.randomRange(0, 50)
                    ma2 = Math.randomRange(0, 50)
                    mode = "×"
                }
                else if (md == 3) {
                    ma1 = Math.randomRange(0, 200)
                    ma2 = Math.randomRange(0, 20)
                    mode = "÷"
                    player.say("§d保留整数即可")
                } else {
                    ma1 = Math.randomRange(0, 500)
                    ma2 = Math.randomRange(0, 500)
                    mode = "+"
                }
                break
            case 4:
                md = Math.randomRange(0, 3)
                if (md == 1) {
                    ma1 = Math.randomRange(0, 2147483647)
                    ma2 = Math.randomRange(0, 2147483647)
                    mode = "-"
                } else if (md == 2) {
                    ma1 = Math.randomRange(0, 46340)
                    ma2 = Math.randomRange(0, 46340)
                    mode = "×"
                }
                else if (md == 3) {
                    ma1 = Math.randomRange(0, 2147483647)
                    ma2 = Math.randomRange(0, 46340)
                    mode = "÷"
                    player.say("§d保留整数即可")
                } else {
                    ma1 = Math.randomRange(0, 2147483647)
                    ma2 = Math.randomRange(0, 2147483647)
                    mode = "+"
                }
                break
        }
        player.say("§d" + ma1 + mode + ma2 + "=?")
    } else {
        mathe = false
        switch (mode) {
            case "+":
                if (ma1 + ma2 == ans) {
                    mathright(mathdiff * 2)
                } else {
                    mathwrong(ma1, ma2, "+")
                }
                break
            case "-":
                if (ma1 - ma2 == ans) {
                    mathright(mathdiff * 3)
                } else {
                    mathwrong(ma1, ma2, "-")
                }
                break
            case "×":
                if (ma1 * ma2 == ans) {
                    mathright(mathdiff * 4)
                } else {
                    mathwrong(ma1, ma2, "×")
                }
                break
            case "÷":
                if (parseInt(ma1 / ma2 + "") == ans) {
                    mathright(mathdiff * 5)
                } else {
                    mathwrong(ma1, ma2, "÷")
                }
                break
        }
    }
})
player.onChat(".qiuling", function (r, l) {
    if (r == 0 || l == 0) {
        player.tell(mobs.target(TargetSelectorKind.LocalPlayer), "§c用法： .qiulin <半径> <高度>")
    } else {
        x = player.position().getValue(Axis.X)
        y = player.position().getValue(Axis.Y)
        z = player.position().getValue(Axis.Z)
        player.say("§d正在生成半径" + r + "、高度" + l + "的丘陵")
        custom.qiuling(x, y, z, r, l)
    }
})
player.onChat(".killaura", function (radius) {
    if (radius == 0) {
        player.tell(mobs.target(TargetSelectorKind.LocalPlayer), "§c用法： .killaura <半径>")
    } else {
        loops.forever(function () {
            if (breaks == true) { return; }
            player.execute("kill @a[name!=" + player.name() + ",r=" + radius + "]")
        })
    }
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
player.onChat(".dome", function (t) {
    player.say("§d正在生成半径为" + t + "的玻璃圆顶")
    shapes.sphere(
        blocks.block(Block.Glass),
        positions.create(0, 0, 0),
        t,
        ShapeOperation.Hollow
    )
})
player.onChat(".cindercone", function (width, height) {
    for (let index = 0; index <= height; index++) {
        blocks.fill(
            blocks.block(Block.Gravel),
            positions.create(index - width, index, index - width),
            positions.create(width - index, index, width - index),
            FillOperation.Replace
        )
    }
})
player.onChat(".attack", function () {
    loops.forever(function () {
        if (breaks == true) { return; }
        for (let j = 1; j < 6; j++) {



            agent.teleportToPlayer()
            agent.attack(directions[j])
        }

    })

})
player.onChat(".stop", function () {
    stop = 1
})
player.onChat(".volcano", function () {
    player.runChatCommandWithArguments("cindercone", "20 10")
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
player.onChat(".axisreport", function () {
    player.say("§d" + player.position())
})
player.onChat(".clearlag", function () {
    player.execute(
        "kill @e[type=item]"
    )
    player.say("§d已清除掉落物品")
})
player.onChat(".ai", function () {
    while (agent.inspect(AgentInspection.Block, SixDirection.Down) != blocks.block(Block.GoldBlock)) {
        while (agent.detect(AgentDetection.Block, SixDirection.Forward)) {
            agent.turn(TurnDirection.Right)
        }
        agent.move(SixDirection.Forward, 1)
    }
})
player.onChat(".back", function () {
    player.say("§d正在回到死亡地点")
    player.teleport(pos)
})
player.onChat(".cl", function () {
    player.runChatCommand(".clearlag")
})
player.onDied(function () {
    died = true
    pos = player.position()
})
player.onChat(".here", function () {
    player.say("§dAgent已传送")
    agent.teleportToPlayer()
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
            player.say("§d轰炸机：" + cx + " / " + t)
        }
    }
})
player.onTravelled(TravelMethod.Walk, function () {
    if (died = true) {

    }
})
player.onChat(".mdb", function () {
    custom.mandelbrot(mandelx, mandely, mandelmagn)
})
player.onChat(".mdb3d", function () {
    custom.mandelbrot3d(mandelx, mandely, mandelmagn)
})
player.onChat(".set", function (t) {
    switch (t) {
        case 1:
            p1 = player.position()
            player.say("§d第一坐标已设置为 (" + player.position() + ")")
            break
        case 2:
            p2 = player.position()
            player.say("§d第二坐标已设置为 (" + player.position() + ")")
            break
    }
})

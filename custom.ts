
/**
 * 使用此文件来定义自定义函数和图形块。
 * 想了解更详细的信息，请前往 https://minecraft.makecode.com/blocks/custom
 */

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * 自定义图形块
 */
//% weight=100 color=#00cc00 icon="" block="扩展方法"
namespace custom {
    let PI = 3.141592653589793

    /**
     * 生成mandelbrot图像
     * @param x Re
     * @param y Im
     * @param magn Magnification
     */
    //% block
    export function mandelbrot(xm: number, ym: number, magn: number): void {
        palette = [blocks.block(Block.RedConcrete), blocks.block(Block.RedTerracotta), blocks.block(Block.OrangeTerracotta), blocks.block(Block.OrangeConcrete), blocks.block(Block.YellowTerracotta), blocks.block(Block.YellowConcrete), blocks.block(Block.LimeTerracotta), blocks.block(Block.LimeConcrete), blocks.block(Block.GreenTerracotta), blocks.block(Block.GreenConcrete), blocks.block(Block.CyanTerracotta), blocks.block(Block.LightBlueTerracotta), blocks.block(Block.LightBlueConcrete), blocks.block(Block.CyanConcrete), blocks.block(Block.BlueConcrete), blocks.block(Block.BlueTerracotta), blocks.block(Block.PurpleTerracotta), blocks.block(Block.PurpleConcrete), blocks.block(Block.MagentaConcrete), blocks.block(Block.MagentaTerracotta), blocks.block(Block.PinkTerracotta), blocks.block(Block.PinkConcrete), blocks.block(Block.WhiteConcrete), blocks.block(Block.WhiteTerracotta), blocks.block(Block.LightGrayConcrete), blocks.block(Block.GrayConcrete), blocks.block(Block.LightGrayTerracotta), blocks.block(Block.BrownConcrete), blocks.block(Block.BrownTerracotta), blocks.block(Block.GrayTerracotta), blocks.block(Block.BlackTerracotta)]
        sizex = 16
        sizey = 16
        maxiter = 1000
        posx = player.position().getValue(Axis.X)
        posy = player.position().getValue(Axis.Y)
        posz = player.position().getValue(Axis.Z)
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
                blocks.place(palette[I % 31], positions.createWorld(posx + 1 + (xa + 2 / magn - xm) * sizex * magn, posy, posz + 1 + (ya + 2 / magn - ym) * sizey * magn))
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
    }
    /**
     * 生成mandelbrot山峰
     * @param x Re
     * @param y Im
     * @param magn Magnification
     */
    //% block
    export function mandelbrot3d(xm: number, ym: number, magn: number): void {
        palette = [blocks.block(Block.RedConcrete), blocks.block(Block.RedTerracotta), blocks.block(Block.OrangeTerracotta), blocks.block(Block.OrangeConcrete), blocks.block(Block.YellowTerracotta), blocks.block(Block.YellowConcrete), blocks.block(Block.LimeTerracotta), blocks.block(Block.LimeConcrete), blocks.block(Block.GreenTerracotta), blocks.block(Block.GreenConcrete), blocks.block(Block.CyanTerracotta), blocks.block(Block.LightBlueTerracotta), blocks.block(Block.LightBlueConcrete), blocks.block(Block.CyanConcrete), blocks.block(Block.BlueConcrete), blocks.block(Block.BlueTerracotta), blocks.block(Block.PurpleTerracotta), blocks.block(Block.PurpleConcrete), blocks.block(Block.MagentaConcrete), blocks.block(Block.MagentaTerracotta), blocks.block(Block.PinkTerracotta), blocks.block(Block.PinkConcrete), blocks.block(Block.WhiteConcrete), blocks.block(Block.WhiteTerracotta), blocks.block(Block.LightGrayConcrete), blocks.block(Block.GrayConcrete), blocks.block(Block.LightGrayTerracotta), blocks.block(Block.BrownConcrete), blocks.block(Block.BrownTerracotta), blocks.block(Block.GrayTerracotta), blocks.block(Block.BlackTerracotta)]
        sizex = 16
        sizey = 16
        maxiter = 1000
        posx = player.position().getValue(Axis.X)
        posy = player.position().getValue(Axis.Y)
        posz = player.position().getValue(Axis.Z)
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
                if (I + posy > 255) {
                    blocks.fill(palette[I % 31], positions.createWorld(posx + 1 + (xa + 2 / magn - xm) * sizex * magn, 255, posz + 1 + (ya + 2 / magn - ym) * sizey * magn), positions.createWorld(posx + 1 + (xa + 2 / magn - xm) * sizex * magn, posy, posz + 1 + (ya + 2 / magn - ym) * sizey * magn))
                } else {
                    blocks.fill(palette[I % 31], positions.createWorld(posx + 1 + (xa + 2 / magn - xm) * sizex * magn, posy + I, posz + 1 + (ya + 2 / magn - ym) * sizey * magn), positions.createWorld(posx + 1 + (xa + 2 / magn - xm) * sizex * magn, posy, posz + 1 + (ya + 2 / magn - ym) * sizey * magn))
                }
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
    }

    /**
     * TODO: 获取两个位置之间的距离
     * @param num1 number
     * @param num2 number
     */
    //% block
    export function getDistance(pos1: Position, pos2: Position): number {
        let num1 = 0
        let num2 = 0
        let t1 = 0
        for (let i = 0; i++; i < 4) {
            switch (i) {
                case 1:
                    num1 = pos1.getValue(Axis.X)
                    num2 = pos2.getValue(Axis.X)
                    break
                case 2:
                    num1 = pos1.getValue(Axis.X)
                    num2 = pos2.getValue(Axis.X)
                    break
                case 3:
                    num1 = pos1.getValue(Axis.X)
                    num2 = pos2.getValue(Axis.X)
                    break
            }
            if (num1 > num2) {
                t1 = num1 - num2
            }
            else
            { t1 = num2 - num1 }
        }
        return 0;
    }
    /**
     * 生成丘陵
     * @param x X
     * @param y Y
     * @param z Z
     * @param r 半径
     * @param l 高
     */
    //% block
    export function qiuling(x: number, y: number, z: number, r: number, l: number) {
        y--
        let pi = PI * 0.5
        l = l * 0.7
        let a = 1.4
        let b = 4
        let c = 7
        let d = Math.random() * 30 + 20
        let a1 = Math.random() * 300000
        let a2 = Math.random() * 50000000
        let a3 = Math.random() * 8000
        for (let m = -r; m < r; m++) {
            for (let n = -r; n < r; n++) {
                let ls = (Math.cos(pi * m / r) * Math.cos(pi * n / r)) * l - (Math.sin(pi * m * a / r + b) * Math.cos(pi * n * a / r + c)) * l * 0.25 + (Math.cos(pi * m * a * 2 / r + b * d) + Math.sin(pi * n * a * 2 / r + c * d)) * l * 0.2 - (Math.sin(pi * m * a * 3 / r + b * d * 2) * Math.sin(pi * n * a * 3 / r + c * d * 2)) * l * 0.15
                if (ls > 0) setlongblock(x + m, y, z + n, ls)
            }
        }
    }
    /**
     * 获取玩家的X坐标
     */
    //% block
    export function getPlayerX(): number {
        return player.position().getValue(Axis.X)
    }
    /**
     * 获取玩家的Y坐标
     */
    //% block
    export function getPlayerY(): number {
        return player.position().getValue(Axis.Y)
    }
    /**
     * 获取玩家的Z坐标
     */
    //% block
    export function getPlayerZ(): number {
        return player.position().getValue(Axis.Z)
    }
    /**
     * 在指定坐标爆炸
     */
    //% block
    export function explode(x: number, y: number, z: number): void {
        player.execute("summon ender_crystal "+x+" "+y+" "+z)
        mobs.spawn(mobs.projectile(ProjectileMob.LightningBolt), positions.createWorld(x,y,z))
    }
    //% block
    export function parkour(plength:number):void {
        let xpos = player.position().getValue(Axis.X)
        let ypos = player.position().getValue(Axis.Y)
        let zpos = player.position().getValue(Axis.Z)
        for (let i = 0; i < plength; i++) {
            let r = Math.randomRange(0, 10000)
            let xa = 1
            let ya = 0
            let za = 1
            while (r > 0 && xa < 3 && ya < 1 && za < 3 && xa > 0 && ya > -4 && za > 0) {
                let s = Math.randomRange(-1, 1)
                let b = Math.randomRange(0, 2)
                r = r - b
                switch (b) {
                    case 0:
                        xa = xa + s
                        break
                    case 1:
                        ya = ya + s
                        break
                    case 2:
                        za = za + s
                        break

                }
            }
            x = x + xa
            y = y + ya
            z = z + za
            blocks.place(blocks.block(Block.DiamondBlock), positions.createWorld(xpos + x, ypos + y, zpos + z))
            if (i % 20 == 0) {
                blocks.place(blocks.block(Block.RedstoneBlock), positions.createWorld(xpos + x, ypos + y, zpos + z))
            }
        }
    }
    //% block
    export function skygrid(x:number,y:number,z:number):void {
        let xpos = player.position().getValue(Axis.X)
        let ypos = player.position().getValue(Axis.Y)
        let zpos = player.position().getValue(Axis.Z)
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < z; j++) {

                for (let k = 0; k < z; k++) {
                    blocks.place(blocks.block(Block.DiamondBlock), positions.createWorld(xpos + i * 4, ypos + j * 4, zpos + k * 4))
                }
            }
        }
    }
    function setlongblock(x: number, y: number, z: number, l: number) {
        for (let i = 0; i <= l; i++) {
            if (i > 3) settile(x, y + l - i, z, 1, 0)
            else if (i > 0) settile(x, y + l - i, z, 3, 0)
            else if (i == 0) settile(x, y + l, z, 2, 0)
        }
    }
    function settile(x: number, y: number, z: number, i: number, b: number) {
        blocks.place(blocks.blockWithData(i, b), positions.createWorld(x, y, z))
    }

}


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
//% weight=100 color=#0fbc11 icon=""
namespace custom {
    /**
     * 生成mandelbrot图像
     * @param x Re
     * @param y Im
     * @param magn Magnification
     */
    //% block
    export function mandelbrot(xm: number, ym: number, magn: number): void {
        palette = [blocks.block(Block.RedConcrete), blocks.block(Block.RedTerracotta), blocks.block(Block.OrangeTerracotta), blocks.block(Block.OrangeConcrete), blocks.block(Block.YellowTerracotta), blocks.block(Block.YellowConcrete), blocks.block(Block.LimeTerracotta), blocks.block(Block.LimeConcrete), blocks.block(Block.GreenTerracotta), blocks.block(Block.GreenConcrete), blocks.block(Block.CyanTerracotta), blocks.block(Block.LightBlueTerracotta), blocks.block(Block.LightBlueConcrete), blocks.block(Block.CyanConcrete), blocks.block(Block.BlueConcrete), blocks.block(Block.BlueTerracotta), blocks.block(Block.PurpleTerracotta), blocks.block(Block.PurpleConcrete), blocks.block(Block.MagentaTerracotta), blocks.block(Block.PinkTerracotta), blocks.block(Block.PinkConcrete), blocks.block(Block.PinkConcrete), blocks.block(Block.WhiteConcrete), blocks.block(Block.WhiteTerracotta), blocks.block(Block.LightGrayConcrete), blocks.block(Block.LightGrayTerracotta), blocks.block(Block.GrayConcrete), blocks.block(Block.GrayTerracotta), blocks.block(Block.BlackTerracotta)]
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
    }
    /**
     * 生成mandelbrot山峰
     * @param x Re
     * @param y Im
     * @param magn Magnification
     */
    //% block
    export function mandelbrot3d(xm: number, ym: number, magn: number): void {
        palette = [blocks.block(Block.RedConcrete), blocks.block(Block.RedTerracotta), blocks.block(Block.OrangeTerracotta), blocks.block(Block.OrangeConcrete), blocks.block(Block.YellowTerracotta), blocks.block(Block.YellowConcrete), blocks.block(Block.LimeTerracotta), blocks.block(Block.LimeConcrete), blocks.block(Block.GreenTerracotta), blocks.block(Block.GreenConcrete), blocks.block(Block.CyanTerracotta), blocks.block(Block.LightBlueTerracotta), blocks.block(Block.LightBlueConcrete), blocks.block(Block.CyanConcrete), blocks.block(Block.BlueConcrete), blocks.block(Block.BlueTerracotta), blocks.block(Block.PurpleTerracotta), blocks.block(Block.PurpleConcrete), blocks.block(Block.MagentaTerracotta), blocks.block(Block.PinkTerracotta), blocks.block(Block.PinkConcrete), blocks.block(Block.PinkConcrete), blocks.block(Block.WhiteConcrete), blocks.block(Block.WhiteTerracotta), blocks.block(Block.LightGrayConcrete), blocks.block(Block.LightGrayTerracotta), blocks.block(Block.GrayConcrete), blocks.block(Block.GrayTerracotta), blocks.block(Block.BlackTerracotta)]
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
                    blocks.fill(palette[I % 29], positions.createWorld(posx + 1 + (xa + 2 / magn - xm) * sizex * magn, 255, posz + 1 + (ya + 2 / magn - ym) * sizey * magn), positions.createWorld(posx + 1 + (xa + 2 / magn - xm) * sizex * magn, posy, posz + 1 + (ya + 2 / magn - ym) * sizey * magn))
                } else {
                    blocks.fill(palette[I % 29], positions.createWorld(posx + 1 + (xa + 2 / magn - xm) * sizex * magn, posy + I, posz + 1 + (ya + 2 / magn - ym) * sizey * magn), positions.createWorld(posx + 1 + (xa + 2 / magn - xm) * sizex * magn, posy, posz + 1 + (ya + 2 / magn - ym) * sizey * magn))
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
}

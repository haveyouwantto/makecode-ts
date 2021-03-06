var simpleGUI = null;
var simpleGUI2 = null;
var sprint = false;
var x = (Player.getX())
var y = (Player.getY() - 1.619999885559082)
var z = (Player.getZ())
var tip = 0
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var diffstr = ["和平", "简单", "一般", "困难"]
var group = ["关", "系统信息", "世界信息", "玩家信息", "方块信息", "生物群系信息", "时间信息", "服务器信息"]
group[-1] = "电脑迷专用"
function newLevel() {
  tip = 0
}
ctx.runOnUiThread(new java.lang.Runnable(
  {
    run: function () {
      try {
        simpleGUI = new android.widget.PopupWindow();
        simpleGUI2 = new android.widget.PopupWindow();
        var layout = new android.widget.RelativeLayout(ctx);
        var button = new android.widget.Button(ctx);
        button.setText("I");//输入按钮的文字

        button.setOnClickListener(new android.view.View.OnClickListener(
          {
            onClick: function (viewarg) {
              tip++
              if (tip == 8) {
                tip = 0
              }
              if (tip == 4 && SHIFT == true) {
                tip = -1
              }
              clientMessage("选择了组别： \u00a7a" + group[tip])
            }
          }
        )
        );
        layout.addView(button);

        simpleGUI.setContentView(layout);
        simpleGUI.setWidth(90);//按钮的宽度
        simpleGUI.setHeight(90);//按钮的高度
        simpleGUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 0, 10);

        //RIGHT表示在屏幕的方向，LEFT是左边
        //BOTTOM是底部，TOP则是顶部，0是向横偏移0像素，10是向上偏移10个像素
      }
      catch (err) {
        print("Error: " + err);
      }
    }
  }
)
);


function deathHook(murderer, victim) {
  if (victim == getPlayerEnt()) {
    clientMessage("\u00a74死亡位置: \u00a7a" + parseInt(Entity.getX(victim)) + "/" + parseInt(Entity.getY(victim)) + "/" + parseInt(Entity.getZ(victim)) + "(" + Level.getBiomeName(Entity.getX(victim), Entity.getZ(victim)) + ")")
  }
}

function padding(num) {
  if (num < 10 && num >= 0) {
    return "0" + num
  } else {
    return num
  }
}

function getDimensionName(dim) {
  if (dim == 0) {
    return "主世界"
  } else if (dim == 1) {
    return "下界"
  } else if (dim == -1) {
    return "末地"
  } else {
    return "未知 (ID=" + dim + ")"
  }
}

function boolToText(bool) {
  if (bool) {
    return "是"
  } else {
    return "否"
  }
}

function getDifficultyName(diff) {
  return diffstr[diff]
}

function getGameModeName(gamemode) {
  if (gamemode == 0) {
    return "生存"
  } else if (gamemode == 1) {
    return "创造"
  } else if (gamemode == 2) {
    return "冒险"
  } else if (gamemode == 3) {
    return "旁观"
  } else {
    return "未知 (ID=" + gamemode + ")"
  }
}

function percentage(double) {
  return parseInt(double * 100) + "%"
}

function getBiomeDetail(x, z) {
  var b = null;
  if (Level.getBiome(x, z) == 0) {
    b = ["海洋", "墨鱼", "大量水", "末地遗迹，废弃矿井(暴露水中)"]
  }
  if (Level.getBiome(x, z) == 1) {
    b = ["草原", "兔子，马", "地势平坦多矿洞", "村庄，峡谷，末地遗迹，废弃矿井(高频)"]
  }
  if (Level.getBiome(x, z) == 2) {
    b = ["沙漠", "沙漠兔子", "地势平坦", "沙漠村庄，沙漠神庙，沙漠水井，末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 3) {
    b = ["峭壁(高山)", "蠹虫", "地势落差大", "露天地牢，末地遗迹(高频)"]
  }
  if (Level.getBiome(x, z) == 4) {
    b = ["森林", "无", "橡木居多", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 5) {
    b = ["针叶林", "狼", "地势平坦", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 6) {
    b = ["沼泽", "女巫，史莱姆", "大规模浅水", "女巫小屋，末地遗迹(高频)，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 7) {
    b = ["河流", "无", "QAQ不知道", "较狭窄，不足以判定"]
  }
  if (Level.getBiome(x, z) == 8) {
    b = ["下界生物群系", "下界生物", "大量岩浆流，岩浆海", "地狱要塞"]
  }
  if (Level.getBiome(x, z) == 9) {
    b = ["末路之地生物群系"/*没有你咬我啊(๑•ั็ω•็ั๑)*/, "末影龙", "虚空上方的空岛", "黑曜石柱，末地城，末地船"]
  }
  if (Level.getBiome(x, z) == 10) {
    b = ["冻洋", "无", "大面积浮冰", "无"]
  }
  if (Level.getBiome(x, z) == 11) {
    b = ["冻河", "无", "河流被浮冰覆盖", "无"]
  }
  if (Level.getBiome(x, z) == 12) {
    b = ["雪地", "雪地兔子", "地势平坦", "雪屋，末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 13) {
    b = ["雪山", "雪地兔子", "地势凸起", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 14) {
    b = ["蘑菇岛", "蘑菇牛", "菌丝覆盖土地", "末地遗迹(低频)，废弃矿井(高频)"]
  }
  if (Level.getBiome(x, z) == 15) {
    b = ["蘑菇海滩", "蘑菇牛", "菌丝覆盖土地", "较狭窄，不足以判定"]
  }
  if (Level.getBiome(x, z) == 16) {
    b = ["沙滩", "无", "海边沙子组成", "较狭窄，不足以判定"]
  }
  if (Level.getBiome(x, z) == 17) {
    b = ["沙漠山丘", "沙漠兔子", "地势突起", "沙漠水井，末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 18) {
    b = ["森林山丘", "无", "地势凸起，有天坑", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 19) {
    b = ["针叶林山丘", "狼", "地势凸起，有天坑", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 20) {
    b = ["峭壁边缘", "蠹虫", "高低落差极大", "末地遗迹(高频)，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 21) {
    b = ["热带雨林"/*我觉得叫热带雨林比丛林好听，你咬我啊(๑•ั็ω•็ั๑)*/, "豹猫", "茂密树林，多矿洞", "丛林神庙，末地遗迹，废弃矿井(低频)"]
  }
  if (Level.getBiome(x, z) == 22) {
    b = ["热带雨林山丘", "豹猫", "茂密树林，多矿洞", "丛林神庙，末地遗迹，废弃矿井(低频)"]
  }
  if (Level.getBiome(x, z) == 23) {
    b = ["热带雨林边缘", "豹猫", "茂密树林，多矿洞", "丛林神庙，末地遗迹，废弃矿井(低频)"]
  }
  if (Level.getBiome(x, z) == 24) {
    b = ["深海", "墨鱼，守卫者，远古守卫者", "亮度极低，海底地势平坦", "海底神殿，末地遗迹(水中)，废弃矿井(暴露水中)"]
  }
  if (Level.getBiome(x, z) == 25) {
    b = ["沙砾海滩", "无", "PE版是石头覆盖", "太狭窄，不足以判定"]
  }
  if (Level.getBiome(x, z) == 26) {
    b = ["冰冻海滩", "无", "QAQ不知道", "无"]
  }
  if (Level.getBiome(x, z) == 27) {
    b = ["桦木森林", "无", "地势平坦，多矿洞", "末地遗迹(高频)，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 28) {
    b = ["桦木森林山丘", "无", "地势凸起", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 29) {
    b = ["黑森林", "无", "树林隐天蔽日", "末地遗迹(低频)，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 30) {
    b = ["冷针叶林", "狼", "地势平坦", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 31) {
    b = ["冷针叶林山丘", "狼", "地势凸起", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 32) {
    b = ["大型针叶林", "狼", "地势平坦", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 33) {
    b = ["大型针叶林山丘", "狼", "地势凸起", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 34) {
    b = ["峭壁(高山)+", "蠹虫", "海拔高，地势较平坦", "末地遗迹(高频)，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 35) {
    b = ["热带草原", "无", "地势平坦，多矿洞", "村庄，末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 36) {
    b = ["热带高原", "无", "海拔高，四周落差大", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 37) {
    b = ["平顶山", "无", "海拔较高", "末地遗迹(低频)，废弃矿井(露天)"]
  }
  if (Level.getBiome(x, z) == 38) {
    b = ["平顶山高原 F", "无", "海拔高，四周落差大", "末地遗迹(低频)，废弃矿井(露天)"]
  }
  if (Level.getBiome(x, z) == 39) {
    b = ["平顶山高原", "无", "海拔高，四周落差大", "末地遗迹(低频)，废弃矿井(露天)"]
  }
  if (Level.getBiome(x, z) == 129) {
    b = ["向日葵草原"/*mojang什么意思呢，为什么和上一个生物群系ID差这么多呢(ง •̀_•́)ง*/, "兔子", "地势平坦", "村庄，末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 130) {
    b = ["沙漠 M", "沙漠兔子", "地势平坦", "沙漠湖泊，沙漠神庙，沙漠水井，沙漠村庄，末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 131) {
    b = ["峭壁(高山) M", "蠹虫", "沙砾覆盖高山", "末地遗迹(高频)，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 132) {
    b = ["繁花森林"/*好漂亮的说_(: _」∠)_*/, "无", "地势平坦", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 133) {
    b = ["针叶林 M", "狼", "地势较平坦", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 134) {
    b = ["沼泽 M", "女巫", "大规模浅水", "女巫小屋，末地遗迹(高频)，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 140) {
    b = ["冰刺之地"/*好少见的说_(: _」∠)_*/, "无", "巨大冰刺覆盖", "末地遗迹(低频)，废弃矿井(低频)"]
  }
  if (Level.getBiome(x, z) == 149) {
    b = ["热带雨林 M", "无", "地势较高", "丛林神庙，末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 151) {
    b = ["热带雨林边缘 M", "豹猫", "雨林边缘", "丛林神庙，末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 155) {
    b = ["桦木森林 M", "无", "地势较高，高桦木", "末地遗迹，废弃矿井(高频)"]
  }
  if (Level.getBiome(x, z) == 156) {
    b = ["桦木森林山丘 M", "无", "地势凸起", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 157) {
    b = ["黑森林 M", "无", "地势较高", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 158) {
    b = ["冷针叶林 M", "狼", "地势平坦(吧QAQ)", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 160) {
    b = ["红木森林", "无", "……", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 161) {
    b = ["红木森林山丘", "无", "……", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 162) {
    b = ["峭壁(高山)+ M", "蠹虫", "……", "末地遗迹(高频)，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 163) {
    b = ["热带草原 M", "无", "地势陡峭", "村庄，末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 164) {
    b = ["热带高原 M", "无", "地势凸起", "末地遗迹，废弃矿井"]
  }
  if (Level.getBiome(x, z) == 165) {
    b = ["平顶山（岩柱山变体）", "无", "巨大岩柱耸立", "末地遗迹，废弃矿井(露天)"]
  }
  if (Level.getBiome(x, z) == 166) {
    b = ["平顶山高原 F M"/*jsIDE这么写的QAQ，貌似是变种的变种*/, "无", "嗯……SM？QAQ", "末地遗迹，废弃矿井(露天)"]
  }
  if (Level.getBiome(x, z) == 167) {
    b = ["平顶山高原 M", "无", "地势凸起", "末地遗迹，废弃矿井(露天)"]
  }
  if (Level.getBiome(x, z) == -1) {
    b = ["未知生物群系", "未知", "未知", "未知"]
  }
  return b;
}


function modTick() {
  //生物群系信息js\nby百度贴吧@Cx翱翔cx
  t = Level.getTime()
  d = parseInt(t / 24000)
  x = Player.getX()
  y = Player.getY() - 1.619999885559082
  z = Player.getZ()
  dm = Player.getDimension()
  pe = Player.getEntity()
  SHIFT = Entity.isSneaking(pe)
  if (tip == 1) {
    ModPE.showTipMessage(
      " 游戏版本: " + ModPE.getMinecraftVersion() +
      " \n玩家: " + Player.getName(pe) + "(" + pe + ")" +
      " \n世界: <" + Level.getWorldName() + "\u00a7a\u00a7l/\u00a7r" + Level.getWorldDir() + "\u00a7r>" +
      " \n\u00a79语言: " + ModPE.getLanguage()
    )
  }
  else if (tip == 2) {
    ModPE.showTipMessage(
      " 时间: " + t + "(天数: " + d + ")" +
      " \u00a7e下雨: " + percentage(Level.getRainLevel()) +
      " \u00a7c闪电: " + percentage(Level.getLightningLevel()) +
      " \u00a72亮度: " + Level.getBrightness(x, y + 0.5, z) +
      " \n\u00a70模式: " + getGameModeName(Level.getGameMode()) +
      " \u00a7b难度: " + getDifficultyName(Level.getDifficulty()) +
      " \u00a7f生物群系: " + Level.getBiomeName(x, z) + "(" + Level.getBiome(x, z) + ")" +
      " \u00a7a草的颜色: " + Level.getGrassColor(x, z) +
      " \n\u00a7e看见天空: " + boolToText(Level.canSeeSky(x, y, z)) +
      " \u00a77脚下方块: " + Level.getTile(x, y - 0.5, z)
    )
  }
  else if (tip == 3) {
    ModPE.showTipMessage(
      " \u00a71X: " + parseInt(x) +
      " \u00a72Y: " + parseInt(y) +
      " \u00a73Z: " + parseInt(z) +
      " \u00a77疲劳: " + Player.getExhaustion() +
      " \u00a79饱和: " + Player.getSaturation() +
      " \u00a76饥饿: " + Player.getHunger() +
      " \n\u00a77经验: " + percentage(Player.getExp()) +
      " \u00a78等级: " + Player.getLevel() +
      " \u00a74血量: " + Entity.getHealth(pe) +
      " \n\u00a7f指向方块: \u00a7a((" + Player.getPointedBlockX() + " " + Player.getPointedBlockY() + " " + Player.getPointedBlockZ() + ") ID: " + Player.getPointedBlockId() + " 数据: " + Player.getPointedBlockData() + " 面: " + Player.getPointedBlockSide() + ")" +
      " \n\u00a7f手中物品: \u00a75(ID: " + Player.getCarriedItem() + " 数量: " + Player.getCarriedItemCount() + " 数据: " + Player.getCarriedItemData() + ")" +
      " \u00a76背包格: " + Player.getSelectedSlotId() +
      " \n\u00a7b可以飞行: " + boolToText(Player.canFly()) +
      " 正在飞行: " + boolToText(Player.isFlying()) +
      " \n\u00a79维度: " + getDimensionName(dm) +
      " \u00a78潜行: " + boolToText(Entity.isSneaking(pe))
    )
  }
  else if (tip == 4) {
    il = Player.getPointedBlockId()
    dl = Player.getPointedBlockData()
    ModPE.showTipMessage(
      " \u00a7f指向方块: \u00a7a((" + Player.getPointedBlockX() + " " + Player.getPointedBlockY() + " " + Player.getPointedBlockZ() + ") ID: " + Player.getPointedBlockId() + " 数据: " + Player.getPointedBlockData() + " 面: " + Player.getPointedBlockSide() + ")" +
      " \n\u00a79破坏时间: " + Block.getDestroyTime(il, dl) +
      " \u00a70摩擦系数: " + Block.getFriction(il, dl) +
      " \u00a7a渲染ID: " + Block.getRenderType(il)
    )
  }
  else if (tip == -1) {
    ModPE.showTipMessage(
      " (进阶数据)" +
      " \n\u00a71X: " + x +
      " \u00a72Y: " + y +
      " \u00a73Z: " + z +
      " \n\u00a74指向X: " + Player.getPointedVecX() +
      " 指向Y: " + Player.getPointedVecY() +
      " 指向Z: " + Player.getPointedVecZ() +
      " \n\u00a7cX速度: " + Entity.getVelX(pe) +
      " Y速度: " + Entity.getVelY(pe) +
      " Z速度: " + Entity.getVelZ(pe) +
      " \n\u00a78旋转角: " + Entity.getYaw(pe) +
      " \u00a7a俯视角: " + Entity.getPitch(pe)
    )
  }
  else if (tip == 5) {
    biome = getBiomeDetail(x, z)
    ModPE.showTipMessage(
      " 生物群系ID: \u00a74" + Level.getBiome(Player.getX(), Player.getZ()) +
      " \u00a7r生物群系名字: \u00a74" + biome[0] + "/" + Level.getBiomeName(x, z) +
      " \u00a7r特色生物: " + biome[1] +
      "\n结构特点: \u00a77" + biome[2] +
      "\n\u00a7r可能存在特殊结构: \u00a79" + biome[3]
    );
  }
  else if (tip == 6) {
    tickday = t % 24000
    hour = t / 1000
    hourday = parseInt((hour + 6) % 24)
    minute = t / (1000 / 60)
    minuteday = parseInt(minute % 60)
    realminute = t / 24000 * 20
    realhour = realminute / 60
    realsecond = (realminute * 60) % 60
    date = new Date()
    ModPE.showTipMessage(
      "\u00a7d现实时间: " + date.getFullYear() + "-" + padding(date.getMonth() + 1) + "-" + padding(date.getDate()) + " " + padding(date.getHours()) + ":" + padding(date.getMinutes()) + ":" + padding(date.getSeconds()) +
      "\n\u00a7f游戏时间: " + t + " (第" + d + "天 " + padding(hourday) + ":" + padding(minuteday) + ")" +
      "\n\u00a7a游玩计时: " + padding(parseInt(realhour)) + ":" + padding(parseInt(realminute % 60)) + ":" + padding(parseInt(realsecond)))
  } else if (tip == 7) {
    if (Level.isRemote()) {
      ModPE.showTipMessage(
        "\u00a7e服务器地址: " + Server.getAddress() +
        "\n\u00a7c端口: " + Server.getPort()
      )
    } else {
      ModPE.showTipMessage(
        "\u00a7e当前为本地世界"
      )
    }
  }
}

function useItem(x, y, z, itemId, blockId) {
  if (itemId == 345) {
    Server.sendChat("\u00a7cX: " + x + " \u00a7aY: " + y + " \u00a7bZ: " + z + " \u00a79维度: " + getDimensionName(Player.getDimension()))
  } else if (itemId == 347) {
    t = Level.getTime()
    d = parseInt(t / 24000)
    tickday = t % 24000
    hour = t / 1000
    hourday = parseInt((hour + 6) % 24)
    minute = t / (1000 / 60)
    minuteday = parseInt(minute % 60)
    realminute = t / 24000 * 20
    realhour = realminute / 60
    realsecond = (realminute * 60) % 60
    date = new Date()
    Server.sendChat(
      "\u00a7d现实时间: " + date.getFullYear() + "-" + padding(date.getMonth() + 1) + "-" + padding(date.getDate()) + " " + padding(date.getHours()) + ":" + padding(date.getMinutes()) + ":" + padding(date.getSeconds()) +
      "\n\u00a7f游戏时间: " + t + " (第" + d + "天 " + padding(hourday) + ":" + padding(minuteday) + ")" +
      "\n\u00a7a游玩计时: " + padding(parseInt(realhour)) + ":" + padding(parseInt(realminute % 60)) + ":" + padding(parseInt(realsecond)))
  }
}














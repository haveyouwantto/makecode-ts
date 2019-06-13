var simpleGUI = null;
var simpleGUI2 = null;
var sprint = false;
var x=(Player.getX())
var y=(Player.getY()-1.619999885559082)
var z=(Player.getZ())
var tip = 0
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
function newLevel()
{tip = 0
b=null
f=null//特色生物
g=null//特色结构
h=null//可能存在特殊结构
i=null
}
ctx.runOnUiThread(new java.lang.Runnable(
{
run: function() 
{
try
{
simpleGUI = new android.widget.PopupWindow();
simpleGUI2 = new android.widget.PopupWindow();
var layout = new android.widget.RelativeLayout(ctx);
var button = new android.widget.Button(ctx);
button.setText("I");//输入按钮的文字
 
button.setOnClickListener(new android.view.View.OnClickListener(
{
onClick: function(viewarg) 
{
tip++
clientMessage("选择了组别： §a"+tip)
if(tip==4&&SHIFT==true){tip=-1
clientMessage("现在在进阶组!")}
}
}
)
);
layout.addView(button);
 
simpleGUI.setContentView(layout);
simpleGUI.setWidth(90);//按钮的宽度
simpleGUI.setHeight(90);//按钮的高度
simpleGUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM,0,10);

//RIGHT表示在屏幕的方向，LEFT是左边
//BOTTOM是底部，TOP则是顶部，0是向横偏移0像素，10是向上偏移10个像素
}
catch(err)
{
print("Error: "+err);
}
} 
}
)
); 
function deathHook(murderer, victim)
{
if(victim==getPlayerEnt())
{
clientMessage("§4死亡位置: §a"+parseInt(Entity.getX(victim))+"/"+parseInt(Entity.getY(victim))+"/"+parseInt(Entity.getZ(victim))+"("+Level.getBiomeName(Entity.getX(victim),Entity.getZ(victim))+")")
}
}
function modTick(){
	//生物群系信息js\nby百度贴吧@Cx翱翔cx
if(Level.getBiome(x,z)== 0){
b="海洋";f="墨鱼";g="大量水";h="末地遗迹，废弃矿井(暴露水中)"
}
if(Level.getBiome(x,z)== 1){
b="草原";f="兔子，马" ;g="地势平坦多矿洞";h="村庄，峡谷，末地遗迹，废弃矿井(高频)"
}
if(Level.getBiome(x,z)== 2){
b="沙漠" ;f="沙漠兔子" ;g="地势平坦";h="沙漠村庄，沙漠神庙，沙漠水井，末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 3){
b="峭壁(高山)" ;f="蠹虫" ;g="地势落差大"

;h="露天地牢，末地遗迹(高频)"
}
if(Level.getBiome(x,z)== 4){
b="森林";f="无";g="橡木居多";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 5){
b="针叶林" ;f="狼";g="地势平坦";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 6){
b="沼泽" ;f="女巫，史莱姆";g="大规模浅水";h="女巫小屋，末地遗迹(高频)，废弃矿井"
}
if(Level.getBiome(x,z)== 7){
b="河流" ;f="无";g="QAQ不知道";h="较狭窄，不足以判定"
}
if(Level.getBiome(x,z)== 8){
b="下界生物群系" ;f="下界生物";g="大量岩浆流，岩浆海";h="地狱要塞"
}
if(Level.getBiome(x,z)== 9){
b="末路之地生物群系"/*没有你咬我啊(๑•ั็ω•็ั๑)*/ ;f="末影龙";g="虚空上方的空岛";h="黑曜石柱，末地城，末地船"
}
if(Level.getBiome(x,z)== 10){
b="冻洋" ;f="无";g="大面积浮冰";h="无"
}
if(Level.getBiome(x,z)== 11){
b="冻河" ;f="无";g="河流被浮冰覆盖";h="无"
}
if(Level.getBiome(x,z)== 12){
b="雪地" ;f="雪地兔子";g="地势平坦";h="雪屋，末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 13){
b="雪山" ;f="雪地兔子";g="地势凸起";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 14){
b="蘑菇岛" ;f="蘑菇牛";g="菌丝覆盖土地";h="末地遗迹(低频)，废弃矿井(高频)"
}
if(Level.getBiome(x,z)== 15){
b="蘑菇海滩" ;f="蘑菇牛";g="菌丝覆盖土地";h="较狭窄，不足以判定"
}
if(Level.getBiome(x,z)== 16){
b="沙滩" ;f="无";g="海边沙子组成";h="较狭窄，不足以判定"
}
if(Level.getBiome(x,z)== 17){
b="沙漠山丘" ;f="沙漠兔子";g="地势突起";h="沙漠水井，末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 18){
b="森林山丘" ;f="无";g="地势凸起，有天坑";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 19){
b="针叶林山丘" ;f="狼";g="地势凸起，有天坑";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 20){
b="峭壁边缘" ;f="蠹虫";g="高低落差极大";h="末地遗迹(高频)，废弃矿井"
}
if(Level.getBiome(x,z)== 21){
b="热带雨林"/*我觉得叫热带雨林比丛林好听，你咬我啊(๑•ั็ω•็ั๑)*/ ;f="豹猫";g="茂密树林，多矿洞";h="丛林神庙，末地遗迹，废弃矿井(低频)"
}
if(Level.getBiome(x,z)== 22){
b="热带雨林山丘" ;f="豹猫";g="茂密树林，多矿洞";h="丛林神庙，末地遗迹，废弃矿井(低频)"
}
if(Level.getBiome(x,z)== 23){
b="热带雨林边缘" ;f="豹猫";g="茂密树林，多矿洞";h="丛林神庙，末地遗迹，废弃矿井(低频)"
}
if(Level.getBiome(x,z)== 24){
b="深海" ;f="墨鱼，守卫者，远古守卫者";g="亮度极低，海底地势平坦";h="海底神殿，末地遗迹(水中)，废弃矿井(暴露水中)"
}
if(Level.getBiome(x,z)== 25){
b="沙砾海滩" ;f="无";g="PE版是石头覆盖";h="太狭窄，不足以判定"
}
if(Level.getBiome(x,z)== 26){
b="冰冻海滩" ;f="无";g="QAQ不知道";h="无"
}
if(Level.getBiome(x,z)== 27){
b="桦木森林" ;f="无";g="地势平坦，多矿洞";h="末地遗迹(高频)，废弃矿井"
}
if(Level.getBiome(x,z)== 28){
b="桦木森林山丘" ;f="无";g="地势凸起";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 29){
b="黑森林" ;f="无";g="树林隐天蔽日";h="末地遗迹(低频)，废弃矿井"
}
if(Level.getBiome(x,z)== 30){
b="冷针叶林" ;f="狼";g="地势平坦";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 31){
b="冷针叶林山丘" ;f="狼";g="地势凸起";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 32){
b="大型针叶林" ;f="狼";g="地势平坦";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 33){
b="大型针叶林山丘" ;f="狼";g="地势凸起";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 34){
b="峭壁(高山)+" ;f="蠹虫";g="海拔高，地势较平坦";h="末地遗迹(高频)，废弃矿井"
}
if(Level.getBiome(x,z)== 35){
b="热带草原" ;f="无";g="地势平坦，多矿洞";h="村庄，末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 36){
b="热带高原" ;f="无";g="海拔高，四周落差大";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 37){
b="平顶山" ;f="无";g="海拔较高";h="末地遗迹(低频)，废弃矿井(露天)"
}
if(Level.getBiome(x,z)== 38){
b="平顶山高原 F" ;f="无";g="海拔高，四周落差大";h="末地遗迹(低频)，废弃矿井(露天)"
}
if(Level.getBiome(x,z)== 39){
b="平顶山高原" ;f="无";g="海拔高，四周落差大";h="末地遗迹(低频)，废弃矿井(露天)"
}
if(Level.getBiome(x,z)== 129){
b="向日葵草原"/*mojang什么意思呢，为什么和上一个生物群系ID差这么多呢(ง •̀_•́)ง*/ ;f="兔子";g="地势平坦";h="村庄，末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 130){
b="沙漠 M" ;f="沙漠兔子";g="地势平坦";h="沙漠湖泊，沙漠神庙，沙漠水井，沙漠村庄，末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 131){
b="峭壁(高山) M" ;f="蠹虫";g="沙砾覆盖高山";h="末地遗迹(高频)，废弃矿井"
}
if(Level.getBiome(x,z)== 132){
b="繁花森林"/*好漂亮的说_(: _」∠)_*/ ;f="无";g="地势平坦";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 133){
b="针叶林 M" ;f="狼";g="地势较平坦";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 134){
b="沼泽 M" ;f="女巫";g="大规模浅水";h="女巫小屋，末地遗迹(高频)，废弃矿井"
}
if(Level.getBiome(x,z)== 140){
b="冰刺之地"/*好少见的说_(: _」∠)_*/ ;f="无";g="巨大冰刺覆盖";h="末地遗迹(低频)，废弃矿井(低频)"
}
if(Level.getBiome(x,z)== 149){
b="热带雨林 M" ;f="无";g="地势较高";h="丛林神庙，末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 151){
b="热带雨林边缘 M" ;f="豹猫";g="雨林边缘";h="丛林神庙，末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 155){
b="桦木森林 M" ;f="无";g="地势较高，高桦木";h="末地遗迹，废弃矿井(高频)"
}
if(Level.getBiome(x,z)== 156){
b="桦木森林山丘 M" ;f="无";g="地势凸起";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 157){
b="黑森林 M" ;f="无";g="地势较高";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 158){
b="冷针叶林 M" ;f="狼";g="地势平坦(吧QAQ)";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 160){
b="红木森林" ;f="无";g="……";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 161){
b="红木森林山丘" ;f="无";g="……";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 162){
b="峭壁(高山)+ M" ;f="蠹虫";g="……";h="末地遗迹(高频)，废弃矿井"
}
if(Level.getBiome(x,z)== 163){
b="热带草原 M" ;f="无";g="地势陡峭";h="村庄，末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 164){
b="热带高原 M" ;f="无";g="地势凸起";h="末地遗迹，废弃矿井"
}
if(Level.getBiome(x,z)== 165){
b="平顶山（岩柱山变体）" ;f="无";g="巨大岩柱耸立";h="末地遗迹，废弃矿井(露天)"
}
if(Level.getBiome(x,z)== 166){
b="平顶山高原 F M"/*jsIDE这么写的QAQ，貌似是变种的变种*/ ;f="无";g="嗯……SM？QAQ";h="末地遗迹，废弃矿井(露天)"
}
if(Level.getBiome(x,z)== 167){
b="平顶山高原 M" ;f="无";g="地势凸起";h="末地遗迹，废弃矿井(露天)"
}
if(Level.getBiome(x,z)==-1){
b="未知生物群系" ;f="未知";g="未知";h="未知"
}
t=(Level.getTime())
d=parseInt(t/24000)
x=(Player.getX())
y=(Player.getY()-1.619999885559082)
z=(Player.getZ())
xl=Player.getPointedBlockX()
yl=Player.getPointedBlockY()
zl=Player.getPointedBlockZ()
gm=(Level.getGameMode())
hp=(Entity.getHealth(Player.getEntity()))
ss=(Player.getSelectedSlotId())
xp=(Player.getExp())
lv=(Player.getLevel())
dm=(Player.getDimension())
id=(Player.getCarriedItem())
c=(Player.getCarriedItemCount())
dg=(Player.getCarriedItemData())
l=(Level.getBrightness(x,y+0.5,z))
rl=(Level.getRainLevel())
ll=(Level.getLightningLevel())
eh=(Player.getExhaustion())
hg=(Player.getHunger())
st=(Player.getSaturation())
gc=Level.getGrassColor(x,z)
df=Level.getDifficulty()
tl=Level.getTile(x,y-0.5,z)
pe=Player.getEntity()
il=Player.getPointedBlockId()
dl=Player.getPointedBlockData()
SHIFT=Entity.isSneaking(pe)
if(tip == 6)
{tip = 0}
if(tip == 1 ){
ModPE.showTipMessage(" "+ModPE.getMinecraftVersion()+" \n"+Player.getName(Player.getEntity())+"("+Player.getEntity()+") \n<"+Level.getWorldName()+"§a§l/§r"+Level.getWorldDir()+"§r> \n§9语言: "+ModPE.getLanguage())
}
if(tip==2)
{ModPE.showTipMessage(" 时间: "+t+"(天数: "+d+") §e下雨: "+rl+" §c闪电: "+ll+" §2亮度: "+l+"\n§0模式: "+gm+" §b难度: "+df+" §f生物群系: "+Level.getBiomeName(x,z)+"("+Level.getBiome(x,z)+") §a草的颜色: "+gc+" \n§e看见天空: "+Level.canSeeSky(x,y,z)+" §7脚下方块: "+tl)}
if(tip==3)
{ModPE.showTipMessage(" §1X: "+parseInt(x)+" §2Y: "+parseInt(y)+" §3Z: "+parseInt(z)+" §7疲劳: "+eh+" §9饱和: "+st+" §6饥饿: "+hg+" \n§7经验: "+xp+" §8等级: "+lv+" §4血量: "+hp+" \n§f指向方块: §a(("+xl+" "+yl+" "+zl+") ID: "+Player.getPointedBlockId()+" 数据: "+Player.getPointedBlockData()+" 面: "+Player.getPointedBlockSide()+") \n§f手中物品: §5(ID: "+id+" 数量: "+c+" 数据: "+dg+") §6背包格: "+ss+" §b可以飞行: "+Player.canFly()+" 正在飞行: "+Player.isFlying()+" \n§9维度: "+dm+" §8潜行: "+Entity.isSneaking(pe))}
if(tip==4)
{ModPE.showTipMessage(" 破坏时间: "+Block.getDestroyTime(il,dl)+" §0摩擦系数: "+Block.getFriction(il,dl)+" §a渲染ID: "+Block.getRenderType(il))}
if(tip==-1)
{ModPE.showTipMessage(" (进阶数据)\n§1X: "+x+" §2Y: "+y+" §3Z: "+z+" \n§4指向X: "+Player.getPointedVecX()+" 指向Y: "+Player.getPointedVecY()+" 指向Z: "+Player.getPointedVecZ()+" \n§cX速度: "+Entity.getVelX(pe)+" Y速度: "+Entity.getVelY(pe)+" Z速度: "+Entity.getVelZ(pe)+" \n §8旋转角: "+Entity.getYaw(pe)+" §a俯视角: "+Entity.getPitch(pe))}
if(tip==5)
{ModPE.showTipMessage("生物群系ID: §4"+Level.getBiome(Player.getX(),Player.getZ())+" §r生物群系名字: §4"+b+"/"+Level.getBiomeName(x,z)+" §r特色生物: "+f+"\n结构特点: §7"+g+" \n§r可能存在特殊结构: §9"+h);
  }}

















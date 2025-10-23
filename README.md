# __GI_UGC-AFK-SCRIPT__

> __名字懒得想了，就这样吧，谁叫GitHub仓库名称只让英文:p__

- __脚本基于 [`BetterGI`](https://github.com/babalae/better-genshin-impact) 编写__
- __使用「 一秒速通刷千星等级 」关卡进行自动刷取奇域经验，关卡GUID：`7094676912`__

### __使用教程__

> [!NOTE]
> __请在开始前先设置BetterGI快捷键，防止无法停止脚本__
> - __启动停止 BetterGI__
> - __停止当前脚本/独立任务__

> __以下为「 原神 」部分教程__

<a id="img1"></a>
  
- __找到所需关卡，并点击右上角的「 创建房间 」按钮__

![](https://raw.githubusercontent.com/FeiLingshu/GI_UGC-AFK-SCRIPT/refs/heads/resources/1.png)

<a id="img2"></a>

- __移动至准备区，确认关卡中只有1位玩家，然后点击右上角「 收起 」按钮__

![](https://raw.githubusercontent.com/FeiLingshu/GI_UGC-AFK-SCRIPT/refs/heads/resources/2.png)

<a id="img3"></a>

- __最终在该界面时即可使用「 BetterGI 」运行脚本__

![](https://raw.githubusercontent.com/FeiLingshu/GI_UGC-AFK-SCRIPT/refs/heads/resources/3.png)

> __以下为「 BetterGI 」部分教程__

- __在「 全自动 」-「 JS 脚本 」选项卡中，点击「 打开脚本目录 」按钮__

![](https://raw.githubusercontent.com/FeiLingshu/GI_UGC-AFK-SCRIPT/refs/heads/resources/4.png)

- __下载并在打开的文件夹中解压脚本文件（3个脚本文件应处于文件夹中，文件夹名称随意，请确认文件结构和图中相同）__

![](https://raw.githubusercontent.com/FeiLingshu/GI_UGC-AFK-SCRIPT/refs/heads/resources/5.png)

- __在「 全自动 」-「 调度器 」选项卡中，点击「 新增配置组 」按钮，添加一个任意名称的配置组__

![](https://raw.githubusercontent.com/FeiLingshu/GI_UGC-AFK-SCRIPT/refs/heads/resources/6.png)

- __点击刚刚创建的配置组标签，并选择「 添加 」-「 JS脚本 」，添加刚刚解压的JS脚本__

![](https://raw.githubusercontent.com/FeiLingshu/GI_UGC-AFK-SCRIPT/refs/heads/resources/7.png)

- __右键点击刚刚添加的JS脚本，选择「 修改JS脚本自定义配置 」，并设置两个游戏内快捷键的按键（进入房间按键可在「 [原神教程#3](#img3)图中右侧"房间"部分 」找到）（开始游戏按键可在「 [原神教程#2](#img2)图中右下角找到 」）__

![](https://raw.githubusercontent.com/FeiLingshu/GI_UGC-AFK-SCRIPT/refs/heads/resources/X.png)

- __运行脚本前，需手动启动BetterGI（重要！！！），也可以通过快捷键启动（如果不手动启动直接运行脚本，会由于BetterGI自动启动策略进入原神主界面检查，而目前BetterGI没有针对千星奇域做适配，所以该过程会卡住）__

![](https://raw.githubusercontent.com/FeiLingshu/GI_UGC-AFK-SCRIPT/refs/heads/resources/Z.png)

- __在配置组对应项目的选项卡右侧部分点击「 运行 」即可开始脚本执行（*：请尽量避免点击左侧连续执行，否则可能会由于BetterGI暂时无法识别千星奇域的主界面而卡住）__

![](https://raw.githubusercontent.com/FeiLingshu/GI_UGC-AFK-SCRIPT/refs/heads/resources/8.png)

> [!WARNING]
> __脚本运行中时间间隔为固定值，游戏运行过慢可能导致出现异常__
> __请先确认：__
> - __进入关卡房间过程中，耗时不超过1s__
> - __开始游戏后，在关卡内耗时不超过30s__
> - __关卡结束并结算时，点击返回大厅按钮后，大厅加载过程耗时不超过10s__
>
> ___务必在使用脚本前确认以上项目___

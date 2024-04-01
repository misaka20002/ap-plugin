
# 写写bug：
```
Changelog：
1、新增帮助：
   #派蒙绘图帮助
   #派蒙绘图帮助pro
   #派蒙绘图收藏帮助

2、增加更多控制，防止调皮的群友：
   #ap全局设置绘多图(开启|关闭)
   #ap全局设置更改绘图参数(开启|关闭)
   #派蒙(绘|画)图删除用户(绘|画)图(设置|参数)
   #派蒙(绘|画)图设置最大宽高(帮助)
```
```
git clone https://github.com/misaka20002/ap-plugin.git ./plugins/ap-plugin
```
* **#ap设置** 
  * 查看当前ap策略
* **#ap设置查水表** [ **开启**|**关闭** ]
  * 设置是否允许群员查水表
* **#ap设置通知主人** [ **开启**|**关闭** ]
  * 开启后，有人绘制违规图片时将通知主人
* **#ap** [ **全局** ] **设置** [ `群号`|**私聊** ] **次数** [ `数字`|**无限** ]
* **#ap** [ **全局** ] **设置** [ `群号`|**私聊** ] [ **个人cd**|**群聊cd**|**撤回时间** ] `数字`
* **#ap** [ **全局** ] **设置** [ `群号`|**私聊** ] [ **审核**|**撤回**|**封禁**|**绘多图**|**更改绘图参数** ] [ **开启**|**关闭** ]
  * 竖线表示不能共存，方括号中为可选内容(使用时不带方括号)
  * **全局**：此次配置对`所有群`生效
  * **群号**：指定群号，此次配置对`该群`生效
  * **私聊**：此次配置对`私聊`生效
  * ps:若未指定全局、群号、私聊，则此次配置对发送消息所在的`当前群`生效
  * **次数**：设置每人每日限额，即每日可绘图的张数。每日0点刷新
  * **个人cd**：每个人绘图之后再次使用绘图需要等待的时间，单位是秒
  * **群聊cd**：整个群聊内共享的cd,群内有人使用绘图之后该群内再次使用绘图需要等待的时间，单位是秒
  * **撤回时间**：指定发送绘制的图片后多久自动撤回，单位是秒，最大`120`
  * **审核**：图片发送前，先使用百度图片审核服务检测图片安全性
  * **撤回**：图片发送后，经过指定的时间之后自动撤回
  * **封禁**：开启后，将封禁试图使用屏蔽词绘图的用户
  * **绘多图**：开启后，可以绘制超过1张但不超过10张图片
  * **更改绘图参数**：开启后，允许用户更改自己的绘图参数
* **#ap** [ **添加**|**删除** ] **屏蔽词** 
* **#ap屏蔽词列表** 
* **#ap** [ **封禁**|**解封** ]  [ `qq号`|`@某人`]
  * 被封禁的用户无法使用ap插件的功能
* **#ap** 设置存本地[ **开启**|**关闭** ]
  * 开启后绘制的图片将保存在云崽resources/yuhuo/aipainting目录下，用于`查水表`等功能
* **#撤回**
  * 对机器人的消息回复此命令,以撤回该消息
* **#派蒙绘图帮助** [ **pro** ] 
* **#绘图设置最大宽高帮助**


<p align="center">
  <a href="https://docs.yunzai.art"><img src="./resources/readme/header.png" width="100%" height="100%" alt="mj-plugin"></a>
</p>

<div align="center">

# AP-PLUGIN

_🎉 基于 Yunzai-Bot 的 AI 绘图插件 🎉_

</div>

<span id="header"></span>

<p align="center">
  <img src="https://img.shields.io/badge/Nodejs-16.x+-6BA552.svg" alt="Nodejs">
  <img src="https://img.shields.io/badge/Yunzai_Bot-v3-red.svg" alt="NoneBot">
  <br>
  </a>
    <a href="https://qm.qq.com/q/RnQteOmD84">
    <img src="https://img.shields.io/badge/QQ%E7%BE%A4-%E7%8C%AB%E5%A8%98%E4%B9%90%E5%9B%AD-pink?style=flat-square" alt="QQ Chat Group">
  </a>
</p>

<p align="center">
  <a href="https://gitee.com/yhArcadia/ap-plugin">项目地址</a>
  ·
  <a href="#安装插件">开始使用</a>
  ·
  <a href="#配置接口">配置接口</a>
</p>

## 简介

AP-Plugin 是一款在 QQ 内快速调用[Stable Diffusion web UI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)提供的 API 接口进行多参数便捷 AI 绘图的[Yunzai-Bot](https://github.com/Le-niao/Yunzai-Bot)插件，除此之外也拥有多种图片处理功能，本插件功能不断拓展中，更多功能敬请期待……

<br>

## 安装插件

#### 1. 挂载至 Yunzai-Bot 目录

```
cd Yunzai-Bot
```

#### 2. 克隆本仓库至 plugins 目录

- 使用 Ghproxy（国内服务器推荐使用此方法）

```
git clone https://mirror.ghproxy.com/https://github.com/AiPreface/ap-plugin.git ./plugins/ap-plugin
```

- 使用 Github

```
git clone https://github.com/AiPreface/ap-plugin.git ./plugins/ap-plugin
```

#### 3. 安装依赖

```
pnpm install --filter=ap-plugin
```

#### 4. 重启 Yunzai

```
pnpm restart
```

<br><br>

## 配置接口

每个配置项独立对应不同功能，可根据需要按需配置：

<details>
<summary>展开/收起</summary>

|        需要配置的接口         |                                             用途                                              |                         配置文档                         |
| :---------------------------: | :-------------------------------------------------------------------------------------------: | :------------------------------------------------------: |
|     Stable Diffusion 接口     | 用于生产图片，相关功能：[绘图](#以文生图)，[以图生图](#以图生图)，[二次元的我](#二次元的我)等 | [文档链接](https://ap-plugin.com/Config/docs2) |
|        Real-CUGAN 接口        |                         用于图像超分，相关功能：[大清晰术](#大清晰术)                         | [文档链接](https://ap-plugin.com/Config/docs3) |
|       DeepDanbooru 接口       |             用于逆推图片 Tags，相关功能：[鉴赏](#鉴赏)，[二次元的我](#二次元的我)             | [文档链接](https://ap-plugin.com/Config/docs4) |
|     Anime Ai Detect 接口      |                 用于检测图像是否是 AI 制作的，相关功能：[鉴定图片](#鉴定图片)                 | [文档链接](https://ap-plugin.com/Config/docs5) |
| Anime Remove Background 接口  |                         用于去除图片背景，相关功能：[去背景](#去背景)                         | [文档链接](https://ap-plugin.com/Config/docs6) |
| White Box Cartoonization 接口 |                 用于将图片转换成动漫风格，相关功能：[图片动漫化](#图片动漫化)                 | [文档链接](https://ap-plugin.com/Config/docs7) |
|       百度图片审核服务        |                     用于检查图像是否合规，相关功能：[图像审核](#图像审核)                     | [文档链接](https://ap-plugin.com/Config/docs12) |

以上接口中中，Stable Diffusion 接口需要大量算力生成图像，成本相对较高，详见[关于绘图接口的相关说明](https://ap-plugin.com/Config/docs1)；百度图片审核服务可领取 10000 次免费额度，后续收费标准为 5 元 10000 次；除此二者外，其余接口均可免费部署于[Hugging Face](https://huggingface.co/)。所有接口请自行动手配置，ap-plugin 暂不自带任何接口，敬请谅解。

</details>

<br><br>

## 功能演示

#### 帮助

> 首次使用请发送**ap 帮助**查看可用指令

<br>

#### 以文生图

> 使用 Stable Diffusion 接口根据用户输入的 prompt 进行作图

<details>
<summary>展开/收起</summary>

可选参数：

- 图片方向：竖图，横图，方图（默认竖图 512×768，横图 768×512，方图 640×640）
- 采样方法：采样器 Euler a（指定采样器）
- 采样迭代步数：步数 60（值越高图像越精细）
- 种子：种子 468751975（用于生成相似图）
- 提示词相关性：提示词相关性 11（越高越自 ♂ 由）
- 指定接口：接口 2（如果你有多接口，指定接口作图）
- 批量绘制：5 张（批量绘制图片）

|     指令      |      回复      |                        示例                        |
| :-----------: | :------------: | :------------------------------------------------: |
| #绘图+`参数` | `图片`+`参数` | ![绘图](./resources/readme/%E7%BB%98%E5%9B%BE.jpg) |

<!-- |     指令      |      回复      |                        示例                        |
| :-----------: | :------------: | :------------------------------------------------: |
| #绘图+${参数} | [图片]+${参数} | ![绘图](./resources/readme/%E7%BB%98%E5%9B%BE.jpg) | -->

<!-- ![绘图](./resources/readme/%E7%BB%98%E5%9B%BE.jpg) -->

</details>

<br>

#### 以图生图

> 使用 Stable Diffusion 接口根据用户输入的 prompt 与图片进行作图

<details>
<summary>展开/收起</summary>

可选参数：

- 继承[以文生图](#以文生图)的所有参数
- 重绘幅度：重绘幅度 0.6（越高越接近 prompt 所描述）
- [图片]：带上你的图片（附带图片，引用图片与艾特用户均可）

<!-- |         指令         |      回复      |                                   示例                                   |
| :------------------: | :------------: | :----------------------------------------------------------------------: |
| #绘图+${参数}+[图片] | [图片]+${参数} | ![以图绘图](./resources/readme/%E4%BB%A5%E5%9B%BE%E7%BB%98%E5%9B%BE.jpg) | -->
|         指令         |      回复      |                                   示例                                   |
| :------------------: | :------------: | :----------------------------------------------------------------------: |
| #绘图+`参数`+`图片` | `图片`+`参数` | ![以图绘图](./resources/readme/%E4%BB%A5%E5%9B%BE%E7%BB%98%E5%9B%BE.jpg) |

</details>

<br>

#### 二次元的我

> 使用 Stable Diffusion 接口为用户生成各种属性的二次元人设，每天一种属性

<details>
<summary>展开/收起</summary>

可选参数：

- 二次元的我（不带前缀：随机获取属性生成图片）
- #二次元的我（带#号前缀：使用头像与随机获取的属性以图生图）
- %二次元的我（带%号前缀：使用 DeepDanbooru 接口(若可用，不可用与#号前缀相同)对头像进行逆推 Tags，结合随机属性生成图片）
- /二次元的我（带/号前缀：使用 DeepDanbooru 接口(若可用，不可用与无前缀相同)对头像进行逆推 Tags，生成图片）
- (全局)刷新二次元的我：刷新获取到的属性

<!-- |       指令        |      回复      |                                        示例                                         |
| :---------------: | :------------: | :---------------------------------------------------------------------------------: |
| ${前缀}二次元的我 | [图片]+${属性} | ![二次元的我](./resources/readme/%E4%BA%8C%E6%AC%A1%E5%85%83%E7%9A%84%E6%88%91.jpg) | -->
|       指令        |      回复      |                                        示例                                         |
| :---------------: | :------------: | :---------------------------------------------------------------------------------: |
| `前缀`二次元的我 | `图片`+`属性` | ![二次元的我](./resources/readme/%E4%BA%8C%E6%AC%A1%E5%85%83%E7%9A%84%E6%88%91.jpg) |

</details>

<br>

#### 大清晰术

> 使用 Real-CUGAN 接口对图片进行超分与降噪

<details>
<summary>展开/收起</summary>

可选参数：

- 超分：二重唱，三重唱，四重唱（对应 2 倍，3 倍，4 倍超分）
- 降噪：强力术式，中等术式，不变式，原式（等级越高，降噪越强）

<!-- |           指令           |      回复      |                                   示例                                   |
| :----------------------: | :------------: | :----------------------------------------------------------------------: |
| #大清晰术+${参数}+[图片] | [图片]+${参数} | ![大清晰术](./resources/readme/%E5%A4%A7%E6%B8%85%E6%99%B0%E6%9C%AF.jpg) |  -->
|           指令           |      回复      |                                   示例                                   |
| :----------------------: | :------------: | :----------------------------------------------------------------------: |
| #大清晰术+`参数`+`图片` | `图片`+`参数` | ![大清晰术](./resources/readme/%E5%A4%A7%E6%B8%85%E6%99%B0%E6%9C%AF.jpg) | 

</details>

<br>

#### 鉴赏

> 使用 DeepDanbooru 接口对图片进行逆推 Tags

<details>
<summary>展开/收起</summary>

<!-- |     指令     |      回复      |                        示例                        |
| :----------: | :------------: | :------------------------------------------------: |
| #鉴赏+[图片] | [图片]+${结果} | ![鉴赏](./resources/readme/%E9%89%B4%E8%B5%8F.jpg) | -->
![鉴赏](./resources/readme/%E9%89%B4%E8%B5%8F.jpg) 

</details>

<br>

#### 鉴定图片

> 使用 Anime Ai Detect 接口对图像进行检查是否为 AI 制作

<details>
<summary>展开/收起</summary>

<!-- |       指令       |  回复   |                                   示例                                   |
| :--------------: | :-----: | :----------------------------------------------------------------------: |
| #鉴定图片+[图片] | ${结果} | ![鉴定图片](./resources/readme/%E9%89%B4%E5%AE%9A%E5%9B%BE%E7%89%87.jpg) | -->
![鉴定图片](./resources/readme/%E9%89%B4%E5%AE%9A%E5%9B%BE%E7%89%87.jpg) 

**※：此功能为 AI 鉴定，结果并不一定精准，请理智辨别，造成任何纠纷与插件作者无关**

</details>

<br>

#### 去背景

> 使用 Anime Remove Background 接口对图像背景进行去除

<details>
<summary>展开/收起</summary>

<!-- |      指令      |  回复  |                             示例                              |
| :------------: | :----: | :-----------------------------------------------------------: |
| #去背景+[图片] | [图片] | ![去背景](./resources/readme/%E5%8E%BB%E8%83%8C%E6%99%AF.jpg) | -->
 ![去背景](./resources/readme/%E5%8E%BB%E8%83%8C%E6%99%AF.jpg) 

</details>

<br>

#### 图片动漫化

> 使用 White Box Cartoonization 接口对图片进行动漫化

<details>
<summary>展开/收起</summary>

<!-- |        指令        |  回复  |                                        示例                                         |
| :----------------: | :----: | :---------------------------------------------------------------------------------: |
| #图片动漫化+[图片] | [图片] | ![图片动漫化](./resources/readme/%E5%9B%BE%E7%89%87%E5%8A%A8%E6%BC%AB%E5%8C%96.jpg) | -->
![图片动漫化](./resources/readme/%E5%9B%BE%E7%89%87%E5%8A%A8%E6%BC%AB%E5%8C%96.jpg) 

</details>

<br>

#### 图像审核

> 使用百度图片审核服务进行图像审核，避免绘制违规图片导致机器人封禁

<details>
<summary>展开/收起</summary>

**※：在使用前请安装 baidu-aip-sdk 依赖**

```
pnpm add baidu-aip-sdk -w
```

<!-- |       指令       | 回复 |                        示例                        |
| :--------------: | :--: | :------------------------------------------------: |
| #ap 设置审核开启 | 开启 | ![审核](./resources/readme/%E5%AE%A1%E6%A0%B8.jpg) | -->
![审核](./resources/readme/%E5%AE%A1%E6%A0%B8.jpg) 

</details>

<br>

#### 卢浮宫

> 使用 Canvas 画板将赛璐珞风格动画截图或插画，转换成 One Last Kiss 封面风格

<details>
<summary>展开/收起</summary>

**※：在使用前请安装 canvas 依赖，此依赖无法在部分系统直接安装，相应安装方法咨询百度**

```
cnpm install canvas --canvas_binary_host_mirror=https://registry.npmmirror.com/-/binary/canvas
```

可选参数：

- 精细程度：精细，一般，稍粗，极粗，浮雕（五个只能选一个哦！）
- 降噪：带上此参数则开启，否则关闭
- 水印：加上「One Last Image」水印
- 初回：加上「One Last Image」彩色水印（仅开启水印情况下有效）
- Kiss：Kiss 滤镜
- 线迹轻重：80-126 之间
- 调子数量：20-200 之间

<!-- |          指令          |  回复  |                             示例                              |
| :--------------------: | :----: | :-----------------------------------------------------------: |
| #卢浮宫+`参数`+[图片] | [图片] | ![卢浮宫](./resources/readme/%E5%8D%A2%E6%B5%AE%E5%AE%AB.jpg) | -->
|          指令          |                             示例                              |
| :--------------------: | :-----------------------------------------------------------: |
| #卢浮宫+`参数`+`图片` |![卢浮宫](./resources/readme/%E5%8D%A2%E6%B5%AE%E5%AE%AB.jpg) |

</details>

<br>

#### 局部重绘

> 使用 Stable Diffusion 接口与 Canvas 画板对图片进行局部重绘操作

<details>
<summary>展开/收起</summary>

**※：在使用前请安装 canvas 依赖，此依赖无法在部分系统直接安装，相应安装方法咨询百度**

```
cnpm install canvas --canvas_binary_host_mirror=https://registry.npmmirror.com/-/binary/canvas
```

<!-- |                  指令                   |  回复  |                                   示例                                   |
| :-------------------------------------: | :----: | :----------------------------------------------------------------------: |
| #局部重绘+`关键词`+[原图]+[涂抹后的图片] | [图片] | ![局部重绘](./resources/readme/%E5%B1%80%E9%83%A8%E9%87%8D%E7%BB%98.jpg) | -->
|                  指令                   |                                   示例                                   |
| :-------------------------------------: |  :----------------------------------------------------------------------: |
| #局部重绘+`关键词`+`原图`+`涂抹后的图片` | ![局部重绘](./resources/readme/%E5%B1%80%E9%83%A8%E9%87%8D%E7%BB%98.jpg) |

</details>

<br>


#### 搜图

> 使用 Ascii2d / SauceNAO / IqDB / TraceMoe / EHentai / Yandex 搜索相似图片

<details>
<summary>展开/收起</summary>

可选参数：

- 阈值(50-99): 用于指定相似度

 ![搜图](./resources/readme/%E6%90%9C%E5%9B%BE.jpg)  

</details>

<br>

## Todo

- [x] 云端同步与共享预设
- [x] 接入百度，有道翻译（Arcadia）
- [x] 图片局部重绘
- [x] 多搜索引擎搜图
- [x] 设置个人默认绘图参数
- [x] 动漫人物识别
- [x] 更严谨的 API 鉴权方式

## 致谢

[AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)：stable-diffusion-webui 项目  
[秋葉 aaaki](https://space.bilibili.com/12566101/)：电子佛祖，赛博菩萨  
[itorr/one-last-image](https://github.com/itorr/one-last-image)：一个优雅的卢浮宫风格化图片生成器  
以及huggingface平台的优秀项目们：
[Real-CUGAN](https://huggingface.co/spaces/DianXian/Real-CUGAN)、[DeepDanbooru_string](https://huggingface.co/spaces/NoCrypt/DeepDanbooru_string)、[anime-ai-detect](https://huggingface.co/spaces/saltacc/anime-ai-detect)、[anime-remove-background](https://huggingface.co/spaces/skytnt/anime-remove-background) 、[White-box-Cartoonization](https://huggingface.co/spaces/hylee/White-box-Cartoonization)、[img-to-music](https://huggingface.co/spaces/fffiloni/img-to-music)

## 声明

此项目仅用于学习交流，请勿用于非法用途

### 爱发电

如果你喜欢这个项目，请不妨点个 Star🌟，这是对开发者最大的动力  
当然，你可以对我爱发电赞助，呜咪~❤️

<details>
<summary>展开/收起</summary>

<p>
  </a>
    <img src="./resources/readme/%E7%88%B1%E5%8F%91%E7%94%B5.jpg">
  </a>
</p>

</details>

## 我们

<a href="https://github.com/yhArcadia/ap-plugin/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yhArcadia/ap-plugin" />
</a>

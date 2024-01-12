import plugin from '../../../lib/plugins/plugin.js';
import common from '../../../lib/common/common.js';
import yaml from 'yaml'
import fs from 'fs'
import path from 'path'
import Config from "../components/ai_painting/config.js";
import { Parse } from '../components/apidx.js';

const Path = process.cwd();
const Plugin_Name = 'ap-plugin'
const Plugin_Path = path.join(Path, 'plugins', Plugin_Name)
const collection_yaml = `${Plugin_Path}/config/config/collection.yaml`


export class paimonpainthelp extends plugin {
  constructor() {
    super({
      name: '派蒙绘图帮助',
      dsc: '派蒙绘图帮助',
      event: 'message',
      priority: 999,
      rule: [
        {
          reg: '^#派蒙(绘|画)图帮助',
          fnc: 'paimon_paint_help',
        },
        {
          reg: '^#派蒙(绘|画)图删除用户(绘|画)图(设置|参数)',
          fnc: 'paimon_paint_delete_users_setting',
          permission: 'master'
        },
        {
          reg: '^#派蒙(绘|画)图设置最大宽高(帮助)?',
          fnc: 'paimon_set_setting_max_WidthAndHeight',
          permission: 'master'
        },
        {
          reg: '^#派蒙(绘|画)图(加入|添加|查看|删除)?收藏(加入|添加|查看|删除)?(帮助)?',
          fnc: 'paimon_paint_collection'
        },
      ]
    })
    init_collection()
  }


  /** ^#派蒙(绘|画)图帮助[pro] */
  async paimon_paint_help(e) {
    let input_v = e.msg.replace(/^#派蒙(绘|画)图帮助/, '').trim()
    let msg1 = '小呆毛AI绘图指令：\n建议全都加个tag:loli,\n（算力由小呆毛的小pc提供）' +
      ''
    let msg2 = `原铁粥萝莉：
  #绘图<lora:paimon:1>,white hair,loli,
  #绘图<lora:paimon2:1>,white hair,loli,
  #绘图<lora:Nahida:1>,
  #绘图<lora:nahida2:1>,white hair,1girl,
  #绘图<lora:klee2:1>,blonde hair,
  #绘图<lora:qiqi2:1>,loli,
  #绘图<lora:diona2:1>,loli,
  #绘图<lora:sayu2:1>,loli,
  #绘图<lora:yaoyao2:1>,
  #绘图<lora:hook:1>,blonde hair,1girl,
  #绘图<lora:bailu2:1>,
  #绘图<lora:铃兰:1>,
  #绘图<lora:kirara:1>,
  #绘图<lora:Furina:1>,loli,furina \(genshin impact\),`
    let msg2_1_1 = `可莉服装自定义：
  #绘图<lora:klee:0.9>,loli,klee \(genshin impact\),bloomers, brown gloves, knee boots, cabbie hat, red coat, scarf, backpack
  #绘图<lora:klee:0.9>,loli,klee \(blossoming starlight\) \(genshin impact\),bloomers, black gloves, kneehighs, mary janes, witch hat, red skirt, white shirt, shawl, waist apron, bag`
    let msg2_2 = `原神大合集：
  #绘图<lora:genshinfull:1>,[ 萝莉: kleedef, nahidadef, sayudef, yaoyaodef, dionadef, qiqidef, doridef, 久岐忍: kukishinobudef, 荧: luminedef, 菲谢尔&皮肤: fischldef, fischlein, 刻晴&皮肤: keqingdef, keqingopulent, 丽莎&皮肤: lisadef, lisasobriquet, 雷电将军: raidenshogundef, 八重神子: yaemikodef, 九条裟罗: kujousaradef, 北斗: beidoudef, 甘雨: ganyudef, 神里绫华&皮肤: kamisatoayakadef, kamisatoayakaspring, 申鹤: shenhedef, 优菈: euladef, 罗莎莉亚: rosariadef, 莱依拉: layladef, 妮露: niloudef, 心海: kokomidef, 夜兰: yelandef, 莫娜: monadef, 芭芭拉&皮肤: barbaradef, barbarasum, 坎蒂丝: candacedef, 科莱: colleidef, 珐露珊: faruzandef, 琴团长&皮肤: jeanfavonian, jeanseabreeze, 砂糖: sucrosedef, 香菱: xianglingdef, 迪希雅: dehyadef, 宵宫: yoimiyadef, 胡桃: hutaodef, 辛焱: xinyandef, 安柏: amber5star, 烟绯: yanfeidef, 诺艾尔&皮肤: noelledef, noellekfc, 云堇: yunjindef, 凝光&皮肤: ningguangdef, ningguangorc, ]`
    let msg3 = `和泉纱雾+山田妖精：
  #绘图<lora:Eromanga_all_resized:0.73>,izumi sagiri,
  #绘图<lora:Eromanga_all_resized:0.8>,yamada elf,
不当哥-真寻酱：
  #绘图<lora:onimai_mahiro:1>,
龙女仆-康纳：
  #绘图<lora:SaiKanna:1>,imkanna,`
    let msg3_1 = `点兔：
  #绘图<lora:Gochuumon_all_resized:0.7>,kafuu chino,
  #绘图<lora:Gochuumon_all_resized:0.7>,natsu megumi,
  #绘图<lora:Gochuumon_all_resized:0.7>,jouga maya,
萝王的工作：
  #绘图<lora:Ryuuou no Oshigoto!_all:0.7>,hinatsuru ai,
  #绘图<lora:Ryuuou no Oshigoto!_all:0.7>,charlotte izoard,
  #绘图<lora:Ryuuou no Oshigoto!_all:0.7>,mizukoshi mio,
虚拟主播:
  #绘图<lora:<lora:gura:1>,loli,`
    let msg3_2 = `碧蓝档案：
  #绘图<lora:arona:1>,loli,
  #绘图<lora:takanashiHoshino:1>,loli,
  #绘图<lora:sora>,loli,
  #绘图<lora:Kokona:1>,loli,kokona,
公主连结-镜华、可可萝：
  #绘图<lora:kyouka:1>,loli,
  #绘图<lora:kokkoro:1>,loli,`
    let msg3_2_1 = `碧蓝档案cherino服装自定义：
  #绘图<lora:cherino:1>,loli,cherino-fi, hello,shako cap, white jacket, white coat, uniform, white gloves, white shorts, black pantyhose, fur-trimmed shoes, fur-trimmed boots,
  #绘图<lora:cherino:1>,loli,cherino-fi, halo, cherinosummer-fi, halo, school swimsuit, white swimsuit, open kimono, pink kimono,`
    let msg3_2_2 = `魔法少女-伊莉雅服装自定义：
  魔法少女#绘图<lora:illyasviel:0.7>,loli,aaillya, long hair, two side up, hair ornament, small breasts, magical girl, cape, yellow ascot, pink dress, sleeveless, detached sleeves, white gloves, white skirt, pink thighhighs,
  校服#绘图<lora:illyasviel:0.7>,loli,aaillya, long hair, beret, white headwear, small breasts, school uniform, neck ribbon, white shirt, collared shirt, short sleeves, black skirt,
  刺客#绘图<lora:illyasviel:0.7>,loli,aaillya, small breasts, hood up, skull mask, torn scarf, black scarf, bare shoulders, short jumpsuit, arm wrap, single thighhigh, black thighhighs,
  吾王#绘图<lora:illyasviel:0.7>,loli,aaillya, ponytail, sidelocks, hair bow, black bow, small breasts, detached collar, bare shoulders, armor, strapless dress, white dress, detached sleeves, gauntlets,
  野兽模式#绘图<lora:illyasviel:0.7>,loli,aaillya, long hair, fake animal ears, jingle bell, red ribbon, hair ornament, small breasts, tail, fur collar, black leotard, clothing cutout, center opening, animal hands, black gloves, paw gloves, navel, black thighhighs, elbow gloves,`
    let msg3_2_3 = `碧蓝航线-拉菲服装自定义：
  日常#绘图<lora:laffey:0.7>,loli,aalaffey, long hair, collarbone, white shirt, white camisole, off shoulder, pink jacket, open clothes, long sleeves, pleated skirt, red skirt, white thighhighs,
  浴服#绘图<lora:laffey:0.7>,loli,bblaffey, japanese clothes, print kimono, blue kimono, floral print, long sleeves, wide sleeves, sleeves past wrists, sash, obi,
  校服#绘图<lora:laffey:0.7>,loli,cclaffey, long hair, beret, blue choker, school uniform, white sailor collar, yellow bowtie, bare shoulders, blue shirt, puffy sleeves, wrist cuffs, navel, pleated skirt, blue skirt, white thighhighs,
  私服#绘图<lora:laffey:0.7>,loli,ddlaffey, long hair, white pantyhose, plaid, midriff, plaid skirt, detached sleeves, navel, pleated skirt, collarbone, bare shoulders, crop top, ribbon choker, black choker, white shirt, pink skirt, black bow,
  花嫁#绘图<lora:laffey:0.7>,loli,eelaffey, smile, long hair, white dress, wedding dress, strapless, bare shoulders, white gloves, collarbone, ribbon choker, blue flower,`
    let msg3_2_9 = `碧蓝档案大合集：
  #绘图<lora:bluearchivefull1-000006:1>,[ yuzudef, yuukadef, yoshimidef, wakamodef, uidef, tsurugidef, tsukuyodef, tsubakidef, tokidef, saoridef, miyudef, mikadef, maridef, kokonadef, koharudef, shizukodef, shirokodef, shiguredef, serinadef, serikadef, senadef, sayadef, sakurakodef, sakidef, nonomidef, nerudef, natsudef, nagisadef, mutsukidef, momokadef, momoidef, moedef, miyakodef, misakidef, minedef, mimoridef, midoridef, michirudef, megudef, mashirodef, marinadef, makidef, koyukidef, kotoridef, kazusadef, kayokodef, karindef, kannadef, kahodef, kaededef, junkodef, izunadef, izumidef, irohadef, ioridef, hoshinodef, hiyoridef, hinatadef, hinadef, himaridef, hifumidef, hibikidef, hasumidef, harunadef, harukadef, haredef, hanakodef, hanaedef, fuukadef, fubukidef, eimidef, chisedef, chinatsudef, chihirodef, cherinodef, azusadef, ayanedef, atsukodef, asunadef, arudef, akaridef, airidef, shundef, arisdef, akodef, akanedef, ]`
    let msg3_3 = `日在校园-桂心：
  #绘图<lora:KokoroKatsura:0.7>,KokoroKatsura,
献上爆焰-小米：
  #绘图<lora:Bakuen_KomekkoV2:0.7>,komekko,child,
刀剑神域-希莉卡：
  #绘图<lora:silica2:1>,
莉可丽丝-胡桃：
  #绘图<lora:lycoris_hutao2:1>,blonde hair,
萝莉的时间-凛
  #绘图<lora:KodomoNoJikan_kokonoe rin:0.7>,kokonoe rin,8k,masterpiece,absurdres,anime,`
    let msg4 = `通用：
  #绘图masterpiece,loli,cat tail,
  #绘图masterpiece,loli,2girls,
  #绘图(baby, child body:1.5),
  #绘图一个小女孩在天空下绘画`
    let msg5 = `画师/作品风格：
  <lora:kantoku_v1:0.9>,
  <lora:gape:0.6>,`
    let msg6 = `额外指令：
  #pt列表
  #lora列表
  #派蒙绘图帮助分段
  #派蒙绘图收藏
  管理员指令：#派蒙绘图帮助pro`
    let msg9 = `管理员功能：
  #ap帮助
  #ap管理帮助
  #ap设置
  #ap查看全局默认参数
  #ap设置负面.*
  #ap设置正面.*
  #ap全局设置(开启|关闭)
  #ap全局设置绘多图(开启|关闭)
  #ap全局设置更改绘图参数(开启|关闭)
  #ap(全局|本群|我的)词云
  #派蒙绘图收藏帮助
  #派蒙绘图设置最大宽高帮助
  #派蒙绘图删除用户绘图设置帮助`
    let msg9_1 = `其他功能：
  #取图链
  #图片差分
  #ap(开启|关闭)简洁模式
  #(ap)?设置使用(sd|db)鉴赏图片
  #(ap)?设置鉴赏模型.*
  #(ap)?设置大清晰术算法(1|2)
  #(ap)?设置二次元的我卡片(开启|关闭)
  #(ap)?设置违规图片展示方式(1|2|3|4)
  #ap(不)?屏蔽艾特
  #?(关闭|开启)匹配Lora
  #?(取消|停止)(绘图|绘画)`
    let current_group_policy = await Parse.parsecfg(e)
    let msgx
    if ((e.isMaster || current_group_policy.apMaster.indexOf(e.user_id)) && (input_v === 'pro' || input_v === 'p' || input_v === 'm')) {
      msgx = await common.makeForwardMsg(e, [msg6, msg9, msg9_1], `#派蒙绘图帮助m`)
    } else if (input_v === 'f' || input_v === '分段' || input_v === '分') {
      msg1 = msg1.split(/\n/).filter(Boolean).map(item => item.trim())
      msg2 = msg2.split(/\n/).filter(Boolean).map(item => item.trim())
      msg2_1_1 = msg2_1_1.split(/\n/).filter(Boolean).map(item => item.trim())
      msg2_2 = msg2_2.split(/\n/).filter(Boolean).map(item => item.trim())
      msg3 = msg3.split(/\n/).filter(Boolean).map(item => item.trim())
      msg3_1 = msg3_1.split(/\n/).filter(Boolean).map(item => item.trim())
      msg3_2 = msg3_2.split(/\n/).filter(Boolean).map(item => item.trim())
      msg3_2_1 = msg3_2_1.split(/\n/).filter(Boolean).map(item => item.trim())
      msg3_2_2 = msg3_2_2.split(/\n/).filter(Boolean).map(item => item.trim())
      msg3_2_3 = msg3_2_3.split(/\n/).filter(Boolean).map(item => item.trim())
      msg3_2_9 = msg3_2_9.split(/\n/).filter(Boolean).map(item => item.trim())
      msg3_3 = msg3_3.split(/\n/).filter(Boolean).map(item => item.trim())
      msg4 = msg4.split(/\n/).filter(Boolean).map(item => item.trim())
      msg5 = msg5.split(/\n/).filter(Boolean).map(item => item.trim())
      msg6 = msg6.split(/\n/).filter(Boolean).map(item => item.trim())

      msgx = await common.makeForwardMsg(e, [...msg1, ...msg2, ...msg2_1_1, ...msg2_2, ...msg3, ...msg3_1, ...msg3_2, ...msg3_2_1, ...msg3_2_2, ...msg3_2_3, ...msg3_2_9, ...msg3_3, ...msg4, ...msg5, ...msg6], `#派蒙绘图帮助f`)
    } else {
      msgx = await common.makeForwardMsg(e, [msg1, msg2, msg2_1_1, msg2_2, msg3, msg3_1, msg3_2, msg3_2_1, msg3_2_2, msg3_2_3, msg3_2_9, msg3_3, msg4, msg5, msg6], `派蒙绘图帮助`)
    }
    e.reply(msgx);
    return true;
  }

  /** ^#派蒙(绘|画)图删除用户(绘|画)图(设置|参数) */
  async paimon_paint_delete_users_setting(e) {
    let input_v = e.msg.replace(/^#派蒙(绘|画)图删除用户(绘|画)图(设置|参数)/, '').trim()
    if (input_v) {
      let msg1 = `删除所有用户回复设置，所有用户将重新使用默认配置。用户设置的优先级高于默认设置，删除后用户可重新设置。`
      let msg_show = `#ap查看(全局)默认参数`
      let msg1_1 = `请注意你知道你在做什么:\n#派蒙绘图删除用户绘图设置`
      let msgx = await common.makeForwardMsg(e, [msg1, msg_show, msg1_1], `ap删除所有用户设置`);
      return e.reply(msgx, false)
    }
    let parse_path
    try {
      parse_path = `${Plugin_Path}/config/config/parse.yaml`
    } catch (err) {
      return e.reply('目前还没用用户设置哦', false)
    }
    const data = yaml.parse(fs.readFileSync(parse_path, 'utf-8'))
    let users = 0
    for (const key in data) {
      if ((key != 'default')) {
        users++
        delete data[key]
      }
    }
    fs.writeFileSync(parse_path, yaml.stringify(data), 'utf8')
    return e.reply(`已经删除${users}个用户设置，所有用户将使用默认配置。\n#ap查看(全局)默认参数`, true)
  }

  /** ^#派蒙(绘|画)图(加入|添加|查看|删除)?收藏(加入|添加|查看|删除)?(帮助)? */
  async paimon_paint_collection(e) {
    if (!fs.existsSync(collection_yaml)) {
      writeYaml(collection_yaml, [])
    }
    let data = readYaml(collection_yaml)
    // 如果YAML文件是空的，那么data变量将为null。在这种情况下，如果尝试使用data.push(str)、data.indexOf(str)，将导致Cannot read properties of null (reading 'push')错误。为了解决这个问题，我们可以添加一些条件来检查data是否为null，并在为null时初始化它。
    if (!data) {
      data = [];
    }
    let input_match = e.msg.match(/^#派蒙(绘|画)图(加入|添加|查看|删除)?收藏(加入|添加|查看|删除)?(帮助)?([\s\S]*)/)
    input_match[5] = input_match[5].trim()
    // 如果有引用则使用引用
    if (e.source) {
      if (input_match[5]) {
        return e.reply(`喵？请输入#派蒙绘图收藏帮助；人家不知道你要收藏的是“引用回复”还是：“${input_match[5]}”`)
      }
      let quote_reply;
      if (e.isGroup) {
        quote_reply = (await e.group.getChatHistory(e.source.seq, 1))
          .pop()?.message;
      } else {
        quote_reply = (await e.friend.getChatHistory(e.source.time, 1))
          .pop()?.message;
      }
      if (quote_reply) {
        for (let val of quote_reply) {
          if (val.type == "text") {
            input_match[5] = val.text.trim()
            break;
          }
        }
      }
    }
    // 如果有引用则使用引用-END
    if (!input_match) {
      return e.reply(`.match()错误QAQ\n请输入#派蒙绘图收藏帮助`) // text.match() 如果有换行符则返回null，如果text.match(/../m)多行匹配的话，也就匹配到第一行。
    }
    if (!input_match[5]) {
      let msg1 = '派蒙绘图咒语收藏：'
      let msg9 = `添加收藏请#派蒙绘图添加收藏[文本]`
      let msg10 = `删除收藏请#派蒙绘图删除收藏[文本]`
      let msg11 = `也可以使用引用回复`
      let chunk = [];
      chunk.push(msg1);
      chunk = chunk.concat(data);
      let chunk_is_master = chunk
      chunk_is_master.push(msg9);
      chunk_is_master.push(msg10);
      chunk_is_master.push(msg11);
      let msgx
      if (e.isMaster) msgx = await common.makeForwardMsg(e, chunk_is_master, `派蒙绘图收藏-m`);
      else msgx = await common.makeForwardMsg(e, chunk, `派蒙绘图收藏`);
      return e.reply(msgx, false)
    } else if ((input_match[2] == '加入' || input_match[2] == '添加' || input_match[3] == '加入' || input_match[3] == '添加') && e.isMaster) {
      data.push(input_match[5])
      writeYaml(collection_yaml, data)
      return e.reply(`收藏已添加：${input_match[5]}`)
    } else if ((input_match[2] == '删除' || input_match[3] == '删除') && e.isMaster) {
      let index = data.indexOf(input_match[5])
      if (index > -1) {
        data.splice(index, 1)
        writeYaml(collection_yaml, data)
        return e.reply(`收藏已删除：${input_match[5]}`)
      } else {
        return e.reply(`收藏不存在：${input_match[5]}`)
      }
    } else e.reply(`喵？请输入#派蒙绘图收藏帮助`)
  }

  /** ^#派蒙(绘|画)图设置最大宽高(帮助)? */
  async paimon_set_setting_max_WidthAndHeight(e) {
    let input_v = e.msg.replace(/^#派蒙(绘|画)图设置最大宽高(帮助)?/, '').trim()
    let setting = await Config.getSetting();
    if (!input_v) {
      let msg1 = `限制调用接口的最大宽高，防止爆显存，输入的数字需要为8的倍数。`
      let msg2 = `限制如下：\n#绘图、#ap设置默认宽度/高度[num]、#以图绘图、二次元的我、图片处理、ControlNet；\n若tag指令：#绘图女孩,2048×2048 超过设置的最大值的话，会自动转为使用全局默认参数绘图`
      let msg_show = `当前最大宽高：${setting.max_WidthAndHeight} 像素`
      let msg1_1 = `#派蒙绘图设置最大宽高768`
      let msgx = await common.makeForwardMsg(e, [msg1, msg2, msg_show, msg1_1], `派蒙绘图设置最大宽高帮助`);
      return e.reply(msgx, false)
    }
    if (input_v % 8 == 0) {
      setting.max_WidthAndHeight = parseInt(input_v);
      Config.setSetting(setting);
      return e.reply(`最大宽高设置已设置为${input_v}！`)
    } else {
      return e.reply('输入的数字需要为8的倍数，详情#派蒙绘图设置最大宽高帮助')
    }
  }





}

/** 读取YAML文件 */
function readYaml(filePath) {
  return yaml.parse(fs.readFileSync(filePath, 'utf8'))
}

/** 写入YAML文件 */
function writeYaml(filePath, data) {
  fs.writeFileSync(filePath, yaml.stringify(data), 'utf8')
}

/** 更新YAML文件 */
async function updateConfig(key, value) {
  const data = readYaml(Config_PATH)
  data[key] = value
  writeYaml(Config_PATH, data)
  return data
}

/** 创建collection.yaml */
function init_collection() {
  if (!fs.existsSync(collection_yaml)) {
    writeYaml(collection_yaml, [])
  }
}

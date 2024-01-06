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
          reg: '^#派蒙(绘|画)图(加入|添加|查看|删除)?收藏(加入|添加|查看|删除)?(帮助)?(.*)$',
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
  #绘图<lora:klee:1>,loli,
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
    let msg2_1 = `原神大合集：
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
  #绘图<lora:cherino:1>,shako cap,white hair,loli,
公主连结-镜华、可可萝：
  #绘图<lora:kyouka:1>,loli,
  #绘图<lora:kokkoro:1>,loli,`
    let msg3_2_1 = `碧蓝档案大合集：
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
    let msg5 = `画师风格：
  <lora:kantoku_v1:0.9>,`
    let msg6 = `额外指令：
  #pt列表
  #lora列表
  #派蒙绘图帮助pro
  #派蒙绘图收藏`
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
    if ((e.isMaster || current_group_policy.apMaster.indexOf(e.user_id)) && (input_v === 'pro' || input_v === 'm')) {
      msgx = await common.makeForwardMsg(e, [msg1, msg2, msg2_1, msg3, msg3_1, msg3_2, msg3_2_1, msg3_3, msg4, msg5, msg6, msg9, msg9_1], `派蒙绘图帮助-m`)
    } else {
      msgx = await common.makeForwardMsg(e, [msg1, msg2, msg2_1, msg3, msg3_1, msg3_2, msg3_2_1, msg3_3, msg4, msg5, msg6], `派蒙绘图帮助`)
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

  /** ^#派蒙(绘|画)图(加入|添加|查看|删除)?收藏(加入|添加|查看|删除)?(帮助)?(.*)$ */
  async paimon_paint_collection(e) {
    if (!fs.existsSync(collection_yaml)) {
      writeYaml(collection_yaml, [])
    }
    let data = readYaml(collection_yaml)
    // 如果YAML文件是空的，那么data变量将为null。在这种情况下，如果尝试使用data.push(str)、data.indexOf(str)，将导致Cannot read properties of null (reading 'push')错误。为了解决这个问题，我们可以添加一些条件来检查data是否为null，并在为null时初始化它。
    if (!data) {
      data = [];
    }
    let input_match = e.msg.trim().match(/^#派蒙(绘|画)图(加入|添加|查看|删除)?收藏(加入|添加|查看|删除)?(帮助)?(.*)$/)
    if (!input_match[5]) {
      let msg1 = '派蒙绘图收藏：'
      let msg9 = `添加收藏请#派蒙绘图添加收藏xxxx`
      let msg10 = `删除收藏请#派蒙绘图删除收藏xxxx`
      let chunk = [];
      chunk.push(msg1);
      chunk = chunk.concat(data);
      let chunk_is_master = chunk
      chunk_is_master.push(msg9);
      chunk_is_master.push(msg10);
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
      let msg2 = `限制如下：\n#ap设置默认宽度/高度[num]\n以图绘图、二次元的我、图片处理、ControlNet；\n若tag指令：#绘图女孩,2048×2048 超过设置的最大值的话，会自动转为使用全局默认参数绘图`
      let msg_show = `当前最大宽高设置：${setting.max_WidthAndHeight} 像素`
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
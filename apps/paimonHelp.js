import plugin from '../../../lib/plugins/plugin.js';
import common from '../../../lib/common/common.js';
import yaml from 'yaml'
import fs from 'fs'
import path from 'path'
import Config from "../components/ai_painting/config.js";

const Path = process.cwd();
const Plugin_Name = 'ap-plugin'
const Plugin_Path = path.join(Path, 'plugins', Plugin_Name)


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
          reg: '^#(派蒙)?(绘|画)图设置最大宽高(帮助)?',
          fnc: 'paimon_set_setting_max_WidthAndHeight',
          permission: 'master'
        },
      ]
    })
  }


  /** ^#派蒙(绘|画)图帮助[pro] */
  async paimon_paint_help(e) {
    let input_v = e.msg.replace(/^#派蒙(绘|画)图帮助/, '').trim()
    let msg1 = '小呆毛AI绘图指令：\n建议全都加个tag:loli,\n（算力由小呆毛的小pc提供）' +
      ''
    let msg2 = `原铁萝莉：
  #绘图<lora:paimon:1>,loli,paimon gi,
  #绘图<lora:Nahida3:1>,
  #绘图<lora:Char-Genshin-Klee-V1:1>,loli,
  #绘图<lora:yaoyao2-000008:1>,loli,
  #绘图<lora:Char-Genshin-Furina:1>,furina \(genshin impact\),loli,
萝王的工作：
  #绘图<lora:Ryuuou no Oshigoto!_all:0.7>, hinatsuru ai,
  #绘图<lora:Ryuuou no Oshigoto!_all:0.7> charlotte izoard,
  #绘图<lora:Ryuuou no Oshigoto!_all:0.7> mizukoshi mio,`
    let msg3 = `和泉纱雾+妖精：
  #绘图<lora:Eromanga_all_resized:0.73> izumi sagiri,
  #绘图<lora:Eromanga_all_resized:0.8> yamada elf,
真寻酱：
  #绘图<lora:onimai_mahiro:1>,
龙女仆-康纳：
  #绘图<lora:SaiKanna:1>,imkanna,`
    let msg3_1 = `点兔：
  #绘图<lora:Gochuumon_all_resized:0.7>,kafuu chino,
  #绘图<lora:Gochuumon_all_resized:0.7> natsu megumi,
  #绘图<lora:Gochuumon_all_resized:0.7> jouga maya,
碧蓝档案：
  #绘图<lora:chara-arona-v1:1>,loli,
  #绘图<lora:takanashiHoshinoV3:1>,loli,
  #绘图<lora:soraV1>,loli,
  #绘图<lora:KokonaBA-10:1>,loli,kokona,`
    let msg3_2 = `公主连结：
  #绘图<lora:kyouka_v1:1>,loli,
  #绘图<lora:kokkoro_v1:1>,loli,
日在校园-桂心：
  #绘图<lora:KokoroKatsura:0.7>,KokoroKatsura,
献上爆焰-小米：
  #绘图<lora:Bakuen_KomekkoV2:0.7>, komekko,child,
萝莉的时间-凛
  #绘图<lora:KodomoNoJikan_kokonoe rin:0.7>, kokonoe rin,8k,masterpiece,absurdres,anime,`
    let msg4 = `通用：
  #绘图masterpiece,loli,cat tail,
  #绘图masterpiece,loli,2girls,
  #绘图一个小女孩在天空下绘画`
    let msg5 = `画师风格：
  <lora:kantoku_v1:0.9>,`
    let msg6 = `额外指令：
  #pt列表
  #lora列表`
    let msg9 = `管理员功能：
  #ap帮助
  #ap设置
  #ap管理帮助
  #ap设置负面.*
  #ap设置正面.*
  #ap全局设置(开启|关闭)
  #ap全局设置绘多图(开启|关闭)
  #ap(开启|关闭)简洁模式
  #(ap)?设置使用(sd|db)鉴赏图片
  #(ap)?设置鉴赏模型.*
  #(ap)?设置大清晰术算法(1|2)
  #(ap)?设置二次元的我卡片(开启|关闭)
  #(ap)?设置违规图片展示方式(1|2|3|4)
  #ap(不)?屏蔽艾特
  #?(关闭|开启)匹配Lora
  #?ap(全局|本群|我的)词云
  #?(取消|停止)(绘图|绘画)
  #派蒙绘图设置最大宽高帮助
  #派蒙绘图删除用户绘图设置帮助`
    let msgx
    if (e.isMaster && input_v === 'pro') {
      msgx = await common.makeForwardMsg(e, [msg1, msg2, msg3, msg3_1, msg3_2, msg4, msg5, msg6, msg9], `tts语音帮助-m`)
    } else {
      msgx = await common.makeForwardMsg(e, [msg1, msg2, msg3, msg3_1, msg3_2, msg4, msg5, msg6], `tts语音帮助`)
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

  /** ^#(派蒙)?(绘|画)图设置最大宽高(帮助)? */
  async paimon_set_setting_max_WidthAndHeight(e) {
    let input_v = e.msg.replace(/^#(派蒙)?(绘|画)图设置最大宽高(帮助)?/, '').trim()
    let setting = await Config.getSetting();
    if (!input_v) {
        let msg1 = `限制调用接口的最大宽高，防止爆显存，输入的数字需要为8的倍数`
        let msg_show = `当前最大宽高设置：${setting.max_WidthAndHeight}\n`
        let msg1_1 = `#派蒙绘图设置最大宽高2048`
        let msgx = await common.makeForwardMsg(e, [msg1, msg_show, msg1_1], `派蒙绘图设置最大宽高帮助`);
        return e.reply(msgx, false)
    }
    if (input_v % 8 == 0) {
        setting.max_WidthAndHeight = input_v;
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
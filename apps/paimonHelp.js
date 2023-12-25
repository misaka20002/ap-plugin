import plugin from '../../../lib/plugins/plugin.js';
import common from '../../../lib/common/common.js';

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
  #绘图masterpiece,loli,2girls,`
        let msg5 = `画师风格：
  <lora:kantoku_v1:0.9>,`
        let msg6 = `额外指令：
  #pt列表
  #lora列表`
        let msg9 = `管理员功能：
  #ap帮助
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
  #?(取消|停止)(绘图|咏唱|绘画|绘世|绘制)`
        let msgx
        if (e.isMaster && input_v === 'pro') {
            msgx = await common.makeForwardMsg(e, [msg1, msg2, msg3, msg3_1, msg3_2, msg4, msg5, msg6, msg9], `tts语音帮助-m`)
        } else {
            msgx = await common.makeForwardMsg(e, [msg1, msg2, msg3, msg3_1, msg3_2, msg4, msg5, msg6], `tts语音帮助`)
        }
        e.reply(msgx);
        return true;
    }




}

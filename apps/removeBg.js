/*
 * @Author: 0卡苏打水
 * @Date: 2023-01-04 19:44:45
 * @LastEditors: misaka20002 40714502+misaka20002@users.noreply.github.com
 * @LastEditTime: 2024-10-06 00:58:48
 * @FilePath: \Yunzai-Bot\plugins\ap-plugin\apps\remove_bg.js
 * @Description: 去除图片背景
 * 
 * Copyright (c) 2023 by 渔火Arcadia 1761869682@qq.com, All Rights Reserved. 
 */
import plugin from '../../../lib/plugins/plugin.js'
import Config from '../components/ai_painting/config.js'
import fetch from 'node-fetch'
import axios from 'axios'
import { parseImg } from '../utils/utils.js'

const _path = process.cwd();
let ap_cfg = await Config.getcfg()
const URL = ap_cfg.remove_bg
let FiguretypeUser = {}
let getImagetime = {}

export class RemoveBackground extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'AP-图像去背景',
            /** 功能描述 */
            dsc: '图像去背景',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1009,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^#?(去背景|抠图|扣图)$',
                    /** 执行方法 */
                    fnc: 'AnimeRemoveBackground'
                },
                {
                    /** 命令正则匹配 */
                    reg: '^.*$',
                    /** 执行方法 */
                    fnc: 'getImage',
                    log: false
                }
            ]
        })
    }

    async AnimeRemoveBackground(e) {
        if (!URL)
            return await e.reply("请先配置去背景所需API，配置教程：https://ap-plugin.com/Config/docs6")
        //将URL处理成API格式
        const API = 'https://' + URL.split('/')[4] + '-anime-remove-background.hf.space/api/queue/'

        if (FiguretypeUser[e.user_id]) {
            e.reply('当前有任务在列表中排队，请不要重复发送，去背景完成后会自动发送结果，如果长时间没有结果，请等待1分钟再试', false, { at: true, recallMsg: 15 })
            return true
        }
        e = await parseImg(e)

        if (this.e.img) {
            e.reply('正在为图像去背景，请稍候...', false, { at: true, recallMsg: 15 })
            FiguretypeUser[e.user_id] = setTimeout(() => {
                if (FiguretypeUser[e.user_id]) {
                    delete FiguretypeUser[e.user_id];
                }
            }, 60000);
            let start = new Date()
            let img = await axios.get(e.img[0], {
                responseType: 'arraybuffer'
            });
            let base64 = Buffer.from(img.data, 'binary')
                .toString('base64');
            let hash = await getHash(e);
            let response = null
            response = await axios.post(
                API + `push/`,
                {
                    'fn_index': 1,
                    'data': [
                        'data:image/jpeg;base64,' + base64
                    ],
                    'action': 'predict',
                    'session_hash': hash
                },
                {
                    timeout: 60000 // 设置超时时间为60秒
                }
            )
            let statushash = response.data.hash
            await new Promise((resolve) => setTimeout(resolve, 1000));
            let res = await axios.post(
                API + 'status/',
                {
                    'hash': statushash
                },
                {
                    timeout: 10000 // 设置超时时间为10秒
                }
            )
            let status = res.data.status
            let count_RB_times = 0;
            while (status == 'PENDING' && count_RB_times < 600) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                res = await axios.post(
                    API + 'status/',
                    {
                        'hash': statushash
                    },
                    {
                        timeout: 10000 // 设置超时时间为10秒
                    }
                )
                status = res.data.status
                count_RB_times++;
            }
            if (status != 'COMPLETE') {
                if (count_RB_times >= 600)
                    logger.error("[AP-抠图]错误：等待超时10分钟。")
                else
                    logger.error("[AP-抠图]错误：\n", res.data)
            }
            let end = new Date()
            let time = ((end.getTime() - start.getTime()) / 1000).toFixed(2)
            e.reply(`耗时${time}s，正在发送结果...`, false, { at: true, recallMsg: 5 })
            res.data.data.data[1] = res.data.data.data[1].replace(/^data:image\/png;base64,/, "")
            let buffer = Buffer.from(res.data.data.data[1], 'base64')
            await e.reply({ ...segment.image(buffer), origin: true }, true)
            delete FiguretypeUser[e.user_id];
            return true
        } else {
            e.reply('请在60s内发送需要去背景的图片~', true);
            getImagetime[e.user_id] = setTimeout(() => {
                if (getImagetime[e.user_id]) {
                    e.reply('已超时，请再次发送命令~', true);
                    delete getImagetime[e.user_id];
                }
            }, 60000);
            return false;
        }
    }
    async getImage(e) {
        if (!this.e.img) {
            return false;
        }
        if (getImagetime[e.user_id]) {
            clearTimeout(getImagetime[e.user_id]);
            delete getImagetime[e.user_id];
        } else {
            return false;
        }
        let result = await this.AnimeRemoveBackground(e);
        if (result) {
            return true;
        }
    }
}

async function getHash(e) {
    let hash = '';
    let chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 10; i++) {
        hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
}
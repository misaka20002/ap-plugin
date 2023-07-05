/*
 * @Author: 0卡苏打水
 * @Date: 2023-01-03 22:16:25
 * @LastEditors: 苏沫柒 3146312184@qq.com
 * @LastEditTime: 2023-02-19 13:09:24
 * @FilePath: \Yunzai-Bot\plugins\ap-plugin\apps\get_lora.js
 * @Description: 
 * 
 * Copyright (c) 2023 by 渔火Arcadia 1761869682@qq.com, All Rights Reserved. 
 */
import plugin from '../../../lib/plugins/plugin.js'
import axios from 'axios'
import Config from '../components/ai_painting/config.js';
import Log from '../utils/Log.js';
import { chNum2Num } from '../utils/utils.js';

const _path = process.cwd();

export class GetLora extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: 'AP-查看预设',
            /** 功能描述 */
            dsc: '查看预设',
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 1009,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^#Lora列表.*$',
                    /** 执行方法 */
                    fnc: 'getLora'
                }
            ]
        })
    }

    async getLora(e) {
        // 取默认接口
        let apcfg = await Config.getcfg()
        if (apcfg.APIList.length == 0) {
            e.reply('当前暂无可用接口')
            return true
        }
        let index = apcfg.usingAPI
        let apiobj = apcfg.APIList[index - 1]

        let response
        try {
            response = await _(apiobj)
        } catch (err) {
            Log.e(err)
            // if (err.code == 'ERR_BAD_REQUEST') {
            //     return e.reply(`接口${index}：${apiobj.remark} ：无访问权限。请发送\n#ap设置接口${index}密码+你的密码\n来配置或更新密码（命令不带加号）`)
            // }
            if (err.response.data.detail == 'Not Found') {
                return e.reply(`接口${index}：${apiobj.remark} ：没有可用的Lora接口`)
            }
            return e.reply('拉取失败')
        }
        if (response.status != 200) {
            return e.reply('拉取失败')
        }
        let data = response.data
        if (!data) {
            e.reply('拉取失败')
            return false
        }
        // 去除数组中的''元素
        data = data.filter(x => { return x != '' })


        let page = 1 // 指定第几页的预设
        let keyword = '' // 指定检索的关键词 
        let regExp = /^#Lora列表(.*?)(第(\d+)页)?$/
        e.msg = chNum2Num(e.msg, { regExp: '第(\[一二三四五六七八九十零百千万亿\]\+\?)页\$' }) // 将中文数字替换为阿拉伯数字
        let ret = regExp.exec(e.msg)

        // 取用户指定的页数和关键词
        page = ret[3] || 1
        keyword = ret[1] || ''
        Log.i(page, keyword)

        // 遍历data中的元素，将data[i].name存入
        let lora_list = []
        for (let val of data) {
            lora_list.push(val.name)
        }

        // 筛选出包含关键词的lora
        if (keyword) {
            lora_list = lora_list.filter(x => { return x.includes(keyword) })
        }

        if (lora_list.length == 0)
            return e.reply(`当前接口还没有添加${keyword ? `包含关键词【${keyword}】的` : ""}Lora文件哦`)

        // 计算预设页数（99条每页）
        let page_count = Math.ceil(lora_list.length / 99);
        if (page > page_count)
            return e.reply(`当前接口中${keyword ? `包含关键词【${keyword}】` : ""}的Lora共${page_count}页哦`);

        // 取出指定的一页预设
        let selected_page = [];
        selected_page = lora_list.slice((page - 1) * 99, page * 99);
        // Log.i(selected_page, selected_page.length)

        // 构建合并消息数组
        let data_msg = [];
        // 首条说明信息
        let first_message = [`${keyword ? `包含关键词【${keyword}】的` : ""}Lora列表，共${lora_list.length}条`]
        if (page_count > 1)
            first_message = [`${keyword ? `包含关键词【${keyword}】的` : ""}Lora列表，第${page}/${page_count}页，共${lora_list.length}条。您可发送\n#Lora列表${keyword}第1页\n#Lora列表${keyword}第2页\n……\n来查看对应页\n`]
        data_msg.push({
            message: first_message,
            nickname: Bot.nickname,
            user_id: Bot.uin,
        });

        // 处理每一条pt
        let i = 1 + (page - 1) * 99
        for (let val of selected_page) {
            let filename = val.replace(/\.[^/.]+$/, "")
            data_msg.push({
                message: `${i++} \n├预设名称：【${val}】\n└使用手势：<lora:${filename}:1>`,
                nickname: Bot.nickname,
                user_id: Bot.uin,
            });
        }

        // 发送消息
        let send_res = null;
        if (e.isGroup)
            send_res = await e.reply(await e.group.makeForwardMsg(data_msg));
        else send_res = await e.reply(await e.friend.makeForwardMsg(data_msg));
        if (!send_res) {
            e.reply("消息发送失败，可能被风控~");
        }
        return true;
    }
}
async function _(BIh1) {
    let API = BIh1['url'];
    if (!API.endsWith('/')) {
        API += '/';
    }
    let options = {
        headers: {
            'accept': 'application/json'
        }
    };
    if (BIh1['account_password'] && BIh1['account_id']) {
        options.headers['Authorization'] = `Basic ${Buffer.from(BIh1['account_id'] + ':' + BIh1['account_password'], 'utf8').toString('base64')}`
        options.headers['User-Agent'] = `AP-Plugin`
    }
    return await axios.get(API + `sdapi/v1/loras`, options);
};
/*
 * @Author: 渔火Arcadia  https://github.com/yhArcadia
 * @Date: 2022-12-24 18:06:52
 * @LastEditors: 渔火Arcadia
 * @LastEditTime: 2022-12-24 21:53:22
 * @FilePath: \Yunzai-Bot\plugins\ap-plugin\apps\admin.js
 * @Description: ap管理
 * 
 * Copyright (c) 2022 by 渔火Arcadia 1761869682@qq.com, All Rights Reserved. 
 */
export class Admin extends plugin {
    constructor() {
        super({
            name: "AiPainting管理",
            dsc: "AiPainting管理",
            event: "message",
            priority: 5000,
            rule: [
                // {
                //     reg: "^#?ap帮助$",
                //     fnc: "help",
                // },
            ],
        });
    }
    async help(e) {
        return await e.reply('还没写呢，先来这里看吧：https://www.wolai.com/tiamcvmiaLJLePhTr4LAJE')
    }
}
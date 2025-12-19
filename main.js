/// <reference path="../bettergi.d.ts" />
(async function () {
    const version = "https://github.com/FeiLingshu/GI_UGC-AFK-SCRIPT/releases/tag/v999.9.9-Add%232";
    log.info("/>_ 正在获取更新...");
    try {
        const headers = JSON.stringify({
            "User-Agent": "Mozilla/5.0"
        });
        const response = await http.request("GET", "https://hub.gitmirror.com/raw.githubusercontent.com/FeiLingshu/GI_UGC-AFK-SCRIPT/refs/heads/resources/version", null, headers);
        if (response.status_code === 200) {
            if (version == response.body.trim()) {
                log.info("/>_ {true}", "目前已是最新版本");
            } else {
                log.warn("/>_ 存在版本更新：{url}", response.body.trim());
            }
        } else {
            log.error("/>_ 获取更新失败：{code}", response.status_code);
        }
    } catch (error) {
        if (error.message.includes("不允许请求此URL")) {
            log.error("/>_  获取更新失败：URL不在允许列表中");
        } else if (error.message.includes("JS HTTP权限")) {
            log.error("/>_ 获取更新失败：未启用JS-HTTP权限");
        } else {
            log.error("/>_ 获取更新失败：{message}", error.message);
        }
    }
    let debugtest1 = settings.checkValue_TEST;
    let debugtest2 = settings.inputValue_TEST;
    if (debugtest1 == true && typeof debugtest2 === typeof (void 0)) {
        log.error("/>_ DEBUG中断...");
        return;
    }
    let gamename = settings.inputValue_OCR1;
    let gameguid = settings.inputValue_OCR1_Fix;
    let gameplayer = settings.inputValue_OCR2;
    if (typeof gamename === typeof (void 0)) {
        gamename = "";
    }
    if (typeof gameguid === typeof (void 0)) {
        gameguid = "";
    }
    if (typeof gameplayer === typeof (void 0)) {
        gameplayer = "";
    }
    if ((gameguid == "" || !(/^\d+$/.test(gameguid))) || (gameplayer == "" || gameplayer < 1 || gameplayer > 8)) {
        log.error("/>_ 请先JS配置中正确填写关卡信息参数");
        return;
    }
    let key_1 = settings.inputValue_1;
    let key_2 = settings.inputValue_2;
    if (typeof key_1 === typeof (void 0) || typeof key_2 === typeof (void 0)) {
        log.error("/>_ 请先JS配置中填写快捷键参数");
        return;
    }
    if (key_1 == "" || key_2 == "") {
        log.error("/>_ 请先JS配置中填写快捷键参数");
        return;
    }
    const regex = /^[a-zA-Z0-9`~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/;
    if (!regex.test(key_1) || !regex.test(key_2)) {
        log.error("/>_ JS配置中的快捷键参数不合法，请设置为以下范围：\n                   - F1~F12\n                   - A~Z\n                   - 0~9\n                   - 所有键盘上可见的符号按键");
        return;
    }
    if (key_1 == key_2) {
        log.error("/>_ JS配置中的两个快捷键参数不允许设置为相同值");
        return;
    }
    let key_3 = settings.inputValue_3;
    if (typeof key_3 === typeof (void 0)) {
        key_3 = 0;
    }
    if (key_3 == "") {
        key_3 = 0;
    }
    if (!(/^\d+$/.test(key_3)) || key_3 < 0) {
        log.error("/>_ 请先JS配置中正确填写执行次数限制参数");
        return;
    }
    key_3 = Number(key_3);
    if (key_3 == 0) {
        log.info("/>_ 脚本执行次数限制已读取：{times}", "无限制");
    } else {
        log.info("/>_ 脚本执行次数限制已读取：{times}次", key_3);
    }
    let times = 0;
    while (true) {
        let result_state = [false, false, false];
        let check_state = false;
        let timer = new Date(0);
        let count_1 = 0;
        const regex = new RegExp(`准备区1.*?${gameplayer}`);
        while (true) {
            keyPress(key_1.toUpperCase());
            await sleep(1000);
            let captureRegion_2 = captureGameRegion();
            let resList_2 = captureRegion_2.findMulti(RecognitionObject.ocrThis);
            for (let i = 0; i < resList_2.count; i++) {
                let res = resList_2[i];
                if (times == 0) {
                    if (gamename != "" && res.text.includes(gamename)) {
                        result_state[0] = true;
                    }
                    if (res.text.includes(gameguid)) {
                        result_state[0] = true;
                    }
                    if (regex.test(res.text)) {
                        result_state[1] = true;
                    }
                } else {
                    result_state[0] = true;
                    result_state[1] = true;
                }
                if (res.text.includes("开始游戏")) {
                    result_state[2] = true;
                }
                res.Dispose();
            }
            captureRegion_2.Dispose();
            if (times == 0 && check_state == false) {
                if (result_state[0] & result_state[1]) {
                    check_state = true;
                    log.info("/>_ 关卡名称&状态已识别");
                } else {
                    count_1++
                    if (count_1 == 5) {
                        check_state = true;
                        log.warn("/>_ 关卡名称识别失败，正在尝试重新识别（{retry}/5）...", count_1);
                        log.warn("/>_ 未识别到对应关卡：\n                   - 关卡名称 = {name}", gamename);
                        log.warn("/>_ 脚本将尽力尝试继续运行，如遇问题请终止脚本并重新尝试");
                    } else {
                        log.warn("/>_ 关卡名称识别失败，正在尝试重新识别（{retry}/5）...", count_1);
                        continue;
                    }
                }
            }
            if (result_state[2]) {
                timer = Date.now();
                break;
            } else {
                count_1++;
                if (count_1 == 10) {
                    if (times == 0) {
                        log.error("/>_ 未能进入关卡开始游戏，请确认下方步骤是否完成：\n                   - 创建关卡房间\n                   - 进入准备区\n                   - 确保房间中仅有1位玩家\n                   - 返回游戏主界面");
                    } else {
                        log.error("/>_ 由于未知原因，未能进入关卡开始游戏");
                    }
                    return;
                } else {
                    continue;
                }
            }
        }
        await sleep(200);
        keyPress(key_2.toUpperCase());
        await sleep(1000);
        let state = false;
        let count_2 = 0;
        while (true) {
            let captureRegion_3 = captureGameRegion();
            let resList_3 = captureRegion_3.findMulti(RecognitionObject.ocrThis);
            for (let i = 0; i < resList_3.count; i++) {
                let res = resList_3[i];
                if (res.text.includes("返回大厅")) {
                    await sleep(200);
                    captureRegion_3.clickTo(Math.round(res.x + res.Width / 2), Math.round(res.y + res.Height / 2));
                    state = true;
                    break;
                }
                res.Dispose();
            }
            if (state) {
                times++;
                log.info("/>_ 关卡已完成（次数：{times}，耗时：{time}s）", times, ((Date.now() - timer) / 1000).toFixed(3));
                if (key_3 != 0 && times == key_3) {
                    await sleep(1000);
                    log.info("/>_ 脚本运行次数已达上限（{times}次）", key_3);
                    return;
                } else {
                    break;
                }
            } else {
                captureRegion_3.clickTo(Math.round(captureRegion_3.width / 2), Math.round(captureRegion_3.height - captureRegion_3.height / 4));
            }
            captureRegion_3.Dispose();
            count_2++;
            if (count_2 == 60) {
                log.error("/>_ 由于未知原因，未能检测到游戏结束行为");
                return;
            }
            await sleep(1000);
        }
    }
})();
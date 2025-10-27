(async function () {
    const key_1 = settings.inputValue_1;
    const key_2 = settings.inputValue_2;
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
    let result_page = [false, false];
    let result_state = [false, false, false];
    let captureRegion_1 = captureGameRegion();
    let resList_1 = captureRegion_1.findMulti(RecognitionObject.ocrThis);
    for (let i = 0; i < resList_1.count; i++) {
        let res = resList_1[i];
        if (res.text.includes("房间")) {
            result_page[0] = true;
        }
        if (/1.+8/.test(res.text) && res.text.includes("准备就绪")) {
            result_page[1] = true;
        }
    }
    if (result_page[1]) {
        log.info("/>_ 游戏主界面已识别");
    } else {
        log.error("/>_ 请确认下方步骤是否完成：\n                   - 创建关卡房间\n                   - 进入准备区\n                   - 确保房间中仅有1位玩家\n                   - 返回主界面");
        return;
    }
    let times = 0;
    while (true) {
        await sleep(200)
        keyPress(key_1.toUpperCase());
        await sleep(1000);
        let captureRegion_2 = captureGameRegion();
        let resList_2 = captureRegion_2.findMulti(RecognitionObject.ocrThis);
        for (let i = 0; i < resList_2.count; i++) {
            let res = resList_2[i];
            if (res.text.includes("一秒速通刷千星等级")) {
                result_state[0] = true;
            }
            if (res.text.includes("准备区1/8")) {
                result_state[1] = true;
            }
            if (res.text.includes("开始游戏")) {
                result_state[2] = true;
            }
        }
        if (result_state[0]) {
            log.info("/>_ 关卡名称已识别");
        } else {
            log.error("/>_ 未识别到对应关卡：\n                   - 关卡名称 = 一秒速通刷千星等级\n                   - 关卡GUID = 7094676912");
            return;
        }
        if (result_state[1] & result_state[2]) {
            await sleep(200)
            keyPress(key_2.toUpperCase());
            await sleep(1000);
            let state = false;
            let count = 0;
            while (true) {
                let captureRegion_3 = captureGameRegion();
                let resList_3 = captureRegion_3.findMulti(RecognitionObject.ocrThis);
                for (let i = 0; i < resList_3.count; i++) {
                    let res = resList_3[i];
                    if (res.text.includes("返回大厅")) {
                        await sleep(200)
                        moveMouseTo(Math.round(res.x + res.Width / 2), Math.round(res.y + res.Height / 2));
                        leftButtonClick();
                        state = true;
                        break;
                    }
                }
                if (state) {
                    times++;
                    log.info("/>_ 关卡已完成（次数：{time}）", times);
                    break;
                }
                count++;
                if (count == 30) {
                    log.error("/>_ 由于未知原因，未能检测到游戏结束行为");
                    return;
                }
                await sleep(1000);
            }
        } else {
            log.error("/>_ 由于未知原因，未能进入关卡开始游戏");
            return;
        }
        let result_reset = false
        let count = 0;
        while (true) {
            let captureRegion_4 = captureGameRegion();
            let resList_4 = captureRegion_4.findMulti(RecognitionObject.ocrThis);
            for (let i = 0; i < resList_4.count; i++) {
                let res = resList_4[i];
                if (res.text.includes("房间") || res.text.includes("准备就绪")) {
                    result_reset = true;
                }
            }
            if (result_reset) {
                break;
            } else {
                count++;
                if (count == 10) {
                    log.error("/>_ 由于未知原因，未能检测到返回主界面行为");
                    return;
                }
                await sleep(1000);
            }
        }
        await sleep(1000);
    }
})();
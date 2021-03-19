export default {
    debounce(fn, timeout) {
        if (!window._debounce) {
            window._debounce = {};
            window._debounce[fn] = {};
        } else if (!window._debounce[fn]) {
            window._debounce[fn] = {};
        }

        if (window._debounce[fn].timer) {
            clearTimeout(window._debounce[fn].timer);
        }
        window._debounce[fn].timer = setTimeout(() => {
            fn();
        }, timeout);
    },
    throttle(fn, timeout) {
        if (!window._throttle) {
            window._throttle = {};
            window._throttle[fn] = {};
        } else if (!window._throttle[fn]) {
            window._throttle[fn] = {};
        }


        if (window._throttle[fn].lastTime) {
            // 说明上次执行过
            const now = +new Date();
            const diff = now - window._throttle[fn].lastTime;
            const nextTime = timeout - diff;
            if (nextTime > 0) {
                // 说明应该启动下一次周期
                clearTimeout(window._throttle[fn].timer);
                window._throttle[fn].timer = setTimeout(() => {
                    fn();
                    window._throttle[fn].lastTime = +new Date();
                }, nextTime);
            } else {
                // 假设第一次需要马上执行
                fn();
                window._throttle[fn].lastTime = +new Date();
            }
        } else {
            // 假设第一次需要马上执行
            fn();
            window._throttle[fn].lastTime = +new Date();
        }
    }
}
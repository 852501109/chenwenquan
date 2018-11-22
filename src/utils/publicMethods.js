
export function chksafe(value) {
    var fibdn = new Array("'", ">", "<", "*", "%", "#", "$", "}", "{", "~", "`", "!", "￥", "?", "&", "^", "(", ")", '=')
    var i = fibdn.length;
    var j = value.length;
    for (var ii = 0; ii < i; ii++) {
        for (var jj = 0; jj < j; jj++) {
            var temp1 = value.charAt(jj);
            var temp2 = fibdn[ii];
            if (temp1 == temp2) {
                return false;
            }
        }
    }
    return true;
}
//筛选认证信息
export function filterAuthMsg(state, self) {
    switch (state) {
        case 0:
            self.authenticationMsg = "无认证信息";
            break;
        case 1:
            self.authenticationMsg = "认证通过";
            break;
        case 2:
            self.authenticationMsg = "运营确认";
            break;
        case 3:
            self.authenticationMsg = "认证拒绝";
            break;
        case 4:
            self.authenticationMsg = "二次提交认证";
            break;
        case 5:
            self.authenticationMsg = "认证信息修改申请";
            break;
        case 6:
            self.authenticationMsg = "认证信息修改确认";
            break;
        case 7:
            self.authenticationMsg = "认证信息修改驳回";
            break;
    }
}
// 手机号86筛选
export function filterPhone(value) {
    if (value.substr(0, 2) === '86') {
        return value.substr(2)
    } else if (value.substr(0, 3) === '+86') {
        return value.substr(3)
    } else {
        return value
    }
}
// 防抖
export function _debounce(fn, wait) {
    let timer = null;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fun();
        }, delay);
    }
}

//函数节流
export function throttle(fun, delay) {
    let last = null;
    return () => {
        const now = + new Date();
        if (now - last > delay) {
            fun();
            last = now;
        }
    }
}

export function addHandler(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler,  {passive: false});
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
    } else {
        element['on' + type] = handler;
    }
}
export function removeHandler(element, type, handler) {
    if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
        element.detachEvent('on' + type, handler);
    } else {
        element['on' + type] = null;
    }
}


//封装一个tap事件
export function tap(ele, callback) {
    let tag = 0;
    const isMobile = navigator.userAgent.match(/(iphone|ipad|ipod|ios|android|mobile|blackberry|iemobile|mqqbro	wser|juc|fennec|wosbrowser|browserng|Webos|symbian|windows phone)/i);
    if (isMobile) {
        addHandler(ele, 'tuochstart', function (event) {
            event.preventDefault();
            tag = 0;
            // 如果移动了，则不算tap，这一点和click处理有一些区别
        });
        addHandler(ele, 'touchmove', function (event) {
            event.preventDefault();
            tag = 1;
            // 如果移动了，则不算tap，这一点和click处理有一些区别
        });
        addHandler(ele, 'touchend', function (event) {
            if (tag == 0) {
                callback(event);
            }
            tag = 0
        });
    } else {
        addHandler(ele, 'click', function (event) {
            callback(event);
        });
    }
}

// 获取dom样式
export let getStyle = (ele, attr)=>{
    if (ele.currentStyle) {
        return ele.currentStyle[attr];
    } else {
        return getComputedStyle(ele, null)[attr];
    }
};
// 动画
export let animate =  function (element, data, callback) {
    clearInterval(element.timerId);
    return element.timerId = setInterval(function () {
        var flag = true;
        var leader, target, step;
        for (var Key in data) {
            if (Key === "opacity") {
                leader = getStyle(element, Key) * 100 || 0;
                target = data[Key] * 100;
                step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                element.style[Key] = leader / 100;
            } else if (Key == "zIndex") {
                leader = parseInt(getStyle(element, Key)) || 0;
                target = data[Key];
                step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                element.style[Key] = leader;
            } else {
                leader = parseInt(getStyle(element, Key)) || 0;
                target = data[Key];
                step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                element.style[Key] = leader + "px";
            }
            if (target !== leader) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(element.timerId);
            if(callback) callback();
        }
    }, 20);
}
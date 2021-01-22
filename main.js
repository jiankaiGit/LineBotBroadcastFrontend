// 弹幕定时器
var timers = [];
// 控制弹幕显隐变量
var isShow = true;
// 监听发送按钮
$(".send").on("click", function () {
    // 创建弹幕
    var jqueryDom = createScreenbullet($("#screenBulletText").val());
    // 添加定时任务
    addInterval(jqueryDom);
});
// 监听关闭弹幕按钮
$(".clear").on("click", function () {
    if (isShow) {
        $(".bullet").css("opacity", 0);
        isShow = false;
    } else {
        $(".bullet").css("opacity", 1);
        isShow = true;
    }   
});

$("#toolbar").hide();

function sendBullet(msg){
    // 创建弹幕
    var jqueryDom = createScreenbullet(msg);
    // 添加定时任务
    addInterval(jqueryDom);
}
// setInterval(function(){ 
//     // 创建弹幕
//     var jqueryDom = createScreenbullet("宅男宅男");
//     // 添加定时任务
//     addInterval(jqueryDom); 
// }, 3000);

// 新建一个弹幕
function createScreenbullet(text) {
    var jqueryDom = $("<div class='bullet'>" + text + "</div>");
    var fontColor = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random()) + ")";
    var fontSize = Math.floor((Math.random() + 1) * 24) + "px";
    var left = $(".screen_container").width() + "px";
    var top = Math.floor(Math.random() * 1000) + "px";
    top = parseInt(top) > $(".screen_container").height() ? $(".screen_container").height().toString() : top;
    jqueryDom.css({
        "position": 'absolute',
        "color": fontColor,
        "font-size": fontSize,
        "left": left,
        "top": top
    });
    $(".screen_container").append(jqueryDom);
    return jqueryDom;
}
// 为弹幕添加定时任务
function addInterval(jqueryDom) {
    var left = jqueryDom.offset().left - $(".screen_container").offset().left;
    var timer = setInterval(function () {
        left--;
        jqueryDom.css("left", left + "px");
        if (jqueryDom.offset().left + jqueryDom.width() < $(".screen_container").offset().left) {
            jqueryDom.remove();
            clearInterval(timer);
        }
    }, 1);
    timers.push(timer);
}
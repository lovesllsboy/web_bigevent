// 入口函数，文档加载完成触发入口函数执行
$(function() {
    var layer = layui.layer;
    GetUserInfo();
    // 注册退出事件
    $('#btnLogot').on('click', function() {

        // 提示用户是否退出系统
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            // 1、清除用户登录信息
            localStorage.removeItem('token');
            // 2、返回登录界面
            location.href = './login.html'

            layer.close(index);
        });
    })
})

// 获取用户登录信息
function GetUserInfo() {
    $.ajax({
        method: 'Get',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            //  渲染用户头像
            renderAvatar(res.data);
        }
    })
}

function renderAvatar(user) {
    //  1、获取用户的名称
    var name = user.nickname || user.username;
    // 2、设置欢迎内容
    $('#welcome').html('欢迎 ' + name);
    // 3、按需渲染
    if (user.user_pic !== null) {
        // 渲染图片
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avater').hide();
    } else {
        // 渲染文字
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avater').html(first).show();
    }
}
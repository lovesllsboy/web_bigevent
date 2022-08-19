$(function() {
    // 自定义验证规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '用户昵称长度需在1~6之间'
            }
        }
    })

    GetUserInfo();

    function GetUserInfo() {
        $.ajax({
            method: 'Get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status === 1) {
                    return layer.msg('获取用户信息失败！');
                }
                // 为表单快速赋值
                form.val('formUserInfo', res.data);
            }
        })
    }
    // 注册表单重置事件
    $("#btnReset").on("click", function(e) {
            // 通过事件对象e阻止表单得默认行为
            e.preventDefault();
            //将表单数据重置为初始值
            GetUserInfo();
        })
        // 注册表单提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单默认提交事件
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $('.layui-form').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息更新失败!');
                }
                layer.msg('用户信息数据更新成功！');
                // 调用更新父窗口的用户信息更新window指的是当前fm窗口。
                window.parent.GetUserInfo();
            }
        })
    })
})
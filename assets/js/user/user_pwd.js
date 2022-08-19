$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同!'
            }
        },
        repwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入密码有误！'
            }

        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码出错！');
                }
                layer.msg('密码更新成功！');
                // 更新成功表单重置此处不能用$(this)
                $('.layui-form')[0].reset();
            }


        })
    })
})
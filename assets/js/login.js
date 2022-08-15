$(document).ready(function() {
    // 点击去注册
    $('#link-reg').on('click', function() {
        $('.reg-box').show();
        $('.login-box').hide();
    })

    // 点击去登录
    $('#link-login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })


    // 从layui导入form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            //  自定义校验对象
            pwd: [/^[\S]{6,12}$/, '密码必须6-12位且不能出现空格'],

            repwd: function(value) {
                //value是增加该校验规则的对象的值
                //通过属性选择器选择对象
                if ($('.reg-box [name=password]').val() !== value) {
                    return '两次输入的密码不一致！！'
                }
            }

        })
        //注册表单提交事件
    $('#form-reg').on('submit', function(e) {
            // 阻止表单得自动提交行为
            e.preventDefault();
            // 发起AJAX请求，注册功能
            var data = { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() };
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录!');
                // 登录成功，自动转入登录表单
                $('#link-login').click();
            })
        })
        // 登录表单提交
    $('#form-login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速提交表单数据（格式化化为JSON格式）
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }
                //将服务器返回的用户token值保存到localstorage中，便于后续请求有权限的接口。
                localStorage.setItem('token', res.token);

                layer.msg(res.message);
                location.href = './index.html';
            }
        })
    })

})
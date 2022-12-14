$(function() {
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
            // 纵横比
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域
    $image.cropper(options)

    // 给上传按钮注册点击事件
    $("#btnChooseImage").on('click', function() {
            // 模拟file的点击事件
            $("#file").click();
        })
        // 注册file的change事件。
    $("#file").on('change', function(e) {
        //console.log(e.target.files);
        if (e.target.files.length === 0) {
            return layer.msg('请选择照片！');
        }
        // 将文件展示到裁剪区域
        // 1、获取选择的文件
        var file = e.target.files[0];
        // 2、将文件转换为url地址
        var imgurl = URL.createObjectURL(file);
        // 3、替换裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgurl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $("#btnUpload").on('click', function() {
        // 拿到裁剪后的图片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            //更新服务器数据
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('更新头像失败！')
                }
                layer.msg('更新头像成功！');
                // 更新以登录用户的信息
                window.parent.GetUserInfo();
            }
        })

    })
})
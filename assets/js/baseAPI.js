// 所有发起ajax的请求再发起之前先通过$.ajaxPrefilter进行预处理，因此这个函数可以拿到所有ajax请求的所有参数。
$.ajaxPrefilter(function(options) {
    // 自动拼接完整的请求地址
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    //为有权限的接口自动增加请求头headers   Authorization
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 为ajax挂载全局complete
    options.complete = function(res) {
        // 请求ajax时，如果服务器响应状态出错，强制跳转到登录页面
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1、清除用户信息
            localStorage.removeItem('token');
            // 2、强制跳转到登录页面
            location.href = '/login.html';
        }
    }
})
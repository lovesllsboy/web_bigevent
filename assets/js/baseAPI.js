// 所有发起ajax的请求再发起之前先通过$.ajaxPrefilter进行预处理，因此这个函数可以拿到所有ajax请求的所有参数。
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;

})
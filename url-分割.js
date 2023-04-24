var http = require('http');
var url = require('url');
var util = require('util');
//访问:http://127.0.0.1:3000/search?user=菜鸟教程&url=www.runoob.com
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    var temp=url.parse(req.url, true);
    var word=temp.query.word
    var patchname=temp.pathname
    res.write("搜索: " + word+"\n"+"pachname="+patchname+"\n"+"全URL对象内容:"+String(temp)); // 输出"user"参数的值
    res.end();
}).listen(3000);
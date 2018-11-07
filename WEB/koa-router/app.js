
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();

// 创建一个Koa对象表示web app本身:
const app = new Koa();


app.use(async (ctx, next)=>{
    console.log('Process ');
    console.log(ctx.request.method);
    console.log(ctx.request.url);
    await next();
});

app.use(bodyParser());

router.get('/hello/:name', async(ctx, next) => {
    var name = ctx.params.name;
    var body = `<h1>Hello, ${name}!</h1>`;//不是单引号，是~键
    console.log(body);
    ctx.response.body = body;
});

router.get('/', async(ctx, next) => {
    
    ctx.response.body = '<h1>index</h1>'+
    '<form action = "/signin" method = "post">'+
    '<p>Name: <input name = "name" value = "koa"></p>'+
    '<p>Password:<input name = "password" type = "password"></p>'+
    '<p><input type = "submit" value = "Submit"></p>'+
     '</form>';
});


router.post('/signin', async(ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
        console.log(`signin with name: ${name}, password: ${password}`);
        // console.log('signin with name:${name}, password:${password}');
        if (name ==='koa' && password === '12345') {
            ctx.response.body = `<h1>Welcome,${name}!</h1>`;
        } else {
            ctx.response.body = '<h1>Login failed!</h1>'+
            '<p><a href="/">Try again</a></p>';
        }
})

app.use(router.routes());



// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
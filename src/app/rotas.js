
module.exports = (app) => {
    const connect = require('../config/conection')
    app.get('/', (req,resp) => {
        (async() => {
            const [ultNoticias] = await connect.getUltimasNoticias()
            resp.render("home/index", {noticias:ultNoticias})
        })()
       
    })

    app.get('/noticia', (req, resp) => {
        (async () => {
            let id = 0;
            id = Number(req.query.id)
            const [not] = await connect.getNoticia(id)
            resp.render('home/noticia', {noticia: not})
        }

        )()
    })

    app.get('/formulario', (req, resp) => {
        resp.render('home/formulario', {erros: '', noticia: ''})
    })

    app.get('/noticias', (req,resp) => {
        (async () => {
            const [noticias] = await connect.getTodasNoticias()
            resp.render('home/noticias', {noticias : noticias})
        }
        )()
        
    })

    app.post('/addNoticia', (req,resp) => {
        const novaNoticia = req.body

        req.assert('titulo', 'O titulo não pode estar vazio').notEmpty()
        req.assert('resumo', 'O resumo deve conter entre 10 a 100 caracteres').notEmpty()
        req.assert('autor', 'defina um autor').notEmpty()
        req.assert('noticia', 'noticia não pode ser vazia').notEmpty()

        const erro = req.validationErrors()

        if(erro){
            resp.render('home/formulario', {erros:erro, noticia: novaNoticia})
            console.log(erro)
            return ''
        }
    
        connect.addNoticia(novaNoticia)
        resp.redirect('/')
    })
}
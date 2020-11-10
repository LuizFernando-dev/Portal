
async function connect(){
    const mysql = require('mysql2/promise')
    const connect = await mysql.createConnection('mysql2://root:rootziul@localhost:3306/portal')

    return connect
}

async function getUltimasNoticias(){
    const ultimas = await connect()
    const ultimasNoticias = await ultimas.query('select *from noticias order by id_noticias desc limit 5')

    return ultimasNoticias
}

async function getTodasNoticias(){
    const todas = await connect()
    const todasNoticias = await todas.query('select *from noticias order by id_noticias desc limit 15')

    return todasNoticias
}

async function addNoticia(noticia){
    const conAddNoticia = await connect()
    await conAddNoticia.query('insert into noticias set ?', noticia)
}

async function getNoticia(id){
    console.log(id)
    const conGet = await connect()
    const [noticia] = await conGet.query('select *from noticias where id_noticias = ?', id)

    return noticia;
}

module.exports = {getUltimasNoticias, getTodasNoticias, addNoticia, getNoticia}
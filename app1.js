const express = require('express')
const app1 = express()
const Pokemon = require('./models/Pokemon')


//multer
const multer = require('multer')
const path= require('path')




const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb (null,('./uploads'))
},
filename:(req,file,cb)=>{
    const {name, ext}= path.parse(file.originalname)
        
    cb(null, `${name}-${Date.now()}.${ext}`)    
}
})

const upload = multer({storage})


//handlebars
const handlebars = require('express-handlebars')
app1.engine('handlebars', handlebars ({defaultLayout:'main'}))
app1.set('view engine', 'handlebars')



//body-parser
const bodyParser = require('body-parser')
const { squirrelly } = require('consolidate')
const { dirname } = require('path')
app1.use(bodyParser.urlencoded({extended: false}))
app1.use(bodyParser.json()) 
const urlencodeParser = bodyParser.urlencoded({extended: false})


//------------------------

//rotas
app1.get ('/pokemon', function(req,res){
    Pokemon.findAll().then(function(pokemons){
    res.render(__dirname + '/views/pokemon.handlebars',{ pokemons: pokemons})
    })
})


//render vai para a pagina 
app1.get ('/cad-pokemon', function(req,res){
    res.render(__dirname + '/views/cad-pokemon.handlebars')
})





//ADICIONAR

app1.post('/add-pokemon', upload.single('file'),function(req,res){
    Pokemon.create({
        nome: req.body.nome,
        cor: req.body.cor,
        imagem: req.body.imagem
    }).then(function(){
        res.redirect('/pokemon')
        res.send('Pokemon cadastrado com sucesso!')
    }).catch(function(erro){
        res.send('Erro: pokemon não cadastrado ' + erro)
    }) 
}) 



//DELETAR
app1.get('/del-pokemon/:id', function (req,res){
    Pokemon.destroy({
        where:{'id': req.params.id}
    }).then(function(){
        res.redirect('/pokemon')
        //res.send('Pokemon excluido com sucesso')
    }).catch(function(erro){
        res.send('ERRO '+ erro)
    })
})


//// E D I T A R //////

/* Coloquei um botão "editar" na pagina "pokemon.handlebars", porem o mesmo não funciona.
Deve ser algum erro do tipo GET/POST ou PUT, só pode. Pq da mesma maneira que eu apago o arquivo pelo ID, eu o edito pelo ID. Certo?

Ja vi alguns videos dos caras fazendo o CRUD com node + mysql/sequelize, mas nunca pelo servidor "comum". Só por aquele programa que vc usou.

*/

app1.post('/edit/:id',(req,res)=>{
    Pokemon.update(
    {
        name: req.body.name,
        cor : req.body.cor,
        imagem: req.body.imagem
    },
    {
        where:{'id': req.body.id}
    }
    ).then(()=> res.redirect(__dirname + '/views/editar.handlebars'))
})




//SERVIDOR
app1.listen(8083)
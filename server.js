const express = require('express')
const app = express();

const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost:5432/try_react')

app.use(require('body-parser').json());
app.use(express.static(__dirname))

const Kaz = conn.define('kaz', {
	name: Sequelize.STRING
});

const Pie = conn.define('pie',{
	name: Sequelize.STRING
})



Pie.belongsTo(Kaz)
Kaz.hasMany(Pie)

conn.sync({force: true, logging: false })
	.then(()=>{
		Promise.all([
			Kaz.create({name:'imposter'}),
			Kaz.create({name:'stomach'}),
			Pie.create({name:'Trainpie'}),
			Pie.create({name: 'Qian'})
		])
	})

app.get('/', (req, res, next)=> res.sendFile(__dirname+'/index.html'))

app.get('/kazs', (req, res, next)=> 
	Kaz.findAll()
		.then( data => res.send(data) )
		.catch( err => console.log('WHAT\'S HAPPENING', err))
 )

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`listening on port ${port}`))


const express = require('express')
const { addNote, getNotes, removeNoteById, updateNote } = require('./notes-controller')
const path = require('path')

const PORT = 3000

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'public'))) // set static folder
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', 'pages') // set views folder

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'My Notes by Express+ejs',
		notes: await getNotes(),
		created: false,
	})
})

app.post('/', async (req, res) => {
	await addNote(req.body.title)
	res.render('index', {
		title: 'My Notes by Express+ejs',
		notes: await getNotes(),
		created: true,
	})
})

app.delete('/:id', async (req, res) => {
	await removeNoteById(req.params.id)

	res.render('index', {
		title: 'My Notes by Express+ejs',
		notes: await getNotes(),
		created: false,
	})
})

app.put('/:id', async (req, res) => {
	console.log('object')
	await updateNote(req.params.id, req.body.title)
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
	})
})

app.listen(PORT, () => {
	console.log('Listen you, because server started!')
})

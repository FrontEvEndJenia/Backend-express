const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
	const notes = await getNotes()
	const note = {
		title,
		id: (Math.random() * 10000).toFixed(),
	}
	notes.push(note)
	await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, 'utf-8')
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function removeNoteById(remove_id) {
	const notes = await getNotes()
	const updatedNotes = notes.filter((note) => {
		return note.id !== String(remove_id)
	})
	await fs.writeFile(notesPath, JSON.stringify(updatedNotes))
	console.log('Note removed')
	return updatedNotes
}
async function updateNote(update_id, newTitle) {
	console.log('update_id', update_id, 'newTitle', newTitle)
	const notes = await getNotes()
	const updatedNotes = notes.map((note) => {
		if (note.id === String(update_id)) {
			return { ...note, title: newTitle }
		}
		return note
	})
	await fs.writeFile(notesPath, JSON.stringify(updatedNotes))
	console.log('Заметка обновлена', updatedNotes)
	return updatedNotes
}

async function printNotes() {
	const notes = await getNotes()
	return notes.forEach(({ id, title }) => {
		chalk.bgGreen(console.log(`Note id: ${id}, title: ${title}`))
	})
}

module.exports = { addNote, getNotes, printNotes, removeNoteById, updateNote }

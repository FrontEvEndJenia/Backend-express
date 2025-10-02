document.addEventListener('click', (event) => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id
		remove(id).then(() => {
			event.target.closest('li').remove()
		})
	}

	if (event.target.dataset.type === 'update') {
		const id = event.target.dataset.id
		const title = event.target.dataset.title
		const updatedTitle = prompt('Редактирование', title)

		if (updatedTitle) {
			update(id, updatedTitle).then(() => {
				const listItem = event.target.closest('li')
				const textSpan = listItem.querySelector('.note-text')
				textSpan.textContent = `${updatedTitle} `
				event.target.dataset.title = updatedTitle
			})
		}
	}
})

async function remove(id) {
	await fetch(`/${id}`, {
		method: 'DELETE',
	})
}

async function update(id, title) {
	await fetch(`/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title,
		}),
	})
}

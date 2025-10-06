document.addEventListener('click', (event) => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id
		remove(id).then(() => {
			event.target.closest('li').remove()
		})
	}

	if (event.target.dataset.type === 'update') {
		const note = event.target.closest('li')
		const initialHtml = note.innerHTML
		const id = event.target.dataset.id
		const title = event.target.dataset.title
		const updatePanel = `
		<input type="text" value="${title}" class="update-input" />
		<div>
			<button class="btn btn-success" data-type="save"> Сохранить </button>
			<button class="btn btn-danger" data-type="cancel">Отмена</button>
		</div>
		`
		note.innerHTML = updatePanel

		updateListener = ({ target }) => {
			if (target.dataset.type === 'save') {
				const newTitle = target.closest('li').querySelector('.update-input').value
				console.log(newTitle)
				update(id, newTitle).then(() => {
					note.innerHTML = initialHtml
					note.querySelector('[data-type=update]').dataset.title = newTitle
					note.querySelector('span').innerText = newTitle
					note.removeEventListener('click', updateListener)
				})
			}
			if (target.dataset.type === 'cancel') {
				note.innerHTML = initialHtml
				note.removeEventListener('click', updateListener)
			}
		}

		note.addEventListener('click', updateListener)
	}
})

async function remove(id) {
	await fetch(`/${id}`, {
		method: 'DELETE',
	})
}

async function update(id, title) {
	console.log(title)
	await fetch(`/${id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id,
			title,
		}),
	})
}

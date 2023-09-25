const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')


update.addEventListener('click', _ => {
    fetch('/flavors', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            flavor: 'Walnut',
            rating: 'TRASH!',
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})

deleteButton.addEventListener('click', _ => {
    fetch('/flavors', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            flavor: 'Walnut'
        })
    })
        .then(res => {
        if(res.ok) return res.json()
        })
        .then(response => {
            if (response === 'No walnut to delete') {
            messageDiv.textContent = 'No walnut shake to delete'
        } else {
        window.location.reload(true)
        }
    })
    .catch(console.error)
})
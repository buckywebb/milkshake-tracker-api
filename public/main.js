const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/flavors', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            flavor: 'You have to be NUTS to order Walnut!',
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
const renderConcert = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop())

    const response = await fetch('/concerts')
    const data = await response.json()

    const concertContent = document.getElementById('concert-content')
    let concert

    concert = data.find(concert => concert.id === requestedID)

    if (concert) {
        document.getElementById('concert-detail-image').src = concert.imageURL
        document.getElementById('concert-artist').textContent = concert.artist
        document.getElementById('concert-title').textContent = concert.title
        document.getElementById('concert-venue').textContent = `Venue: ${concert.venue}`
        document.getElementById('concert-date').textContent = `Date: ${concert.date}`

        document.title = `${concert.artist} - ${concert.title}`
    }
    else {
        const errorMessage = document.createElement('p')
        errorMessage.textContent = 'Concert not found :('
        concertContent.appendChild(errorMessage)
    }
}

renderConcert()
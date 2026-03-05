const renderConcerts = async () => {
  const response = await fetch('/concerts')
  const data = await response.json()

  const mainContent = document.getElementById('main-content')

  if (data) {
    data.map(concert => {

      const concertCard = document.createElement('a')
      concertCard.href = `/concerts/${concert.id}`
      concertCard.className = 'concert-card'

      const imageContainer = document.createElement('div')
      imageContainer.className = 'concert-image-container'
      concertCard.appendChild(imageContainer)
      
      const concertImage = document.createElement('img')
      concertImage.className = 'concert-image'
      concertImage.src = concert.imageURL
      concertImage.alt = `${concert.artist} concert image`
      imageContainer.appendChild(concertImage)

      const concertInfo = document.createElement('div')
      concertInfo.className = 'concert-info'
      concertCard.appendChild(concertInfo)

      const concertArtist = document.createElement('h3')
      concertArtist.textContent = concert.artist
      concertArtist.classList.add('concert-info')
      concertInfo.appendChild(concertArtist)

      const concertTitle = document.createElement('h4')
      concertTitle.textContent = concert.title
      concertTitle.classList.add('concert-info')
      concertInfo.appendChild(concertTitle)

      const concertVenue = document.createElement('p')
      concertVenue.textContent = `Venue: ${concert.venue}`
      concertVenue.classList.add('concert-info')
      concertInfo.appendChild(concertVenue)

      const concertDate = document.createElement('p')
      concertDate.textContent = `Date: ${concert.date}`
      concertDate.classList.add('concert-info')
      concertInfo.appendChild(concertDate)

      mainContent.appendChild(concertCard)
    })
  }
  else {
    const errorMessage = document.createElement('p')
    errorMessage.textContent = 'No concert data available :('
    mainContent.appendChild(errorMessage)
  }
}

const requestedUrl = window.location.href.split('/').pop()

if (requestedUrl) {
  window.location.href = '../404.html'
}
else {
    renderConcerts()
}
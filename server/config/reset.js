import './dotenv.js'

import concertData from '../data/concerts.js'

import {pool} from './database.js'

const createConcertsTable =
    async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS concerts;

    CREATE TABLE IF NOT EXISTS concerts (
        id SERIAL PRIMARY KEY,
        artist VARCHAR(255) NOT NULL,
        date VARCHAR(10) NOT NULL,
        venue VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        imageurl VARCHAR(255) NOT NULL
    )
    `

  try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 concerts table created successfully')
  } catch (err) {
    console.error('⚠️ error creating concerts table', err)
  }
}

const seedConcertsTable = async () => {
  await createConcertsTable()

  concertData.forEach((concert) => {
    const insertQuery =
    {
    text:
        'INSERT INTO concerts (artist, date, venue, title, imageurl) VALUES ($1, $2, $3, $4, $5)'
    }

    const values =
        [
          concert.artist, concert.date, concert.venue, concert.title,
          concert.imageurl
        ]

    pool.query(insertQuery, values, (err, res) => {
    if (err) {
      console.error('⚠️ error inserting concert', err)
      return
    }

    console.log(`✅ ${concert.artist} added successfully`)
})

  })
}

seedConcertsTable()

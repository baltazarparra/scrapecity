/* eslint-disable prettier/prettier */
import express from 'express'
import { getTwitterCount, getInstagramCount } from './lib/scraper'
import db from './lib/db'
import './lib/cron'

const app = express()

app.get('/scrape', async (req, res, next) => {
  console.log('Scraping...')
  const [getTwitter, getInstagram] = await Promise.all([getTwitterCount(), getInstagramCount()])

  res.json({ getTwitter, getInstagram })
})

app.listen(2093, () => console.log('Running...'))

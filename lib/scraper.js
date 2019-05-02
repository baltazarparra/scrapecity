/* eslint-disable prettier/prettier */
import axios from 'axios'
import cheerio from 'cheerio'
import db from './db'

export async function getHTML(url) {
  const { data: html } = await axios.get(url)
  return html
}

export async function getTwitterFollowers(html) {
  const $ = cheerio.load(html)
  const span = $('[data-nav=\'followers\'] .ProfileNav-value')
  return span.data('count')
}

export async function getInstagramFollowers(html) {
  const $ = cheerio.load(html)
  const dataInString = $('script[type="application/ld+json"]').html()
  const pageObject = JSON.parse(dataInString)
  return Number(pageObject.mainEntityofPage.interactionStatistic.userInteractionCount)
}

export async function getTwitterCount() {
  const html = await getHTML('https://twitter.com/baltzparra')
  const twitterCount = await getTwitterFollowers(html)
  console.log(`You have ${twitterCount} twitter followers`)
  return twitterCount
}

export async function getInstagramCount() {
  const html = await getHTML('https://instagram.com/baltazarparra')
  const instagramCount = await getInstagramFollowers(html)
  console.log(`You have ${instagramCount} instagram followers`)
  return instagramCount
}

export async function runCron() {
  console.log('Scraping...')
  const [getTwitter, getInstagram] = await Promise.all([getTwitterCount(), getInstagramCount()])
  db.get('twitter')
    .push({
      date: Date.now(),
      count: getTwitter,
    })
    .write()

  db.get('instagram')
    .push({
      date: Date.now(),
      count: getInstagram,
    })
    .write()
  console.log('Done!')
}

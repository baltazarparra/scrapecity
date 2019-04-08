/* eslint-disable prettier/prettier */
import axios from 'axios'
import cheerio from 'cheerio'

async function getHTML() {
  const { data: html } = await axios.get('https://twitter.com/baltzparra')
  return html
}

async function getTwitterFollowers(html) {
  const $ = cheerio.load(html)
  const span = $('[data-nav=\'followers\'] .ProfileNav-value')
  return span.data('count')
}

export { getHTML, getTwitterFollowers }

/* eslint-disable prettier/prettier */
import { getHTML, getTwitterFollowers } from './lib/scraper'

async function go() {
  const html = await getHTML('https://twitter.com/baltzparra')
  const twitterCount = await getTwitterFollowers(html)
  console.log(`You have ${twitterCount} followers`)
}

go()

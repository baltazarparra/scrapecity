/* eslint-disable prettier/prettier */
import { getHTML, getTwitterFollowers, getInstagramFollowers } from './lib/scraper'

async function go() {
  const twitterHTML = await getHTML('https://twitter.com/baltzparra')
  const twitterCount = await getTwitterFollowers(twitterHTML)
  console.log(`You have ${twitterCount} twitter followers`)

  const instaHTML = await getHTML('https://instagram.com/baltazarparra')
  const instagramCount = await getInstagramFollowers(instaHTML)
  console.log(`You have ${instagramCount} instagram followers`)
}

go()

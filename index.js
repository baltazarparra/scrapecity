/* eslint-disable prettier/prettier */
import { getHTML, getTwitterFollowers, getInstagramFollowers } from './lib/scraper'

async function go() {
  const html = await getHTML('https://twitter.com/karoldalencar')
  const twitterCount = await getTwitterFollowers(html)
  console.log(`You have ${twitterCount} followers`)

  const instaHTML = await getHTML('https://instagram.com/wesbos')
  const instagramFollowers = await getInstagramFollowers(instaHTML)
}

go()

import { readFileSync } from 'fs'
import { resolve } from 'path'
import type { AppData } from '~/types'

const data = JSON.parse(readFileSync(resolve('./src/Data.json'), 'utf8')) as AppData

data.users.forEach(user => user.details.subscriptions.details.forEach(async (subscription) => {
  const url = subscription.serviceUrl
  console.log(url)
  if (!url)
    return

  // Get apple touch icon from head
  const response = await fetch(url)
  const html = await response.text()
  const appleTouchIcon = html.match(/<link rel="icon" href="(.*?)"/)
  console.log(appleTouchIcon?.[1])
}))

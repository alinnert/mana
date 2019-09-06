import puppeteer from 'puppeteer'
import serveHandler from 'serve-handler'
import { resolve } from 'path'
import { createServer } from 'http'
import { foobarTest } from './specs/foobar'
import chalk from 'chalk'

const serverPort = 8800

let browser: puppeteer.Browser

function startServer (): void {
  const server = createServer((request, response) => {
    return serveHandler(request, response, {
      public: resolve(__dirname, '../page')
    })
  })
  server.listen(serverPort)
}

async function startPuppeteer (): Promise<void> {
  browser = await puppeteer.launch()
  const context = await browser.createIncognitoBrowserContext()
  const page = await context.newPage()

  await page.goto(`http://localhost:${serverPort}`)
  await foobarTest(page)
  await browser.close()
}

async function main (): Promise<void> {
  startServer()
  await startPuppeteer()

  console.log(chalk`{green ✔ All tests OK}\n`)
  process.exit(0)
}

main()

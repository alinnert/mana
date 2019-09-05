import * as puppeteer from 'puppeteer-core'
import * as serveHandler from 'serve-handler'
import { createServer } from 'http'
import { foobarTest } from './specs/foobar'

const serverPort = 8800

export function handleError (message: string): void {
  console.error(`error: ${message}`)
}

async function startServer (): Promise<void> {
  const server = createServer((request, response) => {
    return serveHandler(request, response)
  })
  server.listen(serverPort)
}

async function startPuppeteer (): Promise<void> {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(`http://localhost:${serverPort}`)
  foobarTest(page)
}

async function main (): Promise<void> {
  await startServer()
  await startPuppeteer()
}

main()

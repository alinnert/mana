import * as puppeteer from 'puppeteer'
import { handleError } from '../results'

export async function foobarTest (page: puppeteer.Page): Promise<void> {
  try {
    await page.waitForSelector('.foobar')
  } catch (error) {
    handleError('Element .foobar does not appear')
  }

  const foobarTextContent = await page.$eval('.foobar', el => el.textContent)
  const expectedText = 'hello world'

  if (foobarTextContent !== expectedText) {
    handleError(`Expected element .foobar to contain text "${expectedText}". Instead it contains "${foobarTextContent}"`)
  }
}

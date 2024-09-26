import express from 'express'
import { parse } from 'node-html-parser'
import { getLinksFor, getPage, getPagination, getProductInfo } from './lib'
import { Product } from './types'

const app = express()

app.get('/', async (_req, res) => {
  const url = String(process.env.HOST) + process.env.TARGET_PATH
  const term = String(process.env.SEARCH_TERM)
  let html = await getPage(url)
  let root = parse(html)
  const numOfPages = getPagination(root)

  const productLinks = []
  for (let i = 1; i <= numOfPages; i++) {
    const page = url + '?page=' + i
    html = await getPage(page)
    root = parse(html)
    const links = getLinksFor(root, term)
    productLinks.push(...links)
  }

  const products: Product[] = []
  for (const link of productLinks) {
    const productUrl = String(process.env.HOST) + link
    html = await getPage(productUrl)
    root = parse(html)
    const product = getProductInfo(root)
    products.push(product)
  }

  res.json(products.toSorted((a: Product, b: Product) => a.price - b.price))
})

export const startServer = (port: number) => {
  app.listen(port, () => {
    console.log('Server is running on port', port)
  })
}

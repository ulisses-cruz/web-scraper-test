import 'dotenv/config'
import { parse } from 'node-html-parser'
import { getLinksFor, getPage, getPagination, getProductInfo } from './lib'

const url = String(process.env.HOST)
const term = String(process.env.SEARCH_TERM)

describe('Lib', () => {
  describe('getPage', () => {
    it('should return the html page', async () => {
      const html = await getPage(url + process.env.TARGET_PATH)
      expect(typeof html).toBe('string')
      expect(html).toContain('<html')
    })
  })

  describe('getPagination', () => {
    it('should return the total number of pages', async () => {
      const html = await getPage(url + process.env.TARGET_PATH)
      const root = parse(html)
      const res = getPagination(root)
      expect(typeof res).toBe('number')
    })
  })

  describe('getLinksFor', () => {
    it("should return an array of links for products with the term in it's title", async () => {
      const html = await getPage(url + process.env.TARGET_PATH + '?page=10')
      const root = parse(html)
      const links = getLinksFor(root, term)
      expect(Array.isArray(links)).toBe(true)
    })
  })

  describe('getProductInfo', () => {
    it('should return the informations of a product', async () => {
      const target_path = '/test-sites/e-commerce/static/product/89'
      const html = await getPage(url + target_path)
      const root = parse(html)
      const product = getProductInfo(root)
      expect(product).toBeDefined()
      expect(product).toMatchObject({
        title: 'Lenovo V510 Black',
        description:
          'Lenovo V510 Black, 15.6" HD, Core i3-6006U, 4GB, 128GB SSD, Windows 10 Home',
        picture:
          'https://webscraper.io/images/test-sites/e-commerce/items/cart2.png',
        price: 487.8,
        reviews: 9,
        rate: 2,
      })
    })
  })
})

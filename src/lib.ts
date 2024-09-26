import { HTMLElement } from 'node-html-parser'
import { Product } from './types'

export const getPage = async (url: string) => {
  const res = await fetch(url)
  return res.text()
}

export const getPagination = (root: HTMLElement) => {
  return Number(
    root
      .querySelector('ul.pagination')
      ?.childNodes.filter((node) => node.rawTagName === 'li')
      .at(-2)
      ?.childNodes.filter((node) => node.rawTagName === 'a')
      .at(0)?.textContent,
  )
}

export const getLinksFor = (root: HTMLElement, term: string) => {
  return root
    .querySelectorAll('.card .title')
    .filter((node) =>
      node.getAttribute('title')?.toLowerCase().includes(term.toLowerCase()),
    )
    .map((node) => node.getAttribute('href'))
}

export const getProductInfo = (root: HTMLElement): Product => {
  const getReviews = /\s*(\d+)\sreviews/m

  return {
    title: String(root.querySelector('.card-title')?.textContent),
    description: String(root.querySelector('.description')?.textContent),
    picture:
      String(process.env.HOST) +
      root.querySelector('.image')?.getAttribute('src'),
    price: Number(root.querySelector('.price')?.textContent.slice(1)),
    reviews: Number(
      getReviews.exec(
        String(root.querySelector('p.review-count')?.textContent),
      )![1],
    ),
    rate: root.querySelectorAll('p.review-count span').length,
  }
}

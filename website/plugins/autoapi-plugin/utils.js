const cheerio = require('cheerio');
const path = require('path')

const replaceAll = (str, from, to) => {
  return str?.replace(new RegExp(from, 'gi'), to)
}

const findnavs = ($, url, root) => {
  const sidebars = []
  const navs = root.find(' > li')
  if (navs.length === 0) return sidebars

  navs.map((_, v) => {
    const item = $(v)
    const _href = item.find(' > a').attr('href')
    let href = path.join(url, _href).trim()
    if (href.endsWith('#')) {
      href = href.substring(0, href.length - 1)
    }
    const label = replaceAll(item.find(' > a').text().trim(), '\n', '').trim()
    const subroot = item.find(' > ul')
    const navitem = { href: href, label: label }
    if (subroot.length > 0) {
      const subnavs = findnavs($, url, subroot)
      navitem.items = subnavs
      navitem.type = 'category'
      navitem.collapsible = true
      navitem.collapsed = false
    } else {
      navitem.type = 'link'
    }
    sidebars.push(navitem)
  })
  return sidebars
}

const findToc = ($, root, level) => {
  const sidebars = []
  const navs = root.find(' > li')
  if (navs.length === 0) return sidebars
  navs.map((_, v) => {
    const item = $(v)
    const id = item.find(' > a').attr('href')
    const label = replaceAll(item.find(' > a').text().trim(), '\n', '').trim()
    const subroot = item.find(' > ul')
    const navitem = { value: label, id: id.substring(id.indexOf('#') + 1), level: level, children: [] }
    if (subroot.length > 0) {
      const subnavs = findToc($, subroot, level + 1)
      navitem.children = subnavs
    }
    sidebars.push(navitem)
  })
  return sidebars
}

const parseApi = (url, content) => {
  const $ = cheerio.load(content);
  const navs = $('#bd-docs-nav > .bd-toc-item > ul')
  let sidebars = findnavs($, url, navs)
  if (sidebars.length === 1 && sidebars[0].items && sidebars[0].items.length > 0) {
    sidebars = sidebars[0].items
  }

  const toccontainer = $('#bd-toc-nav > ul')
  const tocs = findToc($, toccontainer, 0)
  // console.log(JSON.stringify(tocs, null, 2))
  return { sidebars, tocs }
}

module.exports = {
  parseApi
}
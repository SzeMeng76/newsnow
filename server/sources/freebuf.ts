import { load } from "cheerio"

export default defineSource(async () => {
  // Use RSS feed to bypass anti-bot protection (405 error on homepage)
  const rssUrl = "https://www.freebuf.com/feed"
  const rssXml = await myFetch<string>(rssUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      "Accept": "application/rss+xml, application/xml, text/xml, */*",
    },
  })

  const $ = load(rssXml, { xmlMode: true })
  const articles: any[] = []

  $("item").each((_, item) => {
    const $item = $(item)
    const title = $item.find("title").text().trim()
    const link = $item.find("link").text().trim()
    const description = $item.find("description").text().trim()
    const category = $item.find("category").text().trim()
    const pubDate = $item.find("pubDate").text().trim()

    // Extract ID from URL: /articles/xxx/460861.html -> 460861
    const idMatch = link.match(/\/(\d+)\.html/)
    const id = idMatch ? idMatch[1] : link

    if (title && link) {
      articles.push({
        id,
        title,
        url: link,
        extra: {
          hover: description,
          info: category,
          date: pubDate,
        },
      })
    }
  })

  return articles
})

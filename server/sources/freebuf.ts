import * as cheerio from "cheerio"

// 定义文章统计信息接口
interface ArticleStats {
  views: number
  collections: number
}

// 定义作者信息接口
interface AuthorInfo {
  name: string
  avatar?: string
  profileUrl?: string
}

// 定义文章数据接口
interface ArticleData {
  title: string
  url: string
  description: string
  publishTime: string
  author: AuthorInfo
  stats: ArticleStats
  album?: string
  image?: string
  category?: string
}

// 辅助函数：安全提取文本
function safeExtract($element: cheerio.Cheerio<any>, selector: string): string {
  const result = $element.find(selector).first().text().trim()
  return result || ""
}

// 辅助函数：安全提取属性
function safeExtractAttribute($element: cheerio.Cheerio<any>, selector: string, attribute: string): string {
  return $element.find(selector).first().attr(attribute) || ""
}

// 辅助函数：格式化URL
function formatUrl(url: string | undefined, baseUrl: string = "https://www.freebuf.com"): string {
  if (!url) return ""
  return url.startsWith("http") ? url : `${baseUrl}${url}`
}

// 辅助函数：提取统计信息
function extractStats($article: cheerio.Cheerio<any>): ArticleStats {
  const stats: ArticleStats = { views: 0, collections: 0 }

  // 提取围观数
  const viewElement = $article.find("a:contains(\"围观\")")
  if (viewElement.length) {
    const viewText = viewElement.find("span").first().text()
    stats.views = Number.parseInt(viewText) || 0
  }

  // 提取收藏数
  const collectElement = $article.find("a:contains(\"收藏\")")
  if (collectElement.length) {
    const collectText = collectElement.find("span").first().text()
    stats.collections = Number.parseInt(collectText) || 0
  }

  return stats
}

// 辅助函数：提取作者信息
function extractAuthor($article: cheerio.Cheerio<any>): AuthorInfo {
  const author: AuthorInfo = { name: "" }

  const authorLink = $article.find(".item-bottom a").first()
  if (authorLink.length) {
    author.name = authorLink.find("span").last().text().trim()
    author.profileUrl = formatUrl(authorLink.attr("href"))

    const avatarImg = authorLink.find(".ant-avatar img")
    if (avatarImg.length) {
      author.avatar = avatarImg.attr("src")
    }
  }

  return author
}

// 辅助函数：提取分类信息
function extractCategory($article: cheerio.Cheerio<any>): string {
  // 从URL路径推断分类
  const articleUrl = $article.find(".title-left a").first().attr("href") || ""
  if (articleUrl.includes("/articles/web/")) return "Web安全"
  if (articleUrl.includes("/articles/database/")) return "数据安全"
  if (articleUrl.includes("/articles/network/")) return "网络安全"
  if (articleUrl.includes("/articles/mobile/")) return "移动安全"
  if (articleUrl.includes("/articles/cloud/")) return "云安全"

  return ""
}

// 通过截取freebuf的文章url获取新闻id
function extractIdFromUrl(url: string): string {
  // 找到最后一个斜杠
  const lastPart = url.slice(url.lastIndexOf("/") + 1) // "460614.html"
  // 去掉 .html，只保留数字
  const match = lastPart.match(/\d+/)
  return match ? match[0] : ""
}

export default defineSource(async () => {
  const baseUrl = "https://www.freebuf.com"
  const html = await myFetch<string>(baseUrl)

  // Extract data from __NUXT__ JavaScript object
  const nuxtDataMatch = html.match(/window\.__NUXT__=(.+?)<\/script>/)
  if (!nuxtDataMatch) {
    console.warn("FreeBuf: Could not find __NUXT__ data")
    return []
  }

  try {
    // Parse the function and execute it to get data
    const dataScript = nuxtDataMatch[1]
    // Extract article list from the data
    const articleListMatch = dataScript.match(/homeArticleData:\{list:\[(.+?)\],count/)
    if (!articleListMatch) {
      return []
    }

    // Use cheerio to parse and find article data in a simpler way
    // Actually, let's extract from the embedded JSON data structure
    const $ = cheerio.load(html)
    const scriptContent = $('script:contains("window.__NUXT__")').html() || ""

    // Extract articles from the JSON structure
    const articlesData: any[] = []
    const idMatches = scriptContent.matchAll(/ID:"(\d+)",post_title:"([^"]+)",.*?url:"([^"]+)"/g)

    for (const match of idMatches) {
      const [, id, title, url] = match
      articlesData.push({
        id,
        title: title.replace(/\\"/g, '"'),
        url: url.startsWith("/") ? `${baseUrl}${url}` : url,
      })
    }

    return articlesData.slice(0, 20)
  } catch (error) {
    console.error("FreeBuf parsing error:", error)
    return []
  }
})

const baseUrl = "http://sinaappxx6.q236.cn"

/**
 * 搜索
 * @params {string} key
 * @returns {[{name, author, cover, detail}]}
 */
const search = (key) => {
  let response = POST(`${baseUrl}/post/GetInfo`, { data: `keyValue=${key}` })
  let $ = JSON.parse(response)
  let array = []
  $.data.forEach((child) => {
    array.push({
      name: child.Title.replace(/<span style='color:red'>(\S*)<\/span>/, "$1"),
      author: child.Author,
      cover: child.ImgUrl,
      detail: `${child.Id}`
    })
  })
  return JSON.stringify(array)
}

/**
 * 详情
 * @params {string} url
 * @returns {[{summary, status, category, words, update, lastChapter, catalog}]}
 */
const detail = (url) => {
  let response = POST(`${baseUrl}/post/infoOnload`, { data: `bookid=${url}` })
  let $ = JSON.parse(response).manhua
  let book = {
    summary: $.Summary,
    status: $.Upstr,
    category: $.Tap[0],
    words: $.Looknum,
    update: $.Uptime,
    lastChapter: $.Upnews,
    catalog: url
  }
  return JSON.stringify(book)
}

/**
 * 目录
 * @params {string} url
 * @returns {[{name, url, vip}]}
 */
const catalog = (url) => {
  let response = POST(`${baseUrl}/post/listOnload`, { data: `bookid=${url}` })
  let $ = JSON.parse(response)
  let array = []
  $.lists.forEach((chapter) => {
    array.push({
      name: chapter.Name,
      // url: chapter.Linkurl,
      url: JSON.stringify({ bookid: chapter.CartoonId, chapterid: chapter.Id }),
    })
  })
  return JSON.stringify(array)
}

/**
 * 章节
 * @params {string} url
 * @returns {string}
 */
const chapter = (url) => {
  let bookInfo = JSON.parse(url);
  let response = POST(`${baseUrl}/post/readOnload`, { data: `bookid=${bookInfo.bookid}&chapterid=${bookInfo.chapterid}` })
  let content = JSON.parse(response).message.imgData2
  let $ = JSON.parse(content)
  return $.map((item) => { return item.u }).join("\n")
}

var bookSource = JSON.stringify({
  name: "羞羞漫画",
  url: "sinaappxx6.q236.cn",
  version: 100
})

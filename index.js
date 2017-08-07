const rss = require('simple-rss')

async function getPosts () {
  const mediumList = await rss('https://medium.com/feed/@atilafassina')
  const dataCleanup = sanitizePostList(mediumList)
  return onlyPosts(dataCleanup)
}

function sanitizePostList (jsonFeed) {
  return jsonFeed.map( ({title,date,categories,link}) => {
    return {
      title,
      date,
      categories,
      link
    }
  })
}

function onlyPosts (list) {
  return list.filter( ({categories}) => categories.length > 0)
}

module.exports = function (req, res) {
  return getPosts()
}
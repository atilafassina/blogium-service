const {send} = require('micro')
const {router, get} = require('microrouter')
const rss = require('simple-rss')

function errorThrow (method, errorJSON, res) {
  return send(res, errorJSON.statusCode, errorJSON)
}

function getImage (text) {
  const regex = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g
  const result = regex.exec(text) 
  return result ? result[1] : false
}

function sanitizePostList (jsonFeed) {
  return jsonFeed.map(({title, date, categories, link, description}) => {
    const image = getImage(description)
    return {
      title,
      image,      
      date,
      link,
      categories
    }
  })
}

function onlyPosts (list) {
  return list.filter(({categories}) => categories.length > 0)
}

async function getPosts (user = 'medium') {
  try {
    const mediumList = await rss(`https://medium.com/feed/@${user}`)
    const dataCleanup = await sanitizePostList(mediumList)

    return onlyPosts(dataCleanup)
  } catch (err) {
    throw new Error(err)
  }
}

const posts = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    const posts = await getPosts(req.params.user)

    return send(res, 200, posts)
  } catch (err) {
    const error500 = {
      statusCode: 500,
      msg: 'unable to complete request'
    }

    errorThrow(req.method, error500, res)
  }
}

const notfound = async (req, res) => {
  const error404 = {
    statusCode: 404,
    msg: 'endpoint not found'
  }

  errorThrow(req.method, error404, res)
}

module.exports = router(
  get('/:user', posts),
  get('/*', notfound)
)

module.exports.privates = {
  _getPosts: getPosts,
  _sanitizePostList: sanitizePostList,
  _onlyPosts: onlyPosts,
}

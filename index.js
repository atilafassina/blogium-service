require('isomorphic-fetch')
const {send} = require('micro')
const {router, get} = require('microrouter')

function errorThrow (method, errorJSON, res) {
  return send(res, errorJSON.statusCode, errorJSON)
}

function sanitize(postsJSON, user) {
  return Object.values(postsJSON).map(({ title, firstPublishedAt, virtuals, uniqueSlug }) => {
    return {
      title,
      date: new Date(firstPublishedAt),
      image: `https://cdn-images-1.medium.com/max/1600/${virtuals.previewImage.imageId}`,
      link: `https://medium.com/@${user}/${uniqueSlug}`,
      categories: virtuals.tags.map(tag => tag.name)
    }
  })
}

async function getPosts (user = 'medium') {
  try {
    const mediumList = await fetch(`https://medium.com/@${user}/latest?format=json`)
    const textResponse = await mediumList.text()
    const fullResponse = JSON.parse(textResponse.replace('])}while(1);</x>' ,''))

    return sanitize(fullResponse.payload.references.Post, user)
  } catch (err) {

    throw new Error(err)
  }
}

const posts = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    const posts = await getPosts(req.params.user)
    console.log(posts)
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
  _getPosts: getPosts
}

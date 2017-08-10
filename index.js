const {send} = require('micro')
const {router, get} = require('microrouter')
const rss = require('simple-rss')

async function getPosts(user = 'medium') {
	const mediumList = await rss(`https://medium.com/feed/@${user}`)
	const dataCleanup = await sanitizePostList(mediumList)
	return onlyPosts(dataCleanup)
}

function sanitizePostList(jsonFeed) {
	return jsonFeed.map(({title, date, categories, link}) => {
		return {
			title,
			date,
			link,
			categories
		}
	})
}

function onlyPosts(list) {
	return list.filter(({categories}) => categories.length > 0)
}

const posts = async (req, res) => {
	const posts = await getPosts(req.params.user)

	res.setHeader('Access-Control-Allow-Origin', '*')

	return send(res, 200, posts)
}

const notfound = (req, res) => send(res, 404, 'Not found route')

module.exports = router(
  get('/:user', posts),
  get('/*', notfound)
)

module.exports.privates = {
	_getPosts: getPosts,
	_sanitizePostList: sanitizePostList,
	_onlyPosts: onlyPosts
}

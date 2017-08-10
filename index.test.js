import test from 'ava'
import {privates} from './'

test(t => {
	const mockArray = [
    {name: 'foo', categories: []},
    {name: 'foo', categories: [4, 5, 6, 3]},
    {name: 'foo', categories: []},
    {name: 'foo', categories: [1, 2, 3]}
	]

	t.is(privates._onlyPosts(mockArray).length, 2, 'filtered only posts with categories')
})

test(t => {
  const mockArray = [{
    "title": "mock title",
    "date": "2022-01-01 17:14:14",
    "link": "https://medium.com/@foo",
    "guid": "https://medium.com/p/foohash",
    "author": "Foobar da Silva",
    "thumbnail": "",
    "description": "mock description",
    "content": "foo content",
    "enclosure": [],
    "categories": []
  }]

  const expectedArray = [{
    "title": "mock title",
    "date": "2022-01-01 17:14:14",
    "link": "https://medium.com/@foo",
    "categories": []
  }]

  const result = privates._sanitizePostList(mockArray)
  
  t.true(JSON.stringify(result) === JSON.stringify(expectedArray))
})

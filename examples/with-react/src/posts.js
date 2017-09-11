import React, {PureComponent} from 'react'
import styled from 'styled-components'

const ListWrapper = styled.ul`
  display: flex;
  margin-top: 3rem;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style: none;
`

const Card = styled.li`
  width: 20rem;
  height: 15rem;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: .5em 0;
  text-align: center;
  align-items: center;
  margin-bottom: 2rem;
  border: solid 1px black;
  border-radius: 3px;
`

const TagList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const Tag = styled.li`
  font-size: .8rem;
  font-family: monospace;
  padding: .2em .3em;
  margin: .5em;
  border: solid 1px rgb(230,230,230);
`

const CardLink = styled.a`
  text-decoration: none;
  font-weight: bold;
  color: black;
  padding: 0 .2em;
  transition: color 100ms linear;

  &:hover {
    color: rgb(100,100,100);
  }
`

export default class Posts extends PureComponent {
  constructor() {
    super()
    this.state = {
      user: 'atilafassina',
      postList: []
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
  }

  async getPosts(user) {
    const resp = await fetch(`https://blogium.wedeploy.io/${user}`)
    return resp.json()
  }

  renderPosts(user) {
    const posts = this.getPosts(user)

    posts.then(list => {
      return this.setState({
        postList: list
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    this.renderPosts(nextProps.user)
  }

  componentDidMount() {
    this.renderPosts(this.state.user)
  }

  render() {
    const {postList} = this.state

    return (
      <article>
        <ListWrapper>
          {postList.map(({title, link, date, categories}, index) => (
            <Card key={index}>
              <p>{this.formatDate(date)}</p>
              <CardLink href={link} target="_blank">
                {title}
              </CardLink>
              <TagList>
                {categories.map((tag, i) => (
                  <Tag key={i}>{tag}</Tag>
                ))}
              </TagList>
            </Card>
          ))}
        </ListWrapper>
      </article>
    )
  }
}

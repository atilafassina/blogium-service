import React, {PureComponent} from 'react'

export default class Posts extends PureComponent {
  constructor () {
    super()
    this.state = {
      user: 'atilafassina',
      postList: []
    }
  }

  formatDate (dateString) {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
  }

  async getPosts (user) {
    const resp = await fetch(`https://blogium.wedeploy.io/${user}`)
    return resp.json()
  }

  renderPosts (user) {
    const posts = this.getPosts(user)
    
    posts.then( list => {
      return this.setState({
        postList: list
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    this.renderPosts(nextProps.user)
  }

  componentDidMount () {
    this.renderPosts(this.state.user)
  }
  
  render () {
    const {postList} = this.state

    return (
      <article>
        <ul>
          {postList.map( ({title, link, date, categories}, index) => (
            <li key={index}>
              <p>{this.formatDate(date)}</p>
              <a href={link} target="_blank">
                {title}
              </a>
              <ul>
                {categories.map((tag, i) => (
                  <li key={i}>{tag}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </article>
    )
  }
}
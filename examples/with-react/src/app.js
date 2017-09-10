import React, {PureComponent} from 'react'
import styled from 'styled-components'
import Posts from './posts'

function debounce(func, wait) {
  let timeout
  return (...args) => {

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      timeout = null
      func.apply(this, args)
    }, wait)
  }
}

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30vh;
  background-color: black;
`
const Title = styled.h1`
  color: white;
`

const Input = styled.input`
  font-family: monospace;
  font-size: 1.5rem;
  outline: none;
  border: none;
  border-bottom: solid 2px black;
`

export default class App extends PureComponent {
  constructor () {
    super ()
    this.state = {user: 'atilafassina'}
  }

  changeHandler = debounce((element) => {
    this.setState( () => ({
      user: element.value
    }))
    console.log(element.value)
  }, 250)

  render () {
    return (
      <div>
        <Header>
          <Title>
            Blogium-service w/ React
          </Title>
        </Header>
        <nav>
          <Input type='text' onChange={(event) => {
            event.persist()
            this.changeHandler(event.currentTarget)
          }}/>
        </nav>
        <Posts user={this.state.user}/>
      </div>
    )
  }
}
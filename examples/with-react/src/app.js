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

const Controller = styled.nav`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 5rem;
  margin-top: 2.5rem;

  &::after {
    content: 'type a Medium username ☝';
  }
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
  }, 250)

  render () {
    return (
      <div>
        <Header>
          <Title>
            Blogium-service w/ React
          </Title>
        </Header>
        <Controller>
          <Input type='text' onChange={(event) => {
            event.persist()
            this.changeHandler(event.currentTarget)
          }}/>
        </Controller>
        <Posts user={this.state.user}/>
      </div>
    )
  }
}
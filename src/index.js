// let's go!
import React from 'react'
import { render } from 'react-dom'
import './css/style.css'
import StorePicker from './components/storepicker'
import App from './components/app'
import { BrowserRouter, Match, Miss } from 'react-router'
import NotFound from './components/NotFound'

const Root = () => {
  return (
    <BrowserRouter>
      <div>

        <Match exactly pattern="/" component={StorePicker} />
        <Match exactly pattern="/store/:storeId" component={App} />
        <Miss component={NotFound}/>
      </div>

    </BrowserRouter>
  )
}

render(
  <Root/>, document.querySelector('#main'));

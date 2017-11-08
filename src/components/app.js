import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component {
  constructor() {
    super()
    this.addFish = this.addFish.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.addToOrder = this.addToOrder.bind(this)
    this.updateFish = this.updateFish.bind(this)
    this.removeFish = this.removeFish.bind(this)
    this.removeFromOrder = this.removeFromOrder.bind(this)

    // Getting initial state
    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentWillMount() {
    // this runs before the <APP> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
    // Check if there is any order already in the local storage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)

    if (localStorageRef) {
      //update our app components order state
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order))
  }

  addFish(fish) {
    //update state
    const fishes = { ...this.state.fishes }
    //add in our new fish
    const timestamp = Date.now()
    fishes[`fish-${timestamp} `] = fish
    //set state
    this.setState({
      fishes: fishes
    })
  }
  updateFish(key, updatedFish) {
    const fishes = { ...this.state.fishes }
    fishes[key] = updatedFish
    this.setState({ fishes })
  }

  removeFish(key) {
    const fishes = { ...this.state.fishes }
    fishes[key] = null
    this.setState({ fishes })
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    // Take copy of state
    const order = { ...this.state.order }
    //update or add new number of fishes ordered
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({ order })
  }

  removeFromOrder(key) {
    const order = { ...this.state.order }
    delete order[key]
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Catch of the Day"/>
          <ul className="list-of-fishes">
            {
              Object.keys(this.state.fishes)
              .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}/>

        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          removeFish={this.removeFish}
          loadSamples={this.loadSamples}
          storeId={this.props.params.storeId}
          updateFish={this.updateFish}/>
      </div>

    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App

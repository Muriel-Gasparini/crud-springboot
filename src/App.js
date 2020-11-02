import { React, Component } from 'react'
import Header from './components/Header'
import PersonsBox from './components/Persons'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Header title="CRUD de Pessoas com SpringBoot" />
        <br />
        <PersonsBox />
      </div>
    );
  }
}

export default App;

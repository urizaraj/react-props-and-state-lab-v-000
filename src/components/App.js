import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all',
      }
    };
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.onFindPetsClick} onChangeType={this.onChangeType} filters={this.state.filters} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} adoptedPets={this.state.adoptedPets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  onFindPetsClick = () => {
    let url = '/api/pets'
    const type = this.state.filters.type
    if (type !== 'all') {
      url += `?type=${type}`
    }

    fetch(url)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({ pets: resp })
      })
  }

  onChangeType = type => {
    this.setState({
      filters: {
        type: type
      }
    })
  }

  onAdoptPet = value => {
    const result = [value, ...this.state.adoptedPets]
    this.setState({
      adoptedPets: result
    })
  }
}

export default App;

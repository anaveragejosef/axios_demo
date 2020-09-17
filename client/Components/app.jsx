import React from 'react';
import axios from 'axios';
import * as $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: 0,
      dogs: 0
    };
  };

  getDogs(callback = () => {}) {
    $.ajax({
      url: '/dogs',
      success: results => {
        this.setState({
          dogs: Number(results)
        })
        callback(Number(results) + 1);
      }
    });
  }

  getCats() {
    axios('/cats')
      .then(results => {
        this.setState({
          cats: Number(results.data)
        })
        return Number(results.data) + 1;
      })
      .then(resPlusOne => console.log(`Cats + 1 = ${resPlusOne}`))
      .catch(error => console.log(error))
      .finally(() => console.log('All done!'));
  }

  setDogs() {
    $.ajax({
      method: 'POST',
      url: '/dogs/75',
      success: () => {
        this.getDogs((output) => { console.log('Dogs output + 1 = ', output)});
      }
    });
  }

  setCats() {
    axios.post('/cats/100')
      .then(() => {
        throw new Error('Testing 123');
        this.getCats();
      })
      .catch(err => console.log(err))
      .finally(() => console.log('Post error'));
  }

  setDogsByBody() {
    $.post('/dogs', { amount: 3 }, () => {
        this.getDogs();
      });
  }

  setCatsByBody() {
    axios.post('/cats', { amount: 3 })
      .then(() => {
        this.getCats();
      })
      .catch(error => console.log(error));
  }

  render () {
    return (
      <div>
        <div>
          <h1>Dogs</h1>
          <p>{this.state.dogs}</p>
          <button onClick={this.setDogs.bind(this)}>Set Dogs to 100</button>
          <button onClick={this.setDogsByBody.bind(this)}>Set Dogs Back to 3</button>
        </div>
        <div>
          <h1>Cats</h1>
          <p>{this.state.cats}</p>
          <button onClick={this.setCats.bind(this)}>Set Cats to 100</button>
          <button onClick={this.setCatsByBody.bind(this)}>Set Cats Back to 3</button>
        </div>
      </div>
    );
  }
}

export default App

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Router, Route, browserHistory, Link } from 'react-router';

class AllPuppies extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.fetchPuppies();
  }

  fetchPuppies() {
    axios.get('/api/puppies')
    .then(response => response.data)
    .then(puppyData => { this.setState({ puppyData })})
  }

  render () {
    const { puppyData } = this.state; 
    return (
      <div>
        <h3>Puppies!!!</h3>
        { puppyData && puppyData.map(puppy => {
            return (
              <div key={puppy.name}>
                <Link to={`/puppy/${puppy.name}`}>{puppy.name}</ Link>
              </div>
            );
        }) }
      </div>
    )
  }
}

class SinglePuppy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    axios.get(`/api/puppies/${this.props.params.name}`)
    .then(response => response.data)
    .then(puppy => {
      this.setState({ puppy });
    })
    .catch(err => console.error(err.stack));
  }

  render () {
    const puppy = this.state.puppy;
    return (
      <div> {
        puppy ? 
        <div>
          <h4>{puppy.name}</h4>
          <div><img src={puppy.image} /></div>
        </div> : 
        <h4>Loading...</h4>
      }
      </div>
    )
  }
}

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path="/" component={ AllPuppies } />
    <Route path="/puppy/:name" component={ SinglePuppy } />
  </Router>,
  document.getElementById('app')
);
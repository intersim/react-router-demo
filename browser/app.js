import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Router, Route, browserHistory, Link} from 'react-router';

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
    .then(puppies => { this.setState({ puppies })})
  }

  render () {
    const { puppies } = this.state; 
    return (
      <div>
        <h3>Puppy Index:</h3>
        { puppies && puppies.map(puppy => {
            return (
              <div key={puppy.name}>
                <Link to={`/puppies/${puppy.name}`}>{puppy.name}</Link>
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

  componentDidMount() {
    this.fetchOnePuppy(this.props.params.puppyName)
  }

  fetchOnePuppy(puppyName) {
    axios.get(`/api/puppies/${puppyName}`)
    .then(response => response.data)
    .then(puppy => { this.setState({ puppy }) })
    .catch(err => console.error(err.stack));
  }

  render() {
    const puppy = this.state.puppy;
    return (
      <div>
      { puppy ?
        <div>
        <h4>{puppy.name}</h4>
        <img src={puppy.image} /><br />
        <Link to={`/puppies/${puppy.name}/toy`}>See {puppy.name}'s favorite toy:</Link>
        { this.props.children ? React.cloneElement(this.props.children, {
          toy: puppy.toy
        }) : null }
        </div>
        : <div><h4>Loading...</h4></div>
      }
      </div>
    )
  }
}

const Toy = (props) => {
  return <p>{props.toy}</p>
};

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={AllPuppies} />
    <Route path="/puppies/:puppyName" component={SinglePuppy}>
      <Route path="toy" component={Toy} />
    </ Route>
  </ Router>,
  document.getElementById('app')
);
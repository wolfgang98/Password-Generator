import React, { Component } from 'react';
import './App.css';

const charsets = [
  { key: "letters", value: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", weight: 1 },
  { key: "digits", value: "0123456789", weight: 0.5 },
  { key: "specials", value: "!?", weight: 0.2 },
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelname: '',
      plz: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    if (this.state.hotelname && this.state.plz) {
      const generated = this.genPassword();
      this.setState({ password: generated })
    }
    event.preventDefault();
  }
  genPassword() {
    let password = '';
    password += this.genPassPhrase(4);
    password += this.state.hotelname;
    password += this.genPassPhrase(4);
    password += this.state.plz;
    password += this.genPassPhrase(4);
    return password;
  }
  genPassPhrase(length) {
	  let phrase = '';
	  for (let i=0; i < length; i++) {
		  const rdm = Math.random();
		  let charset;
		  for (let set of charsets) {
  			if (rdm < set.weight) charset = set;
      }
		  phrase += charset.value.charAt(Math.floor(Math.random() * charset.value.length));
    }
	  return phrase;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Password Generator</h1>
        </header>
        <div className="App-form">
          <form onSubmit={this.handleSubmit}>
            <input name="hotelname" placeholder="Hotelname" type="text" value={this.state.hotelname} onChange={this.handleChange} autoComplete="off" />
            <input name="plz" placeholder="PLZ" type="text" value={this.state.plz} onChange={this.handleChange} autoComplete="off" />
            <input type="submit" value="Submit" />
          </form>
          <h1>{this.state.password}</h1>
        </div>
      </div>
    );
  }
}

export default App;
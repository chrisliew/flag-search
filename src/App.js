import React, { Component } from 'react';
import axios from 'axios';
import CountriesAPI from './Components/CountriesAPI.jsx'

class FlagOne extends React.Component {
  render() {
    const country = this.props.country;
    return(
      <div className="country">
        <div className="country-name">{country.Name}</div>
        <img className="flag" src={country.Flag} />
      </div>
    )
  }
}

class FlagTable extends React.Component {
  render() {
    const filterText = this.props.filterText;

    const rows = [];
    let lastCategory = null;

    this.props.countries.forEach((country) => {
      if(country.Name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
        return;
      }
      rows.push(
        <FlagOne 
          country={country}
          key={country.Name}
        />
      )
    })

    return(
    <div className="countries">
      {rows}
    </div>
    )
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(event) {
    this.props.onFilterTextChange(event.target.value);
  }

  render() {
    const filterText = this.props.filterText;
    return(
      <div>
        <form>
          <input type="text" placeholder="Enter Country" value={filterText} onChange={this.handleFilterTextChange}/>
        </form>
      </div>
    )
  }
}

class FilterableFlagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      filterText: '',
    }

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  } 

  componentDidMount() {
    axios.get('http://countryapi.gear.host/v1/Country/getCountries')
      .then(res => {
        const countries = res.data.Response
        this.setState({
          countries: countries
      })
    })
  }

  handleFilterTextChange (filterText) {
    this.setState({
      filterText: filterText
    })
  }

  render() {
    return(
      <div>
        <div className="searchbar">
          <SearchBar onFilterTextChange={this.handleFilterTextChange} filterText={this.state.filterText}/>
        </div>
        <FlagTable countries={this.state.countries} filterText={this.state.filterText}/>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar">
          <h1 className="App-title">Country Flag Search</h1>
        </nav>
          <FilterableFlagList />
      </div>
    );
  }
}

export default App;

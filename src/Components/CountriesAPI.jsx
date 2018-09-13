import React from 'react';
import axios from 'axios';

export default class CountriesAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: []
    }
  }

  componentDidMount() {
    axios.get('http://countryapi.gear.host/v1/Country/getCountries')
      .then(res => {
        console.log("RES", res.data.Response)
        const countries = res.data.Response
        this.setState({
          countries: countries
        })
      })
  }

  render() {
    return(
      <div className="countries">
        {this.state.countries.map(country => 
        <div>
          <li>{country.Name} </li> 
          <img className="flag" src={country.Flag} /> 
        </div> )}
      </div>
    )
  }
}
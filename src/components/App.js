import React, { Component } from 'react';
import Button from './Button';
import Widget from './Widget';
import '../styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  callback = (data) => {
    this.setState({
      isLoaded: true,
      items: data
    });
    console.log(this.state.items['top_user'])
  }

  componentDidMount() {
    fetch("http://localhost:63473/api/query/12")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <Button callbackFromP={this.callback} heading="Last Week" timespan={7} />
          <Button callbackFromP={this.callback} heading="Last 48 hours" timespan={48} />
          <Button callbackFromP={this.callback} heading="Last 24 hours" timespan={24} />
          <Button callbackFromP={this.callback} heading="Last 12 hours" timespan={12} />
          <Widget heading="Most Active User" children={`User: ${items['top_user']} is the most active user querying ${items['top_user_counter']} times.`} />
          <Widget heading="Most Popular Category" children={`Category: ${items['top_category']} is the most popular category queried for ${items['top_category_counter']} times.`} />
          <Widget heading="Most Active User" />
          <Widget heading="Most Active User" />
          <Widget heading="Most Active User" />
          <Widget heading="Most Active User" />
          <Widget heading="Most Active User" />
          <Widget heading="Most Active User" />
        </div>
      );
    }
  }
}

export default App;

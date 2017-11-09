import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      top25 : []
    }

  }

  search (term) {
    var that = this;
    console.log(`${term} was searched`);
    // TODO
    // jquery ajax method to send post request to /repos
    $.ajax({
      method: 'POST',
      url: 'http://127.0.0.1:1128/repos',
      data: JSON.stringify({user: term}),
      dataType: 'text',
      contentType: 'application/json'
    })
    .then(function() {

      $.ajax({
        method: 'GET',
        url: 'http://127.0.0.1:1128/repos',
      }).done(function(data) {
        that.setState({
          top25: data
        });
      });

    })
    .done(function(data) {
      console.log('done');
    })
    .fail(function(err) {
      console.log('error');
    });
  }

  render () {
    var that = this;
    $.ajax({
      method: 'GET',
      url: 'http://127.0.0.1:1128/all'
    })
    .then(function(data) {



    })
    .done(function(data) {
      that.setState({
        repos: data
      });
    })
    .fail(function(err) {
      console.log('fail');
    });

    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} top25={this.state.top25}/>
      <Search onSearch={this.search.bind(this)}/>
      <div>
        <h4>Top 25 Repos</h4>
        {this.state.top25.map((repo, i) => {
          return <p>{repo.name}</p>
          })
        }
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
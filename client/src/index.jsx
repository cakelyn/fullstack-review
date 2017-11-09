import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    // jquery ajax method to send post request to /repos
    $.ajax({
      method: 'POST',
      url: 'http://127.0.0.1:1128/repos',
      data: {user: term},
      dataType: 'text/plain'
    }).done(function(msg) {
      console.log(msg);
    }).fail(function(msg) {
      console.log(msg.statusText);
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
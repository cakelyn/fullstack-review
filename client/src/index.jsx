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

  postUser (term) {
    return $.ajax({
      method: 'POST',
      url: '/repos',
      data: JSON.stringify({user: term}),
      dataType: 'text',
      contentType: 'application/json'
    });
  }

  getTopRepos () {
    var that = this;

    return $.ajax({
      method: 'GET',
      url: '/repos',
      }).then(function(data) {
        that.setState({
          top25: data
        });
      });
  }

  getAllRepos () {
    var that = this;

    return $.ajax({
      method: 'GET',
      url: '/all'
    })
    .then(function(data) {
      that.setState({
        repos: data
      });
    });
  }

  componentDidMount () {
    var pEl = $('p').find;
    if (pEl) {
      this.getAllRepos()
      .then(this.getTopRepos())
      .done(function(){
        console.log('page ready');
      })
      .fail(function(err){
        console.log('page failed to load');
      });
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    // jquery ajax method to send post request to /repos
    this.postUser(term)
    .then(this.getTopRepos())
    .done(function(data) {
      console.log(`${term} was added to database`);
    })
    .fail(function(err) {
      console.log(`error adding ${term} to database`);
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} top25={this.state.top25}/>
      <Search onSearch={this.search.bind(this)}/>
      <div>
        <h4>Top 25 Repos</h4>
        <table>
          <thead>
            <tr>
              <td># of Forks</td>
              <td>Repo Name</td>
              <td>Repo Owner</td>
            </tr>
          </thead>
          <tbody>
        {this.state.top25.map((repo, i) => {
          return (
                <tr>
                  <td>{repo.forks}</td>
                  <td>
                    <a href={repo.url}>{repo.name}</a>
                  </td>
                  <td>
                    <a href={repo.owner_url}>{repo.owner_login}</a>
                  </td>
                </tr>
            )
          })
        }
          </tbody>
        </table>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


// <table>
//           <thead>
//             <tr>
//               <th>Repo Name</th>
//               <th># of Forks</th>
//               <th>Repo Owner</th>
//             </tr>
//           </thead>
//           <tbody>
//         {this.state.top25.map((repo, i) => {
//           return
//             (<tr>
//               <td>{repo.name}</td>
//               <td>{repo.forks}</td>
//               <td>{repo.owner_login}</td>
//             </tr>)
//           })
//         }
//           </tbody>
//         </table>
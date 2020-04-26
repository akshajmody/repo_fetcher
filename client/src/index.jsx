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
    this.search=this.search.bind(this);
  }
//PUSH TO REPOS IN STATE

//AJAX REQUESTS

//component did mount - after item renders to screen


//USE
  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      type: "POST",
      data: {term: term},
      success: () => {
        console.log('CLIENT POST SUCCESS')
      },
      error: () => {
        console.log('CLIENT POST ERROR')
      }
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
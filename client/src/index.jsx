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
      topRepos: []
    }
    this.search=this.search.bind(this);
    this.getAll=this.getAll.bind(this);
  }

  componentDidMount() {
    this.getAll();
  };


  getAll() {
    // TODO
    $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      type: "GET",
      success: (requestedData) => {
        this.setState({
          repos: requestedData,
          topRepos: requestedData.slice(0, 25)
        });
      },
      error: () => {
        console.log('CLIENT GET ERROR')
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      type: "POST",
      data: {term: term},
      success: () => {
        console.log('CLIENT POST SUCCESS');
        //avoid this. functions within arrow functions
        this.getAll();
      },
      error: () => {
        console.log('CLIENT POST ERROR');
      }
    });
  }



  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos} topRepos={this.state.topRepos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
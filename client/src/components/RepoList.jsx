import React from 'react';
import RepoEntry from './Repo.jsx';



const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.topRepos.map((aRepo) =>
    <RepoEntry key={aRepo.repoId} aRepo={aRepo}/>
    )}
  </div>
)

export default RepoList;
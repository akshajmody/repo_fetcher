import React from 'react';

var RepoEntry = (props) => (

  <div>
    <a href={props.aRepo.html_url}>{props.aRepo.full_name}</a>
  </div>

);

export default RepoEntry;
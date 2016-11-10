import React, {Component} from 'react';

const Video = (props) => {
  return(
    <iframe className="video" width="100%" height="auto" src={props.video} frameBorder="0" ></iframe>
  )
}

export default Video;

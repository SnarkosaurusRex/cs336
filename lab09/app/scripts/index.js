// Put your JavaScript code here (rather than in the HTML file).

import React from 'react';
import ReactDOM from 'react-dom';
import '../css/base.css';
import CommentBox from './CommentBox.js';


var data = [
  {id: 1, author: "Pete Hunt", text: "A Møøse once bit my sister..."},
  {id: 2, author: "Jordan Walke", text: "*No realli!*...Mynd you, møøse bites Kan be pretty nasti..."}
];


//keep this at the bottom of the script
ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);

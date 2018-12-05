// Put your JavaScript code here (rather than in the HTML file).

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import '../css/base.css';
import CommentBox from './CommentBox.js';


ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={CommentBox}/>
            <Route path="/:id" component={CommentEdit}/>
        </Router>
    ), document.getElementById('content')
);

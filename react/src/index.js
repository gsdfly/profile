import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Router, Route } from "react-router-dom";

import history from './history';

// import Home from './components/home.jsx'
import About from './components/about.jsx'
import Topic from './components/topic.jsx'
import Prize from './components/prize.jsx'

const BasicExample = () => (
    <Router history={history}>
        <div>
            {/*<ul>*/}
                {/*<li>*/}
                    {/*<Link to="/">Home</Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                    {/*<Link to="/about">About</Link>*/}
                {/*</li>*/}
            {/*</ul>*/}
            {/*<hr />*/}

            <Route exact path="/" component={Prize} />
            <Route path="/topic" component={Topic} />
            <Route path="/about" component={About} />
        </div>
    </Router>
);


ReactDOM.render((
    <div>
       <BasicExample/>
    </div>
    ),document.querySelector('#root'));





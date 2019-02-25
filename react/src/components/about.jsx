import React from 'react';

import PropTypes from "prop-types";


class About extends React.Component{
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props,context){
        super(props,context);
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        console.log('11111111111')
        console.log(this.context)
        this.context.router.history.push("/");
    }
    render(){
        console.log(this.props);
        return <h1 onClick={this.handleClick}>ABOUT</h1>
    }
}

export default About;
import React from 'react';
import history from './../history'
//其他地方还是要导入history才能调用

class Topic extends React.Component{
    handleClick(){
        history.push('/about')
    }
    render(){
        return <h1 onClick={this.handleClick}>TOPIC</h1>
    }
}
export default Topic
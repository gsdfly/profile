import React from 'react';
import {GetProfile} from "../api/index";

import {withRouter} from "react-router-dom";

require("./home.css");
//import需要放在文件的最上方

// var fly=require("flyio")
//通过用户id获取信息,参数直接写在url中
// fly.get('/user?id=133')
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
//先暂时不写授权，

/**
 * react开发步骤
 * 第一步：把 UI 划分出组件层级
 * 第二步：用 React 创建一个静态版本（大型项目：从下到上；小型项目：从上到下 ）
 *
 */

/**
 *  首页>有3个组件
 *  1.最外面的
 *  2.头部
 *  3.底部模块
 */


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                userInfo: {
                    nickname: '',
                    avatar: '',
                    coin: 0,
                    prize:0,
                    consume:0
                },
                list:[
                    {title:'抓中记录',imgUrl:'http://res.catchme.com.cn/profile/imgs/icon_zhong.png'},
                    {title:'游戏记录',imgUrl:'http://res.catchme.com.cn/profile/imgs/icon_game.png'},
                    {title:'充值记录',imgUrl:'http://res.catchme.com.cn/profile/imgs/icon_recharge_record.png'},
                    {title:'优惠券',imgUrl:'http://res.catchme.com.cn/profile/imgs/personal_ticket.png'},
                ]
            }
    }
    componentDidMount(){
       GetProfile().then((res)=>{
           this.setState({
               userInfo:res.data.data
           })
       })
    }
    handleClick(){
        console.log('11111111111111')
       this.props.history.push('/about')
    }
    render() {
        return (
            <div className='home'>
                <Header userInfo={this.state.userInfo}/>
                <div className='main'>
                    <ul>
                    {
                        this.state.list.map((item,index)=>{
                            if(item.title === '抓中记录'){
                                return <LiItem handleClick={()=>this.handleClick()} history={this.props.history} key={index} prize={this.state.userInfo.prize} title={item.title} imgUrl={item.imgUrl}/>
                            }else if(item.title === '游戏记录'){
                                return <LiItem key={index} consume={this.state.userInfo.consume} title={item.title} imgUrl={item.imgUrl} history={this.props.history}/>
                            }else {
                                return  <LiItem key={index} title={item.title} imgUrl={item.imgUrl} history={this.props.history}/>
                            }
                        })
                    }
                    </ul>
                </div>
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        var userInfo = this.props.userInfo;
        return (
            <div className="header">
                <div className="content">
                    <div className="content-img">
                        <img src={userInfo.avatar} alt=""/>
                    </div>
                    <p>{userInfo.nickname}</p>
                    <div className="mycoin">
                        <span></span><b>{userInfo.coin}</b>
                    </div>
                    <p className="ticket">兑换券<i className="iconfont icon-go1"></i></p>
                </div>
            </div>
        )
    }
}

/**
 *
 <li @click="goTo('prize')">
 <img src="http://res.catchme.com.cn/profile/imgs/icon_zhong.png" alt="">
 <p>抓中记录</p>
 <span></span>
 <b>{{userInfo.prize}}</b>
 </li>
 */

class LiItem extends React.Component {
    constructor(props){
        super(props);
        // this.handleClick = this.handleClick.bind(this)
    }
    // handleClick(){
    //     console.log('2222');
    //     // this.props.handleClick();
    //     this.props.history.push('/topic')
    // }
    render() {
        var b;
        if(this.props.prize){
            b= <b>{this.props.prize}</b>;
        }else {
            b= <b>{this.props.consume}</b>;
        }
        return (<li onClick={this.props.handleClick}>
            <img src={this.props.imgUrl} alt=""/>
            <p>{this.props.title}</p>
            <span></span>
            {b}
        </li>)
    }
}


export default withRouter(Home);
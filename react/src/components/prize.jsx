import React from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import {GetPrize} from "../api/index";
require('./prize.css')

const PrizeItem = (props)=>{
   return <li>
       <div className={'left'}>
           <h3>{props.myItem.site_name}</h3>
           <p>{props.myItem.created_at}</p>
       </div>
       <span>抓中</span>
   </li>
};
class Prize extends React.Component{
    constructor(){
        super();
        this.state = {
            prize:[],
            hasMoreItems: true,
            pageIndex:1
        }
    }
    // componentWillMount(){
    //     console.log('组件将要render之前')
    //     GetPrize().then((res)=>{
    //         console.log(res.data.data.prizes.data)
    //         this.setState({
    //             prize:res.data.data.prizes.data,
    //         })
    //     })
    // }
    loadFunc(){
        GetPrize({page:this.state.pageIndex}).then((res)=>{
            var newPrize = [...this.state.prize,...res.data.data.prizes.data]
            var pageIndex = this.state.pageIndex + 1;
            if(pageIndex>res.data.data.prizes.last_page){
                this.setState({
                    hasMoreItems:false
                })
            }else {
                this.setState({
                    prize:newPrize,
                    pageIndex:pageIndex
                })
            }
        })
    }
    render(){
        var items = this.state.prize.map((value,index)=>{
            return <PrizeItem key={index+1} myItem={value}></PrizeItem>
        });
        return <div className={"prize"}>
                         <InfiniteScroll
                            pageStart={0}
                            loadMore={()=>{this.loadFunc()}}
                            hasMore={this.state.hasMoreItems}
                            loader={<div className="loader" key={0}>Loading ...</div>}
                            useWindow={false}
                            initialLoad={true}
                        >
                            <ul>
                                {items}
                            </ul>
                        </InfiniteScroll>
                 </div>
    }

}

export default Prize
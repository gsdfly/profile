import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//棋子组件
function Square(props) {
    return <button className='square' onClick={()=>{props.changeValue()}}>{props.value}</button>
}

class Board extends React.Component {
    // constructor(){
    //     super();
    //     this.state={
    //         squares:Array(9).fill(null),
    //         xIsNext:true
    //     }
    // }
    renderSquare(i) {
        return <Square value={this.props.squares[i]} changeValue={()=>this.props.handleClick(i)}/>;
    }
    // handleClick(i){
        // var newSquares = this.state.squares.slice();
        // if(calculateWinner(newSquares) || newSquares[i]){
        //     return;
        // }
        // newSquares[i] = this.state.xIsNext ? 'X' : 'O';
        // this.setState({
        //     squares:newSquares,
        //     xIsNext:!this.state.xIsNext
        // })
    // }
    render(){
        var winner =  calculateWinner(this.props.squares);
        var status = winner ? 'Winner：'+winner : 'Next Player：'+(this.props.xIsNext ? 'X':'O');

        return (
            <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
        </div>
    );
    }
}

//历史，每走一步棋就是独立的一个棋盘
//1.首先实现只能撤销一次
//2.撤销后以前的还是不变，但是当重新开始游戏后，以前的记录就没有了
class Game extends React.Component {
    constructor(){
        super();
        this.state={
            historyList:[{squares:Array(9).fill(null)}],
            // squares:Array(9).fill(null),
            xIsNext:true,
            stepNumber:0
        }
    }
    handleClick(i){
        const history = this.state.historyList.slice(0, this.state.stepNumber + 1);
        console.log(history);
        var newSquares = history[history.length - 1].squares.slice();
        if(calculateWinner(newSquares) || newSquares[i]){
            return;
        }
        newSquares[i] = this.state.xIsNext ? 'X' : 'O';
        var newHistoryList = history.slice();
        newHistoryList.push({squares:newSquares});
        this.setState({
            historyList:newHistoryList,
            xIsNext:!this.state.xIsNext,
            stepNumber: history.length
        })
    }
    changeHistory(i){
        //this.setState是异步生效的
        this.setState({
            // historyList:this.state.historyList.slice(0,i+1),
            stepNumber:i,
            xIsNext: i%2===0
        },()=>{
            console.log(this.state.stepNumber)
        })
    }
    render(){
        var squares = this.state.historyList[this.state.stepNumber].squares;
        var list = this.state.historyList.map((e,index)=>{
                var title = index === 0 ? '开始':'步骤'+index
            return <li key={index} onClick={()=>{this.changeHistory(index)}}>{title}</li>
        });
        return (<div>
            <Board squares={squares} handleClick={(i)=>{this.handleClick(i)}} xIsNext={this.state.xIsNext}/>
            <h3>时空裂缝</h3>
            <ul>
                {list}
            </ul>
        </div>)
    }
}



// class Square extends React.Component {
//     render() {
//         var value = this.props.value;
//         //使用Id存储
//         return (
//             <button className="square" onClick={() => {
//                 this.props.changeValue()
//             }}>
//                 {value}
//             </button>
//         );
//     }
// }

// class Board extends React.Component {
//     // constructor(){
//     //     super();
//     //     this.state = {
//     //         squares: Array(9).fill(null),
//     //         xIsNext:true,
//     //     };
//     // }
//     // changeValue(i){
//     // var newArray = this.state.squares.slice();//slice放回一个子数组，为空的话子数组和父数组的元素是一样的
//     // if (calculateWinner(newArray) || newArray[i]) {
//     //     return;
//     // }
//     // var next = this.state.xIsNext ? 'x':'o';
//     // newArray[i]=next;
//     // this.setState({
//     //     squares:newArray,
//     //     xIsNext:!this.state.xIsNext
//     // })
//     // this.props.onClick(i)
//     // }
//     renderSquare(i) {
//         return <Square value={this.props.squares[i]} changeValue={() => this.props.onClick(i)}/>;
//     }
//
//     render() {
//         const winner = calculateWinner(this.props.squares);
//         let status;
//         if (winner) {
//             status = 'Winner: ' + winner;
//         } else {
//             status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
//         }
//         return (
//             <div>
//                 <div className="status">{status}</div>
//                 <div className="board-row">
//                     {this.renderSquare(0)}
//                     {this.renderSquare(1)}
//                     {this.renderSquare(2)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(3)}
//                     {this.renderSquare(4)}
//                     {this.renderSquare(5)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(6)}
//                     {this.renderSquare(7)}
//                     {this.renderSquare(8)}
//                 </div>
//             </div>
//         );
//     }
// }

// class Game extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             history: [{
//                 squares: Array(9).fill(null),
//             }],
//             xIsNext: true,
//         }}
//         handleClick(i)
//         {
//             //获取历史最后一个
//             var newArray = this.state.history[this.state.history.length - 1].squares.slice();//slice放回一个子数组，为空的话子数组和父数组的元素是一样的
//             if (calculateWinner(newArray) || newArray[i]) {
//                 return;
//             }
//             var next = this.state.xIsNext ? 'x' : 'o';
//             newArray[i] = next;
//             var newHistory = this.state.history.slice();
//             newHistory.push({squares: newArray});
//             this.setState({
//                 history: newHistory,
//                 xIsNext: !this.state.xIsNext
//             })
//             console.log(this.state.history);
//         }
//         changeCurrent(i)
//         {
//
        {/*}*/}
        {/*render()*/}
//         {
//             const historyList = this.state.history.map((number, i) =>
//                 <li key={i} onClick={() => {
//                     this.changeCurrent(i)
//                 }}>{i}</li>
//             );
//             return (
//                 <div className="game">
//                     <div className="game-board">
//                         <Board onClick={(i) => {
//                             this.handleClick(i)
//                         }} squares={this.state.history[this.state.history.length - 1].squares}
//                                xIsNext={this.state.xIsNext}/>
//                     </div>
//                     <div className="game-info">
//                         <div>{/* status */}</div>
//                         <ol>{historyList}
//                         </ol>
//                     </div>
//                 </div>
//             );
//         }
// }

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        /**
         * ['(0,0)','(0,1)','(0,2)']
         * ['(1,0)','(1,1)','(1,2)']
         * ['(2,0)','(2,1)','(2,2)']
         * ['(0,0)','(1,0)','(2,0)']
         * ['(0,1)','(1,1)','(2,1)']
         * ['(0,2)','(1,2)','(2,2)']
         * ['(0,0)','(1,1)','(2,2)']
         * ['(0,2)','(1,1)','(2,0)']
         * 按照坐标表示
         */
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Remarkable from 'remarkable'

import PropTypes from 'prop-types';

// class Greeting extends React.Component {
//     static defaultProps = {
//         name: 'stranger'
//     }
//     render() {
//         return (
//             <h1>Hello, {this.props.name}</h1>
//         );
//     }
// }
//
// Greeting.propTypes = {
//     name: PropTypes.string
// };
// // 为属性指定默认值:
// // Greeting.defaultProps = {
// //     name: 'Stranger'
// // };
//
// class MyComponent extends React.Component {
//     render() {
//         // This must be exactly one element or it will warn.
//         const children = this.props.children;
//         return (
//             <div>
//                 {children}
//             </div>
//         );
//     }
// }
//
// MyComponent.propTypes = {
//     children: PropTypes.element.isRequired
// };
//
// class MyComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.myRef = React.createRef();
//     }
//     handleClick(){
//         console.log(this.myRef.current);
//     }
//     render() {
//         return <div ref={this.myRef} onClick={()=>{this.handleClick()}}>12314</div>;
//     }
// }

//函数式组件内部使用ref
// function CustomTextInput(props) {
//     // 这里必须声明 textInput，这样 ref 回调才可以引用它
//     let textInput = null;
//
//     function handleClick() {
//         textInput.focus();
//     }
//
//     return (
//         <div>
//             <input
//                 type="text"
//                 defaultValue="Bob"
//                 ref={(input) => { textInput = input; }} />
//
//             <input
//                 type="button"
//                 value="Focus the text input"
//                 onClick={handleClick}
//             />
//         </div>
//     );
// }

// function Button() {
//     return (<React.Fragment>
//         <p>dasdasd</p>
//         <p>sdadad</p>
//     </React.Fragment>)
// }
//
// function ThemedButton(props) {
//     return <Button theme={props.theme} />;
// }
//
// // 中间组件
// function Toolbar(props) {
//     // Toolbar 组件必须添加一个额外的 theme 属性
//     // 然后传递它给 ThemedButton 组件
//     return (
//         <div>
//             <ThemedButton theme={props.theme} />
//         </div>
//     );
// }
//
// class App extends React.Component {
//     render() {
//         return <Toolbar theme="dark" />;
//     }
// }

// 创建一个 theme Context,  默认 theme 的值为 light
// const ThemeContext = React.createContext('light');
//
// function ThemedButton(props) {
//     // ThemedButton 组件从 context 接收 theme
//     return (
//         <ThemeContext.Consumer>
//             {theme => <Button {...props} theme={theme} />}
//         </ThemeContext.Consumer>
//     );
// }
//
// // 中间组件
// function Toolbar(props) {
//     return (
//         <div>
//             <ThemedButton />
//         </div>
//     );
// }
//
// class App extends React.Component {
//     render() {
//         return (
//             <ThemeContext.Provider value="dark">
//                 <Toolbar />
//             </ThemeContext.Provider>
//         );
//     }
// }

// class Glossary extends React.Component {
//     handleClick(){
//         throw new Error('I am 213')
//     }
//     render(){
//         return (
//         <div>
//             <dl>
//                 {this.props.items.map(item => (
//                     // 没有`key`，将会触发一个key警告
//                     <React.Fragment key={item.id}>
//                         <dt>{item.term}</dt>
//                         <dd>{item.description}</dd>
//                     </React.Fragment>
//                 ))}
//             </dl>
//             <p onClick={()=>{this.handleClick()}}>点击抛错</p>
//         </div>
//     );
// }
// }
//
// class ErrorBoundary extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { hasError: false };
//     }
//     componentDidCatch(error, info) {
//         // Display fallback UI
//         console.log('222222222222')
//         this.setState({ hasError: true });
//         // You can also log the error to an error reporting service
//         // logErrorToMyService(error, info);
//     }
//     render() {
//         if (this.state.hasError) {
//             console.log('11111')
//             // You can render any custom fallback UI
//             return <h1>Something went wrong.</h1>;
//         }
//         return this.props.children;
//     }
// }

const MD_CONTENT = `Heading
=======

Sub-heading
-----------
 
### Another deeper heading
 
> Paragraphs are separated
by a blank line.

Leave 2 spaces at the end of a line to do a  
line break

Text attributes *italic*, **bold**, \`code\`
 ~~strikethrough~~ .

Shopping list:

  * apples
  * oranges
  * pears

Numbered list:

  1. apples
  2. oranges
  3. pears
`;

class Test extends React.Component{
    constructor(){
        super();
        this.state = {
            value: MD_CONTENT
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({
            value:e.target.value
        })
    }
    getRawMarkup() {
        var md = new Remarkable();
        return { __html: md.render(this.state.value) };
    }


    render(){
        return (<div>
                <textarea
                    onChange={this.handleChange}
                    defaultValue={this.state.value} />
            <div
                className="content"
                dangerouslySetInnerHTML={this.getRawMarkup()}
            />
        </div>)
    }
}


ReactDOM.render((
    <div>
       <Test/>
    </div>
    ),document.querySelector('#root'));


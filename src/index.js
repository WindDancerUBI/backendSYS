/*
 * @Author: your name
 * @Date: 2019-10-20 08:42:15
 * @LastEditTime: 2019-10-21 21:43:35
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /backendSYS/src/index.js
 */
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-20 08:42:15
 * @LastEditTime: 2019-10-20 08:42:15
 * @LastEditors: your name
 */
import React from 'react' 
import ReactDOM from 'react-dom' 
import App from './App' 
import Store from "./store";
import { Provider } from "mobx-react";

const Root = () => (
    <Provider {...new Store()}>
        <App />
    </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
/**
 * @format
 */
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import Login from './src/screens/login';
import store from './store';
const RootApp=()=>{
    return(
        <Provider
        store={store}>  
           <App/>
        </Provider>
    )
}
AppRegistry.registerComponent (appName, () => RootApp);

import 'react-native-gesture-handler';
import * as React from 'react';
import RootNavigator from './client/index';
import { Provider } from 'react-redux';
import store from './client/store';


export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator/>
    </Provider>
    )
}
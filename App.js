import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Main from './components/Main';
import reducer, { initialState } from './components/reducer';
import { StateProvider } from './components/stateProvider';


export default function App() {


  return (
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Main />
    </StateProvider>
  </React.StrictMode>
  );
}

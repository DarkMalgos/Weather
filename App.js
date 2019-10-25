import React from 'react'
import AppNavigator from './navigation/AppNavigator'
import { Provider } from "react-redux"
import Store from './store/configureStore'

class App extends React.Component {
  render () {
    return (
      <Provider store={Store}>
        <AppNavigator />
      </Provider>
    )
  }
}

export default App;
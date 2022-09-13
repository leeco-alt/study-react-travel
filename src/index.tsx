import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import 'antd/dist/antd.min.css'
import './i18n/configs'
import { Provider } from 'react-redux'
import rootstore from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import axios from 'axios'

axios.defaults.headers['x-icode'] = 'JF8A91CDFFDDC3FCA'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={rootstore.store}>
      <PersistGate loading={null} persistor={rootstore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

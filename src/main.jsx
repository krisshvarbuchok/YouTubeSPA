//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './componens/App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
  //</StrictMode>,
)

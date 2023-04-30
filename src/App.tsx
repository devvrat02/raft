import './App.css';
import Router from './Router';
import {store} from './store';
import { Provider } from "react-redux"
import "./view/style.css";
function App() {
  return (
    <div className="App">
        <Provider store={store}>
          <Router/>
        </Provider>
    </div>
  );
}


export default App;

import './App.css';
import { Provider } from 'react-redux';
import Overview from './pages/Overview';
import store from 'redux/store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="">
        <Overview />
      </div>
    </Provider>
  );
}

export default App;

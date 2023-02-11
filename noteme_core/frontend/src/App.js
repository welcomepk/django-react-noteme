import './App.css';
import Header from './components/Header';
import NotesListScreen from './pages/NotesListScreen';
import NotePage from './pages/NotePage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const Comp = () => <div>sdkjn</div>

function App() {
  return (
    <Router>
      <div className='container dark'>


        <div className="app">
          <Header />
          <Route path="/" component={NotesListScreen} exact />
          <Route path="/notes/:id" component={NotePage} exact />
          {/* <Route path="/" exact>
          <NotesListScreen />
        </Route> */}
        </div>
      </div>
    </Router>
  );
}

export default App;

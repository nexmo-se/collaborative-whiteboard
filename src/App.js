import logo from './logo.svg';
import './App.css';
import '@vonagevolta/volta2/dist/css/volta.min.css';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import VideoHoverContainer from './components/VideoHoverContainer';
import VideoControl from './components/VideoControl';
import VirtualViewer from './components/VirtualViewer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

function App() {
  return (
    // <>
    //   {/* <div className="wrapper"> */}
    //   <Main />
    //   {/* </div> */}
    //   {/* <Footer /> */}
    //   {/* <VideoHoverContainer>
    //     <VideoControl></VideoControl>
    //   </VideoHoverContainer> */}
    // </>
    <Router>
      <Switch>
        <Route path="/virtualviewer">
          <VirtualViewer />
        </Route>
        <Route path="/">
          <Main />
        </Route>
        {/* <Route path="*">
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;

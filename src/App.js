import logo from './logo.svg';
import './App.css';
import '@vonagevolta/volta2/dist/css/volta.min.css';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import VideoHoverContainer from './components/VideoHoverContainer';
import VideoControl from './components/VideoControl';

function App() {
  return (
    <>
      <div className="wrapper">
        <Main />
      </div>
      {/* <Footer /> */}
      {/* <VideoHoverContainer>
        <VideoControl></VideoControl>
      </VideoHoverContainer> */}
    </>
  );
}

export default App;

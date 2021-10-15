import logo from './logo.svg';
import './App.css';
import '@vonagevolta/volta2/dist/css/volta.min.css';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Main />
      {/* <Footer /> */}
    </div>
  );
}

export default App;

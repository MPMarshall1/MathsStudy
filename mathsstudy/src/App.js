// App.js
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import BottomNav from './BottomNav';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Sidebar />
      <Content />
      <BottomNav />
    </div>
  );
}

export default App;

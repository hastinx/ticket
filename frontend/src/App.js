import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './app/pages/auth/login';
import Register from './app/pages/auth/register';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import ListEvent from './app/pages/event/list';
import Wishlist from './app/pages/event/wishlist';
import History from './app/pages/event/history';
import MasterEvent from './app/pages/master/event';
import Attendance from './app/pages/master/attendance';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/event" element={<ListEvent />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/history" element={<History />} />
          <Route path="/mst-event" element={<MasterEvent />} />
          <Route path="/mst-event/attendance" element={<Attendance />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

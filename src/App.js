import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';

import Thank from './pages/Thank';
import Delete1 from './pages/Delete1';
import BookTicket from './pages/BookTicket';
import Payment from './pages/Payment';
import OrderStatusCheck from './pages/OrderStatusCheck';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/Admin' element={<Admin />} />
          <Route path='/Admin/Delete1' element={<Delete1 />} /> */}
          {/* <Route path='/Personalinfo' element={<Personal />} /> */}
          {/* <Route path='/cheak' element={<Cheak />} /> */}
          <Route path='/Thank' element={<Thank />} />
          <Route path='/BookTicket' element={<BookTicket />} />
          <Route path='/BookTicket/Payment' element={<Payment />} />
          {/* <Route path='/OrderStatusCheck' element={<OrderStatusCheck />} /> */}
          <Route path='/BookTicket/Payment/Delete1' element={<Delete1 />} />
          <Route path='/BookTicket/Payment/Delete1/Thank' element={<Thank />} />

          
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from 'react'
import { Route,  Routes } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Forsage1 from './page/Forsage1';
import Forsage2 from './page/Forsage2';
import Forsage3 from './page/Forsage3';
import Forsage4 from './page/Foesage4';
import Forsage5 from './page/Foesage5';
import Landingpage from './Landingpage/Landingpage';
import Registration from './component/Registration';
import Statstable from './component/Statstable';
import Partnerstable from './component/Partnerstable';

const App = () => {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/Preview50" element={<Forsage1 />} />
          <Route path="/Preview100" element={<Forsage2 />} />
          <Route path="/Preview200" element={<Forsage3 />} />
          <Route path="/Preview500" element={<Forsage4 />} />
          <Route path="/Preview1000" element={<Forsage5 />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/stats" element={<Statstable />} />
          <Route path="/partners" element={<Partnerstable />} />
        </Routes>
      </React.Fragment>

      
    </div>
  )
}

export default App

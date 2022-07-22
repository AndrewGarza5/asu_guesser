import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from './HomePage/HomePage.js';
import GamePage from './GamePage/GamePage.js'
import Mobile from './Mobile'
import PageNotFound from './PageNotFound'
import Design from './Design'
import Donate from './Donate'
import About from './About'
import Leaderboards from './Leaderboards'

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
        
      <Route path="/game" element={<GamePage />} >
        {/* <Route path="/:gameId" element={<??? />} /> */}
      </Route>
      <Route path="/mobile" element={<Mobile />} />
      <Route path="/design" element={<Design />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/about" element={<About />} />
      <Route path="/leaderboards" element={<Leaderboards />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
 


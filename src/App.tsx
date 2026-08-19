import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element= {<HomePage />} />
        <Route path="/news/:id" element={<NewsPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
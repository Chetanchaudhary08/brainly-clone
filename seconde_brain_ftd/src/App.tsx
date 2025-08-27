import './App.css'
import './index.css';
import HomePage from './Pages/HomePage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import SharedPage from './Pages/SharedPage';

function App() {

    return <div>

        <BrowserRouter>
            <Routes>
                <Route path='/HomePage' element={<HomePage />} />
                <Route path='/' element={<RegisterPage />} />
                <Route path='/share/:id' element={<SharedPage />} />
                <Route path="*" element={<Navigate to="/HomePage" />} />
            </Routes>
        </BrowserRouter>
    </div>

}

export default App;
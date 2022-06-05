import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import {LoadingScreen} from './components'
import { Home, Purchases, Login, ProductsDetail } from './pages';
import NavbarHome from './components/NavbarHome';

function App() {

  const isLoading = useSelector(state => state.isLoading);

  return (
    
    <HashRouter>
    <NavbarHome/>
      <Container>
        {isLoading && <LoadingScreen/>}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products/:id' element={<ProductsDetail/>}/>
          <Route path='/purchases' element={<Purchases/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Container>
    </HashRouter>
    
  );
}

export default App;

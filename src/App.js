import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import {LoadingScreen, ProtectedRoutes, NavbarHome} from './components'
import { Home, Purchases, Login, ProductsDetail,  } from './pages';

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
          <Route path='/login' element={<Login/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/purchases' element={<Purchases/>}/>
        </Route>
        </Routes>
      </Container>
    </HashRouter>
    
  );
}

export default App;

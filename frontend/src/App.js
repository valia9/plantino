
import './App.css';
import Menu from './components/Menu';
import { ToastContainer } from 'react-toastify';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MyList from './components/MyList';
import NewPlant from './components/NewPlant';
import PlantId from './components/PlantId';
import Error from './components/Error';
import Welcome from './components/Welcome';
import { PrivateRoute } from './components/PrivateRoute';
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const user = localStorage.getItem("token");
  return (
    <div className="container">
      <h1 className='logo'>PLANTINO</h1>
      <BrowserRouter>
    <Routes>
        {/* <Route exact path="/">
        {loggedIn ? <Redirect to="/main" /> : <SignIn />}
      </Route> */}
        <Route 
          path="/"
          element={ user ? <Menu /> : <Welcome />} >
        <Route
          path="welcome"
          element={<Welcome />} />
        <Route
          path="signin"
          element={<SignIn />} />
        <Route
          path="signup"
          element={<SignUp />} />
        <Route 
          path="main" 
          element={
          <PrivateRoute>
            <Menu />
          </PrivateRoute>} />
        <Route
          path="mylist"
          element={
          <PrivateRoute>
            <MyList />
          </PrivateRoute>} />
        <Route
          path="addplant"
          element={
          <PrivateRoute>
            <NewPlant />
          </PrivateRoute>} />
        <Route
          path="plantid"
          element={
            <PrivateRoute>
              <PlantId />
            </PrivateRoute>} />
        <Route
          path="*"
          element={<Error />} />
      </Route>
    </Routes>
    </BrowserRouter>
    <ToastContainer closeButton={false}/>
    </div>
  );
}

export default App;

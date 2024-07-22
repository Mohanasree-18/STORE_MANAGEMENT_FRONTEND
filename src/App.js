import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./Index.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import PrivateNavbar from "./Components/PrivateNavbar";
import LoginForm from "./Components/Login";
import RegistrationForm from "./Components/Registration";
import { getUserFromStorage } from "./utils/getUserFromStorage";
import { useSelector } from "react-redux";
import Singleshop from "./Components/loginShop";
import ShopList from "./Components/allshops";
import UpdateForm from "./Components/Updateshop";
import DeleteComponent from "./Components/Deleteshop";
import NearComponent from "./Components/nearshops";
import SearchForm from "./Components/searchshops";
import AuthRoute from "./Components/Routeprotection/AuthRoute";

function App() {
  //get the token from localstorage
  const token = getUserFromStorage();
  //get the token or user from redux store
  const user = useSelector((state) => state?.auth?.user);
  console.log(user);

  return (
    <BrowserRouter>
      {user ? <PrivateNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/search" element={<SearchForm />} />
        <Route path="/allshops" element={<ShopList />} />

        <Route
          path="/loginShop"
          element={
            <AuthRoute>
              <Singleshop />
            </AuthRoute>
          }
        />
        <Route
          path="/update"
          element={
            <AuthRoute>
              <UpdateForm />
            </AuthRoute>
          }
        />
        <Route
          path="/delete"
          element={
            <AuthRoute>
              <DeleteComponent />
            </AuthRoute>
          }
        />
        <Route
          path="/nearme"
          element={
            <AuthRoute>
              <NearComponent />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

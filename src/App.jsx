import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Update from "./pages/Update";
import Create from "./pages/Create";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { authSuccess } from "./redux/slice/authSlice";
import Service from "./config/service";
import { getFromLocalStorage } from "./config/localstorage";
import BookInfo from "./pages/BookInfo";

export default function App() {
  const dispatch = useDispatch();
  const [nomi, setNomi] = useState("");

  useEffect(() => {
    try {
      const getAuthFunction = async () => {
        const { data } = await Service.getAuth();
        dispatch(authSuccess(data));
      };

      if (getFromLocalStorage("token")) {
        getAuthFunction();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <Navbar nomi={nomi} setNomi={setNomi} />

      <Routes>
        <Route path="/" element={<Home nomi={nomi} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/create-new" element={<Create />} />
        <Route path="/update-book/:id" element={<Update />} />
        <Route path="/books/:id" element={<BookInfo />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  )
}
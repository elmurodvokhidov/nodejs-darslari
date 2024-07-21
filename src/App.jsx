import { Route, Routes, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { authSuccess } from "./redux/slice/authSlice";
import Service from "./config/service";
import { getFromLocalStorage } from "./config/localstorage";
import BookInfo from "./pages/BookInfo";
import { Toast } from "./config/sweetAlert";
import { UpdatePassword } from "./pages/UpdatePassword";
import { Orders } from "./pages/Orders";
import { ProfileInfo } from "./pages/ProfileInfo";

export default function App() {
  const { auth, isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [nomi, setNomi] = useState("");
  const navigate = useNavigate();

  const getAuthFunction = async () => {
    const { data } = await Service.getAuth();
    dispatch(authSuccess(data));
  };

  useEffect(() => {
    try {
      if (getFromLocalStorage("token")) {
        getAuthFunction();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const addToBasketFunction = async (bookId) => {
    if (isLoggedIn) {
      try {
        const { data } = await Service.addToBasket(auth?._id, bookId);
        Toast.fire({ icon: "success", title: data?.message });
        getAuthFunction();
      } catch (error) {
        console.log(error.message);
        Toast.fire({ icon: "warning", title: error?.response?.data || error.message });
      }
    }
    else {
      navigate("/signin");
    }
  };

  const toggleLikeFunction = async (bookId) => {
    if (isLoggedIn) {
      try {
        const { data } = await Service.toggleLike(auth?._id, bookId);
        Toast.fire({ icon: "success", title: data?.message });
        getAuthFunction();
      } catch (error) {
        console.log(error.message);
        Toast.fire({ icon: "warning", title: error?.response?.data || error.message });
      }
    }
    else {
      navigate("/signin");
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <Navbar nomi={nomi} setNomi={setNomi} />

      <Routes>
        <Route path="/" element={<Home
          nomi={nomi}
          addToBasketFunction={addToBasketFunction}
          getAuthFunction={getAuthFunction}
          toggleLikeFunction={toggleLikeFunction}
        />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="orders" element={<Orders />} />
          <Route path="me" element={<ProfileInfo />} />
        </Route>
        <Route path="/wishlist" element={<Wishlist
          addToBasketFunction={addToBasketFunction}
          toggleLikeFunction={toggleLikeFunction}
        />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/create-new" element={<Create />} />
        <Route path="/update-book/:id" element={<Update />} />
        <Route path="/books/:id" element={<BookInfo
          addToBasketFunction={addToBasketFunction}
          toggleLikeFunction={toggleLikeFunction}
        />} />
        <Route path="/update-password/:userId/:uniqueId" element={<UpdatePassword />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  )
}
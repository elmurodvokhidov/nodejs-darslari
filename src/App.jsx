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

export default function App() {
  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/create-new" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  )
}
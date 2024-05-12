import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../page/home";
import LoginPage from "../page/login";
import BookPage from "../page/book";
import OrderPage from "../page/order";
import CartPage from "../page/cart";
import RankPage from "../page/rank";
import ProfilePage from "../page/profile";

export default function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route index path="/login" element={<LoginPage />} />
            <Route path="/book/:id" element={<BookPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/rank" element={<RankPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/*" element={<HomePage />} />
        </Routes>
    </BrowserRouter>;
}
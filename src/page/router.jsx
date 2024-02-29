import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home";
import LoginPage from "./login";
import BookPage from "./book";
import CartPage from "./cart";
import OrderPage from "./order";
import RankPage from "./rank";
// import ApiPage from "../page/api";

export default function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/book/:id" element={<BookPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/rank" element={<RankPage />} />
            // <Route path="/api-docs" element={<ApiPage />} />
            <Route path="/*" element={<HomePage />} />
        </Routes>
    </BrowserRouter>
}
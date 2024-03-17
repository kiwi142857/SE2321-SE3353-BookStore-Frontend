import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../page/home";
import LoginPage from "../page/login";
import BookPage from "../page/book";
import OrderPage from "../page/order";

export default function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<HomePage />} />
            <Route path="/book/:id" element={<BookPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/order" element={<OrderPage />} />
        </Routes>
    </BrowserRouter>;
}
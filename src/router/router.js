import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../component/header/header";
import Footer from "../component/footer/footer";
import Blog from "../pages/home";
import { CssBaseline } from "@mui/material";
import Detail from "../pages/detail-page/detail";
import Search from "../pages/search/search";
import Category from "../pages/category";
export default function RouterDom() {
  return (
    <BrowserRouter>
      <CssBaseline />
        <Header/>
        <Routes>
            <Route path="/" element={<Blog/>}/>   
            <Route path="/details/:id" element={<Detail/>}/>   
            <Route path="/:slug" element={<Category/>}/>   
            <Route path="/search/:key" element={<Search/>}/>  
 
        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}
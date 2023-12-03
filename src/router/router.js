import { BrowserRouter, Route, Routes, createBrowserRouter } from "react-router-dom";

import Home from "../pages/home";
import Header from "../component/header/header";
import Footer from "../component/footer/footer";
import Blog from "../pages/home";
import { CssBaseline } from "@mui/material";
import Detail from "../pages/detail-page/detail";
import Mobile from "../pages/mobile";
import Search from "../pages/search/search";
export default function RouterDom() {
  return (
    <BrowserRouter>
      <CssBaseline />
        <Header/>
        <Routes>
            <Route path="/" element={<Blog/>}/>   
            <Route path="/details/:id" element={<Detail/>}/>   
            <Route path="/:slug" element={<Mobile/>}/>   
            <Route path="/search/:key" element={<Search/>}/>  
 
        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}
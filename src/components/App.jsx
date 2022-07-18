import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import PostDetails from "./PostDetails";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:post_id" element={<PostDetails/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    )
  }
}

export default App;

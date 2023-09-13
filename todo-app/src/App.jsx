import React from "react";
import { MantineProvider } from '@mantine/core';
import Todo from "./Components/Todo";
import SettingsProvider from "./Context/SettingsContext";


import Header from "./Components/Header";
import Footer from "../src/Components/Footer";
import { Route, Routes } from "react-router-dom";
import Settings from "./Components/Settings";

export default class App extends React.Component {
  render() {
    return (
      <>
      <Header />
      
      <SettingsProvider>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </SettingsProvider>
      <Footer />
    
      </>
    );
  }
}
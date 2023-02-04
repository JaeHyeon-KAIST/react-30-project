import React, { useRef, useState } from 'react';
import './App.css';
import FontControlBox from './components/FontControlBox';
import Footer from './components/Footer';
import Form from './components/Form';
import Modal from './components/Modal';

function App() {
  return (
    <>
      <section className="form-wrapper">
        <Form/>
        <Footer/>
      </section>
      <FontControlBox/>
    </>
  )
}

export default App

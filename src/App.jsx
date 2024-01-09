import React, { useEffect, useState } from 'react';
import './App.css';
import Filter from './Filter';
import Header from './Header';

// () []
export default function App() {

  return (
      <div className="container">
      <Header/>
      <Filter />
      </div>
  );
}
import React from 'react';
import logo from './logo.svg';
import './App.css';

interface Csavar{
  id: number;
  tipus: string;
  hossz: number;
  keszlet: number;
  ar: number;
}

interface CsavarListResponse{
  csavarok: Csavar[];
}

interface State{
  csavarok: Csavar[] 
  tipusInput: string;
  hosszInput: number;
  arInput: number;
  keszletInput: number;
}

export default App;

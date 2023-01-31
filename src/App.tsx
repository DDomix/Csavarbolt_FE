import React, { Component } from 'react';
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

class App extends Component<{}, State>{
  constructor(props: {}){
    super(props);

    this.state = {
      tipusInput: '',
      hosszInput: 0,
      arInput: 0,
      csavarok: [],
      keszletInput: 0,
    }
  }

  async loadCsavarok() {
    let response = await fetch('http://localhost:3000/api/csavarbolt');
    let data = await response.json() as Csavar[];
    console.log(data);
    this.setState({
      csavarok: data, 
    })
  }

  componentDidMount() {
    this.loadCsavarok();
  }

}

export default App;

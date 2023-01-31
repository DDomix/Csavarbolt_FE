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

interface State{
  csavarok: Csavar[]; 
  tipusInput: string;
  hosszInput: number;
  arInput: number;
  keszletInput: number;
}

interface CsavarListResponse{
  csavarok: Csavar[];
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
    let response = await fetch('http://localhost:3000/api/csavar');
    let data = await response.json() as CsavarListResponse;
    console.log(data);
    this.setState({
      csavarok: data.csavarok, 
    })
  }

  componentDidMount() {
    this.loadCsavarok();
  }

  handleUpload = async () => {
    const { tipusInput, hosszInput, keszletInput, arInput} = this.state;
    if(tipusInput.trim() === '' || hosszInput<1 || keszletInput<1 || arInput <1 ){
      //this.setState(error)
      return;
    }

    const adat = {
      tipus: tipusInput,
      hossz: hosszInput,
      ar: arInput,
      keszlet: keszletInput,
    };

    let response = await fetch('http://localhost:3000/api/csavar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adat),
    });

    this.setState({ 
      tipusInput: '',
      hosszInput: 0,
      keszletInput: 0,
      arInput: 0,
    })

    await this.loadCsavarok();
  };
  
  render(){
    const { tipusInput, hosszInput, keszletInput, arInput} = this.state;
    return <div>
    <h2>Új Csavar</h2>
    Tipus: <input type='text' value={tipusInput} onChange={e => this.setState({ tipusInput: e.currentTarget.value})}></input><br/>
    Hossz: <input type='number' value={hosszInput} onChange={e => this.setState({ hosszInput: parseInt(e.currentTarget.value) })}></input> <br/>
    Készlet: <input type='number' value={keszletInput} onChange={e => this.setState({ keszletInput: parseInt(e.currentTarget.value) })}></input> <br/>
    Ár: <input type='number' value={arInput} onChange={e => this.setState({ arInput: parseInt(e.currentTarget.value) })}></input> <br/>
    <button onClick={this.handleUpload}>Hozzaad</button> <br />
    <h2>Csavarok:</h2>
    <ul>{
          this.state.csavarok.map(csavar => 
            <li>{csavar.tipus}, {csavar.hossz}cm, {csavar.ar}Ft, {csavar.keszlet}db,</li>
          )
        }</ul>        
    </div>
  }
}

export default App;

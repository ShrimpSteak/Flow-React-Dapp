import './App.css';
import * as fcl from '@onflow/fcl'
import * as types from '@onflow/types'
import {getGreeting} from './cadence/script/getGreeting.js'
import { changeGreeting } from './cadence/transaction/changerGreeting';

import react,{useState} from "react"
//0x0af89e0e8daf8a93

function App() {
const [user,setUser] = useState();
const [greetingstr,setGreetingStr] = useState();
  fcl.config()
    .put("accessNode.api", "https://access-testnet.onflow.org") //pointing to testnet
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn") //tells our dapp to use testnet wallets

  const getTheGreeting = async ()=> {
      const result = await fcl.send([
        fcl.script(getGreeting)
      ]).then(fcl.decode)
      setGreetingStr(result)
      console.log(result);
  }

  const login = ()=>{
    fcl.authenticate();
    fcl.currentUser().subscribe(setUser);
  }

  const changeTheGreeting = async () =>{
    const transactionId = await fcl.send([
      fcl.transaction(changeGreeting),
      fcl.args([
        fcl.arg("Goodbye!",types.String)
      ]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999)
    ]).then(fcl.decode)

    console.log(transactionId);
  }
  

  return (
    <div className="App">
      <h1>Hello!World!</h1>
      <h1>Account Address: {user && user.addr ? user.addr : ''}</h1>
      <h1>HelloWorld's Greeting: {greetingstr ? greetingstr : ''}</h1>
      <button onClick={()=> getTheGreeting()}>Get Greeting</button>
      <button onClick={()=> changeTheGreeting()}>Change Greeting</button>
      <button onClick={()=> login()}>Log In</button>
    </div>
  );
}

export default App;

"use client";
import "./style.css"
import { useEffect, useState } from 'react';
import {Contract} from '../utils/contract'
const Navbar = () => {
    const [address, setaddress] = useState('');
    const [bol_address, setBol_address] = useState(false);


    async function ConnectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setaddress(accounts[0]);
            console.log('Connected account address:', address);
            setBol_address(true);
        } else {
            alert('MetaMask is not installed');
        }
      
    }
    ConnectWallet()
  return (<>
    <link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap" rel="stylesheet" />
    <div className="nav-parent">
      <div className="nav-wrapper">
        <div className="branding">
          <a href="#">werty</a>
        </div>
        <ul>
        <li><a href="#" className='text-lg hover:text-gray-500'>Leaderboard</a></li>
      <li><a href="#games" className=' text-lg hover:text-gray-500'>Games</a></li>
      <li><button onClick={()=>Contract()}>balance</button></li>
        <li>  {bol_address == false?<button onClick={ConnectWallet} className="bg-transparent hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded">
 Connect Wallet
</button>:<button className="bg-transparent hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded disabled">
{address.slice(0, 6) + '...' + address.slice(address.length - 4, address.length)}
</button>}</li></ul>
        <a className="burger">
          <div className="bar" />
          <div className="bar" />
        </a>
      </div>
    </div>
    <div className="burger-links text-lg">
      <ul>
      <li><a href="#" className='text-lg hover:text-gray-500'>Leaderboard</a></li>
        <li>  {bol_address == true?<button onClick={ConnectWallet} className="bg-transparent hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded">
 Connect Wallet
</button>:<button className="bg-transparent hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded disabled">
{address.slice(0, 6) + '...' + address.slice(address.length - 4, address.length)}
</button>}</li></ul>
    </div>
    </>
  )
}

export default Navbar
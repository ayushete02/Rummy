import React from 'react'
import Web3 from "web3";
import { abi, contractAddress } from "./abi";
import { useState } from "react";

var address = '0x1D853e5a1eE20b61dc3187558Eda7F3b8eD14AB7';
export const Contract = async () => {
     
    
      window.addEventListener("load", async () => {
        try {
          await ethereum.enable();
        } catch (error) {}
      });
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi, contractAddress);
      const balanceOf = await contract.methods.balanceOf(address).call();
    alert(balanceOf);

    const MakePayment = await contract.methods
    .transfer('0x7ED790A1Ac108b9A50e24f5c5E061df59e3673a7', BigInt((parseInt(10)) * 10 ** 18))
    .send({ from: address });
  
};


  'use client'
  import React from "react";
  import "./style.css"
  import { useState } from "react";
  import Image from "next/image";
import Navbar from "@/components/navbar";

  const LandingPage = () => {

    return (
      <div className="scroll-smooth">
        <Navbar/>
            <div className="home-section h-screen">
        <h1 className="bg-gradient-to-r from-white via-gray-500 to-black text-transparent bg-clip-text">
          Designing a Better World: Meet Our Creative Heroes.
        </h1>
      </div>

      <div id="games" className=" container my-12 mx-auto px-4 md:px-12">
    <div className="flex flex-wrap pt-20 -mx-1 lg:-mx-4">
      
      <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
        <article className="overflow-hidden rounded-lg shadow-lg bg-white border-4 text-black" >
          <a href="/game/tic-tac-toe">
            <img alt="Placeholder" className="block h-auto w-full" src="https://picsum.photos/600/400/?random" />
          </a>
          <header className="flex items-center justify-center leading-tight p-2 md:p-4 md:pb-0">
            <h1 className="text-lg">
              <a className="no-underline hover:underline text-black" href="#">
                Tic Tac Toe
              </a>
            </h1>
            {/* <p className="text-grey-darker text-sm">
              11/1/19
            </p> */}
          </header>
          <footer className="flex items-center justify-center leading-none p-2 md:p-4 text-black">
              <p className="ml-2 text-sm">
              won upto 100Matic
              </p>
           
          </footer>
        </article>
      </div>
    
      <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
        <article className="overflow-hidden rounded-lg shadow-lg bg-white border-4 text-black" >
          <a href="/game/tic-tac-toe">
            <img alt="Placeholder" className="block h-auto w-full" src="https://picsum.photos/600/400/?random" />
          </a>
          <header className="flex items-center justify-center leading-tight p-2 md:p-4 md:pb-0">
            <h1 className="text-lg">
              <a className="no-underline hover:underline text-black" href="#">
                Tic Tac Toe
              </a>
            </h1>
            {/* <p className="text-grey-darker text-sm">
              11/1/19
            </p> */}
          </header>
          <footer className="flex items-center justify-center leading-none p-2 md:p-4 text-black">
              <p className="ml-2 text-sm">
              won upto 100Matic
              </p>
           
          </footer>
        </article>
      </div>

      <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
        <article className="overflow-hidden rounded-lg shadow-lg bg-white border-4 text-black" >
          <a href="/game/tic-tac-toe">
            <img alt="Placeholder" className="block h-auto w-full" src="https://picsum.photos/600/400/?random" />
          </a>
          <header className="flex items-center justify-center leading-tight p-2 md:p-4 md:pb-0">
            <h1 className="text-lg">
              <a className="no-underline hover:underline text-black" href="#">
                Tic Tac Toe
              </a>
            </h1>
            {/* <p className="text-grey-darker text-sm">
              11/1/19
            </p> */}
          </header>
          <footer className="flex items-center justify-center leading-none p-2 md:p-4 text-black">
              <p className="ml-2 text-sm">
              won upto 100Matic
              </p>
           
          </footer>
        </article>
      </div>
      
    
    </div>
  </div>

      <div className="about-section">
        <div className="about-description text-center  m-auto max-w-4xl my-64">
          <div className="text-2xl">ABOUT US</div>
          <p>
            We're a creative studio that turns ideas into functional art. With a focus on collaboration and innovation, we offer a range of design services to help businesses stand out. Let's work together to bring your vision to life.
          </p>
        </div>
        <br />
        <div className="about-image m-auto my-32 max-w-xl border-2">
          <img src="https://images.unsplash.com/photo-1554941829-202a0b2403b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="img" />
        </div>
      </div>
      <footer className="">
        <img className="m-auto opacity-10" src={'https://trustpoint.yashgoyal.dev/images/brand-name.png'} alt=""/>
      </footer>
    </div>
    );
  };

  export default LandingPage;

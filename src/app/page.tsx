"use client"

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { login } from "@/services/Web3Service";

export default function Home() {
  const router = useRouter();

  const [wallet, setWallet] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
      const wallet = localStorage.getItem("wallet");
      if (wallet) {
        setWallet(wallet);
      }
  }, [])

  function btnLoginClick(){
    setMessage("Logging in...");
    login()
        .then(wallet => {
            setWallet(wallet);
            localStorage.setItem("wallet", wallet);
            setMessage("");
            router.push('/token');

        })
        .catch(err => setMessage(err.message));
}

function btnLogoutClick(){
    setMessage("Logging out...");
    setWallet("");
    localStorage.removeItem("wallet");
    setMessage("");
}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">

        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        FIRMEZA TOKEN
      </div>
      <div>
        {
              !wallet
              ? (
                  <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-8 lg:text-left">
                  <a href="#" onClick={btnLoginClick} target="_self" rel="noopener noreferrer"
                    className="group rounded-lg border border-transparent px-1 py-1 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                    <p className="m-0 max-w-[80ch] text-sm opacity-50">
                  Login
                    </p>
                  </a>
                </div> 
              )
              : (
                  <>
                    <p>
                    <label>
                      Wallet connected: {wallet}
                    </label>
                    </p>

                    <p>
                    <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-8 lg:text-left">
                      <a href='/token' target="_self" rel="noopener noreferrer"
                        className="group rounded-lg border border-transparent px-1 py-1 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                        <p className="m-0 max-w-[80ch] text-sm opacity-50">
                        Go to token page
                        </p>
                      </a>
                    </div>                      
                    </p>
                    <p>
                      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-8 lg:text-left">
                        <a href="#" onClick={btnLogoutClick} target="_self" rel="noopener noreferrer"
                          className="group rounded-lg border border-transparent px-1 py-1 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                          <p className="m-0 max-w-[80ch] text-sm opacity-50">
                          Log Out
                          </p>
                        </a>
                      </div>                      
                    </p>
                  </>
              )
          }                
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-8 lg:text-left">
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
          {message}
          </p>
      </div>
    </main>
  );
}
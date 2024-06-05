"use client"

import { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { getPropertyDetail } from "@/services/Web3Service";

export default function Home() {

  const [wallet, setWallet] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [propertyId, setPropertyId] = useState<number>(0);

  const[propertyDetail, setPropertyDetail] = useState<{ 
    tokenId: number; metadata: string; rentAmount: number; propertyAmount: number;
    quantityTokens: number; availableTokens: number; initialOwner: string;
    percent: number; quotaValue: number; available: boolean;
    description: string; name: string;
    image: string; attributes: any; }[]>([]);

  useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    if (wallet) setWallet(wallet);
  }, [])

  function onPropertyChange(evt: ChangeEvent<HTMLInputElement>){
    const propertyId = parseInt(evt.target.value);
      setPropertyId(propertyId);
  }

  function btnPropertyDetail(){
    setMessage("getProperty detail.  wait ...");
    getPropertyDetail(propertyId)
        .then(result => {
            setMessage("");
            setPropertyDetail(result);
            setPropertyId(0);
        })
        .catch(err => setMessage(err.message))  
    }

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          FIRMEZA TOKEN PAGE 
          </div>
        </div>
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          {
            wallet
            ? (
                <>
                <p>
                    <label>
                        PropertyId:
                        <input type="number" id="propertyId" value={propertyId} onChange={onPropertyChange} />
                    </label>
                </p>
                <p>
                    <button className="btn bg-gradient-dark me-2" id="btnPropertyDetail" onClick={btnPropertyDetail}>get PropertyDetail</button>
                </p>

 
              </>
              ) 
              : <> </>                
          }
          </div>
          {message}
        </div>
  
        <div className="mb-2 grid text-center lg:mb-0 lg:w-full lg:max-w-12xl lg:grid-cols-3 lg:text-left">

            <h2 className="mb-1 text-2xl font-semibold">
              Token{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-3 max-w-[90ch] text-sm opacity-90">
 
                {propertyDetail != null && propertyDetail.length > 0 ? (
                      <div>
                      {propertyDetail.map((detail, index) => (
                          <p key={index}>
                              <img width={200} src={detail.image} alt=""/>   
                              <b>{detail.name || ''} </b> <br/>       
                                  {detail.attributes.map((attribute, index) => (
                                    <p key={index} >
                                      {typeof attribute.trait_type === 'string' ? attribute.trait_type : ''}: {typeof attribute.value === 'string' ? attribute.value : ''}
                                    </p>
                                  ))} <br/>

                              TokenId: #{detail.tokenId}<br/>
                              Valor Aluguel: {detail.rentAmount} <br/>  
                              Valor da Propriedade: {detail.propertyAmount} <br/>
                              Proprietario inicial: {detail.initialOwner} <br/>
                              Propriedade disponivel?:  {detail.available ? "Sim" : "Não"} <br/>

                              <br/>  <hr/>  <br/> 
                              Quantidade de Tokens: {detail.quantityTokens}<br/>
                              Tokens disponiveis: {detail.availableTokens} <br/>  
                              Valor da Cota: {detail.quotaValue} <br/>
                            </p>
                            ))
                            }
                      </div>
                    ) : ""
                    }
            </p>
        </div>
      </main>
    );
  }
  

import { ethers, Contract, Transaction } from "ethers";
import ABI from "./ABI.json";
import {readJson} from "./util";

const CONTRACT_ADDRESS : string = `${process.env.CONTRACT_ADDRESS}`;
const CHAIN_ID: number = parseInt(`${process.env.CHAIN_ID}`);

export async function login(): Promise<string> {
    if (!window.ethereum) throw new Error(`Wallet not found!`);

    const provider = new ethers.BrowserProvider(window.ethereum);
 
    const accounts: string[] = await provider.send("eth_requestAccounts", []);

    if (!accounts || !accounts.length) throw new Error(`Wallet not permitted!`);

    await provider.send("wallet_switchEthereumChain", [{
        chainId: ethers.toBeHex(CHAIN_ID)
    }]);

    return accounts[0];
}

export async function getPropertyDetail(propertyId: number)  {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    
    const signer = await provider.getSigner();
    const instance = contract.connect(signer) as Contract;
    const result = await instance.propertyDetails(propertyId);

    const metadata = await readJson(result.metadata);
    const detail = [];

    if (result.metadata.length != 0) {            

        let item = {
            tokenId: parseInt(result.tokenId),
            rentAmount: parseInt(result.rentAmount),
            propertyAmount: parseInt(result.propertyAmount),
            quantityTokens: parseInt(result.quantityTokens),
            availableTokens: parseInt(result.availableTokens),
            initialOwner: result.initialOwner, 
            percent: parseInt(result.percent),
            quotaValue: parseInt(result.quotaValue),
            available: result.available,
            metadata: result.metadata,
            description: metadata.description,
            name: metadata.name,
            image: metadata.image,
            attributes: metadata.attributes
        };
        detail.push(item);
    
    }
console.log(detail);
     return detail;
}

export async function mint(quantity: number) : Promise<string | null> {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    
    const signer = await provider.getSigner();
    const instance = contract.connect(signer) as Contract;

   

    const tx = await instance.mint(quantity, ) as Transaction;

    return tx.hash;
}

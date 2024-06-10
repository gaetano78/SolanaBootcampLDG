import { Keypair } from "@solana/web3.js";  
import { Connection } from "@solana/web3.js";  
import { PublicKey } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import { mintTo, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";


import wallet from "../test.json";  

//Facciamo leggere la keypair da key-file.json adesso importato come wallet
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
console.log("keypair: ", keypair);

// Creiamo una Connection
// il commitmentOrConfig è una chiave che serve per capire a che punto siamo

const connnection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

// attraverso la publicKey del createMint fatto con spl-init prendo il mio mint
// quanto minitamo dei token serve solo la publickey
const mint = new PublicKey("3FEFL6nUwaZekvRwoeUeuSBaf1Pj2ZJ3ZMk7WEpD3och");

(async () => {
    console.log("Start mintTo async func");
    // servono due func 
    //1 mintTo: 
    //2 getOrCreateAssociatedTokenAccount: perchè devo creare il tokenAccount che ci appartiene per mintare  i token

// partiamo dalla creazione del nostro tokenAccount
// che ci darà un account appunto ed è una normale transazione 
const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connnection,
    keypair,
    mint,
    keypair.publicKey,
)
// prendiamo l'address dell'associated account
const ata = tokenAccount.address;
console.log("AssociatedTokenAccount: ata", ata.toBase58());

const amount = 10e6;

await mintTo(
    connnection,
    keypair,
    mint,
    ata,
    keypair.publicKey,
    amount
);

console.log("minted: ", amount, "to: ", ata.toBase58());

})();
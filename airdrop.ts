import { Keypair } from "@solana/web3.js"; // serve a firmare la richiesta per l'airdrop
import { Connection } from "@solana/web3.js"; // serve per la connection
import { LAMPORTS_PER_SOL } from "@solana/web3.js"; // è una cost che divide un SOL in 1 MILIARDO di Lamports

import wallet from "./test.json"; // serve per la fase di test

//Facciamo leggere la keypair da test.json adesso importato come wallet
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
console.log("keypair: ", keypair);
const publicKey = keypair.publicKey.toBase58(); // è l'indirizzo pubblico da usare
const secretKey = keypair.secretKey.toString(); // Serve a firmare : non sono parole ma una serie di numeri
console.log("PublicKey = ", publicKey);
console.log("SecretKey = ", secretKey);

// Creiamo una Connection
// il commitmentOrConfig è una chiave che serve per capire a che punto si è
// 1) processed: se la transazione viene confermata almeno da un nodo
// 2) confirmed: se la transazione viene confermata almeno da un cluster, ha raggiunto l'head validator
// 3) finalized: se la transazione viene eseguita al 100% da un cluster

// Usiamo confirmed perchè è più veloce e  ci da  buona sicurezza perchè confermato da un intero cluster
// un cluster è un insieme di validatori che lavorano insieme per mantenere l'integrità del registro.

const connnection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  
  // Richiediamo 2 Sol dalla rete e mettiamolo nel nostro wallet.
  console.log("Start aidropSignature");

  const airdropToMe = async () => {
    console.log("Start async");
  
    try {
      console.log("Start try");
      const airdropSignature = await connnection.requestAirdrop(
        keypair.publicKey,
        2 * LAMPORTS_PER_SOL
      );
      // vediamo cosa mostra
      console.log("aidropSignature: ", airdropSignature);

      // vediamo cosa succede sull'explorer di solana
      // ci sono 3 explorer
      // a) solscan  
      // b) solana Expolorer: ufficiale di Solana, il migliore
      // c) solana FM
      console.log(
        `Succes: Check your TX here on Solana Explorer: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  
  airdropToMe();
import { Keypair } from "@solana/web3.js"; // ci serve per firmare la richiesta per l'airdrop
import { Connection } from "@solana/web3.js"; // ci serve per la connessione
import { createMint } from "@solana/spl-token";

import wallet from "../test.json"; // serve per la fase di test 

//Facciamo leggere la keypair da test.json
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
console.log("keypair: ", keypair);

const connnection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

// chiamata Async anonima
(async () => {
    console.log("Start createMint async func");
  
    const mint = await createMint(
      connnection,
      keypair,
      keypair.publicKey,//è chi vogliamo far diventare la nostra mint authority, sempre il nostro wallet
      null,//nessuna freeze authority
      6,//sei decimali
    );
    console.log("createMint is Ok");
  
    console.log("Mint address:", mint.toBase58());
  
    console.log(
      `Success: Chek your TX here on Solana Explorer: https://explorer.solana.com/tx/${mint.toBase58()}?cluster=devnet`
    );
  })();
//Abbiamo creato un nuovo mint address! posso verificare nell'explorer


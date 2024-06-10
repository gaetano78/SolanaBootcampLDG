//In questo codice sto semplicemente generando una keypair per il wallet

import { Keypair, PublicKey } from "@solana/web3.js"; 

//generiamo una nuova keypair
const keypair = Keypair.generate();

//la stampo
console.log("PublicKey = ", keypair.publicKey.toBase58());
console.log("PrivateKey = ", keypair.secretKey.toString())


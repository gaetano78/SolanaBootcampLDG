import { Keypair, PublicKey } from "@solana/web3.js";  
import { Connection } from "@solana/web3.js";  
import { mintTo, getOrCreateAssociatedTokenAccount, transfer} from "@solana/spl-token";
import wallet from "../test.json";  

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
console.log("keypair: ", keypair);
const publicKey = keypair.publicKey.toBase58(); // indirizzo pubblico da usare
const secretKey = keypair.secretKey.toString(); // Serve a finrmare 
console.log("PublicKey = ", publicKey);
console.log("SecretKey = ", secretKey);

const connnection = new Connection(
  "https://api.devnet.solana.com",
  "finalized"
);

// attraverso la publicKey del createMint fatto con spl-init prendo il mio mint
// quanto minitamo dei token serve solo la publickey
const mint = new PublicKey("3FEFL6nUwaZekvRwoeUeuSBaf1Pj2ZJ3ZMk7WEpD3och");
// prendiamo il token account derivato da spl-mint.ts 
const fromAta = new PublicKey("FFc6qUJb2bHHMbQuKJsmzE4Fbun5rSnXnaCqDuZdbQ8F");

// creiamo una nuova keypair per trasferire i token mintati
const keypairTo = Keypair.generate();
const publicKeyTo = keypairTo.publicKey.toBase58(); // è l'indirizzo pubblico da usare
const secretKeyTo = keypairTo.secretKey.toString(); // Serve a firmare
console.log("keypairTo: ", publicKeyTo);
console.log("secretKeyTo = ", secretKeyTo);

console.log("Start spl-transfer");

// chiamata Async anonima
(async () => {
   console.log("Start async");
  // creiamo il tokenAccount 
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connnection,
    keypair, //chi paga? la keypair, l'abbiamo appena generata  per cui non ci sono soldi
    mint,
    keypairTo.publicKey,
  )  
  // address dell'AssociatedTokenAccount
  const toAta = tokenAccount.address;
  console.log("AssociatedTokenAccount: toAta", toAta.toBase58());
  const amount = 10e5;
  
  await transfer(
      connnection,
      keypair,
      fromAta,
      toAta,
      keypair.publicKey,
      amount
    );
  
    console.log("transfer: amount", amount, "from: ", fromAta.toBase58(), "to: ", toAta.toBase58());

  })();
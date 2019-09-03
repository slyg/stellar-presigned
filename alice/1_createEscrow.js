const { Networks, Server, TransactionBuilder, Operation, Keypair } = require("stellar-sdk");
const { BigNumber } = require("bignumber.js");
const { alice } = require("../accounts");
const { saveJson } = require("../lib");

const server = new Server("https://horizon-testnet.stellar.org");

const BASE_RESERVE = 0.5;
const NUMBER_OF_ENTRIES = 1;

(async () => {
  const escrowKeyPair = Keypair.random();
  const escrow = {
    publicKey: escrowKeyPair.publicKey(),
    secret: escrowKeyPair.secret()
  };
  console.log(escrow)
  await saveJson("./alice/escrowKeypair.json", escrow);

  const aliceAccount = await server.loadAccount(alice.publicKey);

  const txOptions = {
    fee: await server.fetchBaseFee(),
    networkPassphrase: Networks.TESTNET
  };

  const createEscrowTx = new TransactionBuilder(aliceAccount, txOptions)
    .addOperation(
      Operation.createAccount({
        destination: escrow.publicKey,
        startingBalance: new BigNumber(
          (2 + NUMBER_OF_ENTRIES) * BASE_RESERVE
        ).toFixed()
      })
    )
    .setTimeout(0)
    .build();

  createEscrowTx.sign(Keypair.fromSecret(alice.secret));

  await server.submitTransaction(createEscrowTx);
})();

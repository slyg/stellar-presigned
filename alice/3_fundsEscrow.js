const { Networks, Server, TransactionBuilder, Operation, Keypair, Asset } = require("stellar-sdk");
const { alice } = require("../accounts");
const escrow = require("./escrowKeypair.json");

const server = new Server("https://horizon-testnet.stellar.org");

(async () => {
  const aliceAccount = await server.loadAccount(alice.publicKey);

  const txOptions = {
    fee: await server.fetchBaseFee(),
    networkPassphrase: Networks.TESTNET
  };

  const paymentToEscrow = {
    amount: "100",
    asset: Asset.native(),
    destination: escrow.publicKey
  };

  const tx = new TransactionBuilder(aliceAccount, txOptions)
    .addOperation(Operation.payment(paymentToEscrow))
    .setTimeout(0)
    .build();

  tx.sign(Keypair.fromSecret(alice.secret));

  await server.submitTransaction(tx);
})();

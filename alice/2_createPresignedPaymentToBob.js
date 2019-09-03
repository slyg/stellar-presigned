const { Networks, Server, TransactionBuilder, Operation, Keypair, Asset } = require("stellar-sdk");
const { BigNumber } = require("bignumber.js");
const { alice, bob } = require("../accounts");
const escrow = require("./escrowKeypair.json");
const { saveJson } = require("../lib");

const server = new Server("https://horizon-testnet.stellar.org");

const now = new BigNumber(Math.floor(Date.now())).dividedToIntegerBy(1000);

(async () => {
  const escrowAccount = await server.loadAccount(escrow.publicKey);

  const txOptions = {
    fee: await server.fetchBaseFee(),
    networkPassphrase: Networks.TESTNET,
    timebounds: {
      minTime: now.plus(30).toFixed(),
      maxTime: 0
    }
  };

  const paymentTx = new TransactionBuilder(escrowAccount, txOptions)
    .addOperation(
      Operation.payment({
        amount: "100",
        asset: Asset.native(),
        destination: bob.publicKey
      })
    )
    .addOperation(
      Operation.accountMerge({
        destination: alice.publicKey
      })
    )
    .setTimeout(0)
    .build();

  paymentTx.sign(Keypair.fromSecret(escrow.secret));

  const txXDR = paymentTx.toEnvelope().toXDR("base64");

  const paymentReceipt = {
    txXDR,
    source: escrow.publicKey,
    amount: "100"
  };

  console.log(paymentReceipt);

  await saveJson("./payment.json", paymentReceipt);
})();

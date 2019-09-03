const { Server, xdr, Transaction, Networks } = require("stellar-sdk");
const { txXDR } = require("../payment.json");

const server = new Server("https://horizon-testnet.stellar.org");

(async () => {
  const envelope = xdr.TransactionEnvelope.fromXDR(txXDR, "base64");
  const transaction = new Transaction(envelope, Networks.TESTNET);
  try {
    await server.submitTransaction(transaction);
  } catch (e) {
    console.log(e.response.data.extras.result_codes);
  }
})();

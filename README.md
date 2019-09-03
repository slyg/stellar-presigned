# Sample stellar pre-signed transaction

Used as support for a [video](https://youtu.be/AhRJL-9yDeg).

## Disclaimer

This code is not suited for a real use-case involving an escrow account. It is a very simple example used only to illustrate how to create a pre-signed transaction on the stellar testnet.

## Prerequisites

- nodeJS 10+
- `accounts.json`: test accounts as shown in `accounts.sample.json` (alice and bob accounts have to be funded)

Use the [stellar laboratory](https://www.stellar.org/laboratory/#account-creator?network=test) to create and fund the accounts.

## Steps

- Alice creates an Escrow account
- Alice (using Escrow) creates a pre-signed transaction: payment to Bob and merge Escrow into Alice after a lockup period
- Alice sends XLMs to the Escrow account
- Bob submits the pre-signed transaction after lockup period

const bip39 = require("bip39");
const { Wallet, hdkey } = require("ethereumjs-wallet");
// const mnemonic = bip39.generateMnemonic(128); // 12 string mnemonic phrase as 128 bits
// console.log("mnemonic using bip39 is ",mnemonic);

// got this using bip39 from console
const mnemonicFromBip39 =
  "fiction search sock valid task delay raccoon siege ceiling leaf crime view";
async function gg() {
  const seed = await bip39.mnemonicToSeed(mnemonicFromBip39);
  // buffer to hex rep string
  console.log("Seed:", seed.toString("hex"));
  //from seed to wallet
  const hdNode = hdkey.fromMasterSeed(seed);
  const path = `m/44'/60'/0'/0/0`;
  const wallet = hdNode.derivePath(path).getWallet();
  console.log("privateKey: ", wallet.getPrivateKeyString());
  console.log("address: ", wallet.getAddressString());
}
gg();

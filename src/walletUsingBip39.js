const bip39 = require("bip39");
const { Wallet, hdkey } = require("ethereumjs-wallet");

async function createWallFromBip(index=0) {
    const mnemonic = bip39.generateMnemonic(128); // 12 string mnemonic phrase as 128 bits
  const seed = await bip39.mnemonicToSeed(mnemonic);
  // buffer to hex rep string
  console.log("Seed:", seed.toString("hex"));
  //from seed to wallet
  const hdNode = hdkey.fromMasterSeed(seed);
  //   const path = `m/44'/60'/0'/0/0`;

  //can also be done in one line using '.' operator
  //   const derive=hdNode.derivePath(`m/44'/60'/0'`).deriveChild(0).deriveChild(0);
  //   const wallet = derive.getWallet();

  const derive=hdNode.derivePath(`m/44'/60'/0'`);
  const child=derive.deriveChild(index);
  const nextChild=child.deriveChild(index);
  const wallet = nextChild.getWallet();
  console.log("privateKey: ", wallet.getPrivateKeyString());
  console.log("address: ", wallet.getAddressString());
}
createWallFromBip(1);

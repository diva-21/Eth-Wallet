const ethers = require("ethers");
const fs = require("fs");

const path = "./saveWal.json";

async function createEthWallet() {
  const mnemonicRandom = await ethers.Wallet.createRandom().mnemonic;
  const ethWallet = await ethers.Wallet.fromMnemonic(mnemonicRandom.phrase);
  const address = ethWallet.address;
  const privateKey = ethWallet.privateKey;
  return { ethWallet, address, privateKey };
}

async function saveWallet(wallet) {
  const walletJson = JSON.stringify(wallet, null, 2);
  return new Promise((resolve, reject) => {
    fs.writeFile(path, walletJson, "utf8", (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function loadWallet() {
  try {
    const walletJson = fs.readFileSync(path, "utf8");
    const wallet = JSON.parse(walletJson);
    return wallet;
  } catch (error) {
    // here for reading a json is giving ,ENOENT error, so
    // if err occurs, it calls to create a new json file and returns { } as we dont have intially
    if (error.code === "ENOENT") {
      // Create the file if it doesn't exist
      await saveWallet({});
      return {};
    } else {
      console.error("Error loading wallet:", error);
      return null;
    }
  }
}

async function walletMain() {
  // persisting wallet
  let wallet = await loadWallet();
  if (!wallet.ethWallet) {
    // for thefirst time, then
    wallet = await createEthWallet();
    await saveWallet(wallet);
  }
  console.log("ethWallet:", wallet.ethWallet);
  console.log("address:", wallet.address);
  console.log("privateKey:", wallet.privateKey);
}
// walletMain();
module.exports = { walletMain, loadWallet, saveWallet, createEthWallet };

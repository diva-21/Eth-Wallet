const ethers = require("ethers");
const myWallet=require('../saveWal.json');
const myAddress=myWallet.address;
const myPK=myWallet.privateKey;
const recieverAddress='0x4CfCa8920e7EF4465Eb2E0bB26e240D8A134F2a0';
const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/b8940fc985e14e2a9cd55f7d56ee0ecf');
async function fetchBalance(addrProp=myAddress){
    try {
        const balance = await provider.getBalance(addrProp, 'latest');
        console.log('Ethereum Balance fetched successfully');
        console.log(ethers.utils.formatEther(balance).toString()+' ETH');

      } catch (error) {
        console.log(error);
        console.log('Error fetching balance');
      }
}
async function sendEth() {
    try {
      const sender = new ethers.Wallet(myPK, provider);
      const balBefore = await provider.getBalance(recieverAddress);
      console.log(
        `Destination balance before sending: ${ethers.utils.formatEther(
          balBefore,
        )} ETH`,
      );
      console.log('Sending...\n');
      const tx = await sender.sendTransaction({
        to: recieverAddress,
        value: ethers.utils.parseEther('0.0001'),
      });
      console.log(`TX hash: ${tx.hash}`);
      console.log('Waiting for receipt...');
      await provider.waitForTransaction(tx.hash, 1, 150000).then(() => {});
      const balAfter = await provider.getBalance(recieverAddress);
      console.log(
        `Destination balance after sending: ${ethers.utils.formatEther(
          balAfter,
        )} ETH`,
      );
    } catch (error) {
      console.log(error);
      console.log('Error in Send');
    }
  }
//   sendEth();
//   fetchBalance();
module.exports = { fetchBalance,sendEth };
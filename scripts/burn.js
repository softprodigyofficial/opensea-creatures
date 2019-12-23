require('dotenv').config()
const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const MNEMONIC = process.env.MNEMONIC
const INFURA_KEY = process.env.INFURA_KEY
const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
const OWNER_ADDRESS = process.env.OWNER_ADDRESS
const NETWORK = process.env.NETWORK

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}

const NFT_ABI = [{
    "constant": false,
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "burnThis",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}]

async function main() {
	const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )

    if (NFT_CONTRACT_ADDRESS) {
    	const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "1000000" })
    	const tokenId = 1;
    	const result = await nftContract.methods.burnThis(tokenId).send({ from: OWNER_ADDRESS });
    	console.log("Burned token " + tokenId + " Transaction: " + result.transactionHash);
    }else{
    	console.log("Please set contract address");
    }

}

main()

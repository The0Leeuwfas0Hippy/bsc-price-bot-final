require('dotenv').config()
const express = require('express')
const http = require('http')
const BigNumber = require('bignumber.js');
const web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const PairAbi = require('./abis/pairAbi.json')
const bakeryFactoryabi = require('./abis/bakeryFactoryabi.json')
const BakerySwapPairAbi = require('./abis/BakerySwapPairAbi.json')
const TokenPairs = require('./TokenPairs.json')

const app = express()
const port = 443
 server = http.createServer(app).listen(port, ()=>{console.log(`listening at port: ${port}`)})
const provider = new HDWalletProvider(process.env.private_key, 'https://bsc-dataseed.binance.org:443')
// const provider = new HDWalletProvider(process.env.private_key, 'https://mainnet.infura.io/v3/f65faddcb26a434fbe94814951196f0e')
const Web3 = new web3(provider)

let tokenPairs = TokenPairs.tokenPairs

// let V2PairAbi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const thePairAbi = PairAbi.abi;

async function getContract()
{
	// const UniswapFactoryAbi = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
	const ApeswapFactoryAbi = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[],"name":"INIT_CODE_PAIR_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
  const ApeswapFactoryAddress = "0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6"
  
 const pancakeFactoryAbi = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[],"name":"INIT_CODE_PAIR_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
 const PancakeFactoryAddress = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"

  const getContractParams = [{"Exchange": "Apeswap", "ExchangeAbi": ApeswapFactoryAbi, "ExchangeAddress": ApeswapFactoryAddress},
                             {"Exchange": "Pancakeswap", "ExchangeAbi": pancakeFactoryAbi, "ExchangeAddress": PancakeFactoryAddress}]

  const theContracts = []

      for(var i=0; i<getContractParams.length; i++)
      {
        let theExchange = getContractParams[i].Exchange

        const theContract = new Web3.eth.Contract(getContractParams[i].ExchangeAbi, getContractParams[i].ExchangeAddress)

        theContracts.push({theExchange, theContract})

      }
	
	return theContracts
}

getContract().then(async (theFactories) => {
	// console.log(theFactory)

  // input token-pair addresses along with V2Pair contract Abi to get Pair Contract

  let PairsAddresses = []

  for(var i=0; i<theFactories.length; i++)
  {
      let FactoryName = theFactories[i].theExchange
      let FactoryContract = theFactories[i].theContract

    for(var x=0; x<tokenPairs.length; x++)
    {
        let Token0Name = tokenPairs[x].token0Name
        let Token1Name = tokenPairs[x].token1Name
        let Token0Address = tokenPairs[x].token0Address
        let Token1Address = tokenPairs[x].token1Address
        let Token0Decimals = tokenPairs[x].token0decimals
        let Token1Decimals = tokenPairs[x].token1decimals


      let PairAddress = await FactoryContract.methods.getPair(tokenPairs[x].token0Address, tokenPairs[x].token1Address).call()

      PairsAddresses.push({FactoryName, Token0Name, Token1Name, Token0Address, Token1Address, Token0Decimals, Token1Decimals, PairAddress})
    }

  }
	
  return PairsAddresses

}).then(pairAddresses => {  //compute each pair of addresses' pair address 

  let PairContracts = []

  for (let x = 0; x < pairAddresses.length; x++) 
  {
    // console.log(pairAddresses[x])

    let Exchange = pairAddresses[x].FactoryName
    let Token0 = pairAddresses[x].Token0Name
    let Token1 = pairAddresses[x].Token1Name
    let Token0Address = pairAddresses[x].Token0Address
    let Token1Address = pairAddresses[x].Token1Address
    let Token0Decimals = pairAddresses[x].Token0Decimals
    let Token1Decimals = pairAddresses[x].Token1Decimals


    let pairContract = new Web3.eth.Contract(thePairAbi, pairAddresses[x].PairAddress)

    PairContracts.push({Exchange, Token0, Token1, Token0Address, Token1Address, Token0Decimals, Token1Decimals, pairContract})
    
  }

  return PairContracts

}).then(async (pairContracts) => { //point to the pair contract and retreive its Reserves #getReserves 

    let thePairContracts = []

    for(var i=0; i<pairContracts.length; i++)
    {
      let Exchange = pairContracts[i].Exchange
      let PairContract = pairContracts[i].pairContract
      let Token0 = pairContracts[i].Token0
      let Token1 = pairContracts[i].Token1
      let token0Address = pairContracts[i].Token0Address
      let token1Address = pairContracts[i].Token1Address
      let token0decimals = pairContracts[i].Token0Decimals
      let token1decimals = pairContracts[i].Token1Decimals

       let Reserves = await PairContract.methods.getReserves().call()

      //  Reserves().then(theReserves => {
        thePairContracts.push({Exchange, Token0, token0Address, token1Address, Token1, token0decimals, token1decimals, Reserves})
      //  })
    }

    return thePairContracts

}).then(reserves => {

  let finalPrices = []

   let thePrices = Promise.all(reserves).then(theReserves => {
      for(var i=0; i<theReserves.length; i++)
      {
        // console.log(theReserves[x])
        let Exchange = theReserves[i].Exchange
        let Pair = `${theReserves[i].Token1}/${theReserves[i].Token0}`
        let token1 = theReserves[i].Token1
        let token0 = theReserves[i].Token0
      let Token0Address = theReserves[i].token0Address
      let Token1Address = theReserves[i].token1Address
        let reserve0 = theReserves[i].Reserves[0] * theReserves[i].token0decimals
        let reserve1 = theReserves[i].Reserves[1] * theReserves[i].token1decimals
        let token1Price = reserve1 / reserve0

        finalPrices.push({Exchange, token1, token0, Token0Address, Token1Address, Pair, token1Price})
      }

	    return finalPrices
    })
	
    return thePrices

})
.then(thePrices => {

  let PriceDifferences = Promise.all(thePrices).then(FinalPrices => {

    let mockPriceArray = FinalPrices
    let PriceDiffs = []
	var date = new Date();
	//let theDate = `${date.getHours}`

    for(var i=0; i<FinalPrices.length; i++)
	  {
        let theExchange = FinalPrices[i].Exchange
        let Token0 = FinalPrices[i].token0
        let Token1 = FinalPrices[i].token1
        let Token0Address = FinalPrices[i].Token0Address
        let Token1Address = FinalPrices[i].Token1Address
        let Price = FinalPrices[i].token1Price
            let ExchangePrice1 = `${Price} at ${theExchange}`
            let thePair = `${Token1}/${Token0}`

        for(var x=0; x<mockPriceArray.length; x++)
        {
          if(theExchange != mockPriceArray[x].Exchange && Token0 ==  mockPriceArray[x].token0 && Token1 ==  mockPriceArray[x].token1  && Token0Address ==  mockPriceArray[x].Token0Address && Token1Address ==  mockPriceArray[x].Token1Address)
          {
            let PriceDiff = Price - mockPriceArray[x].token1Price
            let ExchangePrice2 = `${mockPriceArray[x].token1Price} at ${mockPriceArray[x].Exchange}`

            if(PriceDiff > 0)
            {
                PriceDiffs.push({thePair, "BuyFrom": mockPriceArray[x].Exchange, "SellTo": theExchange, Token0Address, Token1Address, "Borrow_Amount":`${ExchangePrice1}` , "Other_Amount":`${ExchangePrice2}`, PriceDiff, date})
            }
            // else
            //   { 
            //     PriceDiff = mockPriceArray[x].token1Price - Price

            //     PriceDiffs.push({thePair, "Buy From": theExchange, "Sell To": mockPriceArray[x].Exchange, Token0Address, Token1Address, ExchangePrice1, ExchangePrice2, PriceDiff})
            //   }
          }
        }
  	}

    return PriceDiffs
  })

	return PriceDifferences

}).then(thePriceDiffs => {

  Promise.all(thePriceDiffs).then(async (priceDifferences) => {

    var BN = Web3.utils.BN;

    for(var i=0; i<priceDifferences.length; i++)
    {
      console.log(priceDifferences[i])
      // let PriceDiffRatio = priceDifferences[i].PriceDiff / priceDifferences[i].Price
      // let feePercentage = 0.2

      // priceDifferences[i].DiffRatio = PriceDiffRatio 
      // priceDifferences[i].FeePercentage = feePercentage
      
      // let netReturn = PriceDiffRatio - feePercentage



    }

    // let ethDecimals = new BigNumber(1 * 10 ** 18);

    //  await Web3.eth.getAccounts().then(results => { 
    //    for(var i=0; i<results.length; i++){console.log(results[0]); console.log("=====================================\n")}
    //   });

    //   console.log("Gas Price in wei-divided by 1e18 to convert to eth/bnb:")
    //   await Web3.eth.getGasPrice().then(price => {

    // let newPrice = new BigNumber(price);

    // let gasInEth = price/(ethDecimals)


    //     console.log(price.toString())
      
    //   });


  })
})

/* 
// pancakeswap 
const pancakeFactoryAbi = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[],"name":"INIT_CODE_PAIR_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const pancakeFactoryAdd = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
const panCakeContract = new Web3.eth.Contract(pancakeFactoryAbi, pancakeFactoryAdd)

// bakeryswap
const bakeryFactoryAbi = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const bakeryFactoryAdd = '0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7'
const bakeryFactory = new Web3.eth.Contract(bakeryFactoryAbi, bakeryFactoryAdd)

//babyswap
const babyFactoryAbi = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"inputs":[],"name":"INIT_CODE_PAIR_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"}],"name":"expectPairFor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const babyFactoryAddress = '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da'
const babyFactory = new Web3.eth.Contract(babyFactoryAbi, babyFactoryAddress)

async function getBnbprice(token, tokenSymbol){
        
// pancakeswap buy and sell prices slippage 0.1%
    const pairAddress = await panCakeContract.methods.getPair('0xe9e7cea3dedca5984780bafc599bd69add087d56', token).call()
    const  PairContract = new Web3.eth.Contract(PairAbi.abi, pairAddress)
    const reserves = await PairContract.methods.getReserves().call()
    const pancakePrice = reserves[1]/reserves[0] 
    const panCakeBuyPrice = (pancakePrice + pancakePrice * 1/1000).toFixed(3)
    const panCakeSellrice = (pancakePrice - pancakePrice * 1/1000).toFixed(3)

    // bakeryswap buy and sell price slippage 0.1%
    const bakeryPairAddress = await  bakeryFactory.methods.getPair('0xe9e7cea3dedca5984780bafc599bd69add087d56', token).call()
    const  bakeryPairContract = new Web3.eth.Contract(PairAbi.abi, bakeryPairAddress)
    const bakeryReserves = await bakeryPairContract.methods.getReserves().call()
    const bakerySwapPrice = bakeryReserves[1]/bakeryReserves[0]
    const bakerySwapBuyPrice =  (bakerySwapPrice + bakerySwapPrice * 1/1000).toFixed(3)
    const bakerySwapSellPrice = (bakerySwapPrice - bakerySwapPrice * 1/1000).toFixed(3)
	
	//babyswap price
	const babyPairAddress = await babyFactory.methods.getPair('0xe9e7cea3dedca5984780bafc599bd69add087d56', token).call()
	const babyPairContract = new Web3.eth.Contract(PairAbi.abi, babyPairAddress)
	const babyReserves = await babyPairContract.methods.getReserves().call()
	const babySwapPrice = babyReserves[1]/babyReserves[0]
	

   // opportunities
//    const absoluteSpread = 4/1000
//    if (panCakeBuyPrice <= bakerySwapSellPrice + bakerySwapSellPrice * absoluteSpread){
//      console.log(`Opportunity detected for BUSD/${tokenSymbol}/n ${tokenSymbol} = $${panCakeBuyPrice} on PancakeSwap And $${bakerySwapSellPrice +  absoluteSpread} on BakerySwap`)
//    }

//    if( bakerySwapBuyPrice <= panCakeSellrice + absoluteSpread){
//      console.log(`Opportunity detected for BUSD/${tokenSymbol}/n ${tokenSymbol} = $${bakerySwapBuyPrice} on PancakeSwap And $${panCakeSellrice + absoluteSpread} on BakerySwap`)
//    }

  // console.log(`pancakeSwap: BUSD/${tokenSymbol} = $${panCakeBuyPrice} BakerySwap: BUSD/${tokenSymbol} = $${bakerySwapSellPrice}`)
   
  if(pancakePrice > bakerySwapPrice)
  {
    console.table([{
      'pancakeSwap': `${tokenSymbol} Price = $${pancakePrice}`,
      'BakerySwap': `${tokenSymbol} Price= $${bakerySwapPrice}`,
      'Spread': `${(pancakePrice - bakerySwapPrice)}`
     }, {'pancakeSwap': `${tokenSymbol} Price = $${pancakePrice}`, 
		 'babySwap': `${tokenSymbol} Price= $${babySwapPrice}`,
		 'Spread': `${(pancakePrice - babySwapPrice)}`}])
  }
  else
    {
      console.table([{
        'pancakeSwap': `${tokenSymbol} Price = $${pancakePrice}`,
        'BakerySwap': `${tokenSymbol} Price= $${bakerySwapPrice}`,
        'Spread': `${(bakerySwapPrice - pancakePrice)}`
       }, {'pancakeSwap': `${tokenSymbol} Price = $${pancakePrice}`, 
			'babySwap': `${tokenSymbol} Price= $${babySwapPrice}`,
			'Spread': `${(pancakePrice - babySwapPrice)}`}])
    }
  
   
  // console.log(`pancakeSwap: BUSD/${tokenSymbol} = $${bakerySwapBuyPrice} BakerySwap: BUSD/${tokenSymbol} = $${panCakeSellrice}`)
}


async function checkBNB(){

  try{

    console.log( 'checking prices...')

    

    await getBnbprice('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 'BNB')


  }catch(error){
    
  }
}

async function checkCake(){
  
  try{
    await getBnbprice('0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', 'CAKE')
  }catch(error){

  }
}

  setInterval(checkCake, 5000)
  setInterval(checkBNB, 5000)

 */
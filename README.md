# 0x Arbitrage Bot

1. Used <strong>0x Api</strong> to fetch best swap rate available as it is a DEX aggregator.
2. Used <strong>DODO Flashloan</strong> to get the capital required for trade.
3. Used <strong>Solidity</strong> for writing smart contract and <strong>Hardhat</strong> to compile and deploy the contract on <strong>Polygon</strong>.
4. Used <strong>Ethers.js</strong> to interact with the smart contract after detecting an arbitrage opportunity using the 0x api.

![2022-02-25_17-45](https://user-images.githubusercontent.com/72189840/155713725-9f220d96-92b4-42a3-99dd-3b4750aa7c62.png)

## Steps to Deploy the bot
1. ```git clone git@github.com:proro485/zrx-arbitrage-bot.git```
2. ```cd zrx-arbitrage-bot```
3. ```yarn install```
4. Create a .env file and add these variables ```POLYGON_RPC_URL = <your_rpc_url>``` , ```PRIVATE_KEY = <your_private_key>```.
<strong>Note : If you don't have an RPC url then create one using this referal link of <a href='https://alchemy.com/?r=bf58f2d861a182cd'>Alchemy</a>. Also don't forget to add "0x" infront of your private key.</strong> 
7. Now you can open a terminal in this directory and run this command to deploy: 
```npx hardhat run scripts/deploy.js --network polygon``` (You will get the contract address on the console, you can check the transaction here <a href='https://polygonscan.com'>PolygonScan</a>

## Steps to Run the bot
1. ```hh run scripts/dualArb.js --network polygon``` (this script looks for arbitrage with only two assets for eg. X -> Y -> X)
2. ```hh run scripts/triArb.js --network polygon``` (this script looks for triangular arbitrage for eg. X -> Y -> Z -> X)

## Customizing the settings
1. To change the pairs of tokens to find arbitrage in, you can go to the ```constants/polygon/tokens.js``` there you would find an array of name ```dualTokensList``` and ```triTokensList``` you can uncomment the pair of tokens you would like to get searched for arbitrage. 
2. If you want to add new tokens, then add them to ```constants/polygon/addresses.js``` within the array with name ```KNOWN_TOKENS``` and also to the ```constants/polygon/tokens.js``` in the tokens object. Now after adding the token info at these two locations you can add the order of trading in the ```dualTokens or triTokensList``` in the same file.
3. If you want to change the amount used for arbitraging, then go the the ```utils/utilities.js``` file and change the amount in the ```toBorrow``` function it is currently set to 10000 USD and equivalent amounts for WMATIC, WETH, WBTC. Also after changing this you might want to update the profit percentage so change that inside the ```getBPS``` function (1 BPS is 0.01%, 10 BPS is 0.1%, 100BPS is 1%), you have to change the value of the amount which is passed as a parameter, you can also change the BPS value returned for that amount to any value you like.
4. Also you can increase/decrease the gas price by changing the gasPrice variable in the ```scripts/dualArb.js``` and ```scripts/triArb.js```. Just search for gasPrice inside the file.

const { expect } = require('chai');
const { ethers } = require('hardhat');
const { Swap, toBorrow, flashPool, fetchQuote, fetchQuoteMax, getRouter, getUniV3Fees } = require('../utils/utilities');
const {
    ROUTERS,
    KNOWN_TOKENS,
    MATIC_WHALE
} = require('../constants/polygon/addresses');


describe("Arbitrage Contract", () => {
    // it('uniswap only swap', async () => {
    //     const Contract = await ethers.getContractFactory("Arbitrage");
    //     const contract = await Contract.deploy();
    //     await contract.deployed();

    //     let swaps = [];
    //     let token1 = "DAI";
    //     let token2 = "WETH";
    //     let token1Add = KNOWN_TOKENS[token1];
    //     let token2Add = KNOWN_TOKENS[token2];

    //     swaps.push(new Swap(
    //         token1Add,
    //         token2Add,
    //         [getUniV3Fees(token1, token2)],
    //         [getRouter('Uniswap_V3')],
    //         [100000000],
    //     ));

    //     swaps.push(new Swap(
    //         token2Add,
    //         token1Add,
    //         [getUniV3Fees(token2, token1)],
    //         [getRouter('Uniswap_V3')],
    //         [100000000]
    //     ));

    //     console.log(swaps);

    //     await contract.dodoFlashLoan(
    //         flashPool(token1Add),
    //         toBorrow(token1Add),
    //         swaps
    //     );
    // });

    // it('uniswap first and different router after it swap', async () => {
    //     const Contract = await ethers.getContractFactory("Arbitrage");
    //     const contract = await Contract.deploy();
    //     await contract.deployed();

    //     let swaps = [];
    //     let token1 = "DAI";
    //     let token2 = "USDC";
    //     let token1Add = KNOWN_TOKENS[token1];
    //     let token2Add = KNOWN_TOKENS[token2];

    //     swaps.push(new Swap(
    //         token1Add,
    //         token2Add,
    //         [getUniV3Fees(token1, token2)],
    //         [getRouter('Uniswap_V3')],
    //         [100000000]
    //     ));

    //     swaps.push(new Swap(
    //         token2Add,
    //         token1Add,
    //         [0],
    //         [getRouter('QuickSwap')],
    //         [100000000]
    //     ));

    //     console.log(swaps);

    //     await contract.dodoFlashLoan(
    //         flashPool(token1Add),
    //         toBorrow(token1Add),
    //         swaps
    //     );
    // });

    // it('different router first and then uniswap', async () => {
    //     const Contract = await ethers.getContractFactory("Arbitrage");
    //     const contract = await Contract.deploy();
    //     await contract.deployed();

    //     let swaps = [];
    //     let token1 = "DAI";
    //     let token2 = "USDC";
    //     let token1Add = KNOWN_TOKENS[token1];
    //     let token2Add = KNOWN_TOKENS[token2];

    //     swaps.push(new Swap(
    //         token1Add,
    //         token2Add,
    //         [0],
    //         [getRouter('QuickSwap')],
    //         [100000000]
    //     ));

    //     swaps.push(new Swap(
    //         token2Add,
    //         token1Add,
    //         [getUniV3Fees(token2, token1)],
    //         [getRouter('Uniswap_V3')],
    //         [100000000]
    //     ));

    //     console.log(swaps);

    //     await contract.dodoFlashLoan(
    //         flashPool(token1Add),
    //         toBorrow(token1Add),
    //         swaps
    //     );
    // });

    // it('checking dfyn router first and then uniswap', async () => {
    //     const Contract = await ethers.getContractFactory("Arbitrage");
    //     const contract = await Contract.deploy();
    //     await contract.deployed();

    //     let swaps = [];
    //     let token1 = "DAI";
    //     let token2 = "USDC";
    //     let token1Add = KNOWN_TOKENS[token1];
    //     let token2Add = KNOWN_TOKENS[token2];

    //     swaps.push(new Swap(
    //         token1Add,
    //         token2Add,
    //         [0],
    //         [getRouter('Dfyn')],
    //         [100000000]
    //     ));

    //     swaps.push(new Swap(
    //         token2Add,
    //         token1Add,
    //         [getUniV3Fees(token2, token1)],
    //         [getRouter('Uniswap_V3')],
    //         [100000000]
    //     ));

    //     console.log(swaps);

    //     await contract.dodoFlashLoan(
    //         flashPool(token1Add),
    //         toBorrow(token1Add),
    //         swaps
    //     );
    // });

    // it('uni, router & router, router split', async () => {
    //     const Contract = await ethers.getContractFactory("Arbitrage");
    //     const contract = await Contract.deploy();
    //     await contract.deployed();

    //     let swaps = [];
    //     let token1 = "DAI";
    //     let token2 = "USDC";
    //     let token1Add = KNOWN_TOKENS[token1];
    //     let token2Add = KNOWN_TOKENS[token2];

    //     swaps.push(new Swap(
    //         token1Add,
    //         token2Add,
    //         [0, getUniV3Fees(token1, token2)],
    //         [getRouter('SushiSwap'), getRouter('Uniswap_V3')],
    //         [20000000, 80000000]
    //     ));

    //     swaps.push(new Swap(
    //         token2Add,
    //         token1Add,
    //         [0, 0],
    //         [getRouter('QuickSwap'), getRouter('SushiSwap')],
    //         [20000000, 80000000]
    //     ));

    //     console.log(swaps);

    //     await contract.dodoFlashLoan(
    //         flashPool(token1Add),
    //         toBorrow(token1Add),
    //         swaps
    //     );
    // });

    // it('triangular arbitrage', async () => {
    //     const Contract = await ethers.getContractFactory("Arbitrage");
    //     const contract = await Contract.deploy();
    //     await contract.deployed();

    //     let swaps = [];
    //     let token1 = "DAI";
    //     let token2 = "USDC";
    //     let token3 = "WETH";
    //     let token1Add = KNOWN_TOKENS[token1];
    //     let token2Add = KNOWN_TOKENS[token2];
    //     let token3Add = KNOWN_TOKENS[token3];

    //     swaps.push(new Swap(
    //         token1Add,
    //         token2Add,
    //         [0, getUniV3Fees(token1, token2)],
    //         [getRouter('SushiSwap'), getRouter('Uniswap_V3')],
    //         [20000000, 80000000]
    //     ));

    //     swaps.push(new Swap(
    //         token2Add,
    //         token3Add,
    //         [0, 0],
    //         [getRouter('QuickSwap'), getRouter('SushiSwap')],
    //         [20000000, 80000000]
    //     ));

    //     swaps.push(new Swap(
    //         token3Add,
    //         token1Add,
    //         [getUniV3Fees(token3, token1)],
    //         [getRouter('Uniswap_V3')],
    //         [100000000]
    //     ));

    //     console.log(swaps);

    //     await contract.dodoFlashLoan(
    //         flashPool(token1Add),
    //         toBorrow(token1Add),
    //         swaps
    //     );
    // });

    it('zrxFillQuote function', async () => {
        const Contract = await ethers.getContractFactory("Arbitrage");
        const contract = await Contract.deploy();
        await contract.deployed();

        let swaps = [];
        let token1 = "USDC";
        let token2 = "WETH";
        let token3 = "WMATIC";
        let token1Add = KNOWN_TOKENS[token1];
        let token2Add = KNOWN_TOKENS[token2];
        let token3Add = KNOWN_TOKENS[token3];

        const swap1 = await fetchQuote({
            sellToken: token1Add,
            buyToken: token2Add,
            sellAmount: toBorrow(token1Add).toString()
        });

        const swap1Max = await fetchQuoteMax({
            sellToken: token1Add,
            buyToken: token2Add,
            sellAmount: toBorrow(token1Add).toString()
        });

        swaps.push(new Swap(
            token1Add,
            token2Add,
            [0, getUniV3Fees(token1, token2)],
            [getRouter('SushiSwap'), getRouter('Uniswap_V3')],
            [20000000, 80000000],
            swap1Max.allowanceTarget,
            swap1Max.to,
            swap1Max.data
        ));

        const swap2 = await fetchQuote({
            sellToken: token2Add,
            buyToken: token3Add,
            sellAmount: swap1.buyAmount.toString()
        });

        const swap2Max = await fetchQuoteMax({
            sellToken: token2Add,
            buyToken: token3Add,
            sellAmount: swap1Max.buyAmount.toString()
        });

        swaps.push(new Swap(
            token2Add,
            token3Add,
            [0, 0],
            [getRouter('QuickSwap'), getRouter('SushiSwap')],
            [20000000, 80000000],
            swap2Max.allowanceTarget,
            swap2Max.to,
            swap2Max.data
        ));

        const swap3 = await fetchQuote({
            sellToken: token3Add,
            buyToken: token1Add,
            sellAmount: swap2.buyAmount.toString()
        });

        const swap3Max = await fetchQuoteMax({
            sellToken: token3Add,
            buyToken: token1Add,
            sellAmount: swap2Max.buyAmount.toString()
        });

        swaps.push(new Swap(
            token3Add,
            token1Add,
            [getUniV3Fees(token3, token1)],
            [getRouter('Uniswap_V3')],
            [100000000],
            swap3Max.allowanceTarget,
            swap3Max.to,
            swap3Max.data
        ));

        console.log(swaps);

        await contract.dodoFlashLoan(
            flashPool(token1Add),
            toBorrow(token1Add),
            swaps
        );
    }).timeout(100000);
});

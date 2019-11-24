import Web3 from 'web3';
import { CELO_ABI, CELO_ADDRESS } from "./config";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export default class CeloContract {

    constructor() {
        this.itemById = this.itemById.bind(this);

        this.setClaimReceivedStatus = this.wrap(this.setClaimReceivedStatus)
        this.makeItem = this.wrap(this.makeItem)
        this.sellerChallenge = this.wrap(this.sellerChallenge)
        this.buyItem = this.wrap(this.buyItem)
        this.settle = this.wrap(this.settle)
    }

    /** Binds the given function to the class and emits events. */
    wrap(fn) {
        return ((...args) => {
            return fn.bind(this)(...args).then(() => {
                // To receive events, set this.listener to a function
                if (this.listener) this.listener()
            })
        })
    }

    /** The address of the current user, fetched from metamask. */
    async metamaskAddress() {
        const accounts = await this.web3.eth.getAccounts();
        return accounts[0];
    }

    /** Initialize the contract */
    async init(address) {
        this.web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        this.address = address || await this.metamaskAddress();
        if (!this.address) {
            throw new Error('No account found. Are you signed into MetaMask?');
        }

        this.contract = new this.web3.eth.Contract(CELO_ABI, CELO_ADDRESS);
        this.methods = this.contract.methods;
    }

    buyingList() { return this.methods.getBuyingItems(this.address).call(); }
    sellingList() { return this.methods.getSellingItems(this.address).call(); }

    async itemById(id) {
        const item = await this.methods.items(id).call();
        return {
            hasBuyer: item.buyerAddress !== ZERO_ADDRESS,
            ...item
        }
    }

    async pendingPurchases() {
        const buyingList = await this.buyingList();
        const items = await Promise.all(buyingList.map(this.itemById));
        return items.filter(i => !i.received && !i.sellerAcceptNonReceived);
    }

    async currentInventory() {
        const sellingList = await this.sellingList();
        const items = await Promise.all(sellingList.map(this.itemById));
        return items.filter(i => !i.received && !i.sellerAcceptNonReceived);
    }

    /** All important info in the contract. **/
    async state() {
        const numItems = await this.methods.nextItemID().call();

        const completedSales = [];
        const completedPurchases = [];
        const challenges = [];

        for (var i = 0; i < numItems; i++) {
            const item = await this.itemById(i);
            if (item.sellerAddress === this.address && (item.received || item.sellerAcceptNonReceived)) {
                completedSales.push(item);
            }
            console.log(item)
            if (item.buyerAddress === this.address && (item.received || item.sellerAcceptNonReceived)) {
                completedPurchases.push(item);
            }
            if (item.mediatorAddress === this.address && item.challengeNonreceived) {
                challenges.push(item);
            }
        }
        return {
            pendingPurchases: await this.pendingPurchases(),
            currentInventory: await this.currentInventory(),
            completedSales,
            completedPurchases,
            challenges
        };
    }

    /** Set whether a claim was received or not received. */
    setClaimReceivedStatus(id, received) {
        if (received) {
            return this.methods.buyerConfirmsReceived(id).send({ from: this.address });
        } else {
            return this.methods.buyerClaimsNonReceived(id).send({ from: this.address });
        }
    }

    makeItem(item) {
        return this.methods.createItem(item.price).send({ from: this.address });
    }

    sellerChallenge(id, challenge) {
        if (challenge) {
            return this.methods.sellerChallengeNonReceived(id).send({ from: this.address });
        } else {
            return this.methods.sellerAcceptNonReceived(id).send({ from: this.address });
        }
    }

    /** Add an item to the items bought. */
    async buyItem(id, proxy) {
        const item = await this.itemById(id);
        if (proxy) {
            console.log(item.price);

            var userCount = await this.methods.countUser().call();
            var randomValue = Math.floor(Math.random() * userCount);
            console.log(randomValue);
            console.log(userCount);

            return await this.methods.buyItem(id, randomValue)
                .send({ from: this.address, value: item.price })
        } else {
            return await this.methods.buyItem(id, -1)
                .send({ from: this.address, value: item.price })
        }
    }

    async settle(id, favorSeller) {
        console.log(await this.itemById(id), this.address)
        return await this.methods.mediatorSettlesChallenge(id, favorSeller)
            .send({ from: this.address });
    }
}

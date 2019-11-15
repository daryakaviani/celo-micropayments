import Web3 from 'web3';
import { CELO_ABI, CELO_ADDRESS } from "./config";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export default class CeloContract {

    constructor() {
        this.itemById = this.itemById.bind(this);
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
        return items.filter(i => !i.received);
    }

    async currentInventory() {
        const sellingList = await this.sellingList();
        const items = await Promise.all(sellingList.map(this.itemById));
        return items.filter(i => !i.received);
    }

    /** All important info in the contract. **/
    async state() {
        const numItems = await this.methods.nextItemID().call();

        const completedSales = [];
        const completedPurchases = [];
        const challenges = [];

        for (var i = 0; i < numItems; i++) {
            const item = await this.itemById(i);
            if (item.sellerAddress === this.address && item.received) {
                completedSales.push(item);
            }
            if (item.buyerAddress === this.address && item.received) {
                completedPurchases.push(item);
            }
            if (item.mediatorAddress === this.address && !item.received) {
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

    sellerChallenge(id) {
        // TODO
    }

    /** Add an item to the items bought. */
    async buyItem(id, proxy) {
        const item = await this.itemById(id);
        if (proxy) {
            return await this.methods.buyItem(item.price, this.address)
                .send({ from: this.address, value: item.price })
        } else {
            return await this.methods.buyItem(item.price, ZERO_ADDRESS)
                .send({ from: this.address, value: item.price })
        }
    }

    settle(id, favorSeller) {
        return this.methods.mediatorSettlesChallenge(id, favorSeller)
            .send({ from: this.address });
    }
}

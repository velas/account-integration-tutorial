import {VAClient} from "@velas/account-client";

//storage handlers

import StorageHandler from '@velas/account-client/example/storageHandler';
import KeyStorageHandler from '@velas/account-client/example/keyStorageHandler';

export const agent = {};

export const vaclient = new VAClient({
    mode: "redirect",
    clientID: "Your Client ID",
    redirectUri: "http://localhost:3000",
    StorageHandler,
    KeyStorageHandler,
    accountProviderHost: "account.testnet.velas.com",
    networkApiHost: "https://api.testnet.velas.com",
    transactionsSponsorApiHost: "http://localhost:3002",
    transactionsSponsorPubKey: "Your Sponsor Address"
})

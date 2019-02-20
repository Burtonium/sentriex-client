import { bip32, payments, networks } from 'bitcoinjs-lib';

const oneDay = 1000 * 60 * 60 * 24;

export const daysBetween = (date1, date2) => {
  const date1Millis = date1.getTime();
  const date2Millis = date2.getTime();
  const diff = Math.abs(date1Millis - date2Millis);
  return Math.round(diff / oneDay);
};

export const daysAgo = days => new Date(new Date() - (days * oneDay));

export const formatDate = d => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

export const daysFromNow = date => daysBetween(new Date(date), new Date());

const getAddress = (node, network) => payments.p2pkh({ pubkey: node.publicKey, network }).address;

export const addressDeriver = (xpub, networkKey) => (from, to) => {
  const addresses = [];
  const network = networkKey && networks[networkKey];
  for (let i = from; i < to; i += 1) {
    const address = getAddress(bip32.fromBase58(xpub, network).derivePath(`0/${i}`), network);
    addresses.push(address);
  }
  return addresses;
};

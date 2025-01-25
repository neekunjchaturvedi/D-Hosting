import { ethers } from "ethers";
import WebpageStorageABI from "../artifacts/contracts/WebpageStorage.sol/WebpageStorage.json";

const contractAddress = "0xbb85CAcA34A7e01159D6076009e8462096eA794B";

export async function getContract() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      // Add await here because getSigner returns a Promise in v6
      const signer = await provider.getSigner();
      return new ethers.Contract(contractAddress, WebpageStorageABI.abi, signer);
    } catch (error) {
      console.error("Error connecting to contract:", error);
      throw new Error("Failed to connect to contract");
    }
  }
  throw new Error("Please install MetaMask!");
}

export async function storeWebpage(domain: string, cid: string) {
  try {
    const contract = await getContract();
    const transaction = await contract.storeWebpage(domain, cid);
    await transaction.wait();
    return transaction.hash;
  } catch (error) {
    console.error("Error storing webpage:", error);
    throw error;
  }
}

export async function getWebpage(domain: string) {
  try {
    const contract = await getContract();
    const [cid, owner, timestamp] = await contract.getWebpage(domain);
    return {
      cid,
      owner,
      timestamp: new Date(Number(timestamp) * 1000) // Convert BigNumber to number
    };
  } catch (error) {
    console.error("Error getting webpage:", error);
    throw error;
  }
}

export async function getUserWebpages(address: string) {
  try {
    const contract = await getContract();
    return await contract.getUserWebpages(address);
  } catch (error) {
    console.error("Error getting user webpages:", error);
    throw error;
  }
}

export async function createProposal(description: string) {
  try {
    const contract = await getContract();
    const transaction = await contract.createProposal(description);
    await transaction.wait();
    return transaction.hash;
  } catch (error) {
    console.error("Error creating proposal:", error);
    throw error;
  }
}

export async function vote(proposalId: number, support: boolean) {
  try {
    const contract = await getContract();
    const transaction = await contract.vote(proposalId, support);
    await transaction.wait();
    return transaction.hash;
  } catch (error) {
    console.error("Error voting:", error);
    throw error;
  }
}

export async function executeProposal(proposalId: number) {
  try {
    const contract = await getContract();
    const transaction = await contract.executeProposal(proposalId);
    await transaction.wait();
    return transaction.hash;
  } catch (error) {
    console.error("Error executing proposal:", error);
    throw error;
  }
}

// Add TypeScript interfaces for better type safety
export interface Webpage {
  cid: string;
  owner: string;
  timestamp: Date;
}

export interface Transaction {
  hash: string;
}
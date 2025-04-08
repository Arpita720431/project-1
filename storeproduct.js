import 'dotenv/config';
import { ethers } from 'ethers';
import axios from 'axios';

console.log("Environment Variables:", process.env);

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
console.log("Alchemy API URL:", process.env.ALCHEMY_API_URL);
console.log("JSONBin API Key:", process.env.JSONBIN_API_KEY);


async function checkBlockNumber() {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log("Connected to Ethereum. Current Block Number:", blockNumber);
  } catch (error) {
    console.error("Error fetching block number:", error);
  }
}
checkBlockNumber();

const productData ={
  product_id: "222222",
    product_name: "puma Sneakers",
    manufacturer: "puma",
    manufacture_date: "2025-03-27",
    batch_number: "XYZ123",
    authenticity: "Verified",
}
;

async function storeProduct() {
  try {
    const response = await axios.post("https://api.jsonbin.io/v3/b", productData, {
      headers: { "X-Master-Key": process.env.JSONBIN_API_KEY },
    });

    console.log("✅ Product Stored Successfully!");

    const recordId = response.data.metadata?.id || response.data.record?.id;
    console.log("🔗 Blockchain Record URL:", recordId);
  } catch (error) {
    console.error("❌ Error Storing Product Data:", error);
  }
}

storeProduct();

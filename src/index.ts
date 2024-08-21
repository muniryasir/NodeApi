import express, { Request, Response } from 'express';
import { invokeSmartContract } from './concordiumService';

import { ConcordiumGRPCNodeClient, credentials  } from '@concordium/web-sdk/nodejs';
import { Parameter,  CIS2Contract, ContractTransactionMetadata  } from '@concordium/web-sdk';
import cors from 'cors';

import {  AccountTransactionType, serializeUpdateContractParameters, serializeAccountTransactionForSubmission } from '@concordium/web-sdk';
import { Buffer } from 'buffer';
import * as ccdJsGen from "@concordium/ccd-js-gen"

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Set up Concordium client
const concordiumClient = new ConcordiumGRPCNodeClient(
  'node.testnet.concordium.com', // Replace with your Concordium node address
  20000, // Replace with your Concordium node port
  credentials.createInsecure()
);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/generate', async (req: Request, res: Response) => {
  const moduleFilePath = "./my-contract.wasm.v1"; // Path to smart contract module.
  const outDirPath = "./generated"; // The directory to use for the generated files.

  // Read the module and generate the smart contract clients.
  console.log('Generating smart contract module clients.')
  await ccdJsGen.generateContractClientsFromFile(moduleFilePath, outDirPath);
  console.log('Code generation was successful.')

  res.send('Hello, TypeScript with Express!');
});

app.post('/invoke', async (req: Request, res: Response) => {
  // console.log(req.body)
    const { contractAddress, entrypoint, parameter } = req.body;
    // console.log(JSON.stringify(parameter))
    try {
      const result = await invokeSmartContract(contractAddress, entrypoint, JSON.stringify(parameter));
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });



  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

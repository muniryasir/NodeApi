import * as ccdJsGen from "@concordium/ccd-js-gen"

const moduleFilePath = "./my-contract.wasm.v1"; // Path to smart contract module.
const outDirPath = "./generated"; // The directory to use for the generated files.

// Read the module and generate the smart contract clients.
console.log('Generating smart contract module clients.')
await ccdJsGen.generateContractClientsFromFile(moduleFilePath, outDirPath);
console.log('Code generation was successful.')
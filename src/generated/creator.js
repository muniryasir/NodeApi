"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ccdJsGen = require("@concordium/ccd-js-gen");
var moduleFilePath = "./my-contract.wasm.v1"; // Path to smart contract module.
var outDirPath = "./generated"; // The directory to use for the generated files.
// Read the module and generate the smart contract clients.
console.log('Generating smart contract module clients.');
ccdJsGen.generateContractClientsFromFile(moduleFilePath, outDirPath);
console.log('Code generation was successful.');

import { ConcordiumGRPCWebClient, ContractContext ,AccountAddress, ContractAddress, Parameter, ReceiveName, Energy, CcdAmount, HexString } from '@concordium/web-sdk';
import { ConcordiumGRPCNodeClient, credentials } from '@concordium/web-sdk/nodejs';
import { toHexString } from 'node_modules/@concordium/web-sdk/lib/esm/types/BlockHash';

let client:any;
try {
 client = new ConcordiumGRPCNodeClient(
  'node.testnet.concordium.com', // Replace with your Concordium node address
  20000, // Replace with your Concordium node port
  credentials.createInsecure()
);

} catch (error) {
  console.log(error)
}
export async function invokeSmartContract(contractAddress: number, entrypoint: string, param: String) {
  //  console.log(param.toString())
  const invoker = AccountAddress.fromBase58('3SfHLNkmy61ZUQkAhMvAwKj47EYDBiUPbn3wHghFD6qGr8WDGc');
  const contract =  ContractAddress.create(contractAddress);

  const receiveName = ReceiveName.fromString("cis2_dynamic_nft."+entrypoint);


  const energy = Energy.create(30000);
  const amount = CcdAmount.fromCcd(0)
  let test = `{
        "owner": {
        
         "Account": ["3SfHLNkmy61ZUQkAhMvAwKj47EYDBiUPbn3wHghFD6qGr8WDGc"]
        
       },
    "tokens": [
        [
            "10",
            {
                "metadata_url": [
                    {
                        
                        "hash": {
                            "None": [
                                
                            ]
                        },
                        "url": "https://silver-tough-swordtail-947.mypinata.cloud/ipfs/QmWHeES4Yt8TaQrbLNgkVzddNwkwV4SDA8CT3bkCGKnhsW"
                    }
                ],
                "token_amount": "1"
            }
        ]
        ]
    }`;
  let parameter;
  try {
   parameter = Parameter.fromBase64SchemaType('8DAQAAABAAAABjaXMyX2R5bmFtaW',JSON.parse(test));
  } catch(error) {
    console.log(error) 
  }
  console.log(parameter) 


  const context: ContractContext = {
    // Required
    method: receiveName,
    contract,
    // Optional
    invoker,
    amount,
    parameter,
    energy,
};
// console.log(param)


  // const result = await client.invokeContract(context);
  let result:any;
  try {
    result = await client.invokeContract(context);
    // Handle the result as needed
  } catch (error) {
    console.error('Error invoking contract:', error);
    // Handle the error as needed
  }
  console.log(result)


  return result;
}

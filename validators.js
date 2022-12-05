const web3 = require("web3")
const RLP = require('rlp');

// Configure
const validators = [
  
   {
     "consensusAddr": "0x1Bd56bb74EbD6a03DA456048DBcE9600b002c00B",
     "feeAddr": "0x1Bd56bb74EbD6a03DA456048DBcE9600b002c00B",
     "bscFeeAddr": "0x1Bd56bb74EbD6a03DA456048DBcE9600b002c00B",
     "votingPower": 0x0000000010000000,
   },
   {
     "consensusAddr": "0x7D3DEBB04aDfe89BaA8e64d3B7F8C89678032338",
     "feeAddr": "0x7D3DEBB04aDfe89BaA8e64d3B7F8C89678032338",
     "bscFeeAddr": "0x7D3DEBB04aDfe89BaA8e64d3B7F8C89678032338",
     "votingPower": 0x0000000010000000,
   },
];

// ===============  Do not edit below ====
function generateExtradata(validators) {
  let extraVanity =Buffer.alloc(32);
  let validatorsBytes = extraDataSerialize(validators);
  let extraSeal =Buffer.alloc(65);
  return Buffer.concat([extraVanity,validatorsBytes,extraSeal]);
}

function extraDataSerialize(validators) {
  let n = validators.length;
  let arr = [];
  for (let i = 0;i<n;i++) {
    let validator = validators[i];
    arr.push(Buffer.from(web3.utils.hexToBytes(validator.consensusAddr)));
  }
  return Buffer.concat(arr);
}

function validatorUpdateRlpEncode(validators) {
  let n = validators.length;
  let vals = [];
  for (let i = 0;i<n;i++) {
    vals.push([
      validators[i].consensusAddr,
      validators[i].bscFeeAddr,
      validators[i].feeAddr,
      validators[i].votingPower,
    ]);
  }
  let pkg = [0x00, vals];
  return web3.utils.bytesToHex(RLP.encode(pkg));
}

extraValidatorBytes = generateExtradata(validators);
validatorSetBytes = validatorUpdateRlpEncode(validators);

exports = module.exports = {
  extraValidatorBytes: extraValidatorBytes,
  validatorSetBytes: validatorSetBytes,
}
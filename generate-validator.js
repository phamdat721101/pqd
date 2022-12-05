const fs = require("fs");
const readline = require('readline');
const nunjucks = require("nunjucks");


async function processValidatorConf() {
  const fileStream = fs.createReadStream(__dirname + '/validators.conf');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  let validators = [];
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    let vs = line.split(",")
    validators.push({
      validatorAddr: vs[0],
    })
  }
  return validators
}

processValidatorConf().then(function (validators){
  const configData = validators.map((addr) =>{
    return addr.validatorAddr.toString()
  })

  const data = {
    validators: configData
  }
  const templateString = fs.readFileSync(__dirname + '/config.template').toString();
  const resultString = nunjucks.renderString(templateString,data);
  fs.writeFileSync(__dirname + '/config.json', resultString);

  console.log("Config validator file updated");
})

// processValidatorConf().then(function (validators) {
//   const data = {
//     validators: validators
//   };
//   const templateString = fs.readFileSync(__dirname + '/validators.template').toString();
//   const resultString = nunjucks.renderString(templateString, data);
//   fs.writeFileSync(__dirname + '/validators.js', resultString);
//   console.log("BSCValidatorSet file updated.");
// })

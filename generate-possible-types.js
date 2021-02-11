/* eslint-disable @typescript-eslint/no-var-requires */

"use strict";

// eslint-disable-next-line no-undef
let fs = require("fs");

let rawSchema = fs.readFileSync("schema.json");
let schema = JSON.parse(rawSchema);
let possibleTypes = {};

for (let supertype of schema.data.__schema.types) {
  if (supertype.possibleTypes) {
    possibleTypes[supertype.name] = supertype.possibleTypes.map(
      (subtype) => subtype.name
    );
  }
}

let rawPossibleTypes = JSON.stringify(possibleTypes);
console.log(rawPossibleTypes);
fs.writeFileSync("possible-types.json", rawPossibleTypes);

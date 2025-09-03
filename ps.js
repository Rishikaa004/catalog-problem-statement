// ---- Base-N string to BigInt ----
function baseToBigInt(str, base) {
  const digits = str.toLowerCase();
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  let result = 0n;
  for (let ch of digits) {
    const val = BigInt(chars.indexOf(ch));
    if (val < 0n || val >= BigInt(base)) {
      throw new Error(`Invalid digit '${ch}' for base ${base}`);
    }
    result = result * BigInt(base) + val;
  }
  return result;
}

function parseShares(obj) {
  const shares = [];
  for (const key of Object.keys(obj)) {
    if (key === "keys") continue;
    const { base, value } = obj[key];
    const y = baseToBigInt(value, parseInt(base));
    shares.push([BigInt(key), y]);
  }
  return shares;
}

function lagrangeInterpolateAt0(shares) {
  let secret = 0n;
  for (let j = 0; j < shares.length; j++) {
    const [xj, yj] = shares[j];
    let num = 1n, den = 1n;
    for (let m = 0; m < shares.length; m++) {
      if (m === j) continue;
      const [xm] = shares[m];
      num *= -xm;
      den *= (xj - xm);
    }
    const lj0 = num / den; 
    secret += yj * lj0;
  }
  return secret;
}

function runCase(name, testCase) {
  const { n, k } = testCase.keys;
  const shares = parseShares(testCase);

  const subset = shares.slice(0, k);

  console.log(`\n${name} — Using k=${k} shares out of n=${n}`);
  console.log("Shares:", subset);

  const secret = lagrangeInterpolateAt0(subset);
  console.log(`${name} — Reconstructed secret (c):`, secret.toString());
}

const testCase1 = {
  "keys": { "n": 4, "k": 3 },
  "1": { "base": "10", "value": "4" },
  "2": { "base": "2", "value": "111" },
  "3": { "base": "10", "value": "12" },
  "6": { "base": "4", "value": "213" }
};

const testCase2 = {
  "keys": { "n": 10, "k": 7 },
  "1": { "base": "6", "value": "13444211440455345511" },
  "2": { "base": "15", "value": "aed7015a346d635" },
  "3": { "base": "15", "value": "6aeeb69631c227c" },
  "4": { "base": "16", "value": "e1b5e05623d881f" },
  "5": { "base": "8", "value": "316034514573652620673" },
  "6": { "base": "3", "value": "2122212201122002221120200210011020220200" },
  "7": { "base": "3", "value": "20120221122211000100210021102001201112121" },
  "8": { "base": "6", "value": "20220554335330240002224253" },
  "9": { "base": "12", "value": "45153788322a1255483" },
  "10": { "base": "7", "value": "1101613130313526312514143" }
};

runCase("Test Case 1", testCase1);
runCase("Test Case 2", testCase2);

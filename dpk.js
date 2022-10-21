const crypto = require("crypto");

const getEncodedKey = (candidate) => {
  const HASH_ALGORITH = "sha3-512";
  const ENCODING = "hex";

  return crypto.createHash(HASH_ALGORITH).update(candidate).digest(ENCODING);
}

const getCandidateFromEvent = (event) => {
  const { partitionKey } = event;
  if (partitionKey) {
    return partitionKey;
  } else {
    const data = JSON.stringify(event);
    return getEncodedKey(data);
  }
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = event ? getCandidateFromEvent(event) : TRIVIAL_PARTITION_KEY;

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
  
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = getEncodedKey(candidate);
  }

  return candidate;

};
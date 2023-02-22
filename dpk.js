const crypto = require('crypto');

const SHA = 'sha3-512';
const ENCODING = 'hex';
function deterministicPartitionKey(event) {
    const DEFAULT_PARTITION_KEY = '0';
    const MAX_PARTITION_KEY_SIZE = 256;

    if (!event) {
        return DEFAULT_PARTITION_KEY;
    }

    let candidate = event.partitionKey;

    if (!candidate) {
        const data = JSON.stringify(event);
        candidate = hash(data);
    }

    if (typeof candidate !== 'string') {
        candidate = JSON.stringify(candidate);
    }

    if (candidate.length > MAX_PARTITION_KEY_SIZE) {
        candidate = hash(candidate);
    }

    return candidate || DEFAULT_PARTITION_KEY;
}

function hash(data) {
    return crypto.createHash(SHA).update(data).digest(ENCODING);
}

module.exports = { deterministicPartitionKey, hash };
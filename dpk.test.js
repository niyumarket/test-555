const { deterministicPartitionKey, hash } = require('./dpk');
const crypto = require('crypto');

jest.mock('crypto', () => ({
    createHash: jest.fn(() => ({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn(() => 'test-hash')
    }))
}));

describe('deterministicPartitionKey', () => {
    test('should return a string', () => {
        const event = { key: 'value' };
        const partitionKey = deterministicPartitionKey(event);
        expect(typeof partitionKey).toBe('string');
    });

    test('should return a partition key based on the event object', () => {
        const event = { key: 'value' };
        const partitionKey = deterministicPartitionKey(event);
        expect(partitionKey).not.toBe('0');
    });

    test('should return a SHA3-512 hash when event has no partition key', () => {
        const data = { key: 'value' };
        const expectedHash = crypto.createHash('sha3-512').update(JSON.stringify(data)).digest('hex');
        const actualHash = deterministicPartitionKey({ data });
        expect(actualHash).toBe(expectedHash);
        expect(crypto.createHash).toHaveBeenCalledWith('sha3-512');
    });

    test('should return the partition key when it is a string', () => {
        const event = { partitionKey: 'my-partition-key' };
        const partitionKey = deterministicPartitionKey(event);
        expect(partitionKey).toBe('my-partition-key');
    });

    test('should return the partition key when it is a number', () => {
        const event = { partitionKey: 123 };
        const partitionKey = deterministicPartitionKey(event);
        expect(partitionKey).toBe('123');
    });

    test('should return the trivial partition key when the event is falsy', () => {
        const partitionKey = deterministicPartitionKey(null);
        expect(partitionKey).toBe('0');
    });
});

describe('hash', () => {
    test('should generate a SHA3-512 hash', () => {
        const data = 'test';
        const expectedHash = crypto.createHash('sha3-512').update(data).digest('hex');
        const actualHash = hash(data);
        expect(actualHash).toBe(expectedHash);
        expect(crypto.createHash).toHaveBeenCalledWith('sha3-512');
    });
});
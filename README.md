## Test

```bash
# unit tests
$ npm run test
```

## Refactor
* The Secure Hash Algorithm and the HEX ENCODING were defined as constant at the top. 
* They could have been injected if DI was implemented, they could also potentially come from an ENV variable
* TRIVIAL_PARTITION_KEY and MAX_PARTITION_KEY_LENGTH are descriptive and self-explanatory but DEFAULT_PARTITION_KEY and MAX_PARTITION_KEY_SIZE are more concise names.

* The hash function was created to be a reusable function that can be called from other parts of the code that need hashing.
* Moving the hash function out of the deterministicPartitionKey function makes the code more modular and easier to maintain.
# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

###  Creating the `getEncodedKey` method.

We had multiple places where we were using the crypto library methods to created a endoded key. This can easily be moved to a reusable method, thus removing code duplication. 

Also we created constants to store the `HASH_ALGORITH` and `ENCODING`, this makes the code more readable and it will be easier to update the algorithm or encoding in the future.

### Reducing nested if else statements.

By giving default value to the candidate, we can greatly reduce the nested if else statments. This makes the code easier to undersatnd. 
This was also achieved by creating the method `getCandidateFromEvent` which moved some of the logic out of the main method.
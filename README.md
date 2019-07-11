# airtight.js
A small JavaScript testing framework that is expressive and easy to read.

This small project was developed as a simple JS framework for unit testing
for [Meugle](https://github.com/theDragonFire/meugle). Because Meugle was
simply a small project that I was working on, I didn't want to dive into a
full-on testing framework like [Mocha](https://mochajs.org/). So I developed
**airtight.js** based on the process found in *Test-Driven Development by
Example* by Kent Beck. Tests are easy to set up and the output is easy to read.

## Adding `airtight.js` to Projects
TODO

## Elements
TODO

## Example
```js
const airtight = require("./airtight");

const Test = airtight.Test;
const assert = airtight.assert;
const assert_eq = airtight.assert_eq; // Assert equal
const assert_neq = airtight.assert_neq; // Assert not equal

let test = Test.builder() // Create a test builder
	.name("Addition Test") // Give the test a name

	// Describe the test (Not required, 
	// but recommended)
	.description(
		"Test that 1 + 1 = 2"
	)

	// Pass the test as a lambda function
	.test(() => {
		assert(1 + 1 === 2);
		assert_eq(1 + 1, 2);
		assert_neq(1 + 1, 3);
	});

// Run the test and print out the results
Test.run(test).print_result();
```

Output:
```
[Addition Test] Success!
```

## Projects Using `airtight.js`
* [Meugle](https://github.com/theDragonFire/meugle)

Does your project use `airtight.js`? Submit a pull request adding your name
to the above list! Knowing that people are using this gives me motivation to
keep it maintained.

## Contributing
If you find a bug or want to recommend an improvement, please
[let me know](https://github.com/theDragonFire/airtight-js/issues/new). I'll
do what I can to fix the problem.

Any pull requests are also welcome. However, please ensure that any additions
have tests written for them that sufficiently convey the purpose of the
addition.

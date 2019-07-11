# airtight.js

A small JavaScript testing framework that is expressive and easy to read.

This small project was developed as a simple JS framework for unit testing
for [Meugle](https://github.com/theDragonFire/meugle). Because Meugle was
simply a small project that I was working on, I didn't want to dive into a
full-on testing framework like [Mocha](https://mochajs.org/). So I developed
`airtight.js` based on the process found in *Test-Driven Development by
Example* by Kent Beck. Tests are easy to set up and the output is easy to read.

## Builder Pattern

`airtight.js` is built using the Builder Pattern. Both tests and test suites
have builders that allow construction of each in an expressive manner rather
than passing everything to some vague constructor.

Every method of the builder returns the builder itself, so calls to builder
methods can be chained together, making it easier to understand the test and
giving a feeling of connectedness.

For example,
```js
Test.builder()
	.name("Test Addition")

	.description( /* description */ )

	.test( /* test */ )
```

## Adding `airtight.js` to Projects

1. Download the file (Use one of the following three methods)
   * `curl https://raw.githubusercontent.com/theDragonFire/airtight-js/master/airtight.js --output airtight.js`
   * `wget https://raw.githubusercontent.com/theDragonFire/airtight-js/master/airtight.js`
   * In a web browser, navigate
     [here](https://raw.githubusercontent.com/theDragonFire/airtight-js/master/airtight.js),
     right click and select 'Save Page As...' or 'Save As...' and save it to the directory
	 that you want it in
2. Include the file
   * NodeJS: Add `const airtight = require("path/to/airtight");" in the file you
     want to use it in
   * Web Page Script: **WIP**

## API

### Test

* `static builder()`: Returns a new TestBuilder
* `static run(test_builder)`: Runs the TestBuilder that is passed to it

### TestBuilder

* `name(test_name)`: Sets the name of the test (used in the output)
* `description(description)`: Adds a short description of the test; this is not
  required and the description isn't used, but it is recommended in order to
  improve understanding of the test
* `ignore()`: Marks the test as one that should be ignored; this has no effect
  if the test is run alone using `Test.run`, but if the test is a part of a
  suite that is run using `TestSuite.run`, it will be ignored
* `test(test)`: Accepts a lambda function that takes no arguments; the lambda
  function is the test that will be run (eg. `() => { assert_eq(1 + 1, 2) }`)

### TestSuite

* `static builder()`: Returns a new TestSuiteBuilder
* `static run(test_suite_builder)`: Runs the TestSuiteBuilder that is passed to it

### TestBuilder

* `name(suite_name)`: Sets the name of the test suite (used in the output)
* `description(description)`: Adds a short description of the test; this is not
  required and the description isn't used, but it is recommended in order to
  improve understanding of the test suite
* `show_ignored(show)`: Accepts a boolean `show`;
   If show is `true`, causes an ignored section to be appended to the
   output, such as:
   ```
   		Ignored
			[Test A] Ignored
			[Test B] Ignored
   ```
   If `show` is `false`, or if `show_ignored` is omitted, the test that are
   ignored will be noted in the summary (eg. `3 run, 1 failed, 1 ignored`) but
   otherwise won't be printed out
* `add_test(test)`: Accepts a TestBuilder; adds the test to the suite

### Functions

* `assert(assertion)`: Assert that the value of `assertion` is truthy
* `assert_eq(obj1, obj2)`: Assert that `obj1` and `obj2` are equal
* `assert_neq(obj1, obj2)`: Assert that `obj1` and `obj2` are not equal

## Example

Here is an example of creating a simple test and running it. For a more detailed
use case and to see how to use airtight's test suite, see [this example](example.js).

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

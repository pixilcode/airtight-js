class Dog {
	speak() {
		return "Woof!";
	}

	is_animal() {
		return true;
	}
}

class Cat {
	speak() {
		return "Meow";
	}

	is_animal() {
		return true;
	}
}

// Tests
function run_tests() {
	const airtight = require("./airtight");

	const Test = airtight.Test;
	const TestSuite = airtight.TestSuite;
	const assert = airtight.assert;
	const assert_eq = airtight.assert_eq; // Assert 'equal'
	const assert_neq = airtight.assert_neq; // Assert 'not equal'

	// Setup
	let dog = new Dog();
	let cat = new Cat();

	// Tests
	let suite = TestSuite.builder() // Create a test suite builder
		.name("Animal Tests") // Give the test suite a name

		// Describe the purpose of the test suite
		// Currently, this does not actually affect the
		// test suite, but it helps others reading the
		// tests to understand the tests
		.description(
			"Test that Dog and Cat class work correctly"
		)

		// In the output, show the tests that are ignored
		// Causes an ignored section to be appended to the
		// output, such as:
		//     
		//    Ignored
		//        [Test A] Ignored
		//        [Test B] Ignored
		//    
		// If the argument to `show_ignored` is `false`,
		// or if `show_ignored` is omitted, the test that
		// are ignored will be noted in the summary (eg. 
		// "3 run, 1 failed, 1 ignored") but otherwise
		// won't be printed out
		.show_ignored(true)

		.add_test(Test.builder()
			.name("Dog Test") // Give the test a name

			// Describe the purpose of the test
			// Again, this isn't required, but it
			// aids in comprehension
			.description(
				"Test that the Dog actually " +
				"says 'Woof!' and not 'Meow'"
			)

			// Pass the test as a lambda function
			// that takes no arguments
			.test(() => {
				// Set up the prerequisites for the test
				// and expectations
				let expected = "Woof!";
				let incorrect = "Meow";

				// Make assertions

				//   Assert that the dog is an animal
				assert(dog.is_animal());

				//   Assert that the dog says 'Woof!'
				//   If it doesn't, throw an error with the
				//   message, "Dog should say 'Woof!'"
				assert_eq(dog.speak(), expected, "Dog should say 'Woof!'");

				//   Assert that the dog doesn't say 'Meow'
				//   If it does, throw an error with the
				//   message, "Dog shouldn't say 'Meow'"
				assert_neq(dog.speak(), incorrect, "Dog shouldn't say 'Meow'");
			}))

		.add_test(Test.builder()
			.name("Cat Test")

			.description(
				"Test that the Cat says " +
				"'Purrr' and not 'Woof!'"
			)

			// This test intentionally fails in order
			// to show how a failing test displays in
			// the output
			.test(() => {
				let expected = "Purrr";
				let incorrect = "Woof!";

				assert(cat.is_animal());
				assert_eq(cat.speak(), expected, "Cat should say 'Purrr'");
				assert_neq(cat.speak(), incorrect, "Cat shouldn't say 'Woof!'");
			}))

		.add_test(Test.builder()
			.name("Bird Test")

			// If you need to ignore a test because,
			// for example, a piece of it is unimplemented,
			// such as some class or function
			// you can add the ignore flag and the
			// test won't be run
			.ignore()

			.description(
				"Test that the Bird says 'Chirp'"
			)

			.test(() => {
				let expected = "Chirp";

				assert(Bird.is_animal());
				assert_eq(Bird.speak(), expected, "Bird should say 'Chirp'");
			}));

	// Run the test suite and print the results
	TestSuite.run(suite).print_result();

	// If there is anything that needs to be torn down,
	// do it here
}

run_tests();

// Output:
// 	[Animal Tests] 2 run, 1 failed, 1 ignored
// 		Successes
// 			[Dog Test] Success!
// 		Failures
// 			[Cat Test] AssertionError [ERR_ASSERTION]: Cat should say 'Purrr'
// 		Ignored
// 			[Bird Test] Ignored
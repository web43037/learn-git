const test = require('ava');

/*
to test with command line args do this: ava --verbose tests/baby-steps.js -- 1 2 3
the baby-steps.js should be in the 'tests' folder
run ava from the top directory, i.e. current-projects\cli-mine
*/
test('add command line args', t => {
    let result = 0;
    for (let i = 2; i < process.argv.length; i++) {
        result += Number(process.argv[i])
    }
    t.is(result, 6);
});
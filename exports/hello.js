'use strict'
var s = 'Hello';
function greet(name){
    console.log(s + ',' + name + '!');
}

function test(testname){
    console.log(s +'('+ testname +')'+ '!');
}
// module.exports = {
//     greet:greet,
//     test:test
// };

exports.test = test;
exports.greet = greet;
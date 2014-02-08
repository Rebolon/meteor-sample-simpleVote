Tinytest.add('LyonJS - Calc', function (test) {
    console.log('test');
    var calc = LyonJS.Calc;
    test.equal(calc.add(1,2), 3, 'Wrong result');
    test.equal(calc.sub(2,3), -1, 'Wrong result');
});

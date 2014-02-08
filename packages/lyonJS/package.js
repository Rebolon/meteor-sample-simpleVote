Package.describe({
    "summary": "simple package to describe package creation, and tinyTest"
});

Package.on_use(function(api) {
    api.add_files('lyonJS.js', ['client', 'server']);
    api.export('LyonJS', ['client', 'server']);
});

Package.on_test(function (api) {
    api.use(['lyonJS', 'tinytest', 'test-helpers'], ['client', 'server']);
    api.add_files('lyonJStests.js', ['client', 'server']);
});

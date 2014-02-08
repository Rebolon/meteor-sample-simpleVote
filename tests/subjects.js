var assert = require('assert');

suite('Subjects', function() {
    test('client/server - add subject', function(done, server, client) {
        server.eval(function() {
            // gestion des events
            var addedNewSubjects = function(item) {
                emit('newSubject', item);
            };
            
            Subjects.find().observe({
                added: addedNewSubjects
            });
        }).once('newSubject', function(item) {
            assert.equal(item.label, 'MeteorJS');
            done();
        });
        
        client.eval(function(item) {
            Subjects.insert({label: 'MeteorJS'});
        });

    });

    test('client/client - add subject', function(done, client1, client2) {
        client1.eval(function() {
            // gestion des events
            var addedNewSubjects = function(item) {
                emit('newSubject', item);
            };
                        
            Subjects.find().observe({
                added: addedNewSubjects
            });
                                                                                 
            emit('done');
        }).once('newSubject', function(item) {
            assert.equal(item.label, 'NodeJS');
            done();
        }).once('done', function() {
            var addSubjects = function() {
                Subjects.insert({label: 'NodeJS'});
            };
             client2.eval(addSubjects);
        });
    });

});



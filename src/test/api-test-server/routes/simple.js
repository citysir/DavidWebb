"use strict";

var SIMPLE_ASCII = 'Hello/World & Co.?';

module.exports = function registerRoutes(app) {

    app.get('/simple.txt', returnFormAsText);
    app.post('/simple.txt', returnFormAsText);

    function returnFormAsText(req, res) {
        res.header('Content-Type', 'text/plain');
        res.send(req.param('p1') + ', ' + req.param('p2')).end();
    }

    app.get('/simple.json', function (req, res) {
        res.json({p1: req.param('p1'), p2: req.param('p2')}).end();
    });

    app.post('/simple.json', function (req, res) {
        res.status(201).header("Link", "http://example.com/4711").end();
    });

    app.put('/simple.json', function (req, res) {
        res.json(req.body).end();
    });

    app.del('/simple', function (req, res) {
        res.status(204).end();
    });

    app.get('/parameter-types', function (req, res) {
        var ok = req.param('string') === SIMPLE_ASCII &&
            req.param('number') === '4711' &&
            req.param('null') === '' &&
            req.param('empty') === '';

        res.send(ok ? 204 : 500);
    });
};
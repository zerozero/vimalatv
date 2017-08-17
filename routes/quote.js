var express = require('express');
var router = express.Router();
var Quote = require('../models/quote');
var util = require('util');

router.get('/', function(req,res,next){

    console.log(util.inspect(req.query));
    Quote.find( req.query.filterDisabled ? {enabled:true} : {} )
        .exec(function(err,quotes){
            if (err) {
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                data: quotes
            });
        });
});

router.post('/', function(req,res,next){
    var quote = new Quote({
        text: req.body.text,
        enabled: req.body.enabled
    });
    quote.save(function(err,result){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            })
        }
        res.status(201).json({
            title:'Saved Quote',
            data:result
        });
    });

});

router.patch('/:id', function (req, res, next){
    Quote.findById(req.params.id, function(err, quote){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            });
        }
        if (!quote){
            return res.status(500).json({
                title:'No Quote Found',
                error: {message: 'Quote not found!'}
            });
        }
        quote.text = req.body.text;
        quote.enabled = req.body.enabled;
        quote.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                })
            }
            res.status(200).json({
                title:'Updated Quote',
                data:result
            });
        })
    })
});

router.delete('/:id', function (req, res, next){
    Quote.findById(req.params.id, function(err, quote){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            });
        }
        if (!quote){
            return res.status(500).json({
                title:'No Quote Found',
                error: {message: 'Quote not found!'}
            });
        }
        quote.remove(function(err, result){
            if (err){
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                })
            }
            res.status(200).json({
                title:'Deleted Quote',
                data:result
            });
        })
    })
});

module.exports = router;

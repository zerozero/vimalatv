var express = require('express');
var router = express.Router();
var Artist = require('../models/artist');
var util = require('util');

router.get('/', function(req,res,next){

    console.log(util.inspect(req.query));
    Artist.find( req.query.filterDisabled ? {enabled:true} : {} )
        .exec(function(err,artists){
            if (err) {
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                data: artists
            });
        });
});

router.post('/', function(req,res,next){
    var artist = new Artist({
        name: req.body.name,
        enabled: req.body.enabled
    });
    artist.save(function(err,result){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            })
        }
        res.status(201).json({
            title:'Saved Artist',
            data:result
        });
    });

});

router.patch('/:id', function (req, res, next){
    Artist.findById(req.params.id, function(err, artist){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            });
        }
        if (!artist){
            return res.status(500).json({
                title:'No Artist Found',
                error: {message: 'Artist not found!'}
            });
        }
        artist.name = req.body.name;
        artist.enabled = req.body.enabled;
        artist.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                })
            }
            res.status(200).json({
                title:'Updated Artist',
                data:result
            });
        })
    })
});

router.delete('/:id', function (req, res, next){
    Artist.findById(req.params.id, function(err, artist){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            });
        }
        if (!artist){
            return res.status(500).json({
                title:'No Artist Found',
                error: {message: 'Artist not found!'}
            });
        }
        artist.remove(function(err, result){
            if (err){
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                })
            }
            res.status(200).json({
                title:'Deleted Artist',
                data:result
            });
        })
    })
});

module.exports = router;

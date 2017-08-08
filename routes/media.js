var express = require('express');
var router = express.Router();
var Media = require('../models/media');
var util = require('util');

router.get('/', function(req,res,next){

    console.log(util.inspect(req.query));
    Media.find( req.query.filterDisabled ? {enabled:true} : {} )
        .exec(function(err,sources){
            if (err) {
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                data: sources
            });
        });
});

router.get('/:type', function(req,res,next){

    Media.find( req.query.filterDisabled ? {enabled:true, type:req.params.type} : {type:req.params.type} )
        .exec(function(err,sources){
            if (err) {
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                data: sources
            });
        });
});

router.post('/', function(req,res,next){
    var media = new Media({
        title: req.body.title,
        url: req.body.url,
        type: req.body.type,
        enabled: req.body.enabled
    });
    media.save(function(err,result){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            })
        }
        res.status(201).json({
            title:'Saved Media',
            data:result
        });
    });

});

router.patch('/:id', function (req, res, next){
    Media.findById(req.params.id, function(err, media){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            });
        }
        if (!media){
            return res.status(500).json({
                title:'No Media Found',
                error: {message: 'Media not found!'}
            });
        }
        media.title = req.body.title;
        media.type = req.body.type;
        media.url = req.body.url;
        media.enabled = req.body.enabled;
        media.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                })
            }
            res.status(200).json({
                title:'Updated Media',
                data:result
            });
        })
    })
});

router.delete('/:id', function (req, res, next){
    Media.findById(req.params.id, function(err, media){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            });
        }
        if (!media){
            return res.status(500).json({
                title:'No Media Found',
                error: {message: 'Media not found!'}
            });
        }
        media.remove(function(err, result){
            if (err){
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                })
            }
            res.status(200).json({
                title:'Deleted Media',
                data:result
            });
        })
    })
});

module.exports = router;

var express = require('express');
var router = express.Router();
var Page = require('../models/page');
// var Bio = require('../models/bio');
var util = require('util');
var DIR = './uploads/';
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var cloudinary = require('cloudinary');


router.get('/bio', function(req,res,next){


    Page.find( req.query.filterDisabled ? {enabled:true} : {type:'bio'} )
        .exec(function(err,bios){
            if (err) {
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                data: bios
            });
        });
});

router.post('/bio', function(req,res,next){
    var page = new Page({
        type: 'bio',
        artist_id: req.body.artist_id,
        templates: req.body.templates,
        enabled: req.body.enabled
    });
    page.save(function(err,result){
        if (err){
            console.log(err);
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            })
        }
        res.status(201).json({
            title:'Saved Page',
            data:result
        });
    });

});

router.get('/collab', function(req,res,next){

    Page.find( req.query.filterDisabled ? {enabled:true} : {type:'collaboration'} )
        .exec(function(err,collabs){
            if (err) {
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                data: collabs
            });
        });
});

router.get('/collab/:id', function(req,res,next){

    var id = req.params.id;
    Page.find({artist_id: id})
        .exec(function(err,collabs){
            if (err) {
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Success',
                data: collabs
            });
        });
});

router.post('/', function(req,res,next){
    var collab = new Page({
        type: 'collaboration',
        artist_id: req.body.artist_id,
        templates: req.body.templates,
        enabled: req.body.enabled
    });
    collab.save(function(err,result){
        if (err){
            console.log(err);
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            })
        }
        res.status(201).json({
            title:'Saved Page',
            data:result
        });
    });

});

//N.B. when uploading from ng2-file-uploader the fieldname for the form request is 'file'
//this must match the value set for the multer middleware
router.post('/collab/upload', upload.array('file', 12), function(req,res,next){

    cloudinary.uploader.upload_stream(function(result){
        res.status(201).json({
            title:'Uploaded file',
            data:result
        });
    }).end(req.files[0]['buffer']);

});

router.patch('collab/:id', function (req, res, next){
    Page.findById(req.params.id, function(err, collab){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            });
        }
        if (!collab){
            return res.status(500).json({
                title:'No Page Found',
                error: {message: 'Page not found!'}
            });
        }
        collab.name = req.body.name;
        collab.enabled = req.body.enabled;
        collab.templates = req.body.templates;
        collab.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                })
            }
            res.status(200).json({
                title:'Updated Page',
                data:result
            });
        })
    })
});

router.delete('collab/:id', function (req, res, next){
    Page.findById(req.params.id, function(err, collab){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            });
        }
        if (!collab){
            return res.status(500).json({
                title:'No Page Found',
                error: {message: 'Page not found!'}
            });
        }
        collab.remove(function(err, result){
            if (err){
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                })
            }
            res.status(200).json({
                title:'Deleted Page',
                data:result
            });
        })
    })
});

module.exports = router;

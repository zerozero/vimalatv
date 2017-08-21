var express = require('express');
var router = express.Router();
var Page = require('../models/page');
var util = require('util');
var DIR = './uploads/';
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var cloudinary = require('cloudinary');


router.get(['/bio','/collab'], function(req,res,next){

    var type = req.path.substr(1);
    Page.find( req.query.filterDisabled ? {enabled:true, type:type} : {type:type} )
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



router.post(['/bio','/collab'], function(req,res,next){
    var type = req.path.substr(1);
    var page = new Page({
        type: type,
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



router.patch(['/bio/:id','/collab/:id'], function (req, res, next){

    Page.findById(req.params.id, function(err, page){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            });
        }
        if (!page){
            return res.status(500).json({
                title:'No Page Found',
                error: {message: 'Page not found!'}
            });
        }

        page.enabled = req.body.enabled;
        page.templates = req.body.templates;
        page.save(function(err, result){
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



router.delete(['/bio/:id','/collab/:id'], function (req, res, next){

    Page.findById(req.params.id, function(err, page){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            });
        }
        if (!page){
            return res.status(500).json({
                title:'No Page Found',
                error: {message: 'Page not found!'}
            });
        }
        page.remove(function(err, result){
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



//N.B. when uploading from ng2-file-uploader the fieldname for the form request is 'file'
//this must match the value set for the multer middleware
router.post('/upload', upload.array('file', 12), function(req,res,next){

    cloudinary.uploader.upload_stream(function(result){
        res.status(201).json({
            title:'Uploaded file',
            data:result
        });
    }).end(req.files[0]['buffer']);

});



module.exports = router;

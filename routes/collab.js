var express = require('express');
var router = express.Router();
var Collab = require('../models/collab');
var util = require('util');
var DIR = './uploads/';
var multer = require('multer');
// var upload = multer({dest: DIR});
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var cloudinary = require('cloudinary');

router.get('/', function(req,res,next){

    console.log(util.inspect(req.query));
    Collab.find( req.query.filterDisabled ? {enabled:true} : {} )
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
    var collab = new Collab({
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
            title:'Saved Collab',
            data:result
        });
    });

});

//N.B. when uploading from ng2-file-uploader the fieldname for the form request is 'file'
//this must match the value set for the multer middleware
router.post('/upload', upload.array('file', 12), function(req,res,next){
    // console.log("uploadFiles......"+util.inspect(req.files,false,1));
    // console.log('uploading..'+req.files.length+' files');


    // cloudinary.uploader
    //     .upload_stream((result) => console.log(result))
    //     .end(req.files.avatar.data)

    cloudinary.uploader.upload_stream(function(result){
        res.status(201).json({
            title:'Uploaded file',
            data:result
        });
    }).end(req.files[0]['buffer']);


    return;
    // console.log("cloudinary result "+util.inspect(req));
    cloudinary.uploader.upload(req.files[0]['buffer'], function(result) {

        //we save these urls to the database for later retrieval by the app
        //images with these specs are created on demand by cloudinary the first time they are requested
        var thumb = (cloudinary.url(result.public_id+'.'+result.format, { secure: true, width: 250, height: 250, background: '#fff', crop: 'pad' } ));
        var display = (cloudinary.url(result.public_id+'.'+result.format, { secure: true, width: 200, height: 273, background: '#fff',crop: 'pad' } ));

        // UploadDAO
        //     ['uploadFile'](result, req.body, thumb, display)
        //     .then(file => res.status(201).json(file))
        // .catch(error => res.status(400).json(error));
    });
});

router.patch('/:id', function (req, res, next){
    Collab.findById(req.params.id, function(err, collab){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            });
        }
        if (!collab){
            return res.status(500).json({
                title:'No Collab Found',
                error: {message: 'Collab not found!'}
            });
        }
        collab.name = req.body.name;
        collab.enabled = req.body.enabled;
        collab.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                })
            }
            res.status(200).json({
                title:'Updated Collab',
                data:result
            });
        })
    })
});

router.delete('/:id', function (req, res, next){
    Collab.findById(req.params.id, function(err, collab){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            });
        }
        if (!collab){
            return res.status(500).json({
                title:'No Collab Found',
                error: {message: 'Collab not found!'}
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
                title:'Deleted Collab',
                data:result
            });
        })
    })
});

module.exports = router;

var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');
var util = require('util');

router.get('/', function(req,res,next){

    console.log(util.inspect(req.query));
    Contact.findOne()
        .exec(function(err,contact){
            if (err) {
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                data: contact
            });
        });
});

router.post('/', function(req,res,next){

    console.log(util.inspect(req.body));

    var contact = new Contact({
        twitterUrl: req.body.twitterUrl,
        fbUrl: req.body.fbUrl,
        instaUrl: req.body.instaUrl,
        email: req.body.email
    });
    contact.save(function(err,result){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            })
        }
        res.status(201).json({
            title:'Saved Contact',
            data:result
        });
    });

});

router.patch('/:id', function (req, res, next){
    Contact.findById(req.params.id, function(err, contact){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            });
        }
        if (!contact){
            return res.status(500).json({
                title:'No Contact Found',
                error: {message: 'Contact not found!'}
            });
        }
        contact.twitterUrl = req.body.twitterUrl;
        contact.fbUrl = req.body.fbUrl;
        contact.instaUrl = req.body.instaUrl;
        contact.email = req.body.email;

        contact.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                })
            }
            res.status(200).json({
                title:'Updated Contact',
                data:result
            });
        })
    })
});

router.delete('/:id', function (req, res, next){
    Contact.findById(req.params.id, function(err, contact){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            });
        }
        if (!contact){
            return res.status(500).json({
                title:'No Contact Found',
                error: {message: 'Contact not found!'}
            });
        }
        contact.remove(function(err, result){
            if (err){
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                })
            }
            res.status(200).json({
                title:'Deleted Contact',
                data:result
            });
        })
    })
});

module.exports = router;

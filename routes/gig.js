var express = require('express');
var router = express.Router();
var Gig = require('../models/gig');
var util = require('util');

router.get('/', function(req,res,next){

    Gig.find( req.query.filterDisabled ? {enabled:true} : {} )
        .exec(function(err,gigs){
            if (err) {
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                data: gigs
            });
        });
});

router.get('/:dateString', function(req,res,next){
    var date = new Date(req.params.dateString);
    console.log(date);
    Gig.find({date: {$gt: date}})
        .exec(function(err,gigs){
            if (err) {
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                data: gigs
            });
        });
});

router.post('/', function(req,res,next){
    var gig = new Gig({
        date: req.body.date,
        venue: req.body.venue,
        description: req.body.description,
        website: req.body.website,
        ticketUrl: req.body.ticketUrl,
        enabled: req.body.enabled,
        permanent: req.body.permanent
    });
    gig.save(function(err,result){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            })
        }
        res.status(201).json({
            title:'Saved Gig',
            data:result
        });
    });

});

router.patch('/:id', function (req, res, next){
   Gig.findById(req.params.id, function(err, gig){
       if (err){
           return res.status(500).json({
               title:'An Error Occurred',
               error: err
           });
       }
       if (!gig){
           return res.status(500).json({
               title:'No Gig Found',
               error: {message: 'Gig not found!'}
           });
       }
       gig.date = req.body.date;
       gig.venue = req.body.venue;
       gig.description = req.body.description;
       gig.website = req.body.website;
       gig.ticketUrl = req.body.ticketUrl;
       gig.enabled = req.body.enabled;
       gig.permanent = req.body.permanent;
       gig.save(function(err, result){
           if (err){
               return res.status(500).json({
                   title:'An Error Did Occurred',
                   error: err
               })
           }
           res.status(200).json({
               title:'Updated Gig',
               data:result
           });
       })
   })
});

router.delete('/:id', function (req, res, next){
    Gig.findById(req.params.id, function(err, gig){
        if (err){
            return res.status(500).json({
                title:'An Error Occurred',
                error: err
            });
        }
        if (!gig){
            return res.status(500).json({
                title:'No Gig Found',
                error: {message: 'Gig not found!'}
            });
        }
        gig.remove(function(err, result){
            if (err){
                return res.status(500).json({
                    title:'An Error Occurred',
                    error: err
                })
            }
            res.status(200).json({
                title:'Deleted Gig',
                data:result
            });
        })
    })
});

module.exports = router;

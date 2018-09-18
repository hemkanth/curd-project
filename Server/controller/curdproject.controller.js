var CurdModel = require('../models/curdproject.model');

exports.Create = function(req, res) {
    
    var CurdCreate = new CurdModel.CurdSchema({
        Name: req.body.Name,
        Age: req.body.Age,
        Email: req.body.Email,
        DOB: req.body.DOB,
        Credit: req.body.Credit
    });
    CurdCreate.save(function(err, result) {
        if(err){            
            res.status(400).send({Status: false, Response: err});
        }
        else {
            res.status(200).send({Status: true, Response: result});
        }
    });
};

exports.List = function(req, res) {
    CurdModel.CurdSchema.find({}, function(err, result) {
        if(err) {
            res.status(400).send({Status: false, Message: 'error in List'});
        }
        else {
            res.status(200).send({Status: true, Response: result});
        }
    });
}

exports.Delete = function(req, res) {
    CurdModel.CurdSchema.deleteOne({_id: req.params.Id}, function(err, result) {
        if(err) {
            res.status(400).send({Status: false, Message: 'error in delete'});
        }
        else {
            res.status(200).send({Status: true, Message: 'successfully deleted'});
        }
    });
}

exports.Update = function(req, res) {

    CurdModel.CurdSchema.findOne( {_id: req.body.Id}, function(err, result){
       if (err) {
          res.status(400).send({Status: false, Message: 'Some Error Occurred!'});
       }else {
            result.Name = req.body.Name,
            result.Age = req.body.Age,
            result.Email = req.body.Email,
            result.DOB = req.body.DOB,
            result.Credit = req.body.Credit
            result.save( function(err_1, res_1) {
                if (err_1) {
                    res.status(400).send({Status: false, Message: 'Some Error Occurred!'});
                }else {
                    res.status(200).send({Status: true, Response: res_1});
                }
            });
        }
    });
 
 };
 
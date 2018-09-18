var mongoose = require('mongoose');

var CurdSchema = mongoose.Schema({
    Name: {type: String, require: true, unique: true},
    Age: { type: Number, require: true},
    Email: {type: String, require: true, unique: true},
    DOB: {type: Date, require: true},
    Credit: {type: Number}
    },
    {timestamps: true}
);

var VarCurdSchema = mongoose.model('Curd', CurdSchema, 'Curd_List');

module.exports = {
    CurdSchema: VarCurdSchema
}
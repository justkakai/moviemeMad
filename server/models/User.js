const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: v => v.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    watchlist: Array // ***** NOT COVERED YET!
});

userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email });
};

userSchema.query.byName = function (name) {
    return this.where({ name: new RegExp(name, "i") });
}

module.exports = mongoose.model("User", userSchema);
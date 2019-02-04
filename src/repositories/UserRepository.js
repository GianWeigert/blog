'use strict'

exports.register = async(user) => {
   await user.save();
}
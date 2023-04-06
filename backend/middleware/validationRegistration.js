const { checkSchema, validationResult } = require('express-validator');

exports.validatorRegistration = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({
            status: 400,
            message: errors.array()
        })
    }
    next()
}

exports.validationRegistrationList = checkSchema({
    username: {

        notEmpty: {
            errorMessage: 'Username should not be empty',
        }
    },
    // Support bail functionality in schemas
    email: {
        isEmail: {
            bail: true,
            errorMessage: 'Format email wrong',
        },
        notEmpty: {
            errorMessage: 'Email should not be empty',
        }
    },
    password: {
        isLength: {
            errorMessage: 'Password should be at least 8 chars long',
            // Multiple options would be expressed as an array
            options: { min: 8 },
        },
    },
    phone_number: {
        notEmpty: {
            errorMessage: 'Phone number should not be empty',
        }
    },
    confirm_password: {
        custom: {
            options:
                (value, { req }) => {
                    if (value !== req.body.password) {
                        throw new Error('Password confirmation does not match password');
                    }
                    return true;
                }
        }
    }
})
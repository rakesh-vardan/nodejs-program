import Joi from 'joi';

const schema = Joi.object().keys({
    id: Joi.string().alphanum(),
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    age: Joi.number().min(1).max(99).required(),
    isDeleted: Joi.boolean()
})

const options = {
    abortEarly: true,
    allowUnknown: true,
    stripUnknown: true
};

const validator = (req: any, next: any) => {
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}

export default validator;

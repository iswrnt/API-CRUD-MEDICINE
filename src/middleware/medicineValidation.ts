import { NextFunction, Request, Response } from "express";
import Joi, { required } from "joi";

/**create a rule/schema for add new medicine */
const createSceme = Joi.object({
    name: Joi.string().required(),
    stock: Joi.number().min(0).required(),
    price: Joi.number().min(1).required(),
    exp_date: Joi.date().required(),
    type: Joi.string().valid("Syrup","Tablet","Powder").required(),
})

const createValidation = (req: Request,res: Response,next: NextFunction) => {
    const validate = createSceme.validate(req.body)
    if (validate.error) {
        return res.status(400)
        .json({
            message: validate
            .error
            .details
            .map(it => it.message)
            .join()
        })
    }
    next()
}

/**create a rule/scheme for update medicine */
const updateSceme = Joi.object({
    name: Joi.string().optional(),
    stock: Joi.number().min(0).optional(),
    price: Joi.number().min(1).optional(),
    exp_date: Joi.date().optional(),
    type: Joi.string().valid("Syrup","Tablet","Powder").optional(),
})

const updateValidation = (req: Request,res: Response,next: NextFunction) => {
    const validate = updateSceme.validate(req.body)
    if (validate.error) {
        return res.status(400)
        .json({
            message: validate
            .error
            .details
            .map(it => it.message)
            .join()
        })
    }
    next()
}

export {createValidation, updateValidation}
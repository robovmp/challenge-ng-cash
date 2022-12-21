import Joi from 'joi'

interface User {
    name: string
    password: string
}

export default (user: User) => {
    // Necessário no mínimo uma maiúscula e um número.
    const pattern = '(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,20}'

    const bodySchema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        password: Joi.string()
            .alphanum()
            .regex(RegExp(pattern))
            .required()
            .min(8)
            .max(20),
    })

    const result = bodySchema.validate(user)

    if (result.error) throw new Error('Precondition failed.')
}

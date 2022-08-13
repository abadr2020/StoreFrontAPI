import { check } from "express-validator";


const validateGetRole = () => {
    return [
        check('id','role id should be provided').exists()
        .isInt().withMessage('role id should be a number')
    ]

}
const validateCreateRole = () => {
    return [
        check('rolename','rolename should be provided').exists()
        .isLength({min: 5, max: 50}).withMessage('rolename should be between 5 and 50 char')
        .isAlphanumeric().withMessage('rolename should be alpanumeric')
        .trim()
    ]
}
const validateUpdateRole = () => {
    return [
        check('rolename','rolename should be provided').exists()
        .isLength({min: 5, max: 50}).withMessage('rolename should be between 5 and 50 char')
        .isAlphanumeric().withMessage('rolename should be alpanumeric')
        .trim(),
        check('id','role id should be provided').exists()
        .isInt().withMessage('role id should be a number')
    ]

}
const validateDeleteRole = () => {
    return [
        check('id','role id should be provided').exists()
        .isInt().withMessage('role id should be a number')
    ]

}
export  { validateGetRole, validateCreateRole, validateUpdateRole, validateDeleteRole };
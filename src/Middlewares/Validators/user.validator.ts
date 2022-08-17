import { check } from "express-validator";


const validateGetUser = () => {
    return [
        check('id', 'user id should be provided').exists()
            .isInt().withMessage('user id should be a number')
    ]

}
const validateGetUserByRoleId = () => {
    return [
        check('roleid', 'role id should be provided').exists()
            .isInt().withMessage('role id should be a number')
    ]

}
const validateCreateUser = () => {
    return [
        check('firstname', 'firstname should be provided').exists()
            .isLength({ min: 3, max: 50 }).withMessage('firstname should be between 5 and 50 char')
            .isString().withMessage('firstname should be alphanumeric')
            .trim(),
        check('lastname', 'lastname should be provided').exists()
            .isLength({ min: 3, max: 50 }).withMessage('lastname should be between 5 and 50 char')
            .isString().withMessage('lastname should be alphanumeric')
            .trim(),
        check('username', 'username should be provided').exists()
            .isLength({ min: 5, max: 50 }).withMessage('username should be between 5 and 50 char')
            .isAlphanumeric().withMessage('username should be alphanumeric')
            .trim(),
        check("password", "Password should be combination of one uppercase, one lower case, one special character, one digit. password length is between 8 and 20 characters")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/),
        check('roleid', 'role id should be provided').exists()
            .isInt().withMessage('role id should be a number')
    ]
}
const validateUpdateUser = () => {
    return [
        check('id', 'user id should be provided').exists()
            .isInt().withMessage('user id should be a number'),
        check('firstname', 'firstname should be provided').exists()
            .isLength({ min: 3, max: 50 }).withMessage('firstname should be between 5 and 50 char')
            .isString().withMessage('firstname should be alphanumeric')
            .trim(),
        check('lastname', 'lastname should be provided').exists()
            .isLength({ min: 3, max: 50 }).withMessage('lastname should be between 5 and 50 char')
            .isString().withMessage('lastname should be alphanumeric')
            .trim(),
        check('username', 'username should be provided').exists()
            .isLength({ min: 5, max: 50 }).withMessage('username should be between 5 and 50 char')
            .isAlphanumeric().withMessage('username should be alphanumeric')
            .trim(),
        check("password", "Password should be combination of one uppercase, one lower case, one special character, one digit. password length is between 8 and 20 characters")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/),
        check('roleid', 'role id should be provided').exists()
            .isInt().withMessage('role id should be a number')
    ]

}
const validateDeleteUser = () => {
    return [
        check('id', 'user id should be provided').exists()
            .isInt().withMessage('user id should be a number')
    ]

}
const validateLogin = () => {
    return [
        check('username', 'username should be provided').exists()
            .isLength({ min: 5, max: 50 }).withMessage('username should be between 5 and 50 char')
            .isAlphanumeric().withMessage('username should be alphanumeric')
            .trim(),
        check("password", "Password should be combination of one uppercase, one lower case, one special character, one digit. password length is between 8 and 20 characters")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    ]

}

export { validateGetUser, validateGetUserByRoleId, validateCreateUser, validateUpdateUser, validateDeleteUser, validateLogin };
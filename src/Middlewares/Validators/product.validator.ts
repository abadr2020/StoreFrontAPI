import { check } from "express-validator";


const validateGetProduct = () => {
    return [
        check('id', 'product id should be provided').exists()
            .isInt().withMessage('product id should be a number')
    ]

}
const validateCreateProduct = () => {
    return [
        check('productname', 'productname should be provided').exists()
            .isLength({ min: 5, max: 50 }).withMessage('productname should be between 5 and 50 char')
            .isAlphanumeric().withMessage('productname should be alphanumeric')
            .trim()
    ]
}
const validateUpdateProduct = () => {
    return [
        check('productname', 'productname should be provided').exists()
            .isLength({ min: 5, max: 50 }).withMessage('productname should be between 5 and 50 char')
            .isAlphanumeric().withMessage('productname should be alphanumeric')
            .trim(),
        check('id', 'product id should be provided').exists()
            .isInt().withMessage('product id should be a number')
    ]

}
const validateDeleteProduct = () => {
    return [
        check('id', 'product id should be provided').exists()
            .isInt().withMessage('product id should be a number')
    ]

}
export { validateGetProduct, validateCreateProduct, validateUpdateProduct, validateDeleteProduct };
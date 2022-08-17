import { check } from "express-validator";


const validateGetProduct = () => {
    return [
        check('id', 'product id should be provided').exists()
            .isInt().withMessage('product id should be a number')
    ]

}
const validateGetProductsByCatId = () => {
    return [
        check('catid', 'category id should be provided').exists()
            .isInt().withMessage('category id should be a number')
    ]

}
const validateCreateProduct = () => {
    return [
        check('productname', 'productname should be provided').exists()
            .isLength({ min: 5, max: 50 }).withMessage('productname should be between 5 and 50 char')
            .isAlphanumeric().withMessage('productname should be alphanumeric')
            .trim(),
        check('price', 'category id should be provided').exists()
            .isDecimal().withMessage('category id should be a decimal number'),
        check('categoryid', 'category id should be provided').exists()
            .isInt().withMessage('category id should be a number')

    ]
}
const validateUpdateProduct = () => {
    return [
        check('productname', 'productname should be provided').exists()
            .isLength({ min: 5, max: 50 }).withMessage('productname should be between 5 and 50 char')
            .isAlphanumeric().withMessage('productname should be alphanumeric')
            .trim(),
        check('price', 'category id should be provided').exists()
            .isDecimal().withMessage('category id should be a decimal number'),
        check('categoryid', 'category id should be provided').exists()
            .isInt().withMessage('category id should be a number'),
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
export { validateGetProduct, validateGetProductsByCatId, validateCreateProduct, validateUpdateProduct, validateDeleteProduct };
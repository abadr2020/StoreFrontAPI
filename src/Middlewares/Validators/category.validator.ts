import { check } from "express-validator";


const validateGetCategory = () => {
    return [
        check('id', 'category id should be provided').exists()
            .isInt().withMessage('category id should be a number')
    ]

}
const validateCreateCategory = () => {
    return [
        check('categoryname', 'categoryname should be provided').exists()
            .isLength({ min: 5, max: 50 }).withMessage('categoryname should be between 5 and 50 char')
            .isAlphanumeric().withMessage('categoryname should be alphanumeric')
            .trim()
    ]
}
const validateUpdateCategory = () => {
    return [
        check('categoryname', 'categoryname should be provided').exists()
            .isLength({ min: 5, max: 50 }).withMessage('categoryname should be between 5 and 50 char')
            .isAlphanumeric().withMessage('categoryname should be alphanumeric')
            .trim(),
        check('id', 'category id should be provided').exists()
            .isInt().withMessage('category id should be a number')
    ]

}
const validateDeleteCategory = () => {
    return [
        check('id', 'category id should be provided').exists()
            .isInt().withMessage('category id should be a number')
    ]

}
export { validateGetCategory, validateCreateCategory, validateUpdateCategory, validateDeleteCategory };
import { check } from "express-validator";


const validateGetOrder = () => {
    return [
        check('id', 'order id should be provided').exists()
            .isInt().withMessage('order id should be a number')
    ]

}
const validateGetOrderByUserId = () => {
    return [
        check('userid', 'user id should be provided').exists()
            .isInt().withMessage('user id should be a number')
    ]

}
const validateCreateOrder = () => {
    return [
        check('order.*.productname', 'productname should be provided').exists()
            .isLength({ min: 5, max: 50 }).withMessage('productname should be between 5 and 50 char')
            .isAlphanumeric().withMessage('productname should be alphanumeric')
            .trim(),
        check('order.*.qty', 'quantity (qty) should be provided').exists()
            .isInt().withMessage('quantity (qty) should be a number'),
        check('userid', 'user id should be provided').exists()
            .isInt().withMessage('user id should be a number')
    ]
}
const validateUpdateOrder = () => {
    return [
        check('id', 'order id should be provided').exists()
            .isInt().withMessage('order id should be a number'),
        check('orderstatus').optional()
            .isIn(['Active', 'Completed']).withMessage('order status should be either Active or Completed'),
        check('order.*.productname', 'productname should be provided').exists()
            .isLength({ min: 5, max: 50 }).withMessage('productname should be between 5 and 50 char')
            .isAlphanumeric().withMessage('productname should be alphanumeric')
            .trim(),
        check('order.*.qty', 'quantity (qty) should be provided').exists()
            .isInt().withMessage('quantity (qty) should be a number'),
        check('userid', 'user id should be provided').exists()
            .isInt().withMessage('user id should be a number')
    ]

}
const validateDeleteOrder = () => {
    return [
        check('id', 'order id should be provided').exists()
            .isInt().withMessage('order id should be a number')
    ]

}

export { validateGetOrder, validateGetOrderByUserId, validateCreateOrder, validateUpdateOrder, validateDeleteOrder };
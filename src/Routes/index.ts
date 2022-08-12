import express from 'express'
import categoryRoute from './category.route'
import orderRoute from './order.route'
import productRoute from './product.route'
import roleRoute from './role.route'
import userRoute from './user.route'


const Router = express.Router()


Router.use('/role', roleRoute)
Router.use('/user', userRoute)
Router.use('/category', categoryRoute)
Router.use('/product', productRoute)
Router.use('/order', orderRoute)



export default Router
import express from 'express'
import authenticate from '../Middlewares/authenticate'
import authorizeAdmin from '../Middlewares/authorizeAdmin'
import categoryRoute from './category.route'
import orderRoute from './order.route'
import productRoute from './product.route'
import roleRoute from './role.route'
import userRoute from './user.route'


const Router = express.Router()


Router.use('/role',authorizeAdmin,roleRoute)
Router.use('/user', userRoute)
Router.use('/category',authorizeAdmin, categoryRoute)
Router.use('/product',authorizeAdmin, productRoute)
Router.use('/order',authenticate,orderRoute)



export default Router
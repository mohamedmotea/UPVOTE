import { config } from 'dotenv'
import express from 'express'
import db_connection from './DB/connection.js'
import userRouter from './src/Modules/User/user.routes.js'
import globalResponse from './src/Middlewares/globalResponse.js'
import productRouter from './src/Modules/Product/product.routes.js'
import commentRouter from './src/Modules/Comment/comment.routes.js'
import LikeRouter from './src/Modules/Likes/like.routes.js'
import replayRouter from './src/Modules/Replay/replay.routes.js'
const app = express()
config({path:'./config/dev.config.env'})

const port = process.env.PORT


db_connection()
app.use(express.json())
app.use('/user',userRouter)
app.use('/product',productRouter)
app.use('/comment',commentRouter)
app.use('/like',LikeRouter)
app.use('/replay',replayRouter)
app.use(globalResponse)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
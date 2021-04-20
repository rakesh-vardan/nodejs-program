import express from 'express';
import userRoutes from './routes/users'

const app = express();
const port = parseInt(process.env.PORT || '3000')

app.use(express.json())
app.use(userRoutes);

app.listen(port, () => {
    console.log(`Server started on port 3000 ${port}...`);
});


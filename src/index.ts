import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db';
import memberRoutes from './routes/member.routes';
import roleRoutes from './routes/role.routes';
import memberRoleRoutes from './routes/memberRole.routes';
import authRoutes from './routes/auth.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json'; 
import './models';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Welcome to the Member Management API. Visit /api-docs for Swagger docs.');
});

app.use('/members', memberRoutes);
app.use('/roles', roleRoutes);
app.use('/member_roles', memberRoleRoutes);
app.use('/api/auth', authRoutes);

async function start() {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced');

    app.listen(4000, () => {
      console.log('🚀 Server running at http://localhost:4000');
      console.log('📚 Swagger docs available at http://localhost:4000/api-docs');
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
  }
}

start();

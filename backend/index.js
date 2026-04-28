const { app, server, io } = require('./src/app');

const authRoutes = require('./src/routes/auth.routes');
const sensoresRoutes = require('./src/routes/sensores.routes')(io);

app.use('/auth', authRoutes);
app.use('/sensores', sensoresRoutes);

server.listen(3001, () => {
  console.log("Servidor en puerto 3001");
});
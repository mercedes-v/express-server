const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      }
      // El token es válido, puedes continuar con la lógica de la ruta protegida
      next();
    });
  };
  
  app.get('/ruta-protegida', verifyToken, (req, res) => {
    // Lógica de la ruta protegida aquí
  });
  
import express from 'express';

module.exports = (app, root) => {
  app.use('/', express.static(root, {
    maxage: 31557600,
  }));

  app.use(express.static(root, {
    setHeaders: (res) => {
      res.header('Cache-Control', 'no-cache');
    },
  }));

  app.use((req, res, next) => {
    if (req.method === 'GET' && req.accepts('html')) {
      res.header('Cache-Control', 'max-age=60, must-revalidate, private');

      res.sendFile('index.html', { root });
    } else {
      next();
    }
  });
};

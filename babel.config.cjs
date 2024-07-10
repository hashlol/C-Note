module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current', // Or specify your target Node version
          },
        },
      ],
    ],
  };
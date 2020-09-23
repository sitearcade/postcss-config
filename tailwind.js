// export

module.exports = {
  plugins: [
    [
      'postcss-preset-env', {
        stage: 2,
        preserve: false,

        features: {
          'custom-properties': false,
        },
        autoprefixer: {
          flexbox: 'no-2009',
        },
      },
    ],

    'tailwindcss',
  ],
};

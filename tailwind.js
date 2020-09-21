// vars

const isProd = process.env.NODE_ENV === 'production';

const classRx = /[\w-/.:]+(?<!:)/g;

// fns

const compact = (arr) => arr.filter(Boolean);

// export

module.exports = {
  plugins: compact([
    'tailwindcss',

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

    isProd && [
      '@fullhuman/postcss-purgecss', {
        content: ['./**/*.js', './node_modules/@arc/**/*.js'],
        defaultExtractor: (content) => content.match(classRx) || [],
      },
    ],
  ]),
};

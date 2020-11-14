// import

const path = require('path');

// vars

const isProd = process.env.NODE_ENV === 'production';

const classRx = /[\w-/.:]+(?<!:)/g;

// fns

const compact = (arr) => arr.filter(Boolean);

// export

module.exports = {
  plugins: compact([
    'postcss-normalize',
    'postcss-import',

    [
      'postcss-assets', {
        loadPaths: [
          path.resolve(process.cwd(), './public'),
          process.cwd(),
        ],
      },
    ],

    [
      'postcss-preset-env', {
        stage: 1,
        preserve: false,

        features: {
          'custom-properties': false,
        },
        autoprefixer: {
          flexbox: 'no-2009',
        },

        importFrom: [],
        exportTo: [],

        // INFO: https://github.com/csstools/postcss-preset-env/blob/master/src/lib/ids-by-execution-order.js
        insertBefore: {
          'custom-media-queries': [
            require('postcss-functions')({
              functions: {/* ...functions */},
            }),
          ],
        },
        insertAfter: {
          'all-property': [
            require('postcss-short')(),
            require('postcss-easings')(),
            require('postcss-easing-gradients')(),
          ],
        },
      },
    ],

    isProd && [
      '@fullhuman/postcss-purgecss', {
        content: ['./**/*.js', './node_modules/@arc/**/*.js'],
        defaultExtractor: (content) => content.match(classRx) || [],
      },
    ],

    isProd && [
      'cssnano', {
        preset: ['default', {autoprefixer: false}],
      },
    ],
  ]),
};

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
          path.resolve(process.cwd(), './static'),
          process.cwd(),
        ],
      },
    ],

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
            require('postcss-inset')(),
            require('postcss-easings')(),
            require('postcss-easing-gradients')(),
          ],
          'rebeccapurple-color': [require('postcss-brand-colors')()],
          'system-ui-font-family': [
            require('lost')(),
            require('postcss-calc')({
              preserve: true,
              mediaQueries: true,
              selectors: true,
            }),
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

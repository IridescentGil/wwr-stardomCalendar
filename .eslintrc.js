module.exports = {
    'env': {
        'commonjs': true,
        'es2021': true,
        'node': true,
    },
    'overrides': [
        {
            'env': {
                'node': true,
            },
            'files': [
                '.eslintrc.{js,cjs}',
            ],
            'parserOptions': {
                'sourceType': 'script',
            },
        },
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
    },
    'plugins': [
        '@stylistic',
    ],
    'rules': {
        '@stylistic/indent': [
            2, 4,
        ],
        '@stylistic/block-spacing': 2,
        '@stylistic/max-len': [2, {
            code: 85,
            tabWidth: 4,
            ignoreUrls: true,
            ignorePattern: 'goog\.(module|require)',
        }],
        '@stylistic/no-cond-assign': 0, // eslint:recommended
        'no-irregular-whitespace': 2, // eslint:recommended
        'no-unexpected-multiline': 2, // eslint:recommended
        'valid-jsdoc': [2, {
            requireParamDescription: false,
            requireReturnDescription: false,
            requireReturn: false,
            prefer: { returns: 'return' },
        }],

        'curly': [2, 'multi-line'],
        'guard-for-in': 2,
        'no-caller': 2,
        'no-extend-native': 2,
        'no-extra-bind': 2,
        'no-invalid-this': 2,
        '@stylistic/no-multi-spaces': 2,
        'no-multi-str': 2,
        'no-new-wrappers': 2,
        'no-throw-literal': 2, // eslint:recommended
        'no-with': 2,
        'prefer-promise-reject-errors': 2,
        'no-unused-vars': [2, { args: 'none' }], // eslint:recommended
        '@stylistic/array-bracket-newline': 0, // eslint:recommended
        '@stylistic/array-bracket-spacing': [2, 'never'],
        '@stylistic/array-element-newline': 0, // eslint:recommended
        '@stylistic/brace-style': 2,
        'camelcase': [2, { properties: 'never' }],
        '@stylistic/comma-dangle': [2, 'always-multiline'],
        '@stylistic/comma-spacing': 2,
        '@stylistic/comma-style': 2,
        '@stylistic/computed-property-spacing': 2,
        '@stylistic/eol-last': 2,
        '@stylistic/func-call-spacing': 2,
        '@stylistic/key-spacing': 2,
        '@stylistic/keyword-spacing': 2,
        '@stylistic/linebreak-style': 2,
        'new-cap': 2,
        'no-array-constructor': 2,
        '@stylistic/no-mixed-spaces-and-tabs': 2, // eslint:recommended
        '@stylistic/no-multiple-empty-lines': [2, { max: 2 }],
        'no-new-object': 2,
        '@stylistic/no-tabs': 2,
        '@stylistic/no-trailing-spaces': 2,
        '@stylistic/object-curly-spacing': [2, 'always'],
        'one-var': [2, {
            var: 'never',
            let: 'never',
            const: 'never',
        }],
        '@stylistic/operator-linebreak': [2, 'after'],
        '@stylistic/padded-blocks': [2, 'never'],
        '@stylistic/quote-props': [2, 'consistent'],
        '@stylistic/quotes': [2, 'single', { allowTemplateLiterals: true }],
        'require-jsdoc': [2, {
            require: {
                FunctionDeclaration: true,
                MethodDefinition: true,
                ClassDeclaration: true,
            },
        }],
        '@stylistic/semi': 2,
        '@stylistic/semi-spacing': 2,
        '@stylistic/space-before-blocks': 2,
        '@stylistic/space-before-function-paren': [2, {
            asyncArrow: 'always',
            anonymous: 'never',
            named: 'never',
        }],
        '@stylistic/spaced-comment': [2, 'always'],
        '@stylistic/switch-colon-spacing': 2,

        '@stylistic/arrow-parens': [2, 'always'],
        'constructor-super': 2, // eslint:recommended
        '@stylistic/generator-star-spacing': [2, 'after'],
        'no-new-symbol': 2, // eslint:recommended
        'no-this-before-super': 2, // eslint:recommended
        'no-var': 2,
        'prefer-const': [2, { destructuring: 'all' }],
        'prefer-rest-params': 2,
        'prefer-spread': 2,
        '@stylistic/rest-spread-spacing': 2,
        '@stylistic/yield-star-spacing': [2, 'after'],
    },
};

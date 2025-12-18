module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    // Vue 2 推荐使用 plugin:vue/essential
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
    parserOptions: {
        // 关键点：这里必须指定 babel-eslint，否则无法解析现代 JS 语法
        parser: 'babel-eslint', 
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        // 生产环境禁用 console，开发环境允许
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'prettier/prettier': 'error',
    },
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineComponent: 'readonly',
        defineExpose: 'readonly',
        ElMessage: 'readonly',
        ElNotification: 'readonly',
        ElMessageBox: 'readonly',
    },
}
import vue from 'eslint-plugin-vue'
import ts from 'typescript-eslint'
export default [
  { ignores: ['dist/**'] },
  ...ts.configs.recommended,
  ...vue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: ts.parser } },
    rules: { 'vue/multi-word-component-names': 'off' },
  },
]

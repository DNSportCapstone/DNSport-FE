module.exports = {
    parser: '@babel/eslint-parser', // Dùng babel-eslint parser
    parserOptions: {
      requireConfigFile: false, // Tắt yêu cầu tệp cấu hình Babel
      ecmaVersion: 2020, // Hỗ trợ các tính năng ECMAScript hiện đại
      sourceType: 'module', // Đảm bảo rằng các module ES6 được hỗ trợ
    },
    extends: [
      'eslint:recommended', // Cấu hình mặc định của ESLint
      'plugin:vue/vue3-essential', // Các quy tắc cần thiết cho Vue 3
      'plugin:prettier/recommended', // Tích hợp với Prettier để tự động format code
    ],
    rules: {
      // Bạn có thể thêm hoặc điều chỉnh các quy tắc của riêng bạn ở đây
    }
  };
  
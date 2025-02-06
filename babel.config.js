module.exports = {
<<<<<<< HEAD
  presets: ['module:@react-native/babel-preset'],
=======
  presets: [
    'react-app', // This is used for web apps with create-react-app
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-private-property-in-object',
  ],
>>>>>>> 1a5d365525d6312a80d3dc22b58eaedd8a956cc2
};

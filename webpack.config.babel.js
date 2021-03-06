// import webpack from 'webpack';     // commented out becuase unused
import path from 'path';

const config = {
  entry: ['babel-polyfill', './client/src/index.jsx'],
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client/src'),
        exclude: ['node_modules'],
        use: [
          { loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015'],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  devServer: {
    historyApiFallback: true,
  },
};

export default config;

import webpack from 'webpack';

export function buildReslovers(): webpack.ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js'],
  };
}

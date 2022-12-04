import path from 'path';

const baseUrl = 'src'

export default {
  webpack: {
    alias: {
      "~": path.resolve(__dirname, baseUrl)
    }
  }
}

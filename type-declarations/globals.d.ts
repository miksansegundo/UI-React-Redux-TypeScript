// Webpack hot reload
declare const module: { hot: any, exports: any }
// Node process for environment variables
declare const process: { env: any }
// Document window for redux tools
declare interface Window {
  devToolsExtension(): any
}
// Webpack require
declare var require: {
  (path: string): any;
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
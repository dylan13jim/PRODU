const ModuleFederationPlugin = require("@module-federation/webpack").ModuleFederationPlugin;

module.exports = {
  mode: "development",
  
  plugins: [
    new ModuleFederationPlugin({
      // === CONFIGURACIÓN DEL SHELL ===
      name: "aplicacionPrincipal",
      
      // === MICROFRONTENDS REMOTOS ===
      remotes: {
        // Microfrontend de Autenticación (puerto 4201)
        mfAuth: "mfAuth@http://localhost:4201/remoteEntry.js",
        
        // Microfrontend de Cuentas (puerto 4202)
        mfCuentas: "mfCuentas@http://localhost:4202/remoteEntry.js",
      },

      // === DEPENDENCIAS COMPARTIDAS ===
      shared: {
        // Angular Core
        "@angular/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        
        // Angular Common
        "@angular/common": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        
        // Angular Router
        "@angular/router": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        
        // Angular HTTP
        "@angular/common/http": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        
        // Angular Forms (por si lo usas después)
        "@angular/forms": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        
        // Angular Platform Browser
        "@angular/platform-browser": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        
        // Angular Platform Browser Dynamic
        "@angular/platform-browser-dynamic": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        
        // RxJS
        "rxjs": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
      },
    }),
  ],
  
  // === CONFIGURACIÓN DEL SERVIDOR DE DESARROLLO ===
  devServer: {
    port: 4200,
    historyApiFallback: true,
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
  },
  
  // === CONFIGURACIÓN ADICIONAL ===
  optimization: {
    runtimeChunk: false,
  },
  
  experiments: {
    outputModule: true,
  },
};
const ModuleFederationPlugin = require("@module-federation/webpack").ModuleFederationPlugin;

module.exports = {
    mode: "development",
    
    plugins: [
        new ModuleFederationPlugin({
        // === CONFIGURACIÓN DEL REMOTE ===
        name: "mfAuth",
        filename: "remoteEntry.js",
        
        // === COMPONENTES EXPUESTOS ===
        exposes: {
            // Componente de Login
            "./LoginComponent": "./src/app/componentes/login/login.component.ts",
            
            // Componente de Registro
            "./RegistroComponent": "./src/app/componentes/registro/registro.component.ts",
            
            // Componente de Perfil
            "./PerfilComponent": "./src/app/componentes/perfil/perfil.component.ts",
            
            // Servicio de Autenticación (opcional)
            "./AuthService": "./src/app/servicios/auth.service.ts",
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
            
            // Angular Forms
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
        port: 4201,
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
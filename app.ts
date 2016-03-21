/// <EXTERNAL REFERENCES>
/// <reference path="node_modules/typefx/build/TypeFramework.d.ts" />

/// <HELPER REFERENCES>
/// <reference path="app/Global.ts" />

/// <MODEL REFERENCES>
/// <reference path="app/models/color.ts" />
/// <reference path="app/models/light.ts" />

/// <CONTROLLER REFERENCES>
/// <reference path="app/controllers/LightController.ts" />

app.addController(LightController);
app.config.set('port', process.env.PORT || 3000);
app.start();

// permet d'avoir une communication bidirectionnelle 
var io = require('socket.io')(app.serverInstance);
// event généré dès qu'un client se connecte
io.on('connection', function(client) {
    console.log('a user connected');
    // on affecte la socket directement dans l'app pour y avoir accès partout
    // a changer lors du prochaine update de typefx
    app.clientSocket = client;
});
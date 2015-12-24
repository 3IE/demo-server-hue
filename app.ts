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
app.start();
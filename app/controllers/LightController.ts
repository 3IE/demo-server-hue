/// <reference path="../../app.ts" />

class LightController extends TF.Controller {

    private hostname: string = "192.168.2.170";
    private username: string = "38ce84223cb30371648655e139ce843";

    private bridgeConnection(): any {
        var HueApi = require("node-hue-api").HueApi;
        var lightState = require("node-hue-api").lightState;

        return new HueApi(this.hostname, this.username);
    }

    private createState(): any {
        var lightState = require("node-hue-api").lightState;
        return lightState.create();
    }

    private invalidCache(response: TF.Response): void {
        response.setHeader('Last-Modified', (new Date()).toUTCString());
        response.setHeader('etag', (new Date()).toUTCString());
    }

    on() {
        var api = this.bridgeConnection();
        var light: Light = <Light>this.request.body;

        api.setLightState(light.lightId, this.createState().on().rgb(light.color.r, light.color.g, light.color.b))
            .then((result) => {

                let stateLight: Light = new Light();
                stateLight.lightId = light.lightId;
                stateLight.state = true;
                stateLight.color = light.color;

                if (app.clientSocket !== null && app.clientSocket !== undefined) {
                    // on recupére les sockets et on emet le message
                    app.clientSocket.emit('stateLight', stateLight);
                }

                return this.json({ result: true });
            })
            .fail((error) => {
                return this.json({ result: false });
            })
            .done();
    }

    off(lightId: number) {
        // invalid cache data for GET request
        this.invalidCache(this.response);

        var api = this.bridgeConnection();

        api.setLightState(lightId, this.createState().off())
            .then((result) => {
                let stateLight: Light = new Light();
                stateLight.lightId = lightId;
                stateLight.state = false;

                if (app.clientSocket !== null && app.clientSocket !== undefined) {
                    // on recupére les sockets et on emet le message
                    app.clientSocket.emit('stateLight', stateLight);
                }

                return this.json({ result: true });
            })
            .fail((error) => {
                return this.json({ result: false });
            })
            .done();
    }

    updatebrightness(lightId: number, value: number) {
        // invalid cache data for GET request
        this.invalidCache(this.response);

        var api = this.bridgeConnection();

        api.setLightState(lightId, this.createState().bri(value))
            .then((result) => {
                return this.json({ result: true });
            })
            .fail((error) => {
                return this.json({ result: false });
            })
            .done();
    }
}
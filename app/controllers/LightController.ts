/// <reference path="../../app.ts" />

class LightController extends TF.Controller {

	private hostname: string = "192.168.2.217";
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
	
	private invalidCache(response : TF.Response):void{
		response.setHeader('Last-Modified', (new Date()).toUTCString());
		response.setHeader('etag',  (new Date()).toUTCString());
	}

	on() {
		var api = this.bridgeConnection();
		var light : Light = <Light> this.request.body;

		api.setLightState(light.lightId, this.createState().on().rgb(light.color.r, light.color.g, light.color.b))
			.then((result) => {
				console.log(JSON.stringify(result, null, 2));
				return this.json({ result: true });
			})
			.fail((error) => {
				console.error(error);
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
				//console.log(JSON.stringify(result, null, 2));
				return this.json({ result: true });
			})
			.fail((error) => {
				//console.error(error);
				return this.json({ result: false });
			})
			.done();
	}
}
/// <reference path="../../app.ts"/>

	'use strict';
	
	 class Light{
         /**
          *
          */
         constructor() {
             this.color = new Color();             
         }
		public lightId : number;
		public color : Color;
        public state : boolean;
	}
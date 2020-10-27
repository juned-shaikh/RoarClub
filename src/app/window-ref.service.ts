// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class WindowRefService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';

function _window() : any {
   // return the global native browser window object
   return window;
}

@Injectable()
export class WindowRefService {
	constructor() { }
   get nativeWindow() : any {
      return _window();
   }
   // constructor() { }
}
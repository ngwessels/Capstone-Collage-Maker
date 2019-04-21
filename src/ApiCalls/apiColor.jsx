import React from 'react';
import { Observable } from 'rxjs';


export class Colors {
  colors;
  totalCalls;
  apiDominantColors(num) {

    let colors = ["Black", "Blue", "Brown", "Gray", "Green", "Orange", "Pink", "Purple", "Red", "Teal", "White", "Yellow"];
    let length = colors.length;
    let currentColor = colors[num];
    var myHeaders = new Headers();
    myHeaders.append('Ocp-Apim-Subscription-Key', '15931c17ede943fbb3c1d37ce1a4a864');
    let that = this;
    var myInit = {
      method: 'GET',
      headers: myHeaders
    };
    var myRequest = new Request(`https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=faces&count=1000000&offset=0&mkt=en-us&safeSearch=Moderate&width=100&height=100&color=${currentColor}`, myInit);
    fetch(myRequest)
      .then(response => {
        return response.json()
      })
      .then(data => {
        let currentData = data.value;
        that.colors.push(currentData);
      })
      .catch(err => {
      })

  }
  apiCall() {
    let that = this;
    if(!this.totalCalls) {
      this.totalCalls = 0;
      that.colors = [];
    }
    if(this.totalCalls < 11) {
      setTimeout(function() {
        that.apiDominantColors(that.totalCalls);
        that.apiCall();
        that.totalCalls = that.totalCalls + 1;
        console.log(that.colors);

      }, 1200);
    }


  }
}

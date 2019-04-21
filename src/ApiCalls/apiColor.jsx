import React from 'react';
import { Observable } from 'rxjs';


export class Colors {
  colors;
  totalCalls;
  totalRuns;
  apiDominantColors(num, skip) {

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
    var myRequest = new Request(`https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=cats&count=150&offset=${skip}&mkt=en-us&safeSearch=Moderate&width=100&height=100&imageType=Photo&color=${currentColor}`, myInit);
    fetch(myRequest)
      .then(response => {
        return response.json()
      })
      .then(data => {
        let arrayLength = data.value.length;
        for(let i = 0; i < arrayLength; i++) {
          let currentData = data.value[i].contentUrl;
          that.colors.push(currentData);
        }

      })
      .catch(err => {
      })

  }
  apiCall(limit) {
    let that = this;
    if(!this.totalCalls && !this.totalRuns) {
      this.totalCalls = 0;
      that.colors = [];
      that.totalRuns = 0;
    }
    let totalLength = that.colors.length;
    console.log(totalLength);
    console.log(limit);
    if(totalLength < limit) {
      if(this.totalCalls < 11) {
        setTimeout(function() {
          let skip = that.totalRuns * 20;
          that.apiDominantColors(that.totalCalls, skip);
          that.totalCalls = that.totalCalls + 1;
          if(that.totalCalls == 11) {
            that.totalCalls = 0;
            that.totalRuns = that.totalRuns + 1;
          }
          that.apiCall(limit);
        },1200);
      }
    }
  }
}

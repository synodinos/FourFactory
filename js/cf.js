var checkWin=function(e,t,n){var r=!1,i=ru=rd=ld=0,s=!1,o=!1,u=!1,a=!1;for(var f=0;f<=3;f++)console.log("*for c = "+f+" , row = "+t),e[t][f]==e[t][f+1]&&typeof e[t][f]!="undefined"&&(console.log("if ((matrix[row][c] == matrix[row][c + 1]) && ((typeof matrix[row][c]) != undefined)) {"),e[t][f]==e[t][f+2]&&(console.log("if (matrix[row][c] == matrix[row][c + 2]) {"),e[t][f]==e[t][f+3]&&(console.log("if (matrix[row][c] == matrix[row][c + 3]) {"),r=!0)));if(!r)for(var l=0;l<=2;l++)e[l][n]==e[l+1][n]&&typeof e[l][n]!="undefined"&&e[l][n]==e[l+2][n]&&e[l][n]==e[l+3][n]&&(r=!0);if(!r){for(var c=1;c<=3;c++)typeof e[t-c]!="undefined"&&(typeof e[t-c][n-c]!="undefined"&&(e[t][n]==e[t-c][n-c]&&!s?i++:s=!0),typeof e[t-c][n+c]!="undefined"&&(e[t][n]==e[t-c][n+c]&&!o?ru++:o=!0)),typeof e[t+c]!="undefined"&&(console.log("has row below"),typeof e[t+c][n+c]!="undefined"&&(e[t][n]==e[t+c][n+c]&&!u?rd++:u=!0),typeof e[t+c][n-c]!="undefined"&&(console.log("has row below-left"),e[t][n]==e[t+c][n-c]&&!a?(console.log("has row below-lefta and equals"),ld++):(a=!0,console.log("has row below-lefta and NOT equals"))));if(i==3||ru==3||rd==3||ld==3)r=!0}return r};$(document).ready(function(){var e;$("#board-container").height()==280?e=!0:e=!1;var t=new Audio,n=new Audio,r=new Audio;t.src="audio/click.ogg",n.src="audio/cheer.ogg",r.src="audio/loop.ogg",r.addEventListener("ended",function(){this.currentTime=0,this.play()},!1),$("div#next").addClass("disc_player disc_player0");if($("#board-container").height()==280)var s=7,o=35;else var s=20,o=70;var u=0,a=0,f=new Array(6);for(i=0;i<6;i++)f[i]=new Array(7);var l=function(r,i,l){a++;var c,h=6,p=s+r*(s+o);for(k=5;k>=0;k--)typeof f[k][r]!="undefined"&&(h=k);typeof h=="undefined"?c=5:c=h-1;if($("#board-container").height()==280){e=!0;var d=62,v=52}else{e=!1;var d=115,v=42}if(h>0){var m=s+(c-1)*(s+o)+d;f[c][r]=i,$("#board-container").prepend('<div class="disc_player disc_player'+i+'" id="dp'+a+'" style="margin-left: '+p+"px; z-index: "+(a-v)+'"></div>'),$("#dp"+a).animate({top:"+="+m},200,function(){t.play()}),checkWin(f,c,r)?setTimeout(function(){n.play();var e=u?"YELLOW":"RED  ";alert("Player "+e+" wins!!!\n Click ok to reload page and try again..."),window.location.reload()},400):a==42?(alert("No winner here :(\n Hit ok to reload page..."),window.location.reload()):(u=u?0:1,$("div#next").removeClass("disc_player"+Math.abs(u-1)),$("div#next").addClass("disc_player"+u))}else a--},c=function(e){return navigator.mozVibrate&&navigator.mozVibrate(1e3),function(){l(e,u,2)}};for(i=0;i<=6;i++)if(e){$("#controls").append('<div id="col'+i+'" class="control">&darr;</div>');var h=document.querySelector("#col"+i);(new GestureDetector(h)).startDetecting(),h.addEventListener("tap",c(i))}else $("#controls").append('<button id="col'+i+'" class="control">&darr;</button>'),$("#col"+i).click(c(i));for(j=0;j<=41;j++)$("#board").append('<div class="hole"></div>')})
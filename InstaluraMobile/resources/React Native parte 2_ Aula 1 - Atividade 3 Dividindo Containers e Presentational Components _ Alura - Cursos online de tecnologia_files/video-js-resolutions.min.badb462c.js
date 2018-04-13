function HDtoggle (videoId,quality) {

  function linkFor(resolution) {
    var videoTag = $("#" + videoId);
    var data = videoTag.data(resolution);
    if(data != undefined) return data;

    var tag = videoTag.find("source[data-res='" + resolution + "']");
    if(tag == undefined || tag.attr("src") == undefined) return null;
    return tag.attr("src");
  }

  function switchTo(resolution, play) {
    var origin = linkFor(resolution);

    if(origin == null) {
      return;
    }

    videojs(videoId).src([{type: "video/mp4", src: origin }]);
    if(play) {
      videojs(videoId).play();
    }
  }

   videojs.HD = videojs.Button.extend({
     init: function(player, options){
       videojs.Button.call(this, player, options);
       this.on('click', this.onClick);
     }
   });

   function isCurrentlyHD() {
     return linkFor("hd") == videojs(videoId).src();
   }

   function isWellConfigured() {
     var hasHd = linkFor("hd") != null;
     var hasSd = linkFor("sd") != null;
     return hasHd && hasSd;
   }
   function configureCss(qualityVideo){
	   var css = document.createElement("style");
       css.type = "text/css";
       if(qualityVideo =="hd"){
           css.innerHTML = ".vjs-control.vjs-HD-button { color: #36D8DE; font-weight:bold; text-shadow: 0 0 1em #fff;}";
       }else{
           css.innerHTML = ".vjs-control.vjs-HD-button { color: silver; font-weight:normal; text-shadow: 0 0 5em #fff;}";
       }
       document.body.appendChild(css);

   }
   var HDSwitch = function() {
      if (isCurrentlyHD()) {
    	 configureCss("sd");
         $.post("/user/profile/setMovieQuality", { quality : "sd"});
         switchTo("sd", true);
      } else {
    	 configureCss("hd");
         $.post("/user/profile/setMovieQuality", { quality : "hd"});
         switchTo("hd", true);
      }
    };

    videojs.HD.prototype.onClick = HDSwitch;
         
		 var createHDButton = function() {
       var props = {
           className: 'vjs-HD-button vjs-control',
           innerHTML: '<div class="vjs-control-content">' + ('HD') + '</div>',
           role: 'button',
           'aria-live': 'polite', 
           tabIndex: 0
         };
       return videojs.Component.prototype.createEl(null, props);
     };

     videojs.plugin('HD', function() {
       if(!isWellConfigured()) return;
       switchTo(quality, false);
       configureCss(quality);
       var options = { 'el' : createHDButton() };
       var HD = new videojs.HD(this, options);
       this.controlBar.el().appendChild(HD.el());
     });
         
}
var audio=document.getElementById("audio"),avator=document.getElementById("avator");var $audio=$("#audio"),$avator=$("#avator"),$lrcbox=$("#lrcbox"),$lrclist=$lrcbox.find("p");var tools={atimer:function(){return $audio.get(0).duration},ctimer:function(){return $audio.get(0).currentTime},lrcinit:function(){$lrcbox.css("margin-top",0);var lrcVal,lrcArray=[],lrcTimeArray=[],html="",musicName,singer;var lrc="lrcs/the_road_to_ordinary.lrc";loadLrc(lrc);function loadLrc(url){if(lrc===""){$lrcbox.html('<div class="no-lrc">暂无歌词</div>')}else{$.get(url,function(result){lrcVal=result.replace(/\[\d\d:\d\d.\d\d]/g,"");lrcArray=lrcVal.split("\n");lrcArray[0].replace(/\[\w\w\:(.*?)\]/g,function(){musicName=arguments[1]||"暂无"});lrcArray[1].replace(/\[\w\w\:(.*?)\]/g,function(){singer=arguments[1]||"暂无"});html+='<p class="lrc-line" data-timeLine="0"><span class="mr15">'+musicName+"</span>  "+singer+"</p>";lrcArray.splice(0,4);result.replace(/\[(\d*):(\d*)([\.|\:]\d*)\]/g,function(){var min=arguments[1]|0,sec=arguments[2]|0,realMin=min*60+sec;lrcTimeArray.push(realMin)});for(var i=0;i<lrcTimeArray.length;i++){html+='<p class="lrc-line" data-timeLine="'+lrcTimeArray[i]+'">'+lrcArray[i]+"</p>"}$lrcbox.html(html)})}}},lrcm:function(atime,ctime){var lrcBox=document.getElementById("lrcbox"),domList=lrcBox.getElementsByTagName("p"),timer,index,s,m=parseInt($lrcbox.css("margin-top").split("-")[1])||0;for(var i=0;i<domList.length;i++){var dataTimeLine=~~$(domList[i]).data("timeLine");if(dataTimeLine>0&&dataTimeLine===parseInt(ctime)){index=i;if(s!=i){s=i;for(var j=0;j<domList.length;j++){$(domList[j]).removeClass("current")}if(index>0){$(domList[index]).addClass("current")}clearInterval(timer);timer=setInterval(function(){m+=1;if(m>=index*30){clearInterval(timer)}else{$lrcbox.css({"margin-top":"-"+m+"px"})}},10)}}}}};tools.lrcinit();setInterval(function(){tools.lrcm(tools.atimer(),tools.ctimer())},1e3);$("#btn_play").tap(function(){var $this=$(this);if(this.className.indexOf("play")>=0){this.className="btn-center btn-pause";$avator.addClass("animate").removeClass("animate-pause");audio.play()}else{this.className="btn-center btn-play";$avator.addClass("animate-pause").removeClass("anaimate");audio.pause()}});
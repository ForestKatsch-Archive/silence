
function audio_init() {
    loaded("audio");
}

var SilenceAudio=function() {
    this.audio=new Audio();
    this.dirty=true;
    this.gen_callback=null;
    this.worker=new Worker("assets/scripts/gen.js");
    var that=this;
    this.worker.onmessage=function (e) {
	var d=e.data;
	if(d.status == "ok") {
	    console.log("Called back by the worker: ",d);
	    if(d.action == "gen") {
		console.log(d);
		if(that.gen_callback) {
		    that.gen_callback();
		    that.gen_callback=null;
		}
		that.dirty=false;
		that.audio.src=d.url;
	    }
	} else {
	    console.log("Worker returned error: ",e.data);
	}
    };
    this.worker.postMessage({action:"init"});
    this.post=function(action,data) {
	if(!data)
	    data={};
	data.action=action;
	this.worker.postMessage(data);
    };
    this.gen=function(s,callback) {
	this.gen_callback=callback;
	console.log("Generating...");
	this.post("gen",{str:s});
    };
    this.playing=function() {
	if(this.audio.paused)
	    return false;
	else
	    return true;
    };
    this.play=function() {
	if(!this.audio.src)
	    return;
	this.audio.play();
    };
    this.pause=function() {
	this.audio.pause();
    };
};

var audio;

function audio_done() {
    audio=new SilenceAudio();
}

function audio_dirty() {
    return audio.dirty;
}

function audio_gen(callback) {
    audio.gen(callback);
}

function audio_playing() {
    return audio.playing();
}

function audio_pause() {
    audio.pause();
}

function audio_play() {
    audio.play();
}
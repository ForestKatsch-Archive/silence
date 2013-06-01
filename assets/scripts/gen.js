
importScripts("riffwave.js");

function reply(status,data) {
    data.status=status;
    this.postMessage(data);
}

function reply_error(r,n) {
    reply("error",{reason:r,noun:n});
}

function init() {

}

function gen(d) {
    if(d.str) {
	reply_error("invalid",d);
	return;
    }
    var s;
    with({this:{foo:"foo"}}) {
	eval(d.str+"\nreturn_value=10;");
	s=return_value;
    }
    reply("ok",{action:"gen",url:s});
}

this.onmessage=function(e) {
    if(!e.data.action) {
	reply_error("invalid","action");
	return;
    }
    var d=e.data.action;
    if(d == "init")
	init(e.data);
    else if(d == "gen")
	gen(e.data);
    else
	reply_error("invalid","action");
};

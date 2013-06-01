
function ui_init() {
    loaded("ui");
    $("#play").click(ui_play);
}

function ui_done() {

}

function ui_play() {
    var v=$("#code").text();
    if(audio_dirty()) {
	audio_pause();
	audio_gen(v,audio_play);
    } else {
	if(audio_playing())
	    audio_pause();
	else
	    audio_play();
    }
    if(audio_playing())
	$("#play").text("Pause");
    else
	$("#play").text("Play");
}

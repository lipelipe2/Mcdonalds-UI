const youtubeEndpoint = 'https://www.googleapis.com/youtube/v3/search';


function onSearch(searchQuery) {//https://www.youtube.com/embed/tgbNymZ7vqY
    console.log(searchQuery);
    if(searchQuery !== "") {
        //getWithJS(searchQuery);
        getWithJquery(searchQuery);
    }
}

function getWithJquery(searchQuery) {
    $("#videoContainer").show();
    $("#spinner").show();
    $.get(constructEndpoint(searchQuery), function(data, status){
        console.log('success one',data, status);
    }).done( data => {
        console.log('success two',data);
        let videoData = data.items[0];
        showVideo(videoData);
    }).fail( data => {
        console.log('Error: ' + data);
    });
}

function getWithJS(searchQuery) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                console.log(JSON.parse(xmlhttp.responseText));   
                $("#videoContainer").show();
                $("#spinner").show();
                let videoData = JSON.parse(xmlhttp.responseText).items[0];
                showVideo(videoData);
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    };

    xmlhttp.open("GET", constructEndpoint(searchQuery), true);
    xmlhttp.send();
}

function constructEndpoint(searchQuery) {
    let part = '?part=' + 'snippet';
    let fields = '&fields=' + 'items(id,snippet)';
    let query = '&q=' + searchQuery;
    let type = '&type=' + 'video'; 
    let key = '&key=' + youtubeAPIKEY;
    let nrResults = '&maxResults=' + '1';
    let endpoint = youtubeEndpoint + part + fields + query + type + nrResults + key;

    return endpoint;
}

function showVideo(videoData) {
    setTimeout( () => {
        $("#spinner").hide();
        $("#video").attr("src", "https://www.youtube.com/embed/" + videoData.id.videoId);
        $("#videoTitle").html(videoData.snippet.title);
        $("#video").show();
    }, 1000);
    /* $("#spinner").hide();
    $("#video").attr("src", "https://www.youtube.com/embed/" + videoData.id.videoId);
    $("#videoTitle").html(videoData.snippet.title);
    $("#video").show(); */
}
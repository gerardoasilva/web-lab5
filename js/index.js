let query = "";
let previousPage = null;
let nextPage = null;

function fetchVideos(query, pageToken) {
    if (!pageToken) {
        pageToken = "";
    }
    let url = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=" + query + "&pageToken=" + pageToken + "&key=AIzaSyAmgHBK6AI8GXkubjXWt0CbE8S42wTLYHg";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (responseJSON) {
            displayResults(responseJSON);
        },
        error: function (err){
            console.log(err);
        }
    });
}

function displayResults(responseJSON) {
    $('#results').empty();

    if (responseJSON.nextPageToken) {
        nextPage = responseJSON.nextPageToken;
    }

    if (responseJSON.prevPageToken) {
        previousPage = responseJSON.prevPageToken;
    }

    for (const item of responseJSON.items) {
        $('#results').append(`  <section class="item">
                                    <a class="image" href="https://www.youtube.com/watch?v=${item.id.videoId}" target='_blank'><img src="${item.snippet.thumbnails.default.url}" alt="thumbnail-img"></a>
                                    <h3><a class="title" href="https://www.youtube.com/watch?v=${item.id.videoId}" target='_blank' style="font-family: 'Montserrat',sans-serif;">${item.snippet.title}</a></h3>
                                    
                                </section>`);
    }
}

function watchPrevious() {
    $('#prevBtn').click(function (e) { 
        e.preventDefault();
        if (previousPage) {
            fetchVideos(query, previousPage);
        }
    });
}

function watchNext() {
    $('#nextBtn').click(function (e) { 
        e.preventDefault();
        
        if (nextPage) {
            fetchVideos(query, nextPage);
        }
    });
}

function watchForm() {
    $('#searchForm').submit(function (e) { 
        e.preventDefault();
        if ($('#searchBar').val() != "") {
            query = $('#searchBar').val();
            fetchVideos(query);
        }
        
    });
}

function init() {
    watchForm();
    watchPrevious();
    watchNext();
}

init();

// API KEY
////////////// AIzaSyAmgHBK6AI8GXkubjXWt0CbE8S42wTLYHg


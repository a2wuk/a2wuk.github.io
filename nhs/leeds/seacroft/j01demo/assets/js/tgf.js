let sentenceIndex = 0
let isAudioEnabled = true
let isLargeText = false

let audioHasPlayed = true;
let videoHasPlayed = true;

function toggleContrast() {
    var element = document.getElementById("accessible-content")
    element.classList.toggle("large-text");

    // Add 'active' class to the element with id 'text-icon'
    var textIcon = document.getElementById('text-icon');
    if (textIcon.classList.contains('active')) {
        textIcon.classList.remove('active');
    } else {
        textIcon.classList.add('active');
    }

}

function toggleEasyRead() {
    if (window.location.href.toLowerCase().includes("/original")) {
        window.location.href = "../easy-read/index.html";
    }
    else {
        window.location.href = "../original/index.html";
    }
}


// Create a playlist array from all elements with data-vid attributes
var playlist = [];
document.querySelectorAll('[data-vid]').forEach(function(element) {
    playlist.push(element.getAttribute('data-vid'));
});

var audioplaylist = [];
document.querySelectorAll('[data-audio]').forEach(function(element) {
    audioplaylist.push(element.getAttribute('data-audio'));
});


var currentVideoIndex = 0; // Start with the first video in the playlist

// Function to play a video at a given index in the playlist
function playVideoAtIndex(index) {
    sentenceIndex = index;
    audioHasPlayed = false;
    videoHasPlayed = false;

    var videoPlayer0 = document.getElementById('videoPlayer0');
    var videoPlayer1 = document.getElementById('videoPlayer1');
    var audioPlayer = document.getElementById('audioPlayer');

    // Determine which video player is currently visible
    var currentPlayer = videoPlayer0.style.display !== 'none' ? videoPlayer0 : videoPlayer1;
    var nextPlayer = currentPlayer === videoPlayer0 ? videoPlayer1 : videoPlayer0;

    // Remove any existing 'ended' event listener from currentPlayer
    currentPlayer.onended = null;

    // Preload the next video in the hidden player
    nextPlayer.src = playlist[index];

    audioPlayer.src = './' + index + '.mp3';
    audioPlayer.load();
    nextPlayer.load();

    // When the next video is ready, switch the display
    nextPlayer.onloadeddata = function() {
        nextPlayer.style.display = 'block';
        nextPlayer.play();

        audioPlayer.play();

        currentPlayer.style.display = 'none';
        currentPlayer.pause();

        // Reset the event handler to prevent it from firing unexpectedly on subsequent plays
        nextPlayer.onloadeddata = null;

        // Highlight the associated sentence
        highlightSentence(index);
    };

    // Attach an 'ended' event listener to the nextPlayer to play the next video when it ends
    nextPlayer.onended = function() {
        mediaHasPlayed("video");
    };

    audioPlayer.onended = function() {
        mediaHasPlayed("audio");
    };

    currentVideoIndex = index;
}

function mediaHasPlayed(mediaType) {
    if (mediaType == "audio") { audioHasPlayed = true; }
    if (mediaType == "video") { videoHasPlayed = true; }
    if (audioHasPlayed && videoHasPlayed) {
        audioHasPlayed = false;
        videoHasPlayed = false;
        playNextVideo();
    }
}

function scrollIntoView(divElement){
    const topPositionOfDiv = divElement.offsetTop;
    const heightOfDiv = divElement.offsetHeight;
    const windowHeight = window.innerHeight;

    // Calculate the desired scroll position
    const desiredScrollPosition = topPositionOfDiv + heightOfDiv - windowHeight;

    // Scroll to the desired position
    window.scrollTo({
    top: desiredScrollPosition,
    behavior: 'smooth',
    });

}

function highlightSentence(index) {
    // Remove highlighting from all sentences
    document.querySelectorAll('[data-vid]').forEach(function(element) {
        element.classList.remove('highlighted');
    });

    // Add highlighting to the current sentence
    var currentSentence = document.querySelector(`[data-vid="${playlist[index]}"]`);
    if (currentSentence) {
        currentSentence.classList.add('highlighted');
        scrollIntoView(currentSentence);
    }
}

// Function to play the next video in the playlist
function playNextVideo() {
    var nextIndex = currentVideoIndex + 1;
    if (nextIndex < playlist.length) {
        playVideoAtIndex(nextIndex);
    } else {
        // Optionally, handle the end of the playlist scenario
        console.log("End of playlist");
        // Add any additional logic you need when the playlist ends
    }
}

// Function to play the previous video in the playlist
function playPreviousVideo() {
    var previousIndex = (currentVideoIndex - 1 + playlist.length) % playlist.length;
    playVideoAtIndex(previousIndex);
}

// Add click event listeners to elements with data-vid for direct skipping
document.querySelectorAll('[data-vid]').forEach(function(element) {
    element.addEventListener('click', function() {
        var index = playlist.indexOf(this.getAttribute('data-vid'));
        if (index !== -1) {
            playVideoAtIndex(index);
        }
    });
});

// Add event listeners for next and previous buttons
document.getElementById('video-next').addEventListener('click', function() {
    playNextVideo();
});

document.getElementById('video-previous').addEventListener('click', function() {
    playPreviousVideo();
});

    var isSignIconActive = true;
    var isSpeakIconActive = false;
    
    function toggleMediaBarVisibility() {
        var mediaBar = document.getElementById('mediaplayer');
        if (isSignIconActive || isSpeakIconActive) {
            mediaBar.style.display = 'flex'; // Show media bar
        } else {
            mediaBar.style.display = 'none'; // Hide media bar
        }
    }
    

    
// Check initial state of sign-icon and add 'active' class if it's active
var signIcon = document.getElementById('sign-icon');
if (isSignIconActive) {
    signIcon.classList.add('active');
}

signIcon.addEventListener('click', function() {
    isSignIconActive = !isSignIconActive; // Toggle state
    toggleMediaBarVisibility();

    // Toggle visibility of video-container
    var videoContainer = document.querySelector('.video-container');
    if (isSignIconActive) {
        videoContainer.style.display = 'flex'; // Show video container
        this.classList.add('active'); // Add active class
    } else {
        videoContainer.style.display = 'none'; // Hide video container
        this.classList.remove('active'); // Remove active class
    }
});

document.getElementById('speak-icon').addEventListener('click', function() {
    isSpeakIconActive = !isSpeakIconActive; // Toggle state
    toggleMediaBarVisibility();

    if (isSpeakIconActive) {
        this.classList.add('active'); // Add active class
    } else {
        this.classList.remove('active'); // Remove active class
    }
});
    

// Variable to track whether the playlist should auto-progress
var autoProgress = true;

// Function to automatically progress through the playlist
// Function to automatically progress through the playlist
function autoProgressPlaylist() {
    var videoPlayer0 = document.getElementById('videoPlayer0');
    var videoPlayer1 = document.getElementById('videoPlayer1');

    // Determine which video player is currently active
    var currentPlayer = videoPlayer0.style.display !== 'none' ? videoPlayer0 : videoPlayer1;

    if (autoProgress && !currentPlayer.paused && !currentPlayer.ended) {
        playNextVideo();
    }
}

// Function to toggle play/pause of the current video
// Function to toggle play/pause of the current video
function togglePlayPause() {
    var videoPlayer0 = document.getElementById('videoPlayer0');
    var videoPlayer1 = document.getElementById('videoPlayer1');
    var audioPlayer = document.getElementById('audioPlayer');

    // Determine which video player is currently active
    var currentPlayer = videoPlayer0.style.display !== 'none' ? videoPlayer0 : videoPlayer1;

    // Toggle play/pause based on the current state of the video
    if (currentPlayer.paused || currentPlayer.ended) {
        playVideoAtIndex(sentenceIndex);
        autoProgress = true; // Enable autoplay when video plays
    } else {
        currentPlayer.pause();
        audioPlayer.pause();
        autoProgress = false; // Disable autoplay when video is paused
    }

    // If video is paused, remove highlight
    if (currentPlayer.paused || currentPlayer.ended) {
    document.querySelectorAll('[data-vid]').forEach(function(element) {
        element.classList.remove('highlighted');
    });
    }

    highlightSentence(sentenceIndex);
}

// Add event listener to the play/pause button
document.getElementById('pause-play').addEventListener('click', function() {
    togglePlayPause();
});
// Add event listener to the play/pause button
document.getElementById('vidplayer').addEventListener('click', function() {
    togglePlayPause();
});

document.addEventListener('DOMContentLoaded', function() {
        // Preload the first video when the page is loaded
        var videoPlayer0 = document.getElementById('videoPlayer0');
        videoPlayer0.src = playlist[0];
        videoPlayer0.load();
        videoPlayer0.pause() 
        audioPlayer.src = './0.mp3';
        audioPlayer.load();
        });

document.getElementById('speak-icon').addEventListener('click', function() {
    var audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.muted = !audioPlayer.muted;
});

document.body.scrollTop = document.documentElement.scrollTop = 0;

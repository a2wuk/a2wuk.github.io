let sentenceIndex = 0
let isAudioEnabled = true
let isLargeText = false

var preferredLanguage = navigator.language;
if (!window.location.href.toLowerCase().includes("/original") && !window.location.href.toLowerCase().includes("/easy-read")) {
    switch (preferredLanguage) {
        case "en-GB": window.location.replace("./en-GB/original/index.html"); break
        case "en": window.location.replace("./en-GB/original/index.html"); break
        case "zh-TW": window.location.replace("./zh-TW/original/index.html"); break
        case "zh": window.location.replace("./zh-TW/original/index.html"); break
        case "TW": window.location.replace("./zh-TW/original/index.html"); break
        case "fr-FR": window.location.replace("./fr-FR/original/index.html"); break
        case "fr": window.location.replace("./fr-FR/original/index.html"); break
        case "de-DE": window.location.replace("./de-DE/original/index.html"); break
        case "de": window.location.replace("./de-DE/original/index.html"); break
        case "it-IT": window.location.replace("./it-IT/original/index.html"); break
        case "it": window.location.replace("./it-IT/original/index.html"); break
        case "ja-JP": window.location.replace("./ja-JP/original/index.html"); break
        case "ja": window.location.replace("./ja-JP/original/index.html"); break
        case "JP": window.location.replace("./ja-JP/original/index.html"); break
        case "ko-KR": window.location.replace("./ko-KR/original/index.html"); break
        case "ko": window.location.replace("./ko-KR/original/index.html"); break
        case "KR": window.location.replace("./ko-KR/original/index.html"); break
        case "pt-PT": window.location.replace("./pt-PT/original/index.html"); break
        case "pt": window.location.replace("./pt-PT/original/index.html"); break
        case "es-ES": window.location.replace("./es-ES/original/index.html"); break
        case "es": window.location.replace("./es-ES/original/index.html"); break
        case "cy-GB": window.location.replace("./cy-GB/original/index.html"); break
        case "cy": window.location.replace("./cy-GB/original/index.html"); break
        case "tr-TR": window.location.replace("./tr-TR/original/index.html"); break
        case "tr": window.location.replace("./tr-TR/original/index.html"); break
        case "ru-RU": window.location.replace("./ru-RU/original/index.html"); break
        case "ru": window.location.replace("./ru-RU/original/index.html"); break
        case "ro-RO": window.location.replace("./ro-RO/original/index.html"); break
        case "ro": window.location.replace("./ro-RO/original/index.html"); break
        case "is-IS": window.location.replace("./is-IS/original/index.html"); break
        case "is": window.location.replace("./is-IS/original/index.html"); break
        default: window.location.replace("./en-GB/original/index.html"); 
    }
}


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

var currentVideoIndex = 0; // Start with the first video in the playlist

// Function to play a video at a given index in the playlist
function playVideoAtIndex(index) {
             var videoPlayer0 = document.getElementById('videoPlayer0');
             var videoPlayer1 = document.getElementById('videoPlayer1');

             // Determine which video player is currently visible
             var currentPlayer = videoPlayer0.style.display !== 'none' ? videoPlayer0 : videoPlayer1;
             var nextPlayer = currentPlayer === videoPlayer0 ? videoPlayer1 : videoPlayer0;

             // Remove any existing 'ended' event listener from currentPlayer
             currentPlayer.onended = null;

             // Preload the next video in the hidden player
             nextPlayer.src = playlist[index];
             nextPlayer.load();

             // When the next video is ready, switch the display
             nextPlayer.onloadeddata = function() {
                 nextPlayer.style.display = 'block';
                 nextPlayer.play();

                 currentPlayer.style.display = 'none';
                 currentPlayer.pause();
                 
                 // Reset the event handler to prevent it from firing unexpectedly on subsequent plays
                 nextPlayer.onloadeddata = null;

                 // Highlight the associated sentence
                 highlightSentence(index);
             };

             // Attach an 'ended' event listener to the nextPlayer to play the next video when it ends
             nextPlayer.onended = function() {
        playNextVideo();
    };

             currentVideoIndex = index;
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

    // Determine which video player is currently active
    var currentPlayer = videoPlayer0.style.display !== 'none' ? videoPlayer0 : videoPlayer1;

    // Toggle play/pause based on the current state of the video
    if (currentPlayer.paused || currentPlayer.ended) {
        currentPlayer.play();
        autoProgress = true; // Enable autoplay when video plays
    } else {
        currentPlayer.pause();
        autoProgress = false; // Disable autoplay when video is paused
    }
        // If video is paused, remove highlight
        if (currentPlayer.paused || currentPlayer.ended) {
        document.querySelectorAll('[data-vid]').forEach(function(element) {
            element.classList.remove('highlighted');
        });
    }
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
        playVideoAtIndex(0);
    });

document.getElementById('speak-icon').addEventListener('click', function() {
    var videoPlayer0 = document.getElementById('videoPlayer0');
    var videoPlayer1 = document.getElementById('videoPlayer1');

    // Toggle mute state of both video players
    videoPlayer0.muted = !videoPlayer0.muted;
    videoPlayer1.muted = !videoPlayer1.muted;
});

document.body.scrollTop = document.documentElement.scrollTop = 0;

// Engage code
async function postFingerprintData() {
    const data = {
        url: window.location.href,
        browserIdentity: navigator.userAgent,
        operatingSystem: await getOperatingSystem(),
        preferredLanguages: navigator.languages,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        deviceMemory: navigator.deviceMemory,
        cpuClass: navigator.hardwareConcurrency,
        touchSupport: 'ontouchstart' in window,
        colorDepth: window.screen.colorDepth,
        hardwareConcurrency: navigator.hardwareConcurrency,
        doNotTrackStatus: navigator.doNotTrack,
        batteryStatus: await getBatteryStatus(),
        ipAddress: await getPublicIP()        
      };

      async function getPublicIP() {
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          const data = await response.json();
          return data.ip;
        } catch (error) {
          console.error('Error fetching public IP:', error);
          return null;
        }
      }
    async function getOperatingSystem() {
        try {
        // Use the User-Agent Client Hints API if available
        if (navigator.userAgentData && navigator.userAgentData.platform) {
            return navigator.userAgentData.platform;
          }
          // Fallback to navigator.platform (deprecated)
          return navigator.platform;
          } catch (error) {
            return null;
        }
      }
  
      function getBatteryStatus() {
        return navigator.getBattery()
          .then(battery => {
            const level = Math.floor(battery.level * 100); // Get battery level as a percentage
            const charging = battery.charging ? "charging" : "discharging";
            return `Battery level: ${level}%, Charging: ${charging}`;
          })
          .catch(error => {
            return null;
          });
      }

    // Post the data to the endpoint
    try {
      const response = await fetch('https://a2w-engage-app.azurewebsites.net/api/engagehttptrigger?code=GtCEUT2OeNGJyzSgatdi5Qx_yH8NKbHg40O4-pXLEeyBAzFuFrZeTA%3D%3D', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }
  
  postFingerprintData();
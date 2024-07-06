setInterval(function () {
  document.querySelector("#sysTime").innerHTML = new Date().toLocaleString();
}, 1000);

var topBar = document.querySelector("#sysNavBar")
var welcomeScreen = document.querySelector("#welcome")

function closeWindow(element) {
  element.style.display = "none"
  if (element === cameraScreen)
    stopCamera()
}

function openWindow(element) {
  element.style.display = "flex"
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  }

var welcomeScreenClose = document.querySelector("#welcomeclose")
var welcomeScreenOpen = document.querySelector("#welcomeopen")

var notesOpen = document.querySelector("#notesicon")


var selectedIcon = undefined

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
} 

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined
}

function handleIconTap(element, app) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(app)
  } else {
    selectIcon(element)
  }
}



welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});
welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});

var notesApp = document.querySelector("#notesicon")
notesApp.addEventListener("click", function() {
  handleIconTap(notesApp, notesScreen);
});

var musicApp = document.querySelector("#musicicon")
musicApp.addEventListener("click", function() {
  handleIconTap(musicApp, musicScreen);
});

var photosApp = document.querySelector("#photosicon")
photosApp.addEventListener("click", function() {
  handleIconTap(photosApp, photosScreen);
});

var cameraApp = document.querySelector("#cameraicon")
cameraApp.addEventListener("click", function() {
  handleIconTap(cameraApp, cameraScreen);
})
var clockApp = document.querySelector("#clockicon")
clockApp.addEventListener("click", function() {
  handleIconTap(clockApp, clockScreen)
})


var notesScreen = document.querySelector("#notes")
var photosScreen = document.querySelector("#photos")
var musicScreen = document.querySelector("#music");
var cameraScreen = document.querySelector("#camera");
var clockScreen = document.querySelector("#clock");

var notesScreenClose = document.querySelector("#notesclose")
var musicScreenClose = document.querySelector("#musicclose")
var photosClose = document.querySelector("#photosclose")
var cameraClose = document.querySelector("#cameraclose")
var clockClose = document.querySelector("#clockclose");

notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));
musicScreenClose.addEventListener("click", () => closeWindow(musicScreen));
photosClose.addEventListener("click", () => closeWindow(photosScreen));
cameraClose.addEventListener("click", () => closeWindow(cameraScreen));
clockClose.addEventListener("click", () => closeWindow(clockScreen));


// Make the DIV elements draggable:
dragElement(document.getElementById("welcome"));
dragElement(document.querySelector("#notes"));
dragElement(document.querySelector("#music"));
dragElement(document.querySelector("#photos"));
dragElement(document.querySelector("#camera"));
dragElement(document.querySelector("#clock"));

//z axis stuff
var biggestIndex = 1;

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}


addWindowTapHandling(notesScreen);
addWindowTapHandling(welcomeScreen);
addWindowTapHandling(musicScreen);
addWindowTapHandling(photosScreen);
addWindowTapHandling(cameraScreen);
addWindowTapHandling(clockScreen);

function handleWindowTap(element) {
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon)
}

// Content for notes app
var content = [
  {
    title: `Keybinds`,
    date: "7/5/2024",
    content: `<div style="overflow-y:scroll">
    <p contenteditable="True">
      <b>command+B: Bold</b><br>
      <i>command+I: Italic</i><br>
      <u>command+U: Underline</u><br><br>
      Combinations work as well!

    </p>
</div>`
  },
  {
    title: "Goals",
    date: "7/4/2024",
    content: ` 
    <div style="overflow-y:scroll">
          <p contenteditable="True">
            cOS: Camera App saving to photos (and photo deletion), Date and Time Customization, Localization, TIMER APP, weather app, resizable windows, sound design, 


            Drink 64fl. oz. water daily<br>
            Skincare routine (morning & night)<br>
            Become a pro hack clubber<br>
  
          </p>
    </div>
    `
  },
  {
    title: "Hobbies",
    date: "7/5/2024",
    content: `
    <div style="overflow-y:scroll">
    <p contenteditable="True">
    <b>Linguistics</b><br>
      I am studying Japanese. I also enjoy conlanging and want to get better at computational aspects.<br>
    <b>Gaming</b><br>
      I enjoy fighting games, RPGs, roguelites (Metroidvania), and some FPS games.<br>
    <b>Music</b><br>
      I play piano and guitar. I want to also improve at production (rock).
    </p> 
    </div>
    `
  }
]

// photo array
var photos = [
  {
    content: `<div><img src="malia2.jpeg" class="photoAppPhoto"></div>`
  },
]




function setNotesContent(index) {

  var notesContent = document.querySelector("#notesContent")

  notesContent.innerHTML = content[index].content
  notesContent.style.width = "310px"

}

function setPhotosContent(index) {

  var photosContainer = document.querySelector("#photosContent")
  photosContainer.innerHTML = ''; //Clear existing content

  // Loop through the photos array,append each photos content to the container
  photos.forEach(photo => {
      const photoElement = document.createElement('div');
      photoElement.innerHTML = photo.content;
      photosContainer.appendChild(photoElement);
  });
}
for (let i = 0; i < photos.length; i++) {
  setPhotosContent(i)
}




function addToSideBar(index) {
 var sidebar = document.querySelector("#sidebar");
  var note = content[index];
  var newDiv = document.createElement("div");
  newDiv.innerHTML = `
  <p style="margin: 0px;cursor: pointer;text-align:left;">
    ${note.title}
  </p>
  <p style="font-size: 12px; margin: 0px;cursor: pointer;text-align:left;">
    ${note.date}
  </p>
`;
newDiv.addEventListener("click", function() {
  setNotesContent(index);
});
sidebar.appendChild(newDiv);
}
for (let i = 0; i < content.length; i++) {
  addToSideBar(i)
}

var stream; //camera stream

// Camera permission stuff
const cameraFeed = document.getElementById('cameraFeed');

document.addEventListener('DOMContentLoaded', function() {
  var browserVersion = navigator.appVersion;
var browserSettingsHTML = document.getElementById('userOS')
var contentIwannashow = `BlissOS v2K running on ${browserVersion}`
browserSettingsHTML.innerHTML = contentIwannashow;
  const startCameraButton = document.querySelector('#startCamera');
  startCameraButton.addEventListener('click', function() {
      if (!stream || stream === null) {
          startCamera();
      }
  });

  async function startCamera() {
      try {
          // Request access to the camera
          stream = await navigator.mediaDevices.getUserMedia({ video: true });

          console.log("Starting camera...")
          cameraPermission = true 
          cameraFeed.srcObject = stream;
          captureButton.style.display = `flex`;
      } catch (error) {
          console.error("Error accessing camera:", error);
          alert("Could not access the camera. Please reprompt to enable functionality!");
      }
    }
  }
);

function stopCamera() {
  if (stream) {
     console.log("Stopping camera..")
     const tracks = stream.getTracks();
        tracks.forEach(track => track.stop()); // Stop all tracks in the stream
      stream = null; // Reset the stream variable
      captureButton.style.display = none
  }
}



function captureFrame() {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = cameraFeed.videoWidth;
    canvas.height = cameraFeed.videoHeight;

    // Draw the current frame from the video onto the canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL representing the image
    const dataURL = canvas.toDataURL('image/png');

    const img = new Image();
    img.src = dataURL;
    console.log("Captured photo")
    photos.push({
      content: `<div><img src="${dataURL}" class="photoAppPhoto"></div>`
  });

  for (let i = 0; i < photos.length; i++) {
    setPhotosContent(i)
  } //refresh photos
  

  
    // localStorage.setItem('capturedImage', dataURL); for server stuff soon
}

const captureButton = document.getElementById('captureButton');
captureButton.addEventListener('click', function() {
  shutterSound.currentTime = 0; 
  shutterSound.play(); 
  captureFrame();
});



document.getElementById('changeWallpaper').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (file) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
          const imageUrl = e.target.result;
          changeBackgroundImage(imageUrl);
      };

      reader.readAsDataURL(file);
  }
});

function changeBackgroundImage(imageUrl) {
  document.getElementById('wallpaper').style.backgroundImage = `url(${imageUrl})`;
}

// Change desktop icons alignment
function changeDesktopAlignment() {
    var desktopApps = document.getElementById('desktopApps');
    var computedStyle = window.getComputedStyle(desktopApps);
    if (computedStyle.float === 'right') {
      desktopApps.style.float = 'left';
  } else if (computedStyle.float === 'left') {
      desktopApps.style.float = 'right';
  } else {
      // Handle initial state or unset inline styles
      desktopApps.style.float = 'right'; // Default to 'right' if neither 'left' nor 'right' is set
  }
}



//Sound effects

const shutterSound = document.getElementById("shutterSound")
const timerSound = document.getElementById("timerSound")
//timer
let timerInterval;
        let endTime;
        let isTimerRunning = false;

        function startTimer() {
            if (isTimerRunning) return; // Prevent starting multiple timers
            const durationInput = document.getElementById('duration');
            const duration = parseInt(durationInput.value); // in seconds
            endTime = Date.now() + duration * 1000; // end time in milliseconds
            const countdownElement = document.getElementById('countdown');
            isTimerRunning = true;

            // Update countdown every second
            timerInterval = setInterval(updateCountdown, 1000);

            function updateCountdown() {
                const remainingTime = endTime - Date.now();
                if (remainingTime <= 0) {
                    stopTimer();
                    countdownElement.textContent = '00:00';
                    timerSound.play();
                } else {
                    countdownElement.textContent = formatTime(remainingTime / 1000);
                }
            }

            function playSound() {
                const audio = new Audio('sound.wav'); // Replace 'sound.wav' with your sound file
                audio.play();
            }

            function formatTime(seconds) {
                const minutes = Math.floor(seconds / 60);
                const remainderSeconds = Math.floor(seconds % 60);
                const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
                const displaySeconds = remainderSeconds < 10 ? '0' + remainderSeconds : remainderSeconds;
                return `${displayMinutes}:${displaySeconds}`;
            }
        }

        function stopTimer() {
            clearInterval(timerInterval);
            isTimerRunning = false;
        }



// dragging stuff (Web3s)
// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
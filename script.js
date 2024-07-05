setInterval(function () {
  document.querySelector("#sysTime").innerHTML = new Date().toLocaleString();
}, 1000);

var topBar = document.querySelector("#sysNavBar")
var welcomeScreen = document.querySelector("#welcome")
var notesApp = document.querySelector("#notesicon")

function closeWindow(element) {
  element.style.display = "none"
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

var notesScreen = document.querySelector("#notes")

var photosScreen = document.querySelector("#photos")

var notesScreenClose = document.querySelector("#notesclose")

var musicScreenClose = document.querySelector("#musicclose")

var photosClose = document.querySelector("#photosclose")

notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));

musicScreenClose.addEventListener("click", () => closeWindow(musicScreen));

photosClose.addEventListener("click", () => closeWindow(photosScreen));



// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));
dragElement(document.querySelector("#notes"));
dragElement(document.querySelector("#music"));
dragElement(document.querySelector("#photos"));

//z axis stuff
var biggestIndex = 1;

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}

var musicScreen = document.querySelector("#music");
addWindowTapHandling(notesScreen);
addWindowTapHandling(welcomeScreen);
addWindowTapHandling(musicScreen);
addWindowTapHandling(photosScreen)

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
            Drink 64fl. oz. water daily<br>
            Skincare routine morning & night<br>
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

var photos = [
  {
    content: `<div><img src="malia.jpeg" class="photoAppPhoto"></div>`
  },
  {
    content: `<div><img src="malia2.jpeg" class="photoAppPhoto"></div>`
  },
  {
    content: `<div><img src="malia3.jpeg" class="photoAppPhoto"></div>`
  },
]


function setNotesContent(index) {

  var notesContent = document.querySelector("#notesContent")

  notesContent.innerHTML = content[index].content
  notesContent.style.width = "310px"

}

function setPhotosContent(index) {

  var photosContent = document.querySelector("#photosContent")

  photosContent.innerHTML += photos[index].content
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









//dragging stuff
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
class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playButton = document.querySelector(".play");
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHihat = "./sounds/hihat-acoustic01.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatkAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtn = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }

  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //loop over bars
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatkAudio.currentTime = 0;
          this.hihatkAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    //check if playing
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      //remove interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  updateButton() {
    if (!this.isPlaying) {
      this.playButton.innerText = "Stop";
      this.playButton.classList.add("active");
    } else {
      this.playButton.innerText = "Play";
      this.playButton.classList.remove("active");
    }
  }

  changeSound(event) {
    const selectionName = event.target.name;
    const selectionVal = event.target.value;
    console.log(selectionVal);
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionVal;
        break;
      case "snare-select":
        this.snareAudio.src = selectionVal;
        break;
      case "hihat-select":
        this.hihatkAudio.src = selectionVal;
        break;
    }
  }

  mute(muteEvent) {
    const muteIndex = muteEvent.target.getAttribute("data-track");
    muteEvent.target.classList.toggle("active");
    if (muteEvent.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatkAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatkAudio.volume = 1;
          break;
      }
    }
  }

  changeTempo(sliderChange) {
    const tempoText = document.querySelector(".tempo-nr");
    this.bpm = sliderChange.target.value;
    tempoText.innerText = sliderChange.target.value;
  }

  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

const drumkit = new Drumkit();

//event listeners

drumkit.pads.forEach((pad) => {
  pad.addEventListener("click", drumkit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumkit.playButton.addEventListener("click", function () {
  drumkit.updateButton();
  drumkit.start();
});

drumkit.selects.forEach((select) => {
  select.addEventListener("change", function (event) {
    drumkit.changeSound(event);
  });
});

drumkit.muteBtn.forEach((btn) => {
  btn.addEventListener("click", function (muteEvent) {
    drumkit.mute(muteEvent);
  });
});

drumkit.tempoSlider.addEventListener("input", function (sliderChange) {
  drumkit.changeTempo(sliderChange);
});

drumkit.tempoSlider.addEventListener("change", function (sliderChange) {
  drumkit.updateTempo(sliderChange);
});

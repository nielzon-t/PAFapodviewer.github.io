document.addEventListener('DOMContentLoaded', function () {
    const dateForm = document.getElementById('dateForm');
    const changeDateBtn = document.getElementById('changeDateBtn');
    const apodDisplay = document.getElementById('apodDisplay');
    const explanation = document.getElementById('explanation');
    const darkModeBtn = document.getElementById('darkModeBtn');
    const oval = document.querySelector('.oval');
  
    dateForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      const choice = document.getElementById('apodDate').value;
      try {
        const apiKey = 'O9mzleAaHfIGHsfbyROUvvg4m6L3BO2aFDk5nw3B';
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${choice}`);
        const data = await response.json();
  
        if (data.media_type === 'image' || data.media_type === 'video') {
          apodDisplay.style.backgroundImage = `url('${data.hdurl || data.url}')`;
          explanation.textContent = data.explanation;
          explanation.style.display = 'block';
          explanation.style.opacity = 1;
          apodDisplay.style.display = 'flex';
        } else {
          console.log('No image or video found');
        }
  
        apodDisplay.style.opacity = 1;
        darkModeBtn.style.opacity = 0;
        changeDateBtn.style.opacity = 1;
        changeDateBtn.style.display = 'block';
        oval.style.opacity = 0;
        setTimeout(() => {
          oval.style.display = 'none';
        }, 500);
      } catch (error) {
        console.error('Error fetching APOD:', error);
      }
    });

    changeDateBtn.addEventListener('click', showInitialView);
    darkModeBtn.addEventListener('click', toggleDarkMode);
  
    function showInitialView() {
      apodDisplay.style.opacity = 1;
      changeDateBtn.style.opacity = 1;
      changeDateBtn.style.display = 'block';
  
      // Fade in the oval
      oval.style.opacity = 0; // Start by setting opacity to 0
      oval.style.display = 'block';
      oval.style.pointerEvents = 'auto';
      oval.style.zIndex = 102; // Ensure the oval is above the APOD background
  
      setTimeout(() => {
        oval.style.opacity = 1; // Transition the opacity to 1 after a short delay
      }, 100); // Adjust timing as needed for your animation
    }
  
    function toggleDarkMode() {
      const body = document.body;
      body.classList.toggle('dark-mode');
    }
  });
  
// THIS IS FOR MOBILE
function toggleMenu() {
  document.getElementById('fullMenu').classList.toggle('open');
}
// THIS IS THE END OF MOBILE

document.addEventListener('DOMContentLoaded', function () {
  const cursor = document.querySelector('.custom-cursor');

  // Cursor movement logic
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateCursor() {
    const rect = cursor.getBoundingClientRect();
    const cursorX = mouseX - rect.width / 100;
    const cursorY = mouseY - rect.height / 100;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(updateCursor);
  }

  updateCursor();

  // Hover effect
  const interactiveElements = document.querySelectorAll('a, .button, .accordion-content, .square-frame, .close, .prev, .next');

  interactiveElements.forEach(item => {
    item.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
    });
  });

  // Mobile menu toggle
  // window.toggleMenu = function () {
  //   const fullMenu = document.getElementById('fullMenu');
  //   fullMenu.classList.toggle('active');
  // };
});

//////////////////////// THIS IS ALL THE SCRIPT FOR MY INITIATIVES PAGE
function openTab(tabName) {
  // Hide all tab content
  var tabContents = document.getElementsByClassName('tab-content');
  for (var i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = 'none';
    }

  // Remove active class from all buttons
  var tabButtons = document.getElementsByClassName('button');
  for (var i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove('active');
  }

  // Show the selected tab content
  document.getElementById(tabName).style.display = 'block';

  // Add active class to the clicked button
  event.currentTarget.classList.add('active');
}

// THIS IS FOR OUR LOVELY ACCORDION
document.addEventListener('DOMContentLoaded', function() {
const accordions = document.querySelectorAll('.accordion-item');

accordions.forEach(accordion => {
    const content = accordion.querySelector('.accordion-content');

    accordion.addEventListener('click', () => {
        const isOpen = accordion.classList.contains('open');

        // Close all open accordions
        document.querySelectorAll('.accordion-item.open').forEach(openAccordion => {
            openAccordion.classList.remove('open');
            openAccordion.querySelector('.accordion-content').style.maxHeight = null;
        });

        // Toggle the clicked accordion
        if (!isOpen) {
            accordion.classList.add('open');
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            accordion.classList.remove('open');
            content.style.maxHeight = null;
        }
      });
    });
  });

// THIS IS FOR THE GALLERY MODAL
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('modal');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const caption = document.getElementById('caption');
  const counter = document.getElementById('counter');
  let currentIndex = 0;
  let currentGroup = '';
  let groupImages = [];

  function showModal(group, index) {
    currentGroup = group;
    currentIndex = index;
    groupImages = Array.from(document.querySelectorAll(`.modal-image.${currentGroup}`));

    updateModal();

    document.querySelectorAll('.prev, .next, .close').forEach(el => {
      el.style.display = 'block';
    });

    modal.style.display = 'block';
  }

  function updateModal() {
    groupImages.forEach((img, i) => {
      img.style.display = i === currentIndex ? 'block' : 'none';
    });
    const currentImage = groupImages[currentIndex];
    caption.textContent = currentImage.getAttribute('data-caption');
    counter.textContent = `${currentIndex + 1} / ${groupImages.length}`;
  }

  function addActiveClass(button) {
    button.classList.add('active');

    // Remove the active class after a short delay to simulate hover effect
    setTimeout(() => {
      button.classList.remove('active');
    }, 200);
  }

  document.querySelectorAll('.carousel-item').forEach(item => {
    item.addEventListener('click', () => {
      const group = item.getAttribute('data-group');
      showModal(group, 0);
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    groupImages.forEach(img => img.style.display = 'none');
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? groupImages.length - 1 : currentIndex - 1;
    updateModal();
    addActiveClass(prevBtn);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === groupImages.length - 1) ? 0 : currentIndex + 1;
    updateModal();
    addActiveClass(nextBtn);
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      groupImages.forEach(img => img.style.display = 'none');
    }
  });

  window.addEventListener('keydown', (event) => {
    if (modal.style.display === 'block') { // Check if modal is open
      if (event.key === 'ArrowLeft') {
        addActiveClass(prevBtn); // Add active class on previous button
        prevBtn.click(); // Trigger the previous button
      } else if (event.key === 'ArrowRight') {
        addActiveClass(nextBtn); // Add active class on next button
        nextBtn.click(); // Trigger the next button
      } else if (event.key === 'Escape') {
        closeBtn.click(); // Close the modal
      }
    }
  });
});


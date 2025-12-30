
 <script>
  
// Wrap everything in an IIFE to prevent global variable conflicts
(function() {
  'use strict';

 

  
  // Check if this script has already been initialized
  if (window.flexfitScriptInitialized) {
    
    return;
  }
  
  // Mark as initialized
  window.flexfitScriptInitialized = true;

  // Debounce function to limit event frequency
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Flag to prevent re-initialization
  let isInitialized = false;

  // Function to initialize event listeners and DOM manipulations
  function initializeElements() {
    // Select elements once
    const productSliderImages = document.querySelectorAll('.hdt-slider__slide .hdt-product__media');
    const badgeButtons = document.querySelectorAll('.tpo_image-swatches-wrapper');
    const tpoOptionFirstLabels = document.querySelectorAll('.tpo_option-container')[0];
    const tpoOptionLabels = document.querySelectorAll('.tpo_option-label');
    const productImages = document.querySelectorAll('.product-single__thumbnail');
    const productPhotoWrappers = document.querySelectorAll('.product__photo-wrapper');
    const lebels = document.querySelectorAll('#ProductSelect-option- label');
    const enablePersonalisierungElem = document.querySelector('.tpo_radio-button');
    const badgeImages = document.querySelectorAll('.badge_image');
    const overlay_images = document.querySelectorAll('.overlay_image');
    const image_zoom_controls = document.querySelectorAll('.image-zoom-controls');
    const show_controls_elem = document.querySelectorAll('.show_badge');
    const textImages = document.querySelectorAll('.text_image');
    const badgeTextElements = document.querySelectorAll('.badge_text');
    const currentColorName = document.querySelector('.js-swatch-display--1');
    const file_upload_dropzone = document.querySelector('#file-upload-2300996');
    const file_upload_input = document.querySelector('.tpo_file-upload-input');
    const fileLink = document.querySelector('.tpo-label__file');
    const add_to_cart = document.querySelector('.hdt-product-form__submit');
    const product_description = document.querySelector('.position_description');
    const form__labelAll = document.querySelectorAll('.form__label');
    let currentImage = "";
    let currentBadgeContainerLabel = "";
    let isLinkPosition = false;


        const tpo_option_set_wrapper = document.querySelector('.tpo_option-set-wrapper');
        const file_upload_text = document.querySelector('.tpo_option-heading');

console.log(tpoOptionLabels, file_upload_text ,  "tpoOptionLabels")
if(tpo_option_set_wrapper && tpoOptionLabels[0] && tpoOptionLabels.length > 1){
  tpo_option_set_wrapper.after(tpoOptionLabels[0]);
  tpoOptionLabels[0].after(file_upload_text);
  tpoOptionLabels[0].style.width = "100%";
}

            productSliderImages.forEach((elem , index) => {
              const image = elem.querySelector('img:first-child');
              const badge_img = elem.querySelector('.badge_image');
              
                const url = image.src;

                const parts = url.split("/");
        const lastPart = parts.pop();
        const filename = lastPart.split("?")[0];
        const filename_lastPart = filename.split("top")[1]

              if(filename_lastPart?.split(".")[0] != undefined){
              const positionNum = filename_lastPart?.split(".")[0];
              badge_img.style.top = positionNum + "%";
              isLinkPosition = true;
              }
              
              });



    // Handle product description
    if (product_description && !isLinkPosition) {
      /* product_description.style.display = "none"; */
      const description_content = product_description.textContent;
      

      overlay_images.forEach((image, index) => {
        image.style.top = description_content + "%";
      });

      badgeImages.forEach((image, index) => {
        image.style.top = description_content + "%";
      });
    }
    
    // File upload handler with iOS compatibility
    function handleFileUpload(event) {
      
      
      // Use requestAnimationFrame for smoother DOM updates on iOS
      requestAnimationFrame(() => {
        // Increased timeout for iOS Safari
        setTimeout(() => {
          const filePreview = document.querySelector(".tpo-file__preview");

          if (filePreview) {
           

            // Get the file link inside it
            const fileLinkElement = filePreview.querySelector(".tpo-file__img-preview");
            if (fileLinkElement && fileLinkElement.href) {

              productSliderImages.forEach((slider_item) => {
        slider_item.classList.add("uploaded");
      });



             

                const match = fileLinkElement.getAttribute("style").match(/url\(['"]?(.*?)['"]?\)/);

                  let url;
                  if (match) {
                    url = match[1];
                   
                  }

              overlay_images.forEach((image, index) => {
                if (index % 2 === 0) {
                  image.src = url;
                  // Use CSS transform for better iOS performance
                  image.style.opacity = "1";
                  /* image.style.webkitTransform = "translateZ(0)"; */
                  /* image.style.transform = "translateZ(0)"; */
                  image.style.objectFit = "scale-down";
                }
              });


              image_zoom_controls.forEach((control_elem, index) => {
                if (index % 2 === 0) {
                  control_elem.style.display = "block";
                  
                } else {
                  control_elem.style.display = "none";


                }
              });


              show_controls_elem.forEach((control_elem, index) => {
                if (index % 2 === 0) {
                  control_elem.style.display = "block";
                  
                } else {
                  control_elem.style.display = "none";


                }
              });
            }
          } else {
            console.log("No file preview found (yet)");
          }
        }, 4500); // Increased timeout for iOS

        // Apply grayscale filter
        setTimeout(() => {
          overlay_images.forEach((image, index) => {
            // iOS Safari needs webkit prefix
            image.style.webkitFilter = "grayscale(1)";
            image.style.filter = "grayscale(1)";
            image.style.objectFit = "scale-down";
          });
        }, 4500);
      });
    }

    // Attach file upload listeners with iOS compatibility
    if (file_upload_dropzone) {
      // Remove any existing listeners
      file_upload_dropzone.removeEventListener("change", handleFileUpload);
      file_upload_dropzone.removeEventListener("input", handleFileUpload);
      
      // Add both change and input events for better iOS support
      file_upload_dropzone.addEventListener("change", handleFileUpload, { passive: true });
      file_upload_dropzone.addEventListener("input", handleFileUpload, { passive: true });
    }

    // Also check for file input element directly (iOS fallback)
    if (file_upload_input) {
      file_upload_input.removeEventListener("change", handleFileUpload);
      file_upload_input.removeEventListener("input", handleFileUpload);
      
      file_upload_input.addEventListener("change", handleFileUpload, { passive: true });
      file_upload_input.addEventListener("input", handleFileUpload, { passive: true });
    }

    // If critical elements are missing, return false to keep observing
    if (!badgeButtons.length || !tpoOptionLabels.length) {
      
      return false;
    }

    // Hide tpo_option_labels beyond index 1
    tpoOptionLabels.forEach((item, index) => {
      if (index > 1) {
        item.style.display = 'none';
      }
    });

    // First label click handler
    if (tpoOptionFirstLabels) {
      // Remove existing listener before adding new one
      const handleFirstLabelClick = () => {
        badgeImages.forEach((image, index) => {
          image.src = currentImage;
        });
      };
      
      tpoOptionFirstLabels.removeEventListener("click", handleFirstLabelClick);
      tpoOptionFirstLabels.removeEventListener("touchend", handleFirstLabelClick);
      
      tpoOptionFirstLabels.addEventListener("click", handleFirstLabelClick, { passive: true });
      // Add touch event for better iOS support
      tpoOptionFirstLabels.addEventListener("touchend", handleFirstLabelClick, { passive: true });
    }

    // Handle badge button clicks with iOS touch support
    badgeButtons.forEach((badgeElem) => {
      
      function handleBadgeClick(e) {
        // Prevent default to avoid iOS zoom/bounce issues
        if (e.type === 'touchend') {
          e.preventDefault();
        }
        
        const optionLabelContainer = e.target.closest('.tpo_option-label');
        const optionParantContainer = e.target.closest('.tpo_option-container');
        currentImage = e.target.src;
        
        if (tpoOptionLabels[0] && tpoOptionLabels.length > 1) {
          tpoOptionLabels[0].style.marginTop = "170px";
        }

        if (optionParantContainer && tpoOptionFirstLabels && 
            optionParantContainer.id === tpoOptionFirstLabels.id) {
          return;
        }

      
        
        if (!optionLabelContainer) return;
        
        const badgeElemText = badgeElem
          .querySelector('.tpo_option_label')
          ?.textContent
          ?.replace(/\s+/g, '')
          ?.toLowerCase();
        
        if (!badgeElemText) return;
        
        // Use requestAnimationFrame for smoother updates on iOS
        requestAnimationFrame(() => {
          tpoOptionLabels.forEach((tpoOption) => {
            const badgeContainerLabel = tpoOption
              ?.querySelector('.form__label')
              ?.textContent
              ?.replace(/\s+/g, '')
              ?.toLowerCase();

            if (badgeContainerLabel === currentBadgeContainerLabel) {
              console.log(badgeContainerLabel !== currentBadgeContainerLabel, 
                         currentBadgeContainerLabel, badgeContainerLabel, "tpoOptionLabels[2]");
            }
            
            tpoOptionLabels.forEach((item, index) => {
              if (index > 1) {
                item.style.display = "none";
                item.style.marginBottom = "0";
                /* const formLabel = item.querySelector('.form__label');
                if (formLabel) {
                  formLabel.style.display = "none";
                  form__labelAll[index].innerText = "Patch Shape"
                  console.log(form__labelAll[index].innerText);
                }  */
              }
            });
            
            if (badgeContainerLabel === currentBadgeContainerLabel) {
              setTimeout(() => {
                tpoOption.style.display = "block";
                tpoOption.style.position = "absolute";
                // Force reflow for iOS
                tpoOption.offsetHeight;
              }, 10);
            }
            
            if (badgeContainerLabel === badgeElemText) {
              currentBadgeContainerLabel = badgeElemText;
              setTimeout(() => {
                tpoOption.style.display = "block";
                tpoOption.style.position = "absolute";
                // Force reflow for iOS
                tpoOption.offsetHeight;
              }, 10);
            }

            badgeImages.forEach((image, index) => {
              if (index % 2 === 0) {
                badgeImages[index].src = e.target.src;
                image.style.opacity = "1";
                // Hardware acceleration for iOS
                /* image.style.webkitTransform = "translateZ(0)"; */
                /* image.style.transform = "translateZ(0)"; */
              }
            });
          });
        });
      }
      
      // Remove existing listeners
      badgeElem.removeEventListener('click', handleBadgeClick);
      badgeElem.removeEventListener('touchend', handleBadgeClick);
      
      // Add both click and touch events
      badgeElem.addEventListener('click', handleBadgeClick, { passive: false });
      badgeElem.addEventListener('touchend', handleBadgeClick, { passive: false });


      
    });







    return true;
  }

  // iOS Safari compatibility check
  function isiOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  // Store observer reference to avoid redeclaration
  let mutationObserver = null;

  // MutationObserver with iOS optimizations
  function createObserver() {
    if (mutationObserver) {
      mutationObserver.disconnect();
    }
    
    mutationObserver = new MutationObserver(debounce((mutations, obs) => {
      if (isInitialized) {
        obs.disconnect();
        return;
      }

      if (initializeElements()) {
        isInitialized = true;
        obs.disconnect();
      }
    }, 100)); // Debounced for performance
    
    return mutationObserver;
  }

  // Start observing when DOM is ready
  function startObserving() {
    const observer = createObserver();
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      // Reduce observer overhead on iOS
      attributes: false,
      characterData: false
    });
  }

  // Initialize based on document state
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      startObserving();
      initializeElements();
    });
  } else {
    // DOM is already loaded
    startObserving();
    initializeElements();
  }

  // iOS-specific initialization
  if (isiOS()) {
    // Additional initialization for iOS after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (!isInitialized) {
          initializeElements();
        }
      }, 500);
    });
  }

  // Cleanup on page unload (important for iOS)
  window.addEventListener('beforeunload', () => {
    if (mutationObserver) {
      mutationObserver.disconnect();
    }
  });

})(); // End of IIFE
</script>



<script>

 // Mobile-compatible drag and zoom functionality for MULTIPLE images
(function() {
  'use strict';

  // Configuration
  const INITIAL_WIDTH = 170;
  const INITIAL_HEIGHT = 170;
  const ZOOM_STEP = 20;
  const MIN_SIZE = 50;
  const MAX_SIZE = 400;

  // Get all draggable elements and their containers
  const draggableElements = document.querySelectorAll('.overlay_image');
  const image_zoom_controls = document.querySelectorAll('.image-zoom-controls');
  const move_top_btns = document.querySelectorAll('.move_top_btn');
  const move_bottom_btns = document.querySelectorAll('.move_bottom_btn');
  const move_left_btns = document.querySelectorAll('.move_left_btn');
  const move_right_btns = document.querySelectorAll('.move_right_btn');
  const containers = document.querySelectorAll('.hdt-product__media');

  if (!draggableElements.length || !containers.length) {
    console.log('Required elements not found');
    return;
  }

  console.log(move_top_btns, "move_top_btns", move_bottom_btns, move_bottom_btns, move_right_btns);

  // Store state for each draggable element
  const elementStates = new Map();

  // Initialize each draggable element
  draggableElements.forEach((element, index) => {
    // Find the closest container for this element
    const container = element.closest('.hdt-product__media') || containers[index] || containers[0];
    
    if (!container) {
      console.warn(`No container found for element ${index}`);
      return;
    }

    // Initialize state for this element
    const state = {
      isDragging: false,
      offsetX: 0,
      offsetY: 0,
      currentWidth: INITIAL_WIDTH,
      currentHeight: INITIAL_HEIGHT,
      aspectRatio: INITIAL_WIDTH / INITIAL_HEIGHT,
      initialDistance: 0,
      initialWidth: INITIAL_WIDTH,
      container: container,
      element: element
    };

    elementStates.set(element, state);

    // Initialize element styles
    element.style.position = 'absolute';
    element.style.width = state.currentWidth + 'px';
    element.style.height = state.currentHeight + 'px';
    element.style.objectFit = 'cover';
    element.style.cursor = 'grab';

    console.log(`Initialized draggable element ${index}`);
  });

  // ===== ZOOM FUNCTIONALITY =====
  function updateSize(element, change) {
    const state = elementStates.get(element);
    if (!state) return;

    let newWidth = state.currentWidth + change;
    let newHeight = Math.round(newWidth / state.aspectRatio);

    if (newWidth >= MIN_SIZE && newWidth <= MAX_SIZE) {
      state.currentWidth = newWidth;
      state.currentHeight = newHeight;

      element.style.width = state.currentWidth + 'px';
      element.style.height = state.currentHeight + 'px';

      image_zoom_controls.forEach(img_element => {
         img_element.style.width = state.currentWidth + 'px';
         img_element.style.height = state.currentHeight + 'px';
     
    });
      console.log(`Element resized to: ${state.currentWidth}px x ${state.currentHeight}px`);
    }
  }




  // Handle zoom buttons (if they exist)
  const zoomInBtn = document.querySelectorAll('.product-zoom-in');
  const zoomOutBtn = document.querySelectorAll('.product-zoom-out');


  console.log(zoomInBtn,  zoomOutBtn, "zoomOutBtn")

  if (zoomInBtn) {
    zoomInBtn.forEach((item)=> {

      item.addEventListener('click', () => {
        // Apply zoom to all elements
  
        console.log("CLICK")
        draggableElements.forEach(el => updateSize(el, ZOOM_STEP));
      });

    })
    /* zoomInBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      draggableElements.forEach(el => updateSize(el, ZOOM_STEP));
    }); */
  }
  
  if (zoomOutBtn) {

    zoomOutBtn.forEach((item)=> {

      item.addEventListener('click', () => {
        console.log("CLICK")
        draggableElements.forEach(el => updateSize(el, -ZOOM_STEP));
      });

    })

    
    /* zoomOutBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      draggableElements.forEach(el => updateSize(el, -ZOOM_STEP));
    }); */
  }

  // ===== DRAG START (Mouse & Touch) =====
  function handleDragStart(element, clientX, clientY) {
    const state = elementStates.get(element);
    if (!state) return;

    state.isDragging = true;
    element.style.cursor = 'grabbing';
    /* element.style.border = '1px solid gray'; */

    state.offsetX = clientX - element.offsetLeft;
    state.offsetY = clientY - element.offsetTop;
  }

  // Attach mouse down event to each element
  draggableElements.forEach(element => {
    element.addEventListener('mousedown', (e) => {
      e.preventDefault();
      handleDragStart(element, e.clientX, e.clientY);
    });

    // Touch start event for single touch (drag)
    element.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        e.preventDefault();
        const touch = e.touches[0];
        handleDragStart(element, touch.clientX, touch.clientY);
      } else if (e.touches.length === 2) {
        // Two-finger touch detected - prepare for pinch zoom
        e.preventDefault();
        const state = elementStates.get(element);
        if (!state) return;

        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        
        state.initialDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        state.initialWidth = state.currentWidth;
      }
    }, { passive: false });
  });

  // ===== DRAG MOVE (Mouse & Touch) =====
  function handleDragMove(element, clientX, clientY) {
    const state = elementStates.get(element);
    if (!state || !state.isDragging) return;

    let newLeft = clientX - state.offsetX;
    let newTop = clientY - state.offsetY;

    const containerWidth = state.container.offsetWidth;
    const containerHeight = state.container.offsetHeight;
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // Boundary checking - keep element within container
    newLeft = Math.max(0, Math.min(newLeft, containerWidth - elementWidth));
    newTop = Math.max(0, Math.min(newTop, containerHeight - elementHeight));

    element.style.left = newLeft + 'px';
    element.style.top = newTop + 'px';

    console.log(element.style.left, "element.style.left")

    
    image_zoom_controls.forEach(element => {
      element.style.left = newLeft + 'px';
      element.style.top = newTop + 'px';
     
    });
    
  }
  
  function handleElemLeftMove() {
    const move_num = 2;
  image_zoom_controls.forEach(element => {
    /* let computed = window.getComputedStyle(element).left; */
    let element_clientX = element.offsetLeft;
    /* let current = parseFloat(computed.replace("px", "").replace("%", "")) || 0; */

    let updated = element_clientX - 1;
    element.style.left = updated + "px";

    console.log("Left:", element_clientX , updated, move_num);
    
  });

  draggableElements.forEach(element => {
    /* let computed = window.getComputedStyle(element).left; */
    let element_clientX = element.offsetLeft;
    /* let current = parseFloat(computed.replace("px", "").replace("%", "")) || 0; */

    let updated = element_clientX - 1;
    element.style.left = updated + "px";

    console.log("Left:", element_clientX , updated, move_num);
    
  });
}

function handleElemRightMove() {
  const move_num = 2;
  image_zoom_controls.forEach(element => {
    let computed = window.getComputedStyle(element).left;
    let current = parseFloat(computed.replace("px", "").replace("%", "")) || 0;

    let updated = current + move_num;
    element.style.left = updated + "px";

    console.log("Right:", updated + "%", current , move_num);
  });

  draggableElements.forEach(element => {
    let computed = window.getComputedStyle(element).left;
    let current = parseFloat(computed.replace("px", "").replace("%", "")) || 0;

    let updated = current + move_num;
    element.style.left = updated + "px";

    console.log("Right:", updated + "%", current , move_num);
  });
}

function handleElemTopMove() {
  const move_num = 2;
  image_zoom_controls.forEach(element => {
    let computed = window.getComputedStyle(element).top;
    let current = parseFloat(computed.replace("px", "").replace("%", "")) || 0;

    let updated = current - move_num;
    element.style.top = updated + "px";

    console.log("Top:", updated + "%");
  });


  draggableElements.forEach(element => {
    let computed = window.getComputedStyle(element).top;
    let current = parseFloat(computed.replace("px", "").replace("%", "")) || 0;

    let updated = current - move_num;
    element.style.top = updated + "px";

    console.log("Top:", updated + "%");
  });
}

function handleElemBottomMove() {
  const move_num = 2;
  image_zoom_controls.forEach(element => {
    let computed = window.getComputedStyle(element).top;
    let current = parseFloat(computed.replace("px", "").replace("%", "")) || 0;

    let updated = current + move_num;
    element.style.top = updated + "px";

    console.log("Bottom:", updated + "%");
  });


  draggableElements.forEach(element => {
    let computed = window.getComputedStyle(element).top;
    let current = parseFloat(computed.replace("px", "").replace("%", "")) || 0;

    let updated = current + move_num;
    element.style.top = updated + "px";

    console.log("Bottom:", updated + "%");
  });
}


  // Global mouse move event
  document.addEventListener('mousemove', (e) => {
    draggableElements.forEach(element => {
      const state = elementStates.get(element);
      if (state && state.isDragging) {
        handleDragMove(element, e.clientX, e.clientY);
      }
    });

    
    draggableElements.forEach(element => {
      const state = elementStates.get(element);
      if (state && state.isDragging) {
        handleDragMove(element, e.clientX, e.clientY);
      }
    });
  });

  // Global touch move event
  document.addEventListener('touchmove', (e) => {
    let handled = false;
    
    draggableElements.forEach(element => {
      const state = elementStates.get(element);
      if (!state) return;

      // Handle single-touch drag
      if (e.touches.length === 1 && state.isDragging) {
        e.preventDefault();
        const touch = e.touches[0];
        handleDragMove(element, touch.clientX, touch.clientY);
        handled = true;
      }
      
      // Handle pinch-to-zoom
      if (e.touches.length === 2 && e.target === element) {
        e.preventDefault();
        
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        
        if (state.initialDistance > 0) {
          const scale = currentDistance / state.initialDistance;
          let newWidth = Math.round(state.initialWidth * scale);
          let newHeight = Math.round(newWidth / state.aspectRatio);
          
          // Apply size limits
          if (newWidth >= MIN_SIZE && newWidth <= MAX_SIZE) {
            state.currentWidth = newWidth;
            state.currentHeight = newHeight;
            
            element.style.width = state.currentWidth + 'px';
            element.style.height = state.currentHeight + 'px';
          }
        }
        handled = true;
      }
    });
  }, { passive: false });

  // ===== DRAG END (Mouse & Touch) =====
  function handleDragEnd(element) {
    const state = elementStates.get(element);
    if (!state) return;

    state.isDragging = false;
    state.initialDistance = 0;
    element.style.cursor = 'grab';
    /* element.style.border = '0px solid gray'; */
  }

  // Global mouse up event
  document.addEventListener('mouseup', () => {
    draggableElements.forEach(element => {
      handleDragEnd(element);
    });
  });

  // Global touch end event
  document.addEventListener('touchend', () => {
    draggableElements.forEach(element => {
      handleDragEnd(element);
    });
  });

  // Touch cancel event
  document.addEventListener('touchcancel', () => {
    draggableElements.forEach(element => {
      handleDragEnd(element);
    });
  });
  
  move_top_btns.forEach(element => {
    element.addEventListener('click', handleElemTopMove);
  });

  move_bottom_btns.forEach(element => {
    element.addEventListener('click', handleElemBottomMove);
  });

  move_left_btns.forEach(element => {
    element.addEventListener('click', handleElemLeftMove);
  });


  move_right_btns.forEach(element => {
    element.addEventListener('click', handleElemRightMove);
  });



  console.log('Mobile drag and zoom functionality initialized for all elements');
})();
</script>



<script>
  document.addEventListener('DOMContentLoaded', function () {
    // Find all toggle buttons on the page
    const toggleButtons = document.querySelectorAll('.show_badge');

    toggleButtons.forEach((button, index) => {
      // Find elements inside this specific card only
           // the whole card
      const controls      = document.querySelectorAll('.image-zoom-controls');      // the Controls image
      const showIcon    = button.querySelector('.show');                 // eye-open icon
      const hideIcon    = button.querySelector('.hide');                 // eye-closed icon

      // Initial state: Controls visible, show "hide" icon (closed eye)
      let isControlsVisible = true;

      button.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        console.log("click")

        if (isControlsVisible) {
          // Hide Controls
          if (controls[index]) controls[index].style.display = 'none';
          showIcon.style.display = 'none';
          hideIcon.style.display = 'inline-block';
        } else {
          // Show Controls
          showIcon.style.display = 'inline-block';
          hideIcon.style.display = 'none';
          if (controls[index]) controls[index].style.display = 'block';
        }

        isControlsVisible = !isControlsVisible;
      });
    });
  });
</script>

// Handles Book button clicks: open service link in new tab and load into iframe for preview
(function(){
  function openBooking(e){
    e.preventDefault();
    var el = e.currentTarget;
    var service = el.getAttribute('data-service');
    var url = el.getAttribute('data-url') || (window.CREATIVEMICROINK_BOOKING_LINKS && service && window.CREATIVEMICROINK_BOOKING_LINKS[service]);
    if(!url) return;

    // Open the booking URL in a new tab
    try{
      window.open(url, '_blank');
    }catch(err){
      var a = document.createElement('a');
      a.href = url; a.target = '_blank'; document.body.appendChild(a); a.click(); a.remove();
    }

    // Load into the modal iframe (if present) and show modal
    var modal = document.getElementById('booking-modal');
    var iframe = document.getElementById('booking-modal-iframe');
    if(iframe && modal){
      iframe.src = url;
      // show modal with ARIA
      modal.style.display = 'flex';
      modal.setAttribute('role','dialog');
      modal.setAttribute('aria-modal','true');
      modal.removeAttribute('aria-hidden');
      // focus management: save last focused element, focus close button
      modal.__lastFocused = document.activeElement;
      var close = document.getElementById('booking-modal-close');
      if(close) close.focus();
      // mark iframe as visible to assistive tech
      iframe.setAttribute('aria-hidden','false');
      // trap tab within modal
      trapFocus(modal);
    } else {
      // fallback: scroll to booking area if exists
      var bookSection = document.getElementById('book');
      if(bookSection && bookSection.scrollIntoView){
        bookSection.scrollIntoView({behavior:'smooth',block:'start'});
      }
    }
  }

  function closeModal(){
    var modal = document.getElementById('booking-modal');
    var iframe = document.getElementById('booking-modal-iframe');
    if(modal){
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden','true');
      modal.removeAttribute('aria-modal');
    }
    if(iframe){
      // reset to start page to avoid keeping active state
      iframe.src = 'about:blank';
      iframe.setAttribute('aria-hidden','true');
    }
    // restore focus
    if(modal && modal.__lastFocused && modal.__lastFocused.focus) modal.__lastFocused.focus();
  }

  function trapFocus(modal){
    var focusable = modal.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    if(!focusable.length) return;
    focusable = Array.prototype.slice.call(focusable);
    var first = focusable[0];
    var last = focusable[focusable.length -1];

    function handleKey(e){
      if(e.key === 'Tab'){
        if(e.shiftKey){
          if(document.activeElement === first){ e.preventDefault(); last.focus(); }
        } else {
          if(document.activeElement === last){ e.preventDefault(); first.focus(); }
        }
      }
    }

    modal.__focusHandler = handleKey;
    modal.addEventListener('keydown', handleKey);
  }

  function removeTrap(modal){
    if(!modal || !modal.__focusHandler) return;
    modal.removeEventListener('keydown', modal.__focusHandler);
    modal.__focusHandler = null;
  }

  function init(){
    var buttons = document.querySelectorAll('.book-btn');
    buttons.forEach(function(btn){
      btn.addEventListener('click', openBooking);
    });

    var promos = document.querySelectorAll('.promos .btn');
    promos.forEach(function(p){
      if(p.getAttribute('data-url')) p.addEventListener('click', openBooking);
    });

    var close = document.getElementById('booking-modal-close');
    if(close) close.addEventListener('click', function(){ removeTrap(document.getElementById('booking-modal')); closeModal(); });

    // close modal when clicking on overlay
    var modal = document.getElementById('booking-modal');
    if(modal) modal.addEventListener('click', function(e){
      if(e.target === modal){ removeTrap(modal); closeModal(); }
    });

    // accessibility: close on ESC
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){
        removeTrap(document.getElementById('booking-modal'));
        closeModal();
      }
    });
    
    // If services are localized, set aria labels and update visible price text where possible
    if(window.CREATIVEMICROINK_SERVICES){
      var allBtns = document.querySelectorAll('.book-btn');
      allBtns.forEach(function(btn){
        var svc = btn.getAttribute('data-service');
        if(!svc) return;
        var data = window.CREATIVEMICROINK_SERVICES[svc];
        if(data){
          // update aria label for screen readers
          var label = data.title + (data.price ? ' — ' + data.price : '');
          btn.setAttribute('aria-label', 'Book ' + label);
          // try to update nearby .service-price text
          var card = btn.closest('.service-card');
          if(card){
            var priceEl = card.querySelector('.service-price');
            if(priceEl) priceEl.textContent = data.price;
            var titleEl = card.querySelector('.service-title');
            if(titleEl) titleEl.textContent = data.title;
            var descEl = card.querySelector('.service-description');
            if(descEl) descEl.textContent = data.description;
          }
        }
      });
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else init();
})();

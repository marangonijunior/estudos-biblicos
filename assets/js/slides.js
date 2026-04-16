/* ===================================================================== */
/* ESTUDOS BÍBLICOS - SLIDE NAVIGATION                                  */
/* Shared JavaScript for biblical studies presentations                 */
/* ===================================================================== */

class SlideNavigator {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.dotsContainer = document.getElementById('dots');
    this.counter = document.getElementById('counter');
    this.prevBtn = document.getElementById('prev');
    this.nextBtn = document.getElementById('next');
    this.current = 0;
    this.total = this.slides.length;
    
    if (this.total === 0) return;
    
    this.init();
  }
  
  init() {
    this.buildDots();
    this.bindEvents();
    this.handleDeepLink();
    this.updateCounter();
  }
  
  buildDots() {
    if (!this.dotsContainer) return;
    
    this.slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.addEventListener('click', () => this.go(i));
      this.dotsContainer.appendChild(dot);
    });
    
    this.dots = this.dotsContainer.querySelectorAll('.dot');
    this.dots[0]?.classList.add('active');
  }
  
  bindEvents() {
    this.prevBtn?.addEventListener('click', () => this.go(this.current - 1));
    this.nextBtn?.addEventListener('click', () => this.go(this.current + 1));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { 
        e.preventDefault(); 
        this.go(this.current + 1); 
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { 
        e.preventDefault(); 
        this.go(this.current - 1); 
      }
      if (e.key === 'Home') { 
        e.preventDefault(); 
        this.go(0); 
      }
      if (e.key === 'End') { 
        e.preventDefault(); 
        this.go(this.total - 1); 
      }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => { 
      touchStartX = e.changedTouches[0].screenX; 
    });
    document.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) > 50) {
        this.go(this.current + (dx < 0 ? 1 : -1));
      }
    });
  }
  
  go(index) {
    if (index < 0 || index >= this.total || index === this.current) return;
    
    // Update slides
    this.slides[this.current].classList.remove('active');
    this.dots?.[this.current]?.classList.remove('active');
    
    this.current = index;
    
    this.slides[this.current].classList.add('active');
    this.dots?.[this.current]?.classList.add('active');
    
    this.updateCounter();
    this.updateURL();
  }
  
  updateCounter() {
    if (!this.counter) return;
    const currentStr = String(this.current + 1).padStart(2, '0');
    const totalStr = String(this.total).padStart(2, '0');
    this.counter.textContent = `${currentStr} / ${totalStr}`;
  }
  
  updateURL() {
    try { 
      history.replaceState(null, '', '#' + (this.current + 1)); 
    } catch (e) { 
      // Ignored in sandboxed environments
    }
  }
  
  handleDeepLink() {
    const hash = parseInt(location.hash.replace('#', ''), 10);
    if (!isNaN(hash) && hash >= 1 && hash <= this.total) {
      this.go(hash - 1);
    }
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SlideNavigator();
});

// Export for manual initialization if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SlideNavigator;
}

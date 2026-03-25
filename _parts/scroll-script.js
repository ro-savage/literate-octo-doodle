document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const hero = document.getElementById('hero');
  const mobileMenuButton = document.querySelector('.w-nav-button');
  const dropdownToggles = document.querySelectorAll('[dropdown-toggle="true"]');

  if (!navbar || !hero) return;

  let isDropOpen = false;
  let isMobileMenuOpen = false;
  let lastScroll = 0;

  const animationDuration = 0.2;
  const scrollThreshold = 0.04;

  // Set CSS transition on navbar
  navbar.style.transition = `transform ${animationDuration}s ease-out`;

  function checkIfDropMenuOpen() {
    isDropOpen = Array.from(dropdownToggles).some(el =>
      el.classList.contains('w--open')
    );
  }

  function checkIfMobileMenuOpen() {
    isMobileMenuOpen = mobileMenuButton?.classList.contains('w--open') || false;
  }

  function handleScroll() {
    const scrollTop = window.scrollY;
    const scrollDiff = scrollTop - lastScroll;

    checkIfDropMenuOpen();
    checkIfMobileMenuOpen();

    // NEW: Get 50% of hero section as trigger point
    const heroTriggerPoint = hero.offsetTop + hero.offsetHeight * 0.5;

    // BEFORE reaching the hero threshold, navbar always visible
    if (scrollTop < heroTriggerPoint) {
      navbar.style.transform = 'translateY(0)';
      lastScroll = scrollTop;
      return;
    }

    // AFTER threshold: scroll direction determines nav behavior
    if (!isDropOpen && !isMobileMenuOpen) {
      if (Math.abs(scrollDiff) > scrollThreshold * window.innerHeight) {
        const isScrollingUp = scrollDiff < 0;
        const offset = 2 * parseFloat(getComputedStyle(navbar).fontSize);
        const targetY = isScrollingUp ? '0' : `-${navbar.offsetHeight + offset}px`;
        navbar.style.transform = `translateY(${targetY})`;
        lastScroll = scrollTop;
      }
    }
  }

  window.addEventListener('scroll', handleScroll);
});

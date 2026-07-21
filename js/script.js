document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. スクロールふわっとアニメーション (全ページ共通)
     ========================================= */
  const scrollTriggers = document.querySelectorAll(".js-scroll-trigger");

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -60px 0px", // 画面下から60px入ったら発火
    threshold: 0.08
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-active");
        observer.unobserve(entry.target); // 1度ふわっと出たら監視を終了
      }
    });
  }, observerOptions);

  scrollTriggers.forEach((element) => {
    observer.observe(element);
  });

  /* =========================================
     2. メニュー開閉処理 (TOP等で使用)
     ========================================= */
  const menuOpenBtns = document.querySelectorAll(".js-menu-open");
  const menuCloseBtn = document.getElementById("menuCloseBtn");
  const overlayMenu = document.getElementById("overlayMenu");
  const menuLinks = document.querySelectorAll(".js-menu-link");

  // メニューが存在するページでのみ実行
  if (overlayMenu) {
    menuOpenBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        overlayMenu.classList.add("is-active");
      });
    });

    if (menuCloseBtn) {
      menuCloseBtn.addEventListener("click", () => {
        overlayMenu.classList.remove("is-active");
      });
    }

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        overlayMenu.classList.remove("is-active");
      });
    });
  }

  /* =========================================
     3. SERVICE Sticky スクロール連動処理 (ABOUT等で使用)
     ========================================= */
  const stickySection = document.getElementById("stickyService");

  if (stickySection) {
    const textItems = stickySection.querySelectorAll(".service-text-item");
    const imgItems = stickySection.querySelectorAll(".service-img-item");
    const totalItems = textItems.length;

    window.addEventListener("scroll", () => {
      const rect = stickySection.getBoundingClientRect();
      const sectionHeight = stickySection.offsetHeight - window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const scrolled = Math.abs(rect.top);
        const progress = Math.min(Math.max(scrolled / sectionHeight, 0), 0.99);
        const activeIndex = Math.floor(progress * totalItems);

        textItems.forEach((item, index) => {
          if (index === activeIndex) {
            item.classList.add("is-active");
          } else {
            item.classList.remove("is-active");
          }
        });

        imgItems.forEach((item, index) => {
          if (index === activeIndex) {
            item.classList.add("is-active");
          } else {
            item.classList.remove("is-active");
          }
        });
      }
    });
  }
});
// ページ（画像や3Dモデルなど）が完全に読み込まれたら実行
window.addEventListener('load', function() {
  
  // 読み込み完了後、さらに「2秒（2000ミリ秒）」待ってからフワッと消す
  // ※もっと長くしたい場合はここを 3000（3秒）などに変更してください
  setTimeout(function() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('is-loaded');
    }
  }, 3500); 

});

// 【保険】通信が遅い時の強制終了を 5秒 → 10秒 に伸ばす
setTimeout(function() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen && !loadingScreen.classList.contains('is-loaded')) {
    loadingScreen.classList.add('is-loaded');
  }
}, 10000); // 10000 = 10秒
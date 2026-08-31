// ヒーロー:画像スライダーの自動切り替え
const heroSlides = document.querySelectorAll(".hero-slide[data-image]");

if (heroSlides.length) {
  heroSlides.forEach((el) => {
    el.style.backgroundImage = `url("${el.dataset.image}")`;
  });

  let heroSlideIndex = 0;

  setInterval(() => {
    heroSlides[heroSlideIndex].classList.remove("is-active");
    heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
    heroSlides[heroSlideIndex].classList.add("is-active");
  }, 5000);
}

// 想い:data-image属性から背景画像を反映
const conceptImage = document.querySelector(".concept-image[data-image]");

if (conceptImage) {
  conceptImage.style.backgroundImage = `url("${conceptImage.dataset.image}")`;
}

// メニューカード:data-image属性から背景画像を反映
const menuCardImages = document.querySelectorAll(".menu-card-image[data-image]");

menuCardImages.forEach((el) => {
  el.style.backgroundImage = `url("${el.dataset.image}")`;
});

// サービス:data-image属性から背景画像を反映
const serviceImages = document.querySelectorAll(".service-image[data-image]");

serviceImages.forEach((el) => {
  el.style.backgroundImage = `url("${el.dataset.image}")`;
});

// メニューカード:クリックで画像全体をライトボックス表示
const menuLightbox = document.getElementById("menuLightbox");
const menuLightboxClose = document.getElementById("menuLightboxClose");
const menuLightboxImg = document.getElementById("menuLightboxImg");

if (menuLightbox && menuLightboxImg) {
  menuCardImages.forEach((el) => {
    el.classList.add("is-clickable");
    el.addEventListener("click", () => {
      menuLightboxImg.src = el.dataset.image;
      menuLightbox.classList.add("is-open");
    });
  });

  menuLightboxClose.addEventListener("click", () => {
    menuLightbox.classList.remove("is-open");
  });

  menuLightbox.addEventListener("click", (event) => {
    if (event.target === menuLightbox) {
      menuLightbox.classList.remove("is-open");
    }
  });
}

// ヘッダー:スクロールしたら背景をつける
const header = document.getElementById("siteHeader");

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
});

// スクロールで要素をフェードイン表示
const revealTargets = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => revealObserver.observe(el));

// サイドメニュー:スクロール位置に応じてアクティブ表示を切り替え
const sideMenuLinks = document.querySelectorAll(".side-menu a");
const sideMenuTargets = document.querySelectorAll("#kakigori-menu, #tapioca-drink, #jelly-drink");

if (sideMenuLinks.length && sideMenuTargets.length) {
  const sideMenuObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          sideMenuLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sideMenuTargets.forEach((target) => sideMenuObserver.observe(target));
}

// メニューのカテゴリ絞り込み
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");

    menuCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !show);
    });
  });
});

document.addEventListener("DOMContentLoaded", () =>{
	customCursor();
	openHeader();
	openSideBar();
	fixedsidebarBtn();
	addAnimationInit();
	accordionFunction();
	playVideo();
	initPlotSlider();
	adjustPadding();
	initReviewsSlider();
	smooth();
	wrapTablesInDiv();
	goodsSliderInit();
	tabsShows();
	showPopUpBook();
});
const HTMLELEMENT = document.querySelector('html');
const openHeader = () =>{
	
	const burgerBtn = document.querySelector('.burger__wrap');
const navLinks = document.querySelectorAll('nav ul a');
burgerBtn.addEventListener('click', () =>{
	HTMLELEMENT.classList.toggle('open');
});

navLinks.forEach((link) =>{
	link.addEventListener('click', () =>{
		HTMLELEMENT.classList.remove('open');
	})
})
}
const smooth = () =>{
	document.querySelectorAll('a[href^="#"').forEach(link => {

		link.addEventListener('click', function(e) {
				e.preventDefault();
	
				let href = this.getAttribute('href').substring(1);
	
				const scrollTarget = document.getElementById(href);
	
				const topOffset = document.querySelector('header').offsetHeight;
				const elementPosition = scrollTarget.getBoundingClientRect().top;
				const offsetPosition = elementPosition - topOffset;
	
				window.scrollBy({
						top: offsetPosition,
						behavior: 'smooth'
				});
		});
	});
}
const openSideBar = () => {
	const sidebarBtn = document.querySelector('.sidebar__in');
	if(!sidebarBtn) return
	sidebarBtn.addEventListener('click', () =>{
		HTMLELEMENT.classList.toggle('active');
	})
}

const fixedsidebarBtn = () =>{
	const sidebarBtn = document.querySelector('.sidebar__in');
	if (!sidebarBtn) return
	const newHeight = window.innerHeight;
		sidebarBtn.style.top = `calc(${newHeight}px - 72px`;
}
window.addEventListener('resize', () => {
	fixedsidebarBtn();
});
const addAnimationInit = () => {

	const scrollers = document.querySelectorAll('.marquee');
	if(!window.matchMedia("(prefers-reduced-motion:reduce)").matches){
		addAnimation();
	}
	function addAnimation(){
		scrollers.forEach((scroller) =>{
			scroller.setAttribute("data-animate", true);
			const scrollerInner = scroller.querySelector('.marquee__wrap');
			const scrollerContent = Array.from(scrollerInner.children);
			scrollerContent.forEach(item =>{
				const duplicatedItem = item.cloneNode(true);
				duplicatedItem.setAttribute('aria-hidden', true);
				scrollerInner.appendChild(duplicatedItem);
			});
			
		});
	}
}
const accordionFunction = () => {
  const accordionItems = document.querySelectorAll(".accord-item");
  
  accordionItems.forEach((item) => {
    item.addEventListener("click", function () {
        item.classList.toggle("active");
    });
  });
};
AOS.init({


	duration: 1000,
});

const playVideo = () => {
	const startVideoBtns = document.querySelectorAll('.start-video');

	startVideoBtns.forEach((startBtn) => {
			startBtn.addEventListener('click', () => {
					const wrapper = startBtn.closest('.different__frame'); 
					const video = wrapper.querySelector('video'); 

					if (video) {
						const videoPosterAtribute = video.getAttribute('poster');
						const videoControlsAtribute = video.getAttribute('controls');
							if (video.paused) {
									video.play();
									video.style.height = "100%";
									video.style.width = "100%";
									startBtn.classList.add('play');
									video.removeAttribute('poster');
							} else {
									video.pause();
									startBtn.classList.remove('play');
									video.setAttribute('poster', `${videoPosterAtribute}`);
									startBtn.classList.remove('play');
							}
					}
			});
	});
};

const initPlotSlider = () =>{
	const plotSliderWrap = document.querySelector('.plotSlider');
	if(!plotSliderWrap) return
	const plotSlider = new Swiper(plotSliderWrap, {

		pagination: {
			el: ".plot-pagination",
			clickable:true,
		},
		navigation: {
			nextEl: ".plot-button-next",
			prevEl: ".plot-button-prev",
		},
		slidesPerView: 1,
		spaceBetween: 20,
		// Responsive breakpoints
		breakpoints: {
			640: {
				slidesPerView: 2,
			},
			1023: {
				slidesPerView: 3,
			}
		}
	});
}
const initReviewsSlider = () =>{
	const reviewsSliderWrap = document.querySelector('.reviewsSlider');
	if(!reviewsSliderWrap) return
	const reviewsSlider = new Swiper(reviewsSliderWrap, {

		pagination: {
			el: ".reviews-pagination",
			clickable:true,
		},
	
		slidesPerView: 1,
		spaceBetween: 20,
		breakpoints: {
			1023: {
				slidesPerView: 2,
			},
			
		}
	});
}

const adjustPadding = () => {
	const elements = document.querySelectorAll('.add'); 
	elements.forEach((parent) => {
			const absoluteElement = parent.querySelector('.add__img'); 
			const absoluteElementContainer = parent.querySelector('.add__container'); 

			if (absoluteElement && absoluteElementContainer) {
					const height = absoluteElement.offsetHeight - absoluteElementContainer.offsetHeight;
					if(height<= 0) return
					parent.style.paddingTop = `${height}px`;
					
			}
	});
};

window.addEventListener('resize', adjustPadding);

const reviewsFormChecked = () =>{
	if (document.querySelector(".reviewForm")) {
    const commentForm = document.getElementById("comment-form");
    const commentName = document.getElementById("name");
    const commentSurname = document.getElementById("lastName");
    const commentText = document.getElementById("message");
    const sick = document.getElementById("sick");
    const commentButton = document.getElementById("comment-button");

    commentButton.addEventListener("click", function (e) {
      const ratingElement = document.querySelector(
        'input[name="rating"]:checked'
      );
      const rating = ratingElement ? ratingElement.value : "";
      const commentPost = this.getAttribute("data-post-id");
      e.preventDefault();
      var xhr = new XMLHttpRequest();
      if (commentName.value && commentSurname && commentText) {
        xhr.open("POST", homepage_js.ajax_url, true);
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(
          "comment_name=" +
            commentName.value +
            "&comment_surname=" +
            commentSurname.value +
            "&rating=" +
            rating +
            "&sick=" +
            sick.value +
            "&comment_text=" +
            commentText.value +
            "&commentPost=" +
            commentPost +
            "&action=new_comment_function"
        );
        xhr.onload = function () {
          if (this.status >= 200 && this.status < 400) {
            commentForm.reset();
            alert(
              homepage_js.currentLang === "uk"
                ? "Ваш відгук було надіслано"
                : "Ваш отзыв был отправлен"
            );
            // commentForm.textContent = '';
          } else {
            alert(
              homepage_js.currentLang === "uk"
                ? "Заповніть форму"
                : "Заполните форму"
            );
          }
        };
      } else {
        alert(
          homepage_js.currentLang === "uk"
            ? "Заповніть форму"
            : "Заполните форму"
        );
      }
    });
  }
}
const wrapTablesInDiv = () => {

	const documentTable = document.querySelectorAll('table, .price__list');
	
	if(documentTable){
		documentTable.forEach(table => {
			const wrapper = document.createElement('div');
			wrapper.classList.add('scroll');
			table.parentNode.insertBefore(wrapper, table);
			wrapper.appendChild(table);
		});
	}
  
}

const goodsSliderInit = () =>{
	const goodsSliderWrap = document.querySelector('.goodsSlider');
	const goodsSliderWrap2 = document.querySelector('.goodsSlider2');
	if(!goodsSliderWrap) return;

	var goodsSlider = new Swiper(goodsSliderWrap, {
		loop: true,
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var goodsSlider2 = new Swiper(goodsSliderWrap2, {
		loop: true,
		spaceBetween: 10,
		navigation: {
			nextEl: ".goods-button-next",
			prevEl: ".goods-button-prev",
		},
		thumbs: {
			swiper: goodsSlider,
		},
	});
}
const tabsShows = () =>{
	const goodsPage = document.querySelectorAll('.goods__tabs');
	if (!goodsPage) return
	goodsPage.forEach((goods) =>{
		const goodsTabs = goods.querySelectorAll('.goods__container-tabs-btn');
		const goodsContentBlock = goods.querySelectorAll('.goods__container-tabs-content');

		function showGoodsContent(contentName) {
			goodsContentBlock.forEach((content) => {
				let contentDataName = content.dataset.name;
				if (contentDataName === contentName) {
					content.style.display = "block";
				} else {
					content.style.display = "none";
				}
			});
		}

		function activeGoodsTabs() {
			goodsTabs.forEach((tab, index) => {
				let contentDataName = tab.dataset.name;

				tab.addEventListener('click', () => {
					goodsTabs.forEach((t) => t.classList.remove('active-tab'));
					tab.classList.add('active-tab');
					showGoodsContent(contentDataName);
				});

				if (index === 0) {
					tab.classList.add('active-tab');
					showGoodsContent(contentDataName);
				}
			});
		}

		activeGoodsTabs();
	})
		
	}
	

	
	const customCursor = () => {
		const cursor = document.querySelector('.custom-cursor');
		let rafId;
	
		function enableCustomCursor() {
			cursor.style.display = 'block';
			document.addEventListener('mousemove', moveCursor);
			document.addEventListener('mouseover', handleMouseOver);
		}
	
		function disableCustomCursor() {
			cursor.style.display = 'none';
			document.body.style.cursor = 'auto';
			document.removeEventListener('mousemove', moveCursor);
			document.removeEventListener('mouseover', handleMouseOver);
		}
	
		function moveCursor(e) {
			cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(() => {
				cursor.style.top = `${e.clientY}px`;
				cursor.style.left = `${e.clientX}px`;
			});
		}
	
		function handleMouseOver(e) {
			const linkElements = 'a, button, video, .swiper-pagination-bullet, .basket, .basket svg, .burger__wrap div, .burger, .logo img';
			if (e.target.closest(linkElements)) {
				cursor.classList.add('cursor_cursor--link');
			} else {
				cursor.classList.remove('cursor_cursor--link');
			}
		}
	
		function checkDevice() {
			if ('ontouchstart' in window || window.innerWidth <= 768) {
				disableCustomCursor();
			} else {
				enableCustomCursor();
			}
		}
	
		checkDevice();
		window.addEventListener('resize', checkDevice);
	};
	
	
	const showPopUpBook = () => {
		const popUpBook = document.querySelector(".popup");
		const popupBg = document.querySelectorAll(".popup-bg");
		const htmlElement = document.querySelector("html");
		const closePopUpBook = document.querySelectorAll(".popup-close");
		const popupButtons = document.querySelectorAll('[data-button="popup-book"]');
	
		if (!popUpBook) return;
	
		const openPopup = () => {
			htmlElement.classList.add("open-popup");
			popUpBook.classList.add("open");
		};
	
		const closePopup = () => {
			htmlElement.classList.remove("open-popup");
			popUpBook.classList.remove("open");
		};
	
		popupButtons.forEach((button) => button.addEventListener("click", openPopup));
		closePopUpBook.forEach((closeButton) => closeButton.addEventListener("click", closePopup));
		popupBg.forEach((bg) => bg.addEventListener("click", closePopup));
	};
	
	// lightbox.option({
	// 	'resizeDuration': 200,
	// 	'wrapAround': true
	// })
	
	lightbox.init();
	

	
	


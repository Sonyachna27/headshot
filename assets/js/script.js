document.addEventListener("DOMContentLoaded", () =>{
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
	sidebarBtn.addEventListener('click', () =>{
		HTMLELEMENT.classList.toggle('active');
	})
}

const fixedsidebarBtn = () =>{
	const sidebarBtn = document.querySelector('.sidebar__in');
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
AOS.init();

const playVideo = () => {
	const startVideoBtns = document.querySelectorAll('.start-video');

	startVideoBtns.forEach((startBtn) => {
			startBtn.addEventListener('click', () => {
					const wrapper = startBtn.closest('.different__frame'); 
					const video = wrapper.querySelector('video'); 

					if (video) {
						const videoPosterAtribute = video.getAttribute('poster');
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
					console.log(`Updated padding for: `, parent, `to: ${height}px`);
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
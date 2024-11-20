document.addEventListener("DOMContentLoaded", () =>{
	openHeader();
	openSideBar();
	fixedsidebarBtn();
	addAnimationInit();
	accordionFunction();
	playVideo();
	initPlotSlider();
	adjustPadding();
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

const playVideo = () =>{
	const startVideoBtns = document.querySelectorAll('.start-video');
	const videos = document.querySelectorAll('video');

	startVideoBtns.forEach((startBtn) => {
			startBtn.addEventListener('click', () => {
				
					const btnData = startBtn.getAttribute('data-btn');
					videos.forEach((video) => {
							const videoData = video.getAttribute('data-video');
							const videoPosterAtribute = video.getAttribute('poster');

							if (btnData === videoData) {
									if (video.paused) {
											video.play();
											video.removeAttribute('poster');
											startBtn.classList.add('play');
									} else {
											video.pause();
											video.setAttribute('poster', `${videoPosterAtribute}`);
											startBtn.classList.remove('play');
									}
							}
					});
			});
	});
};

const initPlotSlider = () =>{
	const plotSliderWrap = document.querySelector('.plotSlider');
	if(!plotSliderWrap) return
	const plotSlider = new Swiper(plotSliderWrap, {

		pagination: {
			el: ".plot-pagination",
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


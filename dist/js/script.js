const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})
  
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
  
requestAnimationFrame(raf)
  
function setCursor() {
    //custom cursor
    const cursor = document.querySelector('.cursor');
  
    const navLinks = document.querySelectorAll('.nav_link, .project_item, .button');
    navLinks.forEach(l=>{
        l.addEventListener("mouseenter", e => {
            cursor.classList.add("grow");
        });
        l.addEventListener("mouseleave", e => {
            cursor.classList.remove("grow");
        })
    })
  
    const ctaLinks = document.querySelectorAll('.cta, .email_link');
    ctaLinks.forEach(l=>{
        l.addEventListener("mouseenter", e => {
            cursor.classList.add("cta-grow");
        });
        l.addEventListener("mouseleave", e => {
            cursor.classList.remove("cta-grow");
        })
    });
  
    const blurLinks = document.querySelectorAll('.project_item');
    blurLinks.forEach(l=>{
        l.addEventListener("mouseenter", e => {
            cursor.classList.add("blur-grow");
        });
        l.addEventListener("mouseleave", e => {
            cursor.classList.remove("blur-grow");
        })
    });
  
    //service list anim
    const items = document.querySelectorAll(".service_list p, .service_list");
  
    items.forEach(item => {
        new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('reveal');
                }
            });
        }, {
            rootMargin: "-15% 0% -15% 0%",
            threshold: 0
        }).observe(item);
    })
}
  
setCursor();
  
const duration = 1;
  
function resetWebflow(data) {
    let parser = new DOMParser();
    let dom = parser.parseFromString(data.next.html, "text/html");
    let webflowPageId = $(dom).find("html").attr("data-wf-page");
    $("html").attr("data-wf-page", webflowPageId);
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require("ix2").init();
    setCursor();
}
  
function makeItemActive() {
    let cmsPageName = $(".project-page").find(".item-name").text();
    $(".w-dyn-item").each(function (index) {
        if ($(this).find(".item-name").text() === cmsPageName) {
            $(this).addClass("active-flip-item");
        }
    });
}
  
function flip(outgoing, incoming) {
    let state = Flip.getState(outgoing.find(".project_image"));
    incoming.find(".project_image").remove();
    outgoing.find(".project_image").appendTo(incoming);
    Flip.from(state, { duration: duration, ease: "power2.inOut" });
}
  
barba.hooks.after((data) => {
    resetWebflow(data);
    setCursor();
});
  
barba.init({
    preventRunning: true,
    transitions: [
        {
            sync: true,
            from: { namespace: ["home-page"] },
            to: { namespace: ["project-page"] },
            leave(data) {
                let heroContent = data.next.container.children[3].children[0].children[0].children[0].children[0];
                heroContent.style.opacity = "0";
            },
            enter(data) {
                makeItemActive();
                $(data.next.container).addClass("fixed");
                flip($(".active-flip-item"), $(".project_img-wrap"));
                return gsap.to(data.current.container, { opacity: 0, duration: duration, ease: "power2.inOut" });
            },
            afterEnter(data) {
                $(data.next.container).removeClass("fixed");
                $(".active-flip-item").removeClass("active-flip-item");
                $(window).scrollTop(0);
            }
        }
    ]
});

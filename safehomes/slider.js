const slideWrap = document.querySelector('.slider_wrap');
let wrapWidth = slideWrap.clientWidth;  // clientWidh : width값을 구해준다

let slideItems = document.querySelectorAll('.slide_item');

const maxSlide = slideItems.length;
let currSlide = 1;


const startSlide = slideItems[0];
const endSlide = slideItems[slideItems.length -1];
const startElement = document.createElement('li');
const endElement = document.createElement('li');


endSlide.classList.forEach((e) => endElement.classList.add(e)); // 마지막의 전 슬라이드의 클래스를 새로 생성한 마지막 슬라이드의 클래스로 지정
endElement.innerHTML = endSlide.innerHTML;  // 전 슬라이드 안의 내용을 새로 만든 마지막 슬라이드 안에 넣기

startSlide.classList.forEach((e) => startElement.classList.add(e));
startElement.innerHTML = startSlide.innerHTML;


slideItems[0].before(endElement); // 첫번쨰 슬라이드 전 위치에 마지막슬라이드 넣기
slideItems[slideItems.length -1].after(startElement); // 마지막 슬라이드 뒤위치에 첫번쨰 슬라이드 넣기

slideItems = document.querySelectorAll('.slide_item'); // 복제해서 넣은 슬라이드들 까지 합쳐서 새로 변수 할당

let offset = wrapWidth * currSlide;
console.log(wrapWidth);
console.log(currSlide);

slideItems.forEach((i) => {
    i.setAttribute('style',`left : ${-offset}px`); // 모든 슬라이드에 left 스타일 넣기
});

function next() {
    currSlide++; // 슬라이드 이동할떄마다 증가
    if(currSlide < maxSlide) {
        const offset = wrapWidth * currSlide;
        console.log('next',offset);
        slideItems.forEach((i) => {
            i.setAttribute('style',`left: ${-offset}px`);
        })
    } else {
        currSlide = 0;
        let offset = wrapWidth + currSlide; // max에 도달하면 다시 0을 곱해서 
        
        slideItems.forEach((i) => {
            i.setAttribute('style',`transition : ${0}s; left : ${-offset}px`); // left 0 으로 처음으로 돌아기기
        });
        currSlide++; // 다시 첫슬라이드부터 start
        offset = wrapWidth * currSlide;
        setTimeout(() => {
            slideItems.forEach((i) => {
                i.setAttribute('style',`transition : ${0.15}s; left : ${-offset}px`);
            });
        }, 0);
    }
}
function prev () {
    currSlide--;
    if(currSlide > 0) {
        const offset = wrapWidth * currSlide;
        console.log('prev',offset);
        slideItems.forEach((i) => {
            i.setAttribute('style',`left: ${-offset}px`);
        })
    } else {
        currSlide = maxSlide + 1;
        let offset = wrapWidth + currSlide;
        slideItems.forEach((i) => {
            i.setAttribute('style',`transition : ${0}s; left : ${-offset}px`);
        });
        currSlide--;
        offset = wrapWidth * currSlide;
        setTimeout(() => {
            slideItems.forEach((i) => {
                i.setAttribute('style',`transition : ${0.15}s; left : ${-offset}px`);
            });
        }, 0);
    }
}

window.addEventListener('resize', () => {  // 반응형
    wrapWidth = slideWrap.clientWidth;
    console.log(wrapWidth);
});

let loopInterval = setInterval(() => {  // 무한반복
  next();
}, 2000);

slideWrap.addEventListener("mouseover", () => {
  console.log('over');
  clearInterval(loopInterval);
});

slideWrap.addEventListener("mouseout", () => {
  console.log('out');
  loopInterval = setInterval(() => {
    next();
  }, 2000);
});
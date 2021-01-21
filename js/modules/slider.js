function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  // Slider

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  const sliderItems = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    sliderCurrentId = document.querySelector(currentCounter),
    sliderTotalId = document.querySelector(totalCounter),
    sliderBtnPref = document.querySelector(prevArrow),
    sliderBtnNext = document.querySelector(nextArrow),
    slidesWrapper = document.querySelector(wrapper),
    sliderField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

  let sliderIndexItem = 1,
    offset = 0;

  sliderTotalId.textContent = getZero(sliderItems.length);
  sliderCurrentId.textContent = getZero(sliderIndexItem);

  sliderField.style.width = 100 * sliderItems.length + '%';
  sliderField.style.display = 'flex';
  sliderField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  sliderItems.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
    dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < sliderItems.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  sliderBtnNext.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (sliderItems.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    sliderField.style.transform = `translateX(-${offset}px)`;

    if (sliderIndexItem == sliderItems.length) {
      sliderIndexItem = 1;
    } else {
      sliderIndexItem++;
    }

    sliderCurrentId.textContent = getZero(sliderIndexItem);

    dots.forEach(dot => {
      dot.style.opacity = '0.5';
      dots[sliderIndexItem - 1].style.opacity = '1';
    });
  });

  sliderBtnPref.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (sliderItems.length - 1)
    } else {
      offset -= deleteNotDigits(width);
    }

    sliderField.style.transform = `translateX(-${offset}px)`;

    if (sliderIndexItem == 1) {
      sliderIndexItem = sliderItems.length;
    } else {
      sliderIndexItem--;
    }

    sliderCurrentId.textContent = getZero(sliderIndexItem);

    dots.forEach(dot => {
      dot.style.opacity = '0.5';
      dots[sliderIndexItem - 1].style.opacity = '1';
    });
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');
      sliderIndexItem = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);
      sliderField.style.transform = `translateX(-${offset}px)`;

      sliderCurrentId.textContent = getZero(sliderIndexItem);

      dots.forEach(dot => {
        dot.style.opacity = '0.5';
        dots[sliderIndexItem - 1].style.opacity = '1';
      });
    });
  });

}

export default slider;
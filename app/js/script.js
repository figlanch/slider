$(function() {
    const slider = document.querySelector('.slider');
    const sliderContainer = document.querySelector('.slider-container');
    const mobileItemsShowing = 3;
    const itemsShowing = 5;
    let itemList;
    let itemNum;
    let currentPosition;
    let currentItemWidth;
    let currentFirstItem = 0;

    $.ajax({
        dataType: 'json',
        url: './app/data/fakeData.json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        complete: function (response) {
            itemList = response.responseJSON.items;
            
            slider.classList.remove('hidden');
            document.querySelector('.loading-screen').classList.add('hidden');

            createCarousel();
        },
        error: function () {
            alert("error");
        }
    }); 

    function createCarousel(){
        itemList.forEach((item, index) => {
            let imgUrl = item.imgUrl || '';
            let name = item.name || '';
            let price = item.price.toFixed(2) || '';

            let itemHTML = 
                `<a href="#" class="item item-${ index }">
                    <img src="${ imgUrl }" />
                    <div class="product-info">
                        <h3>${ name }</h3>
                        <p class="price">$${ price }</p>
                    </div>
                </a>`;
            sliderContainer.innerHTML += itemHTML;        
        });

        itemNum = sliderContainer.childElementCount;
        let itemWidth = document.querySelector('.item').offsetWidth;
        
        sliderContainer.width = itemWidth * itemNum;
    }

    document.querySelector('.slide-left').addEventListener('click', slideLeft, false);
    document.querySelector('.slide-right').addEventListener('click', slideRight, false);

    function slideLeft() {
        let left;

        event.preventDefault();
        currentPosition = sliderContainer.offsetLeft;
        currentItemWidth = Number(document.querySelector('.item').getBoundingClientRect().width.toFixed(2));

        if (currentFirstItem === 0) {
            // we've hit the beginning of the list; go back to end

            if (window.matchMedia('screen and (max-width: 768px)').matches) {
                left = (currentItemWidth * itemNum) - (currentItemWidth * mobileItemsShowing);
                currentFirstItem = itemNum - mobileItemsShowing;
            } 
            else {
                left = (currentItemWidth * itemNum) - (currentItemWidth * itemsShowing);
                currentFirstItem = itemNum - itemsShowing;
            }

            sliderContainer.style.left = `-${left}px`;
        }
        else {
            // keep going left
            left = currentPosition + currentItemWidth;
            currentFirstItem--;
            sliderContainer.style.left = `${left}px`;
        }
    }

    function slideRight() {
        let left;

        event.preventDefault();
        currentPosition = sliderContainer.offsetLeft;
        currentItemWidth = Number(document.querySelector('.item').getBoundingClientRect().width.toFixed(2));

        if (window.matchMedia('screen and (max-width: 768px)').matches) {
            if (currentFirstItem === (itemNum-mobileItemsShowing)) {
                // we've hit the end of the list; go back to beginning
                currentFirstItem = 0;
                sliderContainer.style.left = 0;
            }
            else {
                // keep going right
                left = currentPosition - currentItemWidth;
                currentFirstItem++;
                sliderContainer.style.left = `${left}px`;
            }
        } 
        else {
            if (currentFirstItem === (itemNum-itemsShowing)) {
                // we've hit the end of the list; go back to beginning
                currentFirstItem = 0;
                sliderContainer.style.left = 0;
            }
            else {
                // keep going right
                left = currentPosition - currentItemWidth;
                currentFirstItem++;
                sliderContainer.style.left = `${left}px`;
            }
        }
    }
});
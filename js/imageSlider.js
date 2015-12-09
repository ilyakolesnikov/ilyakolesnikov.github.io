// id - айди кнопочки блока
function ImageSlider(id, header, content, imgSrcArray, link){
	var currentImageIndex = 0;
	var activeArrowColor = '#555';
	var deactiveArrowColor = '#ddd';	

	function checkArrows(){

		$('.leftArrow').removeClass('leftArrow-deactive');
		$('.rightArrow').removeClass('rightArrow-deactive');

		if (imgSrcArray.length == 1){
			$('.leftArrow').addClass('leftArrow-deactive');
			$('.rightArrow').addClass('rightArrow-deactive');
			return;
		}
		if (currentImageIndex == 0)
			$('.leftArrow').addClass('leftArrow-deactive');
		if (currentImageIndex == 1)			
			$('.leftArrow').removeClass('leftArrow-deactive');
		if (currentImageIndex == imgSrcArray.length - 2)
			$('.rightArrow').removeClass('rightArrow-deactive');
		if (currentImageIndex == imgSrcArray.length - 1)
			$('.rightArrow').addClass('rightArrow-deactive');			
		
	}
	
	function nextImage(){
		if (currentImageIndex < imgSrcArray.length - 1){
			currentImageIndex++;
			$('.modalWindow').children('.imageSlider').children('img')
				.attr('src', imgSrcArray[currentImageIndex]);
			checkArrows();
			
		}			
	}
	
	function prevImage(){
		if (currentImageIndex > 0){
			currentImageIndex--;
			$('.modalWindow').children('.imageSlider').children('img')
				.attr('src', imgSrcArray[currentImageIndex]);
			checkArrows();
		}
	}
	
	// Установка инфы в модаль
	function setModal(){		
		
		// Закрытие окна
		$('.modalWindow').children('span').click(function(){
			$('.modal').css('display', 'none');
		});	
		$('.modalWindow').children('.modalHeader').text(header);
		$('.modalWindow').children('.imageSlider').children('img')
			.attr('src', imgSrcArray[currentImageIndex]);
		$('.modalWindow').children('.modalContent').text(content);
		
		$('.leftArrow').unbind();
		$('.rightArrow').unbind();
		
		checkArrows();
		
		if (link != undefined){
			$('.appLink').css('display','block');
			$('.appLink').children('p').children('a').text(link);
			$('.appLink').children('p').children('a').attr('href',link);
		}
		
		$('.rightArrow').click(function(){			
			if (! $('.rightArrow').hasClass('rightArrow-deactive'))
				nextImage();		
		});
		$('.leftArrow').click(function(){			
			if (! $('.leftArrow').hasClass('leftArrow-deactive'))
				prevImage();		
		});
		
		/* Регулировка высоты imageSlider для вертикальных устройств */
		if ($(window).height() > $(window).width()){
			$('.imageSlider').css('height', '40%');
		}
		
	}	
	
	/* Конструктор */
	// установка пути для превьюхи
	$(id).children(".imgBlock").children().attr('src', imgSrcArray[0]);	
	// Установка текта для выезжающего спана
	$(id).children("span").text(header);
	
	
	// Показать модаль при нажатии на соответств.
	$(id).click(function(){		
		setModal();
		$('.modal').css('display', 'block');
	});	
	
	
}

$(document).ready(function(){
	var mD = new ImageSlider('#midiDrummer', 'midiDrummer',
		"Небольшая MIDI драм-машина. Позволяет воспроизводить паттерн " +
		"длинной в один такт заданное количество раз с заданным темпом.\n" + 
		"Разработано на C++ с использованием Qt 5 и WinAPI.",
		['./img/screen_midiDrummer.PNG']);

	var lFMA = new ImageSlider('#lastFmMusicAdviser', 'Last.Fm Music Adviser',
		"Веб-приложение, позволяющее находить случайного исполнителя в указанном стиле, " +
		"используя базы данных портала Last.fm. Разработано на JavaScript, HTML И CSS с " + 
		"использованием jQuery, Bootstrap 3 и Last.fm API.",
		['./img/screen_lastFmAdviser1.PNG', './img/screen_lastFmAdviser2.PNG'],
		"http://ilyakolesnikov.github.io/Last.fm-Music-Adviser/");

	var mD = new ImageSlider('#musShop', 'Музыкальный интернет-магазин',
		"Вымышленный интерет-магазин музыкальных инструментов. Учебный проект. " +
		"Реализована авторизация, динамическое обновление корзины, изменение каталога в " + 
		"режиме администратора. Разработан на PHP5, JavaScript, HTML и CSS с использованием " + 
		"jQuery и Bootstrap 3.",
		['./img/screen_musShop1.PNG', './img/screen_musShop2.PNG', './img/screen_musShop3.PNG', './img/screen_musShop4.PNG']);
		
});

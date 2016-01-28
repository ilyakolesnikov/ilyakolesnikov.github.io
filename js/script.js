// Смена активной ссылки на указанную
function setHrefActive(href){
	$('.navHref').removeClass('active');
	$(href).addClass('active');
}

// Проверка активности ссылки
function isHrefActive(href){
	return $(href).hasClass('active');
}

$(document).ready(function(){

	// Смена слайда (handler - обработчик скролла, который нужно блокировать)
	function changeSlide(target){
		var targetPos = $(target).offset().top;
		var duration = 400;
		$(window).unbind('scroll');
		$('html, body').animate({scrollTop: targetPos}, duration);
		setTimeout(function(){$(window).bind('scroll', scrollHandler);}, duration + 50);
	}

	var headerHeight = $('#navbar').height();
	var slideHeight;
	var slides = ['#bgAbout', '#bgProjects', '#bgContacts'];
	var navHrefs = ['#aboutHref', '#projectsHref', '#contactsHref'];	
	var colors = ['red', 'green', 'blue'];
	var slidesPos = [];
	
	function setSizes(){
		slideHeight = $(window).height() - headerHeight;
		/* -- Установка размеров окна и отступов чтобы все нор отображалось -- */
		$('.slide').css('min-height', slideHeight);
		$('#fullpage').css('margin-top', headerHeight);
		$('.anchor').css('margin-top', -headerHeight);
		$('.anchor').css('height', headerHeight);

		// Фикс для моб. браузеров - увеличенный последний слайд
		if ($(window).height() > $(window).width()) {
			$("#bgAbout").css('min-height', slideHeight + headerHeight);
		}

		/* -- Установка размера второго слайда, чтобы все нормально отображалось (размер окна + 100пксл на скроллы) -- */
		/*
		 if ($('#bgProjects').height() > slideHeight){
		 	var h1 = $('#bgProjects').height();
			//alert(h1);
		 	var h2 = slideHeight;		
		 	while (h2 <= h1)
		 		h2 += 100;
		 	h2 += 100;		
					
		 	$('#bgProjects').css('height', h2);
		 }*/

		/* -- Получение позиций слайдов -- */
		for (var i = 0; i < navHrefs.length; i++){
			var anc = $(navHrefs[i]).attr('href');
			slidesPos[i] = $(anc).offset().top;		
		}
	}
	setSizes();

	$( window ).resize(function(){
		setSizes();
	});
		
	// Обработчик надатия на ссылку	
	$('.navHref').click(function(){
		setHrefActive('#' + $(this).attr('id'));
		changeSlide($(this).attr('href'));
		//setTimeout(function(){$(window).bind('scroll', scrollHandler);}, 400);
		return false;
	});

	// Обработчик скролла
	var scrollHandler = function(){	
		var scrollTop = $(window).scrollTop();
		var scrollBottom = scrollTop + $(window).height();

		//$('#scrollTopIndicator').text(scrollTop);
		//$('#scrollBottomIndicator').text(scrollBottom);

		var curHrefNum; // Номер текущей ссылки
		for (var i = 0; i < navHrefs.length; i++)
			if (isHrefActive(navHrefs[i])) 
				curHrefNum = i;
		

		// Чтобы не трогать обычные переходы по ссылкам
		for (var i = slides.length - 1; i >= 0; i--)
			if (scrollTop == slidesPos[i] && i == curHrefNum){
				//$(window).one('scroll', scrollHandler);
				return;
			}
		
		//alert(scrollBottom);
		// переход с первого на второй слайд
		if (curHrefNum == 0 && scrollTop > slidesPos[0] && scrollTop < slidesPos[1]){			
			setHrefActive(navHrefs[1]);
			changeSlide($(navHrefs[1]).attr('href'));									
		}
		// Переход с второго на первый слайд
		else if (curHrefNum == 1 && scrollTop < slidesPos[1]){
			setHrefActive(navHrefs[0]);
			changeSlide($(navHrefs[0]).attr('href'));
		}
		// переход с второго на третий (+ 100 - чтобы скроллилось до конца слайда, и только с конца слайда был переход)
		else if (curHrefNum == 1 && scrollBottom >= (slidesPos[2] + 100)){
			setHrefActive(navHrefs[2]);
			changeSlide($(navHrefs[2]).attr('href'));
		}
		// переход с третьего на второй
		else if (curHrefNum == 2 && scrollTop < slidesPos[2]){
			setHrefActive(navHrefs[1]);
			changeSlide($(navHrefs[1]).attr('href'));
		}
		
	};
	$(window).bind('scroll', scrollHandler);

	// По умолчанию - первая страница
	setHrefActive(navHrefs[0]);
	changeSlide($(navHrefs[0]).attr('href'));	
	
});
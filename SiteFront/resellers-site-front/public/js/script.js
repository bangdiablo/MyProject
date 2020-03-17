//레이아웃 최소높이 설정
function initLayoutMinimalHeight() {
	var memberInfo = jQuery("section#member_info");
	var miHeight = 0;
	var winLoad = false;
	
	jQuery(window).on("load resize",function() {
		winHeight = jQuery(this).height();
		
		if(memberInfo.length == 1) {
			miHeight = memberInfo.outerHeight();
			
			if(miHeight >= winHeight) {
				memberInfo.css({
					"position": "relative",
					"top": "0px",
					"left": "0px",
					"margin": "0px auto",
					"transform": "translate(0,0)"
				})
			} else {
				memberInfo.removeAttr("style")
			}
		}
	})
}

//헤더 상단 유저 메뉴
function initUserMenu() {
	var header = jQuery("header#header");
	var userMenu = header.find("ul.user_menu");
	var btnMember = userMenu.find("a.btn_member");
	var memberSummary = userMenu.find(".member_summary");
	var btnAlim = userMenu.find("a.btn_alim");
	var alimMessage = userMenu.find(".alim_message");
	var container = jQuery("#container");
	
	btnMember.on("mouseenter",function() {
		memberSummary.show();
	})
	btnMember.parent().nextAll().on("mouseenter",function() {
		memberSummary.hide();
	})
	btnAlim.on("mouseenter",function() {
		alimMessage.show();
	})
	btnAlim.parent().prevAll().on("mouseenter",function() {
		alimMessage.hide();
	})
	
	header.find("h1").on("mouseenter",function() {
		memberSummary.hide();
		alimMessage.hide();
	})
	container.on("mouseenter",function() {
		memberSummary.hide();
		alimMessage.hide();
	})
}

//셀렉트박스 UI
function initSelectBox(selectBox) {
	var selectBox = selectBox;
	var boxTxt = selectBox.find("b.selected_txt");
	var boxSelect = selectBox.find("select");
	
	//셀렉트박스 자동 최소 넓이 설정
	selectBox.css({
		"minWidth": boxSelect.outerWidth()+"px"
	})
	
	//최초설정
	boxTxt.text(boxSelect.find("option:checked").text())
	
	//select에 포커스시...
	boxSelect.on("focus",function() {
		boxTxt.addClass("focus")
	})
	boxSelect.on("blur",function() {
		boxTxt.removeClass("focus")
	})
	
	//select에 value변경 시
	boxSelect.on("change",function() {
		boxTxt.text(boxSelect.find("option:checked").text())
	})
}

//FAQ
function initFAQ() {
	var faqList = jQuery("dl.faq");
	var fTit = faqList.find("dt");
	var fCont = faqList.find("dd");
	
	fTit.find("a").on("click",function() {
		if($(this).hasClass("active") == false) {
			fTit.find("a").removeClass("active");
			$(this).addClass("active");
			fCont.hide();
			$(this).parent().next("dd").show();
		} else {
			$(this).removeClass("active");
			$(this).parent().next("dd").hide();
		}
	})
}

//윈도우 팝업
function windowPopup(pUrl,pWidth,pHeight) {
	var popupX = (window.screen.width / 2) - (pWidth / 2);
	// 만들 팝업창 좌우 크기의 1/2 만큼 보정값으로 빼주었음

	var popupY= (window.screen.height /2) - (pHeight / 2);
	// 만들 팝업창 상하 크기의 1/2 만큼 보정값으로 빼주었음

	window.open(pUrl, '', 'status=no, height='+pHeight+', width='+pWidth+', left='+ popupX + ', top='+ popupY + ', screenX='+ popupX + ', screenY= '+ popupY + ', scrollbars=yes');
}


// 兼容的事件添加法
var EventUtil = {
	addHandler: function(element, type, handler) {
		if (!!element) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent('on' + type, handler);
			} else {
				element['on' + type] = handler;
			}

		}
		
	},
}

//==== 开始=== click nav-icon 出现导航菜单+菜单消失 
var navIcon = document.getElementById('nav-icon');
var navList = document.getElementById('nav-list');
// 通过点击navIcon控制navList
EventUtil.addHandler(navIcon, "click", function() {
	if (navList.style.display === "block") {
		navList.style.display = "none";
	} else {
		navList.style.display = "block";
	}
	
})
//  ==== 结束==== nav-icon 出现导航菜单+菜单消失

// ==== to-Top btn 的效果实现 ==== 开始
var toTopBtn = document.getElementById("to-Top");
// presentation, 滑动时出现箭头
EventUtil.addHandler(window, 'scroll', function() {
	scrolledTop = document.documentElement.scrollTop || document.body.scrollTop;
 	if (scrolledTop === 0) {
 		toTopBtn.style.display = 'none';
 	} else {
 		toTopBtn.style.display = 'block';
	}
})

// behavior: back to top
EventUtil.addHandler(toTopBtn, 'click', function() {
	if (document.documentElement.scrollTop) {
		document.documentElement.scrollTop = 0;
	} else {
		document.body.scrollTop = 0;
	}
})
// ==== to-Top btn 的效果实现==== 结束



// 实现在post页面宽度大于criticalWidth的时候，可以toggle off／on导航===== 开始
var toggleOn = document.getElementById("toggle-on-Toc");
var toggleOff = document.getElementById("toggle-off-Toc");
var tocColumn = document.getElementById("toc-column");
var mainContentColumn = document.getElementById("main-content-column");

if (mainContentColumn) {
	EventUtil.addHandler(toggleOn, 'click', function() {
		// toggleOn被点击后，（1）toc栏消失，（2）调整mainContent那一栏的宽度+居中
		// （3）toggleOff出现，toggleOn消失
		mainContentColumn.style.width = '80%';
		// 水平居中表示
		mainContentColumn.style.margin = 'auto';
		tocColumn.style.display = 'none';
		toggleOff.style.display = 'block';
		toggleOn.style.display = 'none';		
	})

	EventUtil.addHandler(toggleOff, 'click', function() {
			// 同上，反向操作
			mainContentColumn.style.marginLeft = '28%';
			mainContentColumn.style.width = '70%';
			tocColumn.style.display = 'block';
			toggleOff.style.display = 'none';
			toggleOn.style.display = 'block';
			
	})

}


// 实现在post页面宽度大于1000px的时候，可以toggle off／on导航===== 结束



// ===== TOC的目录随着内容滚动来高亮 + 定位变化===== 开始

var scrolledTop;
// 拿到toc目录下面的所有a，用toc-link来实现,IE8+ 支持
var tocLinks = document.querySelectorAll('.toc-link');
// 拿到正文中所有的标题
var headings = document.querySelectorAll('.headerlink');
// lastHeadingTop是用来获得最后一个标题的位置，以便给toc最后做定位
// tocMoveAlongPoint是用来确定toc不再fixed定位的临界点，提供相对smooth的效果
var lastHeadingsTop,
	tocMoveAlongPoint;
// 博文标题数目 <=2 则不显示toc栏，即使是页面宽度允许。
if (!headings || headings.length <=2 ) {
	if (mainContentColumn) {
		mainContentColumn.style.width = '80%';
		// 是水平居中表示
		mainContentColumn.style.margin = 'auto';
		tocColumn.style.display = 'none';
		toggleOff.style.display = 'none';
		toggleOn.style.display = 'none';
	}	
	
	
		
}else{
	// 正文中最后一个标题的offsetTop, 用来让高亮持续
	lastHeadingsTop = headings[headings.length-1].offsetTop;
	// toc再次和正文一起滚动的临界点
	tocMoveAlongPoint = lastHeadingsTop - 150;
	
}



// 监听scroll事件
EventUtil.addHandler(window, "scroll", function() {
	// 如果非post页面类型，或者正文里头没有标题，或者标题数目小于3, 不需要理会这个event
	if (!headings || headings.length <=2 ) {
		return false;
	}
 	scrolledTop = document.documentElement.scrollTop || document.body.scrollTop;
 	var pageWidth = window.innerWidth;
 	if (typeof pageWidth !== 'number') {
 		if (document.compatMode == "CSS1Compat") {
 			pageWidth = document.documentElement.clientWidth;
 		} else {
 			pageWidth = document.body.clientWidth;
 		}
 	}

 	// ==== 实现滚动完 banner 后，toc位置固定，直到最后一个标题距离视窗顶部150px，恢复toc 相对定位====开始
 	// 如果页面宽度不够，以下都不需要执行
 	if (pageWidth >= 768) {
 		if (scrolledTop <= 330) {
 			// 相对于#body-inner-wrapper而定位，和正文一起被滚动
 			tocColumn.style.position = 'absolute';
 			tocColumn.style.top = '480px';
 			
 		} else if (330 < scrolledTop && scrolledTop < tocMoveAlongPoint) {	
 			// toc 位置固定，不再滚动 
 			tocColumn.style.position = 'fixed';
 			tocColumn.style.top = '150px';
 			
 		} else if (scrolledTop >= tocMoveAlongPoint) {
 			// toc再次和正文一起滚动的临界点
 			tocColumn.style.position = 'absolute';
 			// 注意这里需要拼接成string
 			tocColumn.style.top = lastHeadingsTop + 'px';			
 		}

 	}

	if (pageWidth >= 768) {
		var i,
			j,
			currentHeadingHref;
		
		
		// 找到出现视窗里头的出现的第一个heading<a>的parent<hx>的的id值，或者直接用<a>的href值
		for (i=0; i<headings.length; i++) {
			// 剪掉45px是为了更好的用户体验效果。
			if (headings[i].offsetTop-45 >= scrolledTop) {
				currentHeadingHref = headings[i].href;
				break;
			} else {
				// 让最后一个toc标题的高亮不消失
				currentHeadingHref = headings[headings.length-1].href;
			}
		}
		// 找到该heading在toc里头对应的位置，用toc里头标题的href值
		for (j=0; j<tocLinks.length; j++) {
			var currTocLink = tocLinks[j];
			if (currTocLink.href == currentHeadingHref) {
				if (currTocLink.className.indexOf("active") === -1) {
					currTocLink.className += " active";
				} 
			} else {
				// 溢出非在视窗最前面，但是有被赋上过active的tocLink的active这个class值。
				if (currTocLink.className.indexOf("active") !== -1) {
					currTocLink.className = currTocLink.className.slice(0, currTocLink.className.length-7)
				}
			}

		}

	}
})
// ===== TOC的目录随着内容滚动来高亮 + 定位变化 ===== 结束


// ====== algolia search 只在on为true的时候触发 ===== 开始

if (algoliaConfig.on) {
	var algoliaWrapper = document.getElementById('algolia-wrapper');
	var search = instantsearch({
	  appId: algoliaConfig.applicationID,
	  apiKey: algoliaConfig.apiKey,
	  indexName:algoliaConfig.indexName,
	  searchParameters: {
	    hitsPerPage: 5,
	  },

	  searchFunction: function(helper) {
	  	var searchValue = document.querySelector('.ais-search-box--input');
	  	if (searchValue.value) {
	  		helper.search();
	  	}
	  }
	});

	search.addWidget(
		instantsearch.widgets.searchBox({
			container: '#algolia-searchBox',
			placeholder: 'Search for posts',
		})
	);

	search.addWidget(
		instantsearch.widgets.hits({
			container: '#algolia-hits',
			templates: {
				empty: 'Oops! No matched post found for your query.',
				item: '<a class="relatedTitles" href="'+ '{{permalink}}" target="_self"> {{{_highlightResult.title.value}}} </a>',
			},
			
		})
	);

	search.addWidget(
	  instantsearch.widgets.pagination({
	    container: '#algolia-pagination',
	    maxPages: 5,
	    // default is to scroll to 'body', here we disable this behavior
	    scrollTo: false
	  })
	);

	search.start();



	// 输入搜索信息的时候，algolia-hits出现
	var inputBtn = document.querySelector('.ais-search-box--input');
	// 用来控制当input.value为空时候，关闭搜索框
	var algoliaHitsWrapper = document.querySelector('#algolia-hits-wrapper');
	var algoliaHits = document.querySelector('#algolia-hits');
	var algoliaPagination = document.getElementById('algolia-pagination');
	var brief = document.getElementById('brief');

	// ==== search btn 的 behavior实现
	var searchBtn = document.getElementById('search-btn');
	var algoliaWrapper = document.getElementById('algolia-wrapper');

	EventUtil.addHandler(searchBtn, 'click', function() {
		algoliaWrapper.style.display = 'block';		
		searchBtn.style.display = 'none';
	});

	// input event的implement并不是全部覆盖了，基本用法是支持的，IE9+删除字符的时候是不会触发的
	EventUtil.addHandler(inputBtn, 'input', function() {
		// 如果输入值为空，让algolia-hits消失
		if (!inputBtn.value) {	
			algoliaHits.innerHTML = '';
			algoliaHitsWrapper.style.display = 'none';
		} else {
			algoliaHitsWrapper.style.display = 'block';
		}				
	});

	// 点击reset按钮，如果input有值，则algolia-hits的内容消失，否则algolia的全部消失。默认是会展示全部的records且reset会消失
	var resetBtn = document.querySelector('.ais-search-box--reset');

	EventUtil.addHandler(resetBtn, 'click', function() {
		if (!inputBtn.value) {
			algoliaWrapper.style.display = 'none';
			searchBtn.style.display = 'block';
		}
		algoliaHitsWrapper.style.display = 'none';
	});

} 
// ====== algolia search 只在on为true的时候触发 ===== 结束


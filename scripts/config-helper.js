hexo.on('generateBefore', function () {
  if (hexo.locals.get) {
    var data = hexo.locals.get('data')
    if (data && data.lemonlime ) {
    	hexo.theme.config = data.lemonlime;
    }
  }
})

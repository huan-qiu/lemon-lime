## Lemon-Lime


### Features

* Responsive Layout
* Configurable
  * Navigation menu
  * Algolia search
  * Word count & Estimated time of reading
  * View count for your site and each of your post
  * Social media contact (GitHub, Weibo, Facebook, Twitter)
  * Code highlight 
  * RSS
  * Favicon
* Table of Content — for  post with more than 3 headings, and can be toggled off
* I18n — support English, Simplified Chinese, Traditional Chinese



### Demo

Visit [here](http://rachelqiu.com) for the demo.



### Browser Support

* IE 9+
* Other modern browsers



### Installation

#### Install

Enter your Hexo project's folder, install plugins that needed for `lemon-lime`

```bash
npm install hexo-renderer-sass, hexo-renderer-jade --save
```

 **cd** into the `themes` folder, then

``` bash
$ git clone https://github.com/huan-qiu/lemon-lime.git
```



#### Enable

Modify the `theme ` setting in your Hexo project's `_config.yml` to `lemon-lime`

```yaml
theme: lemon-lime
```



#### Update

**cd** to the `lemon-lime` folder, then

```bash
git pull
```



### Configuration

```yaml
# the _config.yml of lemon-lime
# ==== Nav link====
nav:
  Home: /
  Archives: /archives
  Tags: /tags #extra work needed for this to work
  Catogories: /categories #extra work needed for this to work
# ==== site logo ====
favicon: '/compass/imgs/favicon.ico' #the default favicon, feel free to change


# ==== Table of Content ====
toc:
  list_number_on: false  #if this is set to 'true', headings of your posts should not have numerical ordered added manually. 

# ==== Copyright ====
copyright_on: true
copyright:
  liscense_type: CC BY-NC-SA 4.0
  liscense_link: http://creativecommons.org/licenses/by-nc-sa/4.0/

# ==== Footer Setting ====
inception: 2017 # feel free to change
hexo_link: http://hexo.io
email_address:
social_media:
  github:
    name: github
    address: https://github.com/yourUserName # replace this link with yours
    icon: fa-github
  weibo:
    name: weibo
    address: # add your link here, like the way you do with github's address or just ignore it
    icon: fa-weibo
  facebook:
    name: facebook
    address: # add your link here, like the way you do with github's address or just ignore it
    icon: fa-facebook
  twitter:
    name: twitter
    address: # add your link here, like the way you do with github's address or just ignore it
    icon: fa-twitter

# ==== Additional Setting ====
# View Count by busuanzi
busuanzi_on: true # set to false to disable the view count for your site and posts

# Algolia Search
algolia_on: false # set to true to enable seach within your site, note that extra work needed
algolia:
  applicationID:
  apiKey:
  indexName:
  chunkSize: 5000
  field:
    - title
    - path
    - excerpt:strip
    - excerpt
```



### License

[MIT License](https://cgm.mit-license.org/)

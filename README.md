# Photo-Carousel
This a photo-carousel that is written by JavaScript

#Demo GIF
![DemoGIF](https://raw.githubusercontent.com/xuzijie1995/Photo-Carousel/master/images/demo.gif)

#Functions
+ 1.Automatic rolling
+ 2.Supporting left and right dragging
+ 3.Click the navigation point switch
+ 4.Support click pictures to access the external address
+ 5.Encapsulation and easy to use
+ 6.Native JavaScript writing

#Create&Init
```js
<script src="js/photo-carousel.js"></script>
```
```css
<link rel="stylesheet" href="css/photo-carousel.css">
```
```html
<div style="width:1000px;height:600px" id="photo-carousel"></div>
```
```init
var imagess = [
	'images/one.png',
	'images/two.png',
	'images/three.png'
]
var data = [
	{
		url:'#'
	},
	{
		url:'www.baidu.com'
	},
	{
		url:'javascript:void(0)'
	}
]
var el = new PhotoCarousel({
	images : imagess, // * necessary
	data : data, // * necessary
	id : 'photo-carousel', // * necessary
	max : 10, // default 10 unnecessary
	sensibility : 1, // default 1 unnecessary
	interval: 5 // default 5 unnecessary
});
el.init();
```

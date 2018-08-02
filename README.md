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
		/* no address */
	},
	{
		url:'https://github.com/xuzijie1995/Photo-Carousel' 
		/*no 'https://' or 'http://', 'http://' will be added Automatically & u can change this in photo-carousel.js line 227*/
	},
	{
		url:'javascript:void(0)' 
		/* no address */
	}
]
var el = new PhotoCarousel({
	images : imagess, 		// * necessary
	data : data, 			// * necessary
	id : 'photo-carousel', 		// * necessary
	max : 10, 			//(0<max<100), default 10, unnecessary
	sensibility : 1,		//(sensibility when dragging), default 1, unnecessary, but I suggest sensibility=max/10
	interval: 5 			//(seconds), default 5, unnecessary
});
el.init();
```

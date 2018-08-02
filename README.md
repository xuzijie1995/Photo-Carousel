# Photo-Carousel
This a photo-carousel that is written by JavaScript

# Demo GIF
![DemoGIF](https://raw.githubusercontent.com/xuzijie1995/Photo-Carousel/master/images/demo.gif)

# Functions
+ 1.Scroll  automatically
+ 2.Supporting left and right dragging
+ 3.Click the navigation point to switch
+ 4.Support click pictures to access the external address
+ 5.Encapsulated and easy to use
+ 6.Native JavaScript writing

# Create&Init
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
		/*no 'https://' or 'http://', 'http://' will be added automatically 
		& u can change this in photo-carousel.js line 227*/
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
	max : 10, 			//default 10, unnecessary, the max (%) for next picture u can see when dragging, 0<max<100
	sensibility : 1,		//unnecessary, default 1, sensibility when dragging, but I suggest sensibility=max/10
	interval: 5 			//unnecessary, default 5(s), seconds for scroll automatically
});
el.init();
```
## Attention
+ 1.The PhotoCarousel will not Scroll automatically if there is only one picture.
+ 2.No testments for mobile yet, but I have done some adaptions to mobile, I need a volunteer. :P 
+ 3.I am practising my English.

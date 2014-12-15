<!doctype html>
<html>
<head>
	<meta charset="utf-8">

	<title>jQuery-History</title>

    <script src="js/jquery.min.js"></script>
    <script src="js/jquery-browser.js"></script>
	<script src="js/jquery-history.js"></script>

	<script>
	    $(document).ready(function (){
	        $.history.init(pageload);
		    $('a[href=' + window.location.hash + ']').addClass('selected');
		    $('a[rel=ajax]').click(function(){
			    var hash = this.href;
			        hash = hash.replace(/^.*#/, '');
	 		    $.history.load(hash);
	 		    $('a[rel=ajax]').removeClass('selected');
	 		    $(this).addClass('selected');
			    return false;
		    });
	    });
	
	    function pageload(hash) {
		    if (hash){
				getPage();
			} else {
				return 0;
			}
	    }
		
	    function getPage() {
		    var data = 'page=' + encodeURIComponent(document.location.hash);
		    $.ajax({
			    url: "loader.php",
			    type: "GET",
			    data: data,
			    cache: false,
			    success: function (html) {
				    $('#content').html(html);
				}
		    });
	    }
	</script>
</head>
<body>
    <nav>
		<ul>
			<li><a href="#page1" rel="ajax">Page 1</a></li>
			<li><a href="#page2" rel="ajax">Page 2</a></li>
			<li><a href="#page3" rel="ajax">Page 3</a></li>
			<li><a href="#page4" rel="ajax">Page 4</a></li>
		</ul>
    </nav>
    <div id="content"></div>
</body>
</html>
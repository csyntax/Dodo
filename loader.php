<?php
	if(isset($_GET["page"])){
		switch($_GET['page']) {
			case '#page1':
				$page = 'Page 1';
				break;
			case '#page2':
				$page = 'Page 2';
				break;
			case '#page3':
				$page = 'Page 3';
				break;
			case '#page4':
				$page = 'Page 4';
				break;
		}
		echo $page;
	}	
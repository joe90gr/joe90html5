<!DOCTYPE html>
<html>
	<head>
		<title>Test</title>
		<link rel="stylesheet" text="text/css" href="css/layout.css" />
		<script data-main="js/main" src="js/require.js"></script>
	</head>
	<body>
		<header>
			<div class="button-panel">
                <form id="new-tweet" action="#" method="post">
                    <label>Author</label><input id="author-name" name="author-name" type="text" />
                    <label>Status</label><input id="status-update" name="status-update" type="text" />
                    <button>post message</button>
                    <div class="error"></div>
                </form>
			</div>
		</header>
		<section>
		    <h1>Backbone Twitter example</h1>
            <button class="open-modal">Open modal</button>
		    <hr />
		    <ul id="tweets-container"></ul>
		    <br />
		    <!-- Templates -->
            <script type="text/template" id="tweet-template" >
                <span class="author" >Author: <%= author%></span>
                <span class="status" ><%= status%></span>
                <a href="#" class="edit">[Edit]</a>
                <a href="#" class="delete">[Delete]</a>
            </script>
		</section>
		<footer>
			Footer Container.
		</footer>
		<div class="modal-overlay"></div>
		<div class="modal-container">
		    <div class="box">
                <div class="title">
                    <span>Title</span>
                    <button class="close">X</button>
                </div>
                <div class="content">
                </div>
            <div>
		</div>
	</body>
</html>
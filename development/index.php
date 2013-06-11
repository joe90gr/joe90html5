<!DOCTYPE html>
<html>
	<head>
		<title>Test</title>
		<link rel="stylesheet" text="text/css" href="css/layout.css" />

		<script data-main="js/myscript" src="js/require.js"></script>
	</head>
	<body class="fire">
		<header>
			<div class="button-panel">
                <form id="new-tweet" action="#">
                    <label>Author</label><input id="author-name" name="author-name" type="text" />
                    <label>Status</label><input id="status-update" name="status-update" type="text" />
                    <button>post message</button>
                </form>
			</div>
		</header>
		<section>
		    <h1>Backbone Twitter example</h1>

		    <hr />
		    <div id="tweets-container"></div>
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
	</body>
</html>
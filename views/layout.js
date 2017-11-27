const hbs = require('handlebars');

const layout = hbs.compile(`<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Photopick</title>
            <style>
                html {
                    font-family: sans-serif;
                }
                body {
                    background-color: #eee;
                    margin: 0;
                }

                .clearfix:before,
                .clearfix:after {
                  content: " ";
                  display: table; 
                }
                .clearfix:after {
                  clear: both; 
                }
                .clearfix {
                  *zoom: 1; 
                }
                .container {
                    margin: 0 auto;
                    max-width: 1024px;
                }
                .subtle {
                    color: #999;
                }

                footer {
                  background-color: #eee;
                  border-top: 1px solid #ddd;
                  padding: 3em 0.5em;
                }
                header, header a {
                    /*background: linear-gradient(180deg, #666, #333);*/
                    background: linear-gradient(180deg, #665676, #433333);
                    color: white;
                    padding: 2em 0;
                }
                nav {
                    display: inline;
                }
                nav a {
                    margin: 0.75em 0.375em;
                }
                section.main {
                    background-color: #fff;
                    margin: 0;
                    padding: 3em 0.5em;
                }
                section.main h1 {
                  margin-top: 0;
                }
                
                .img-thumbnail {
                    float: left;
                    padding: 2em 0.5em 0
                }                
                img.thumbnail {
                    width: 260px;
                }
                .img-thumbnail .label {
                  font-size: 0.8125em;
                  max-width: 260px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                header .site-id {
                    font-weight: lighter;
                    font-size: 1.25rem;
                    margin-right: 2em;
                }
                .order-btn {
                    float: right;
                    margin-right: 0.5em;
                    white-space: nowrap;
                }
            </style>
        </head>
        <body>
            <header>
                <div class="container">
                    <span class="site-id">Fotograf Lutz Maier</span>
                    <nav>
                        <a href="/">Startseite</a> &middot;
                        <a href="/galleries">Gallerien</a> &middot;
                        <a href="/shopping-cart">Warenkorb</a>
                    </nav>
                </div>
            </header>
            
            <section class="main">
                <div class="container">
                    {{> (lookup . 'bodyPartial') }}
                </div>
            </section>
            
            <footer>
                <div class="container">
                    <span class="subtle">&copy; Copyright {{currentYear}}</span>
                </div>
            </footer>
        </body>
    </html>`);

module.exports = layout;
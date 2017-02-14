<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Trumbowyg by Alex-D</title>
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="../css/bootstrap.min.css">
        <link rel="stylesheet" href="../css/font-awesome/css/font-awesome.css">

        <link rel="stylesheet" href="../dist/ui/trumbowyg.css">
    </head>
    <body>
        <div id="main" role="main">
            <header>
                <h1>Default usage of Trumbowyg</h1>

                <p>
                    No plugin, no options. Just naked Trumbowyg.
                </p>
            </header>

            <div class="editor">
                <h2>This editor is the default build of Trumbowyg.</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, aliquam, minima fugiat placeat provident optio nam reiciendis eius beatae quibusdam!
                </p>
                <p>
                    The text is derived from Cicero's De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or alternatively [About] The Purposes of Good and Evil ). The original passage began: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: &quot;Neither is there anyone who loves grief itself since it is grief and thus wants to obtain it&quot;).
                </p>
            </div>
            <div class="editor">
                <h2>This editor is the default build of Trumbowyg.</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, aliquam, minima fugiat placeat provident optio nam reiciendis eius beatae quibusdam!
                </p>
                <p>
                    The text is derived from Cicero's De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or alternatively [About] The Purposes of Good and Evil ). The original passage began: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: &quot;Neither is there anyone who loves grief itself since it is grief and thus wants to obtain it&quot;).
                </p>
            </div>

            <h2>The code</h2>
            <code><pre>
$('.editor').trumbowyg();
            </pre></code>
        </div>

        <script src="../jquery/dist/jquery.min.js"></script>
        <script src="../dist/trumbowyg.js"></script>
        <script>
            /** Default editor configuration **/
            $('.editor').trumbowyg({
                
    autogrow: true
            });
        </script>
    </body>
</html>

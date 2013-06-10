<?php

/*
 * Config
 */
include '../config.php';
$bn = new Bluenod_App();

$connection = Bluenod_App::db_connect();
connection_from_cookie();

global $currentUser;
$currentUser = User::currentUserFromSession();

if( !isBluenodTeam() ) {
    echo 'Oops, permission denied!';
    exit;
}

$frontEnd = new Dv_FrontEnd();

include SCRIPTS_PATH.'app_config.php';

$serverSide = isset( $_GET['serverside'] );

?><!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
        
        <title>Min</title>
        
        <!-- JS -->
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>
        <style type="text/css" media="screen">
            body {
                background: #f7f7f7;
                color: #222;
                font-family: Helvetica, Arial, sans-serif;
            }
        </style>
        
    </head>
    <body>
        
        <h1>Minification JS</h1>
        
        <p><?php echo '['.date("Y-m-d H:i:s", time()).']'; ?></p>
        
        <p id="response"></p>
        
        <?php 
        /*
         * Server-side
         */
        if( $serverSide ): 

            $api_url = "http://closure-compiler.appspot.com/compile"; 

            $api_params = array(
                'code_url'              => app_root_url().'js/'.$frontEnd->js_dev_file,
                'compilation_level'     => 'SIMPLE_OPTIMIZATIONS',
                'js_code'               => '',
                'output_file_name'      => $frontEnd->js_prod_file.randomID_md5(),
                'output_format'         => 'json',
                'output_info'           => 'compiled_code',
                'output_info'           => 'warnings',
                'output_info'           => 'errors',
                'output_info'           => 'statistics',
                'warning_level'         => 'default',    
            );

            // use key 'http' even if you send the request to https://...
            $options = array( 
                'http' => array( 
                    'method'  => 'POST','content' => http_build_query( $api_params ) 
                )
            );
            $context    = stream_context_create( $options );
            $result     = file_get_contents( $api_url, false, $context );

            $json = json_decode( $result );

            //var_dump( $json);

            if( $json->serverErrors ) {

                echo 'Erreurs de Google Closure Compiler :</br/>';
                foreach( $json->serverErrors as $error ) {
                    echo '[' . $error->code . '] ' . $error->error;
                }

            // Sauvegarde du fichier sur notre serveur
            } else {

                $response = array( 'success' => false );

                $url_js = $json->outputFilePath ? 'http://closure-compiler.appspot.com'.$json->outputFilePath : false;

                if( $url_js ) {

                    $ext_js_file = file_get_contents($url_js);

                    // Ajout de la version du JS
                    $ext_js_file = str_replace( '{js_version}', $frontEnd->js_version, $ext_js_file );

                    // Suprimmer les appels à la fonction console.log()
                    // TODO : Voir si on ne peut pas automatiser la suppression en amont avec le Closure Compiler de Google
                    //$ext_js_file = preg_replace('#(console\.log((.*).);)#', '', $ext_js_file);


                    $newFileWritten = file_put_contents( JS_PATH.'app.min.js', $ext_js_file );

                    if( $newFileWritten ) {
                        $response['success'] = true;
                    }
                }    


                if( $response['success'] ) {

                    $sizeOrig    = round( $json->statistics->originalSize/1024 * 100 )/100;
                    $sizeComp    = round( $json->statistics->compressedSize/1024 * 100 )/100;
                    $saved       = round( ( $json->statistics->originalSize - $json->statistics->compressedSize ) /1024 * 100 )/100;
                    $compression = round( $saved / $sizeOrig * 100 );
                    $message     = 'Le fichier ' . $api_params['code_url'] . ' a été compressé de <b>' . 
                                       $sizeOrig . ' Ko</b> à <b>' . $sizeComp . '</b> Ko soit un gain de <b>' . $saved . ' Ko (100% => ' . (100-$compression) . '%)</b>.';
                    echo $message;

                } else {
                    echo 'Une erreur est survenue.';
                }
            }        

        
        /*
         * Client-side
         */
        else: ?>
        
        <script type="text/javascript">
            $(document).ready(function() {

                var Ktw_app_js = '<?php echo app_root_url().'js/'.$frontEnd->js_dev_file; ?>',
                    _response = $('#response');
                _response.html('Compression...');
                
                // Compression du JS par le Google Closure Compiler
                $.post( "http://closure-compiler.appspot.com/compile", 
                        { 
                            'code_url'              : Ktw_app_js,
                            'compilation_level'     : 'SIMPLE_OPTIMIZATIONS',
                            'js_code'               : '',
                            'output_file_name'      : '<?php echo $frontEnd->js_prod_file.randomID_md5(); ?>',
                            'output_format'         : 'json',
                            'output_info'           : 'compiled_code',
                            'output_info'           : 'warnings',
                            'output_info'           : 'errors',
                            'output_info'           : 'statistics',
                            'warning_level'         : 'default'
                        },
                        function(data){
                            console.log(data);
                            if( data.serverErrors ) {
                                
                                _response.html('Erreurs de Google Closure Compiler :</br/>');
                                for( var i in data.serverErrors ) {
                                    _response.append( '[' + data.serverErrors[i].code + '] ' + data.serverErrors[i].error );
                                }
                                
                            // Sauvegarde du fichier sur notre serveur
                            } else {
                                $.getJSON(
                                    "../ajax/", 
                                    { action: 'save-compressed-js', file: data.outputFilePath }, 
                                    function(res) {
                                        
                                        console.log(res);
                                        
                                        var _title;
                                        
                                        if( res.success ) {
                                            var sizeOrig    = Math.round( data.statistics.originalSize/1024 * 100 )/100,
                                                sizeComp    = Math.round( data.statistics.compressedSize/1024 * 100 )/100,
                                                saved       = Math.round( ( data.statistics.originalSize - data.statistics.compressedSize ) /1024 * 100 )/100,
                                                compression = Math.round( saved / sizeOrig * 100 ),
                                                message     = 'Le fichier ' + Ktw_app_js + ' a été compressé de <b>' + 
                                                            sizeOrig + ' Ko</b> à <b>' + sizeComp + '</b> Ko soit un gain de <b>' + saved + ' Ko (100% => ' + (100-compression) + '%)</b>.';
                                            _response.html( message );
                                            _title = 'Ok';

                                        } else {
                                            _response.html( res.error || 'Une erreur est survenue :(' );
                                            _title = 'Error';
                                        }
                                        
                                        var _interval   = 200, // (ms)
                                            _altTitle   = '...',
                                            _chrono     = 0,
                                            _timer      = setInterval( function() {

                                                document.title = ( document.title == _altTitle ) ? _title : _altTitle;

                                                _chrono += _interval;
                                                
                                                if( _chrono > 2000 ) {
                                                    clearInterval( _timer );
                                                    document.title = _title;
                                                }

                                            }, _interval );

                                    }
                                );
                            }
                        }, 
                        "json");                


            });
        </script>
        <?php endif; ?>
    </body>
</html>
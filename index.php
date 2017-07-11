<html>
    <head>
        <title>Location de studio &agrave; Greoux les bains</title>
        <meta content="text/html; charset=UTF-8" http-equiv="content-type">  
        <link href="styles.css" rel="stylesheet" type="text/css"/>
    </head>

    <body>

        <?php
        $month = date("n");
        $year = date("Y");
        require_once 'dbPassword.php';
        ?>

    <center>
        <table id="TitleTable">
            <tbody>
                <tr>
                    <td class="img"><img src="ind_sight_of_greoux.jpg" style="width: 105%;"></td>
                    <td class="txt">Location de Studio <br/> &agrave; Gr&eacute;oux Les Bains</td>
                </tr>
            </tbody>
        </table>

        <object type="application/x-shockwave-flash" data="dewplayer.swf?mp3=Provence.mp3&amp;autostart=1&amp;autoreplay=1" width="200" height="20">
            <param name="movie" value="dewplayer.swf?mp3=Provence.mp3&amp;autostart=1&amp;autoreplay=1" />
        </object>

        <br/><br/>
        <img src="ind_paca.png" style="width: 40%;"/>
        <br/><br/>

        <table id="wePropose">
            <tbody>
                <TR>
                    <TD class="txtpropose"><h1>
                            Vous cherchez un studio en location<br/> de particulier &agrave; particulier ?<br/><br/>
                            Nous vous proposons un studio tout confort<br/>
                            &agrave; 10 minutes &agrave; pied des thermes <br/>
                            &agrave; Gr&eacute;oux les Bains (Alpes de Haute Provence).</h1>
                    </TD>
                    <TD class="img">
                        <img src="ind_verdon.jpg" style="width: 105%;">
                    </TD>
                </TR>
            </tbody>
        </table>

        <br/><br/>

        <table id="usefulLinks" style="width:60%;">
            <tbody>
                <tr class="intern" style="font-size:20px;"><TD>
                        <a href="countryside.php">Gr&eacute;oux les Bains et alentours</a> <br/>
                        <a href="visit.php">Visite du Studio</a> <br/>
                        <?php echo "<a href=\"fares.php?month=$month&year=$year\">Tarifs pour l'ann&eacute;e $year et disponibilit&eacute;s</a> <br/>"; ?>
                        <a href="contact.php">Contact</a>
                    </TD></tr>
                <tr class="extras"><TD>
                        Liens utiles :<br/> 
                        <a href="http://www.greoux-les-bains.com">Office du tourisme de Gr&eacute;oux les Bains</a> <br/>
                        <a href="http://www.chainethermale.fr/cures/stations-thermales/greoux-les-bains.html">Centre de cure thermale de Greoux.</a>
                    </TD></tr>
            </tbody>
        </table>
    </center>

    <div style="text-align:left;">
        <table>
            <!-- Ici les publicites sont insérees en PHP a partir d'une base de donnees et pas directement dans le code. -->
            <?php
            $dbconn = pg_connect("host=localhost dbname=greouxlocation user=greouxlocation password="+$dbPassword)
                    or die('Connexion impossible : ' . pg_last_error());
            $query = "SELECT * FROM advertisements WHERE shown = 'true'";
            $result = pg_query($query) or die('Échec requête : ' . pg_last_error());

            while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
                echo "<TR><TD>";
                echo "$line[link]";
                echo "</TD></TR>";
            }

            pg_free_result($result);
            pg_close($dbconn);
            ?> 
        </table>
    </div>

    <div style="text-align:right;">
        Webmestre: <a href="http://englishblazere.free.fr">Gr&eacute;gory Anne.</a>
    </div>
</body>
</html>



/**
 * @preserve © 2013 Bluenod - All rights reserved.
 * @version {js_version}
 */
var Blu = {
    
    app : {
        urls : {
            main            : '',
            alt             : [],
            preview         : '',
            ajax_base       : 'ajax/',
            graphs_base     : 'data/json/'
        }
    },
    
    config : {
        
        tweets : {
            getNew          : true,
            load            : true,
            loadLimit       : 400, // anciemment 600. @todo gérer le fait que d'anciens graphes ont été calculés sur 500 tweets ?
            loadAllPrevious : false,
            grabClientSide  : false,
            max_pages       : 5,
            prettyDate      : true
        },
        
        users : {
            connectVisitor  : true,
            profilePopUp    : false
        },
        
        map : {
            nodeLabel       : 'id', // 'name'
            showLabels      : false, // affichage des noms des noeuds
            usercards : {
                show        : false,
                showHover   : false,
                distance    : 1
            },
            showFollowing   : true,
            style : {
                nodes : {
                    font_family : 'Helvetica, Arial, sans-serif',
                    gradient    : true,
                    gradRadius  : 0.7,
                    monochrome  : true
                }
            },
            zoomAnimation   : true
        },
        mapOnly             : false,
        
        timeline : {
            style : {
                cursorBegin     : true,
                plotType        : 'lines', // 'bars'
                plotWave        : true,
                plotStep : {
                    x           : 4 // 1 // Pas en abscisse en pixels
                },
                bgNotSelected   : "rgba(255,255,255,0.6)", // V1 : rgba(120,120,120,0.1) // V2 : "rgba(255,255,255,0.8)"; 
                lineColor       : "rgba(26,186,255,1)", // V1 : "rgba(0,0,255,1)"
                waveColor       : "rgba(26,186,255,0.5)"
            }
        },
        
        timemachine : {
            activated       : true
        },
        
        others : {
            embedly : {
                activated : true
            }
        },
        style : {
            scrollbar : {
                cursorcolor     : "#666",
                cursorborder    : "0"
            }
        },
        
        UI : {
            animatePanels : false
        }
    },

    images : {
        default_user    : '/style/mapping/img/Default_Twitter_Avatar_128px.png',
        default_search  : '/style/mapping/img/Default_Twitter_Avatar_Hashtag_128px.png'
    },    
    
    // Drapeaux / booléens liés à différents états et besoins de l'appli
    is                      : {}, 
    has                     : {},
    needs                   : {},
    
    projects : {
        current : {
            id              : 0,
            dates : {
                min         : '',
                max         : '',
                timeOffset  : 0
            }
        },
        list                : []
    },
    
    user : {},
    
    dates : {
        min                 : '',
        max                 : ''
    },
    rayonLoupe              : 200,
    gammaLoupe              : 0.5,
    zoneGraphe : {
        largeur             : 0,
        hauteur             : 0
    },
    oldZoneGraphe           : {},
    viz                     : {
        current             : '',
        by_default          : 'map'
    },
    canvas                  : {},
    canvas_mini : {
        timeline            : {},
        map                 : {}
    },
    canvas_timemachine      : {},
    timeline : {
        activated           : false, // (grande timeline)
        params : {
            zoomLevel       : 0,
            centreY         : 0,
            granularite     : 'auto',
            trancheCourante : -1,
            trancheHover    : -1,
            
            filter : {
                string      : '',
                dates : {
                    min     : null,
                    max     : null
                }
            }
        },
        oldParams           : {},
        minZoom             : -1,
        maxZoom             : 6,
        width               : 600,
        mini : {
            width           : 358,  // 245, 175
            height          : 30    // 50, 70, 50
        },
        maxTweets           : 0,
        cursors : {
            timetravel : {}
        }
    },
    map : {
        defaults : {},
        params : {
            zoomLevel       : -1,
            centreX         : 410, // 400
            centreY         : 410, // 350
            hoverNode       : -1, // noeud affiché au survol
            selectedNode    : -1, // noeud sélectionné (clic)
            showEdges    : false,
            loupeActive     : false
        },
        oldParams           : {},
        minZoom             : -3,
        maxZoom             : 10,
        mini : {
            width           : 150,
            height          : 125
        },
        width               : 800,
        height              : 700,
        echelleMiniature    : 0.25
    },
    graphs : {
        current     : '',
        all         : []
    },
    timemachine : {
        dragOn              : false,
        colors : {
            timeTravel      : '#008fcd', // '#ff640f', // rgba(220,0,0, 1)
            currentTime     : '#dc0000',  // rgb(220,0,0) #DC0000
            graph           : '#aaa',
            graphHover      : '#ff640f'
        }
    },
    timeNav : {
        mode : 'live'
    },
    datasets : [],
    currentDataset          : 'global', // 0
    currentSubset           : '',
    
    mouse : {
        pos                 : null,
        scroll              : 0,
        dragPx : {
            x               : 0,
            y               : 0
        }
    },
    touch : {
        scale : 0
    },
    
    positionListeTweets : 0,
    
    
    topWords : [],
    topUsers : [],
    
    timers : {
        showUserCard : 0
    },
    
    AC : {
        lastEntry : '',
        position : 0
    },
    
    debugMode : false,
    
    chrono : {},
    
    share : {
        html            : ''
    },
    
    timestamps          : [],
    tranches            : [],
    
    tweets              : [],
    newTweets           : [],
    
    intervals           : [],
    
    counts : {
        tweets : {
            alltime     : 0,
            filter      : 0
        },
        users : {
            alltime     : 0,
            graph       : 0,
            filter      : 0
        }
    },    
    
    history             : [],
    
    usercards : {
        // Survol
        hover : {
            'node'      : -1,
            'position'  : {
                'align'    : '',
                'fromNode' : 0,
                'x'        : 0,
                'y'        : 0
            },
            'state'     : {
                'closed'       : false,
                'expanded'     : true,
                'locked'       : false,
                'mouseChanged' : false,
                'mouseOver'    : false,
                'show'         : false
            }
        },  
        // Sélection
        selected : {
            'node'      : -1,
            'position'  : {
                'align' : '',
                'x'     : 0,
                'y'     : 0
            },
            'state'     : {
                'closed'       : false,
                'expanded'     : true,
                'locked'       : false,
                'mouseChanged' : false,
                'mouseOver'    : false,
                'show'         : false
            }
        }
    },
    
    users               : [],
    
    templates : {},

    /*
     * Fonctions
     */
    fn : {
        app             : {},
        canvas          : {},
        map             : {},
        timeline        : {},
        timemachine     : {},
        timestamps      : {},
        project         : {},
        projects        : {},
        tweet           : {},
        tweets          : {},
        tags            : {},
        words           : {},
        user            : {},
        users           : {},
        usercards       : {},
        tranches        : {},
        AC              : {},
        url             : {},   
        misc            : {},
        color           : {},
        UI              : {},
        history         : {},
        timers          : {}
    },
    
    lang : 'en'
    
}; // Fin de l'objet Blu


/**
 * Retourne une chaîne de caractère localisée remplie d'éventuelles variables : {0}, {1}, etc.
 */
Blu.txt = function() {

    if( !arguments[0] || !Blu.localizedStrings[ arguments[0] ] ) {
        return '';
    }

    var num     = arguments.length,
        oStr    = Blu.localizedStrings[ arguments[0] ][ Blu.lang ],
        pattern,
        re;

    for( var i = 1; i < num; i++ ) {
        pattern = "\\{" + (i-1) + "\\}";
        re      = new RegExp( pattern, "g" );
        oStr    = oStr.replace( re, arguments[i] );
    }

    return oStr;
};


/**
 * Fondu entre 2 couleurs RVB (?)
 */
Blu.fn.color.fondu = function( rgb1, rgb2 ) {
    
    var _t1 = rgb1.split(/[(),]/),
        _t2 = rgb2.split(/[(),]/),
        _t3 = [];
        
    for( var i = 1 ; i < Math.min( _t1.length - 1 , _t2.length - 1 ) ; i++ ) {
        var _n = ( parseFloat( _t1[i]) + parseFloat( _t2[i] ) ) / 2;
        if( i < 4 ) {
            _n = Math.floor( _n );
        }
        _t3.push( _n );
    }
    return ( ( _t3.length == 4 ) ? "rgba" : "rgb" ) + "(" + _t3.join(",") + ")";
};

/**
 * Transforme une teinte en RVB
 */
Blu.fn.color.hue2rgb = function(p, q, t){
    if(t < 0) t += 1;
    if(t > 1) t -= 1;
    if(t < 1/6) return p + (q - p) * 6 * t;
    if(t < 1/2) return q;
    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
};

/**
 * Transforme une couleur HSL (Teinte, saturation, luminosité) en RVB, 
 * (ou en RVB + opacité (RGBA) si le paramètre o est passé)
 * @link http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
 */
Blu.fn.color.hslToRgb = function(h, s, l, o) {
    
    var r, g, b;
    if(s == 0){
        r = g = b = l; // achromatic
    } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = Math.round( 255 * Blu.fn.color.hue2rgb(p, q, h + 1/3) );
        g = Math.round( 255 * Blu.fn.color.hue2rgb(p, q, h) );
        b = Math.round( 255 * Blu.fn.color.hue2rgb(p, q, h - 1/3) );
    }
    // la version originale renvoyait la valeur au format hexadécimal, je me contente du format rgb()
    return {r : r, g : g, b : b, string : o ? "rgba(" + r + "," + g + "," + b + "," + o + ")" : "rgb(" + r + "," + g + "," + b + ")"};

};

/**
 * Transforme une date au format "JJ mois" (ex: 18 juin)
 * @param date Date
 * @param abbrev boolean
 */
Blu.fn.misc.texteJour = function( date, abbrev ) {
    var _abbrev = ( typeof abbrev !== 'undefined' ) ? abbrev : false,
        _array  = _abbrev ? 'months_abbrev' : 'months',
        _month  = Blu.localizedStrings[ _array ][ Blu.lang ][ date.getMonth() ];
    return Blu.txt( 'date_format', date.getDate(), _month );
}

/**
 * Renvoie le nom du mois d'une date en abrégé ou non
 */
Blu.fn.misc.monthName = function( _date, abbrev ) {
    var _abbrev = ( typeof(abbrev) !== 'undefined' ) ? abbrev : false,
        _array  = _abbrev ? 'months_abbrev' : 'months',
        _month  = Blu.txt( _array )[ _date.getMonth() ];
    return _month;
};

/**
 * Transforme une date au format Heure:Minutes (ex: 00:12)
 */
Blu.fn.misc.texteHeure = function( _date ) {
    var _h = _date.getHours() + '';
    var _m = _date.getMinutes() + '';
    return ( _h.length == 1 ? '0' : '' ) + _h + ':' + ( _m.length == 1 ? '0' : '' ) + _m ;
};


/**
 * Chargement des timestamps pour calculer les tranches de la timeline
 */
Blu.fn.timestamps.getAll = function() {
    
    Blu.info('Blu.fn.timestamps.getAll...');

    // Paramètres de recherche
    var _p = Blu.fn.project.ajaxParams();
    _p['action'] = 'list-timestamps';

    // Requête
    $.getJSON( Blu.app.urls.ajax_base, _p, function(data) {

        if( data.timestamps ) {
            
            Blu.has.loadedTimestamps = true;

            // Timestamps : done :)
            Blu.timestamps = data.timestamps;                

            // Calcul des tranches
            Blu.fn.timestamps.calcSlices();
            Blu.fn.tranches.updateCounts();
            
        }

    });
};

/**
 * Calcul des tranches horaires sur lesquelles se répartissent les tweets
 * Remarque : ne calcule pas le nombre de tweets par tranche car il dépend du filtrage
 */ 
Blu.fn.timestamps.calcSlices = function() {
    
    Blu.info('Blu.fn.timestamps.calcSlices()');
    
    // Pas de timestamps ? Bye bye...
    if( !Blu.has.loadedTimestamps || !Blu.timestamps.length ) {
        Blu.warn('Pas de timestamps…');
        return;
    }
    
    // Timestamps classés par ordre chronologique
    Blu.timestamps.sort( function( a, b ) { return a.time - b.time; } );
    
    var _firstTime  = Blu.timestamps[0].time,
        _lastTime   = Blu.timestamps[ Blu.timestamps.length - 1 ].time;
        
    Blu.warn('Nb de timestamps : '+ Blu.timestamps.length );
    //Blu.warn('firstTime = ' + _firstTime );
    //Blu.warn('lastTime = ' + _lastTime );
    
    // Timestamp du centre de la timeline (était dans tweets.load() avant)
    if( !Blu.timeline.params.centreX ) {
        // Pour FENS, il avait été demandé de définir un paramètre centre correspondant à l'heure 
        // qui doit s'afficher au centre de l'écran. Par défaut, celle-ci correspond à la moyenne 
        // entre le tweet le plus ancien et le plus récent
        Blu.timeline.params.centreX = ( _firstTime + _lastTime ) / 2;
    }
    
    // Granularité automatique
    var _granul = Blu.timeline.params.granularite;
    if( _granul === 'auto' ) {
        
        var _tranche_widths = { 
                'bars'  : 3, 
                'lines' : Blu.config.timeline.style.plotStep.x
            },
            _tranche_width_px = _tranche_widths[ Blu.config.timeline.style.plotType ]; // Largeur en pixels d'une tranche
        
        _granul = Math.floor( ( _lastTime - _firstTime ) * _tranche_width_px / Blu.timeline.mini.width );
        _granul = Math.max( _granul, 1 ); // granularité minimale : 1 seconde @todo passer en millisecondes pour pouvoir générer une timeline plus précise pour les recherches à fort volume
        Blu.timeline.params.granularite = _granul;
        Blu.log( 'Granularité Timeline : ' + _granul + ' secondes');
    }
    
    
    // Début de la première tranche horaire (arrondi inférieur de la date du tweet le + vieux)
    var _minTranche = _granul * ( Math.floor( _firstTime / _granul ) );

    // Fin de la dernière tranche horaire (arrondi supérieur de la date du tweet le + récent)
    var _maxTranche = _granul * ( Math.floor( _lastTime / _granul ) );
    
    /*Blu.log( _minTranche );
    Blu.log( _maxTranche );*/

    // Création d'un tableau qui contiendra les tranches
    Blu.tranches = [];

    /*
     * Création des tranches "vides" (sans nombre)
     */
    for( var _timeStart = _minTranche; _timeStart <= _maxTranche; _timeStart += _granul ) {
        
        var _timeEnd        = _timeStart + _granul,
            _dateStart      = new Date( _timeStart * 1000 ),
            _dateEnd        = new Date( _timeEnd * 1000 ),
            _jourTranche    = Blu.fn.misc.texteJour( _dateStart ),
            _txtDeb         = Blu.fn.misc.texteHeure( _dateStart ),
            _txtFin         = Blu.fn.misc.texteHeure( _dateEnd );
        
        // On crée un "objet tranche" qui contient les timestamps de début/fin + les strings
        Blu.tranches.push({
            dateStart       : _dateStart,
            dateEnd         : _dateEnd,
            debut           : _timeStart,
            fin             : _timeEnd,
            jour            : _jourTranche,
            jour            : _jourTranche,
            debut_heure     : _txtDeb,
            fin_heure       : _txtFin
        });
    }

    /*
     * Calcul des tranches à partir des timestamps
     */
    var _indiceTranche = 0;
    for( var i = 0; i <= Blu.timestamps.length - 1; i++ ) {
        
        // A quelle tranche appartient le tweet ?
        while( Blu.timestamps[i].time > Blu.tranches[ _indiceTranche ].fin ) {
            _indiceTranche++;
        }
        
        // Sauvegarde de l'indice de la tranche dans le tweet (V1)
        //Blu.tweets[i].tranche = _indiceTranche;
        
        // Sauvegarde de l'indice de la tranche dans le tweet (V2)
        Blu.timestamps[i].tranche = _indiceTranche;
    }

    // Jours
    Blu.fn.tranches.jours();
    
}; // Fin de Blu.fn.timestamps.calcSlices();

/**
 * Calcul des jours de la timeline
 */
Blu.fn.tranches.jours = function() {

    // Jours de la timeline
    Blu.jours = [{
        nom     : Blu.tranches[0].jour,
        debut   : Blu.tranches[0].debut
    }];

    // Calcul des différents jours à partir des tranches
    for( var i in Blu.tranches ) {
        
        if( Blu.tranches[i].jour != Blu.jours[ Blu.jours.length - 1 ].nom ) {
            
            Blu.jours[ Blu.jours.length - 1 ].fin = Blu.tranches[i].debut;
            
            Blu.jours.push({
                nom     : Blu.tranches[i].jour,
                debut   : Blu.tranches[i].debut
            });
        }
    }
    Blu.jours[ Blu.jours.length - 1 ].fin = Blu.tranches[ Blu.tranches.length - 1 ].fin;
    
};


/**
 * Met à jour le nombre de tweets de chaque tranche
 */
Blu.fn.tranches.updateCounts = function() {
    
    Blu.info('Blu.fn.tranches.updateCounts...');
    
    if( Blu.tranches.length < 1 ) {
        Blu.warn('Pas de tranches.');
        return;
    }
    
    // Réinitialisation du nombre de tweets par tranche
    for( var i in Blu.tranches ) {
        Blu.tranches[i].nombre = 0;
    }
    
    // Calcul du nombre de tweets par tranche en parcourant tous les timestamps
    for( i in Blu.timestamps ) {
        Blu.tranches[ Blu.timestamps[i].tranche ].nombre++; 
    }
    
    // Calcul du nombre maximal de tweets par tranche
    Blu.timeline.maxTweets = 0;
    for( i in Blu.tranches ) {
        Blu.timeline.maxTweets = Math.max( Blu.tranches[i].nombre, Blu.timeline.maxTweets );
    }
    
};


/**
 * Chargement des top words et users calculés côté serveur
 */
Blu.fn.topWordsUsers = function() {

    if( Blu.config.mapOnly ) {
        return;
    }
    
    // Paramètres de recherche
    var _p = Blu.fn.project.ajaxParams();
    _p['action'] = 'top-words-users';

    $.getJSON( Blu.app.urls.ajax_base, _p, function(data) {
        Blu.wordsBase = data.top_words;
        Blu.usersBase = data.top_users;
    });

};

    
/**
 * Calcule la liste des mots les plus fréquents
 * @return top_words
 */
/*Blu.fn.words.topWords = function() {
    
    // Cette expression régulière permet de séparer les mots de 3 lettres ou plus
    var _regex = /[^ \[\]\(\)\.\/\-\"\'_:=;!,&?]{3,}/gi;
    
    Blu.topWords = [];

    // Parcours des tweets
    for( var i in Blu.tweets ) {
        
        // S'il y a un filtrage, on ne tient compte que des tweets actifs
        if( Blu.tweets[i].matchFilter ) {
            
            // On extrait les mots de chaque tweet
            var _liste = Blu.tweets[i].text.match( _regex );
            
            // Pour chaque mot du tweet, on met à jour sa fréquence
            for( var j in _liste ) {
                Blu.fn.words.freqWord( _liste[j] );
            }
        }
    }
    
    // On trie les mots par fréquence décroissante
    Blu.topWords.sort( function( a, b ) {
        return b.nombre - a.nombre;
    });
    
    // On ne garde que les 400 mots les plus fréquents
    Blu.topWords = Blu.topWords.slice(0, 400);
    
    // On efface le timer mis en place pour éviter des rafraîchissements trop fréquents
    clearTimeout( Blu.timers.updateTagCloud );
    
    return Blu.topWords;
	
};  // Fin de Blu.fn.words.topWords(), qui renvoit une liste de mots
*/

/**
 * Remplissage des users qui ont tweeté
 * @param {Array} tweets
 */
Blu.fn.users.fillAll = function( tweets ) {

    Blu.warn("Blu.fn.users.fillAll");

    for( var i in tweets ) {

        var _screen_name = tweets[i].from_user.toLowerCase();

        // Utilisateur déjà dans Blu.users avec un avatar défini
        if( Blu.users[ _screen_name ] && Blu.users[ _screen_name ].data.profile_image_url !== Blu.images.default_user ) {
            continue;
        }

        Blu.users[ _screen_name ] = {
            'data' : {
                'screen_name'       : _screen_name, // twitteur uniquement
                'profile_image_url' : tweets[i].profile_image_url
            }
        };

    }

    //Blu.log( Blu.users );

};  // fin de Blu.fn.users.fillAll

/**
 * Ajoute un utilisateur à l'historique
 */
Blu.fn.history.add = function( screen_name ) {
    Blu.history.push( screen_name );
};

/**
 * Vide l'historique
 */
Blu.fn.history.clear = function() {
    Blu.history = [];
};


/**
 * Ajout d'un utilisateur avec les données Twitter
 */
Blu.fn.users.add = function( user_data ) {

    if( !user_data.screen_name ) {
        return;
    }
    
    var _screen_name = user_data.screen_name.toLowerCase();

    Blu.users[ _screen_name ] = {
        'data'  : user_data
    };
    
    /*if( user_data.id_str ) {
        Blu.users[ 'id:' + user_data.id_str ] = Blu.users[ _screen_name ];
    }*/

};

/**
 * Retourne les infos d'un utilisateur stocké dans Blu.users
 * @param {String} screen_name
 */
Blu.fn.user.get = function( screen_name ) {

    screen_name = ( screen_name || '' ).replace('@','').toLowerCase();
    
    // Si l'utilisateur n'a pas encore été enregistré, on l'ajoute avec les infos de base
    if( !Blu.users[ screen_name ] ) {
        
        var _data = {
            'data' : {
                'screen_name'           : screen_name,
                'profile_image_url'     : Blu.images.default_user
            }
        };
        
        Blu.users[ screen_name ] = _data;
    }
    
    return Blu.users[ screen_name ];
    
};

/**
 * Retourne les infos d'un utilisateur stocké dans Blu.users
 * @param {String|integer} _user_id
 */
Blu.fn.user.getById = function( _user_id ) {

    /*for( var i in Blu.users ) {
        if( Blu.users[i].data.id_str && Blu.users[i].data.id_str == _user_id ) {
            return Blu.users[i];
        }
    }*/

    if( !Blu.users[ 'id:' + _user_id ] ) {

        var _defaultPic = Blu.images.default_user,
            _user   = {
                'screen_name'           : '',
                'profile_image_url'     : _defaultPic
            },
            _data = {
                'data'              : _user
            };
        Blu.users[ 'id:' + _user_id ] = _data;
    }

    return Blu.users[ 'id:' + _user_id ];
};

/**
 * Affichage du top users
 */
Blu.fn.users.showTopUsers = function() {
    
    
    var _panel      = $('#panels .panel.users'),
        _container  = _panel.children('.wrap'),
        _topUsers   = Blu.topUsers.global.by_mentions; // ( !Blu.timeline.params.filter.string ? Blu.topUsers.global.by_mentions : Blu.topUsers.user.mentions );

    Blu.info( 'Blu.fn.users.showTopUsers... >> ' + _topUsers.length + ' users (global)' );
    
    // Timer
    if( Blu.timers.calcTopUsers ) {
        Blu.fn.timers.resetInterval('calcTopUsers');
        Blu.warn( 'Blu.timers.calcTopUsers : finished @ ' + (new Date()).toString() );
    }
    
    // Visiteur non connecté
    if( !Blu.user.id ) {
        _container.html( Blu.fn.UI.getPleaseConnectTemplate() ).show();
        return;
    }

    // Lookup si on en fait pas déjà un sur toute la map
    if( 1 /*!Blu.config.map.showFollowing*/ ) {
        Blu.fn.user.lookupTopUsers( _topUsers );
    }

    // Affichage des users
    _container.html( Blu.fn.users.listUsers({
        "theClass"      : "topUsers by_mentions",
        "userRanked"    : "User",
        "numberTitle"   : "Mentions",
        "tab"           : _topUsers.slice(0, 36)
    }) );
    
    _panel.getNiceScroll().resize(); // corrige bug sur Safari (pas de scroll visible)
    
    //Blu.fn.user.renderFollowButtons();
};


/**
 * Calcul puis affichage du top users
 */
Blu.fn.users.calcAndShowTopUsers = function() {
    
    Blu.info('Blu.fn.users.calcAndShowTopUsers... @ ' + (new Date()).toString() );
    
    if( Blu.timers.calcTopUsers ) {
        Blu.warn('We are alreading waiting for top users. We keep the first timer on.');
        return;
    }
    
    Blu.fn.users.topUsers();
    
    Blu.fn.timers.resetInterval('calcTopUsers');
    Blu.timers.calcTopUsers = setInterval( function() {

        if( Blu.tweets.length < 1 || !Blu.topUsers.global || !Blu.is.topUsersReady ) {
            return;
        }
        
        Blu.fn.users.showTopUsers();
        
        return;

    }, 100 );
    
};

/**
 * Calcul du top users (cf Blu.fn.words.topWords())
 * @todo calculer les top users en utilisant les données du graphe ?
 * @param {Array} tweets
 * @param {String} screen_name
 * @returns {Array} tableau du top users
 */
Blu.fn.users.topUsers = function( tweets, screen_name ) {
    
    Blu.info("users.topUsers...");
    
    var _isProfile;
    
    if( typeof tweets === 'undefined' ) {
        tweets      = Blu.tweets;
        _isProfile  = false;
        screen_name = Blu.timeline.params.filter.string;
    } else {
        _isProfile  = true;
    }
    
    Blu.is.topUsersReady = false;
    
    // Expression régulière qui détecte les utilisateurs mentionnés
    var _regex = /@[0-9a-zA-Z_]+/gi;
    
    var _topUsers = { 
	'global': {
            'by_mentions'   : [],
            'by_tweets'     : []
        },
	'user': {
            'mentioned'     : [],
            'mentioners'    : [],
            'mentions'      : []
        }
    };
    
    var _user_stored,
        _user_tweet,
        _user_tweet_image,
        _mentions, 
        _user_mentioned,
        _user_searched = screen_name.replace('@', '').toLowerCase(),
        _nbMentioners = 0,
        _nbMentioned = 0,
        _nbMentions = 0,
        _nbTweets = 0,
        _userToRemove = ( Blu.projects.current.type === 'search-user' ) ? Blu.projects.current.twitter_screen_name.toLowerCase().replace('@','') : screen_name;

    // Parcours des tweets
    for( var i in tweets ) {
        
        // On ne traite que les tweets filtrés
        if( !_isProfile && !tweets[i].matchFilter ) {
            continue;
        }
        
        _nbTweets++;

        _user_tweet = tweets[i].from_user.replace('@', '').toLowerCase();

        // Top users : les plus "bavards"
        if( _user_tweet !== _userToRemove ) {
            Blu.fn.users.freqUser( _topUsers.global.by_mentions, _user_tweet, 'tweeted' );
        }

        // On détecte les mentions dans le tweet et l'on met à jour la fréquence des users
        _mentions = tweets[i].text.match( _regex );

        // On inspecte chaque mention du tweet courant
        for( var j in _mentions ) {

            _nbMentions++;

            _user_mentioned = _mentions[j].replace('@', '').toLowerCase();

            // Top users : global
            if( _user_mentioned !== _userToRemove ) {
                Blu.fn.users.freqUser( _topUsers.global.by_mentions, _user_mentioned );            
            }

            // On cherche un user qui n'est pas mentionné mais est l'auteur du tweet
            // A mentionné
            if( _user_searched === _user_tweet && _user_searched !== _user_mentioned ) {
                _nbMentioned++;
                //Blu.fn.users.freqUser( _topUsers.user.mentioned, _user_mentioned, "mentioning" );
                // On récupère toutes les mentions sans mention de l'utilisateur par lui-même (partie 1)
                if( _user_mentioned !== _userToRemove ) {
                    Blu.fn.users.freqUser( _topUsers.user.mentions, _user_mentioned, "mentioning" );
                }
            }

            // Mentionné par
            if( _user_searched === _user_mentioned && _user_searched !== _user_tweet ) {
                _nbMentioners++;
                //Blu.fn.users.freqUser( _topUsers.user.mentioners, _user_tweet, "mentioned" );
                // On récupère toutes les mentions sans mention de l'utilisateur par lui-même (partie 2)
                if( _user_tweet !== _userToRemove ) {
                    Blu.fn.users.freqUser( _topUsers.user.mentions, _user_tweet, "mentioned" );
                }
            }
            
        }
        
    }
    
    Blu.log( 'Sur les ' + _nbTweets + ' tweets, il y a ' + _nbMentions + ' mentions (auto-mentions comprises)' );
    //Blu.info("Mentioning : "+_nbMentioned);
    //Blu.info("Mentioners : "+_nbMentioners);
    //Blu.info("Mentions émises et reçues par cet utilisateur (Interactions) : "+( _nbMentioners+_nbMentioned ));
    
    // On trie les utilisateurs par fréquence décroissante et on ne garde qu'un certain nombre
    /*_topUsers.global.by_tweets = _topUsers.global.by_tweets
        .sort( Blu.fn.misc.sortMentions )
        .slice( 0, 36 );*/
        
    _topUsers.global.by_mentions = _topUsers.global.by_mentions
        .sort( Blu.fn.misc.sortMentions );
        //.slice( 0, 36 );
        
    _topUsers.user.mentions = _topUsers.user.mentions
        .sort( Blu.fn.misc.sortMentions );
        //.slice( 0, 14 );
    
    //Blu.log( _topUsers.global.by_mentions );
    Blu.log( '  > Top users global : ' + _topUsers.global.by_mentions.length + ' users' );
    Blu.log( '  > Top users associé au profile : ' + _topUsers.user.mentions.length + ' users' );
    Blu.log( _topUsers.user.mentions );
    
    /*_topUsers.user.mentioned = _topUsers.user.mentioned
                                        .sort( Blu.fn.misc.sortMentions )
                                        .slice( 0, 5 );
        
    _topUsers.user.mentioners = _topUsers.user.mentioners
                                        .sort( Blu.fn.misc.sortMentions )
                                        .slice( 0, 5 );*/
    
    Blu.is.topUsersReady = true;
    
    // On efface le timer mis en place pour éviter des rafraîchissements trop fréquents
    clearTimeout( Blu.timers.updateTagCloud );
    
    if( _isProfile ) {
        return _topUsers;
    } else {
        Blu.topUsers = _topUsers;
        Blu.fn.users.showTopUsers();
    }
    
    
}; // Fin de Blu.fn.users.topUsers

/**
 * Tri des top users par mentions
 */
Blu.fn.misc.sortMentions = function( a, b ) {
    return b.count - a.count;
};

/**
 * Tri des tweets par ordre anté-chronologique (identifiants décroissants)
 */
Blu.fn.misc.sortLastTweets = function( a, b ) {
    return b.id - a.id; 
};


/**
 * Met à jour la fréquence d'un user (cf Blu.fn.words.freqWord() avec en plus l'avatar)
 */
Blu.fn.users.freqUser = function( topUsers, user, mentionType ) {
    
    // On compare toujours en minuscule
    var _user_lc        = user.toLowerCase(),
        _mentionType    = mentionType || 'mentions',
        _offset         = ( _mentionType === 'tweeted' ) ? 0 : 1;
        //_array   = Blu.topUsers[_arrayName];
    
    // On compare le compte aux autres comptes déjà dans la liste
    for( var k in topUsers ) {
        
        if( _user_lc == topUsers[ k ].user ) {

            // S'il est déjà présent, on incrémente le nombre d'occurrences
            topUsers[ k ].count += _offset;

            if( _mentionType ) {
                if ( _mentionType === "mentioning" ) {
                    topUsers[ k ].searchMentioning++;
                }
                else if( _mentionType === "mentioned" ) {
                    topUsers[ k ].searchMentioned++;
                }
            }

            return;
        }
        
    }
    
    // Si le compte n'a pas été trouvé, on le rajoute à la liste
    topUsers.push({
        user    : _user_lc,
        count   : _offset,
        searchMentioning : ( _mentionType && _mentionType === "mentioning" ) ? 1 : 0,
        searchMentioned : ( _mentionType && _mentionType === "mentioned" ) ? 1 : 0
    });
    
};  // Fin de Blu.fn.users.freqUser


/**
 * Liste de mots à filtrer, qui inclut quelques termes liés à l'informatique (notamment des URLs, comme http)…
 * Une manière alternative serait de supprimer tout simplement les URLs avant traitement.
 */
/*Blu.fn.words.stopWords = function() {
    
    var _stopwords = [ 'alors', 'ans', 'après', 'aucun', 'aucuns', 'aujourd', 'aussi', 'autre', 'aux', 'avant', 'avec', 'avoir', 'bien', 'bon', 'bonne', 'bonnes', 'bons', 'car', 'cela', 'ces', 'cette', 'ceux', 'chaque', 'comme', 'comment', 'dans', 'des', 'dedans', 'dehors', 'depuis', 'deux', 'devrait', 'doit', 'donc', 'dos', 'droite', 'elle', 'elles', 'encore', 'entre', 'essai', 'est', 'fait', 'faites', 'faire', 'faut', 'fois', 'font', 'force', 'haut', 'hors', 'hui', 'ici', 'ils', 'juste', 'les', 'leur', 'maintenant', 'mais', 'mes', 'mine', 'moins', 'mon', 'mot', 'même', 'non', 'nos', 'notre', 'nous', 'ont', 'oui', 'par', 'parce', 'parole', 'pas', 'personnes', 'peut', 'peu', 'plupart', 'plus', 'plutôt', 'pour', 'pourquoi', 'quand', 'que', 'quel', 'quelle', 'quelles', 'quels', 'qui', 'sans', 'ses', 'seulement', 'sien', 'sinon', 'son', 'sont', 'sous', 'soyez', 'suis', 'sujet', 'sur', 'tandis', 'tellement', 'tels', 'tes', 'ton', 'tous', 'tout', 'trop', 'très', 'une', 'valeur', 'voie', 'voient', 'voilà', 'vont', 'votre', 'vous', 'etaient', 'etat', 'etions', 'ete', 'etre', 'bit', 'net', 'com', 'org', 'info', 'http', 'www', 'ssl', 'ftp', 'amp', 'quot', 'php', 'goo', 'tinyurl' ];
    
    return _stopwords;
    
};*/

/**
 * Teste si le mot est un mot à filtrer
 */
/*Blu.fn.words.isStopWord = function( mot ) {

    var _stopwords = Blu.fn.words.stopWords();

    // On compare toujours en minuscule
    var _mot_lc = mot.toLowerCase();

    // On vérifie s'il n'appartient pas à la liste de mots vides
    for( var k in _stopwords ) {
        if( _mot_lc == _stopwords[k] ) {
            return true;
        }
    }
    return false;
};*/

/**
 * Met à jour la fréquence d'un mot
 */
/*Blu.fn.words.freqWord = function( _mot ) {
    
    // Mot à filtrer
    if( Blu.fn.words.isStopWord( _mot ) )
        return;

    // On compare toujours en minuscule
    var _mot_lc = _mot.toLowerCase();

    // On compare le mot à ceux déjà présents dans la liste
    for( var k in Blu.topWords ) {
        
        // S'il est déjà présent, on incrémente le nombre d'occurrences
        if( _mot_lc == Blu.topWords[k].mot ) {
            Blu.topWords[k].nombre++;
            return;
        }
        
    }
    // Si le mot n'a pas été trouvé, on le rajoute à la liste
    Blu.topWords.push({
        mot     : _mot_lc,
        nombre  : 1
    });

};  // Fin de Blu.fn.words.freqWord()
*/



/**
 * Retourne le code HTML du nuage de mots / utilisateurs
 * @return html_tag_cloud
 */
/*Blu.fn.words.htmlCloud = function( _mots ) {

    Blu.log('Blu.fn.words.htmlCloud()');
    
    var _cloud = "";
    
    // Pas un mot ! On s'en va...
    if( !_mots.length ) {
        return _cloud;
    }
    
    // Paramètres pour le tag cloud
    var _max        = _mots[0].nombre,
        _min        = Math.min( _mots[_mots.length - 1].nombre, _max - 1 ),
        _echelle    = 5 / Math.sqrt( _max - _min ); // font-size de 10px pour les (-) fréquents, 15px pour les (+) fréquents
    
    // Génération du tag cloud
    for( var i in _mots ) {
        
        var _proportion = Math.floor( _echelle * Math.sqrt( _mots[i].nombre - _min ) ),
            _taille     = 10 + 2 * _proportion,
            _marge      = 6 - _proportion,
            _graisse    = 400 + 100 * _proportion;
            
        _cloud  += '<a href="#" ' + ( _mots[i].mot[0] === "@" ? 'onmouseover="Blu.fn.map.survolNoeud(\'' + _mots[i].mot + '\');" ' : '' ) 
                + ' onclick="Blu.fn.tweets.search(\'' + _mots[i].mot + '\', true); return false" ' 
                + ' style="font-weight: ' + _graisse + '; line-height: ' + _taille + 'px; font-size: ' 
                + _taille + 'px; margin: ' + _marge + 'px 2px">' + _mots[i].mot + '</a>';
    }
    return _cloud;
    
}; // Fin de Blu.fn.words.htmlCloud()*/

/**
 * Affiche une liste de mots
 */ 
/*Blu.fn.words.showCloud = function() {
    
    Blu.log('Blu.fn.words.showCloud()');
    
    var _barre      = $('#barre'),
        _listTags   = $('#listetags');
    
    _listTags.html("Chargement des mots");
    
    // S'il n'y a pas de filtrage et que la liste de base est en mémoire, on l'affiche directement
    if( !Blu.timeline.params.filter.string && Blu.wordsBase ) {
        
        _listTags.html( Blu.fn.words.htmlCloud( Blu.wordsBase.slice(0,100) ) );
        
        _barre.animate({
            height : ( _barre.height() + Math.min( 78, _listTags.height() ) ) + 'px'
        });
        
    // Sinon, on recalcule les top words
    } else {
        // Pour éviter un recalcul trop fréquent, on attend 1/2 seconde avant de calculer les mots
        clearTimeout( Blu.timers.updateTagCloud );
        
        Blu.timers.updateTagCloud = setTimeout( function() {
            
            _listTags.html( Blu.fn.words.htmlCloud( Blu.fn.words.topWords().slice(0,100) ) );
            
            _barre.animate({
                height : ( _barre.height() + Math.min( 78, _listTags.height() ) ) + 'px'
            });
            
        }, 500);
    }
    
}; // Fin de Blu.fn.words.showCloud()*/

/**
 * Affiche une liste d'utilisateurs
 */ 
/*Blu.fn.users.showCloud = function() {
    
    Blu.log('Blu.fn.users.showCloud()');
    
    var _barre      = $('#barre'),
        _listUsers  = $('#listeusers');    
    
    _listUsers.html("Chargement des twittos");
    
    // S'il n'y a pas de filtrage et que la liste de base est en mémoire, on l'affiche directement
    if( !Blu.timeline.params.filter.string && Blu.usersBase ) {
        
        _listUsers.html( Blu.fn.words.htmlCloud( Blu.usersBase.slice(0,100) ) );
        
        _barre.animate({
            height : ( _barre.height() + Math.min( 78, _listUsers.height() ) ) + 'px'
        });
        
    // Sinon, on recalcule les top users
    } else {
        
        clearTimeout( Blu.timers.updateTagCloud );
        
        // Pour éviter un recalcul trop fréquent, on attend 1/2 seconde avant de calculer les mots
        Blu.timers.updateTagCloud = setTimeout(function() {
            
            _listUsers.html( Blu.fn.words.htmlCloud( Blu.fn.users.topUsers().slice(0,100) ) );
            
            _barre.animate({
                height : ( _barre.height() + Math.min( 78, _listUsers.height() ) ) + 'px'
            });
            
        }, 500);
    }
};*/


/**
* Add links to the twitter feed.
* Hashes, @ and regular links are supported.
* @link https://github.com/christianv/jquery-lifestream/blob/master/src/services/twitter.js
* @private
* @param {String} tweet A string of a tweet
* @return {String} A linkified tweet
*/
  /*linkify = function( tweet ) {

    var link = function( t ) {
      return t.replace(
        /[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_:~%&\?\/.=]+[^:\.,\)\s*$]/ig,
        function( m ) {
          return '<a href="' + m + '">'
            + ( ( m.length > 25 ) ? m.substr( 0, 24 ) + '...' : m )
            + '</a>';
        }
      );
    },
    at = function( t ) {
      return t.replace(
        /(^|[^\w]+)\@([a-zA-Z0-9_]{1,15})/g,
        function( m, m1, m2 ) {
          return m1 + '<a href="http://twitter.com/' + m2 + '">@'
            + m2 + '</a>';
        }
      );
    },
    hash = function( t ) {
      return t.replace(
        /(^|[^\w'"]+)\#([a-zA-Z0-9_]+)/g,
        function( m, m1, m2 ) {
          return m1 + '<a href="http://search.twitter.com/search?q=%23'
          + m2 + '">#' + m2 + '</a>';
        }
      );
    };

    return hash(at(link(tweet)));

  },*/


/**
 * Affiche  la liste de tweets (initialisation)
 */
Blu.fn.tweets.showList = function() {
    
    Blu.info('Blu.fn.tweets.showList...');
    
    var _panel  = $('#panels .panel.tweets'),
        _tweets = _panel.find('.tweets-list');

    // On vide la liste des tweets
    _tweets.html('').scrollTop(0);

    // On remet à zéro la position
    Blu.positionListeTweets = 0;

    // On affiche le début et on met en place un timer
    Blu.fn.tweets.showPartialList();
    
    // Nouveaux tweets
    Blu.fn.UI.notifNewTweets();

    // Pas un seul petit tweet ?! ;(
    if( !Blu.counts.tweets.filter ) {
        //Blu.log('Blu.counts.tweets.filter = 0 or undefined');
        return;
    }
    
    var _about = _tweets.siblings('.about-tweets');
    if( !_about.length ) {
        _tweets.before('<div class="about-tweets"></div>');
        _about = _tweets.siblings('.about-tweets');
    }
    if( Blu.timeline.params.filter.string ) { 
        var _count = Blu.counts.tweets.filter;
        _about.text( Blu.txt( ( _count > 1 ) ? 'tweetsWithX' : 'tweetWithX', _count, Blu.timeline.params.filter.string ) ).show();
    } else {
        _about.text('').hide();
    }
    
}; // Fin de Blu.fn.tweets.showList


/**
 * Affiche une partie de la liste des tweets
 */
Blu.fn.tweets.showPartialList = function() {

    //Blu.info('Blu.fn.tweets.showPartialList...');
    
    var _panel      = $('#panels .panel.tweets'),
        _tweets     = '',
        _n          = 0,
        _tweet,
        _matchSlice,
        _countTweets = 0;
        
    Blu.regexFilter = Blu.fn.tweets.regexFilter();
            
    // On parcourt la liste des tweets
    for( var i in Blu.tweets ) {
        
        _tweet = Blu.tweets[i];
        
        _matchSlice =   (   ( Blu.timeline.params.trancheCourante === -1 ) || 
                            ( Blu.timeline.params.trancheCourante === _tweet.tranche )    );
        
        // On ne tient compte que des tweets actifs et appartenant à la tranche courante
        if( _tweet.matchFilter && _matchSlice ) {

            // On incrémente la position de la liste
            _n ++;

            // Si on a dépassé la position précédente, on affiche le tweet
            if( _n > Blu.positionListeTweets ) {
                
                _countTweets++;
                
                _tweets += Blu.fn.tweet.display( _tweet );
                
            }
            // Au delà de 10 tweets on s'arrête
            if( _n >= Blu.positionListeTweets + 10 ) {
                break;
            }
        }
    }
    
    Blu.positionListeTweets += 10;
    
    // Si on a eu moins de 10 tweets, c'est qu'on est arrivés au bout, on peut désactiver le timer
    if( _n < Blu.positionListeTweets ) {
        clearInterval( Blu.timers.refreshListe );
    }
    
    //Blu.log('Affichage de ' + _countTweets + ' tweets...');
    
    // On affiche les nouveaux tweets
    if( _countTweets > 0 ) {
        _panel.find('.tweets-list').append( _tweets ).show();
    } else if( _n === 0 && Blu.positionListeTweets === 10 ) { // @todo à revoir ?
        //_sidebar.find('.tweets-list').html( '<li class="no-data">' + Blu.txt('noData') + '</li>' );
    }
	
};  // Fin de Blu.fn.tweets.showPartialList


/**
 * Affichage d'un tweet
 * @param {Object} tweet
 */
Blu.fn.tweet.display = function( tweet ) {
    
    if( !tweet.isReady ) {
        Blu.fn.tweet.process( tweet );
    }
    
    var _tweetTxt       = '',
        _tweetTxtOrig   = tweet.text,
        _urls           = [],
        _regex          = Blu.regexFilter,
        _usertxt        = '',
        _link,
        _highlight      = false,
        _replaces       = [];

        /*
         * Exemple :
         * 
         * Contenu du tweet : Ce week-end, c'est la nuit des musées http://t.co/0C9ZWoWv #NDM12 :)
         *                                                          ^38                 ^58    
         *                                                                               ^59   ^65                                                      
         * Entities :
         * 
         *  {
         *      "hashtags":[
         *          { 
         *              "text"      : "NDM12",
         *              "indices"   : [59,65]
         *          }
         *      ],
         *      "urls":[
         *          {
         *              "url"           : "http:\/\/t.co\/0C9ZWoWv", => 20 caractères
         *              "expanded_url"  : "http:\/\/www.musees-des-techniques.org\/actualites.php?idact=566",
         *              "display_url"   : "musees-des-techniques.org\/actualites.php\u2026",
         *              "indices"       : [38,58]
         *          }
         *      ],
         *      "user_mentions":[ // (autre exemple)
         *          {
         *              "screen_name":"Christelpothier",
         *              "name":"Christelle Pothier",
         *              "id":531500616,
         *              "id_str":"531500616",
         *              "indices":[0,16]
         *          }
         *      ]
         *  }
         *  
         *  
         *  'Ce week-end, c'est la nuit des musées ' + '<a class="url" href="...">musees-...</a>' + ' ' + '<a class="hashtag">#NDM12</a>' + ' :)'
         *      
         */
        
    /*
     * Utilisation des entities
     */
    if( typeof( tweet.entities ) !== 'undefined' ) {
        
        var _entities   = [],
            _entity,
            _entityHtml,
            _prevIndex  = 0;
        
        for( var i in tweet.entities ) {
            for( var j in tweet.entities[i] ) {
                _entity = tweet.entities[i][j];
                _entities.push( _entity );
                if( _entity.url ) {
                    _urls.push( _entity.url );
                }
            }
        }        
        _entities.sort( function(a, b){ return parseInt( a.indices[0], 10 ) - parseInt( b.indices[0], 10 ); });
                
        for( var i in _entities ) {
            
            _entity     = _entities[i];
            _entityHtml = '';
            
            // Hashtag
            if( _entity.text ) {
                
                _entityHtml = '<a class="hashtag" href="https://twitter.com/#!/search/%23' + encodeURIComponent( _entity.text ) + '" data-hashtag="' + _entity.text + '" target="_blank">#' + _entity.text + '</a>';
                
            // URL
            } else if( _entity.url ) {
                
                _entityHtml = '<a class="url" href="' + _entity.expanded_url + '" target="_blank">' + _entity.display_url + '</a>';
            
            // Mention
            } else if( _entity.screen_name ) {
                
                _entityHtml = '<a class="mention" href="http://twitter.com/' + _entity.screen_name + '" data-user="' + _entity.screen_name + '" target="_blank" title="' + _entity.name + '"><span>@</span>' + _entity.screen_name + '</a>';
            
            }
            
            if( parseInt( _entity.indices[0], 10 ) > _prevIndex ) {
                _tweetTxt += _tweetTxtOrig.substring( _prevIndex, parseInt( _entity.indices[0], 10 ) );
            }
            
            _tweetTxt += _entityHtml;
            
            _prevIndex = parseInt( _entity.indices[1], 10 );
            
        }
        
        if( _tweetTxtOrig.length > _prevIndex ) {
            _tweetTxt += _tweetTxtOrig.substring( _prevIndex ); // fin du tweet
        }
        
        // Nettoyage corrigeant le bug de la Search API sur les RT natifs (https://dev.twitter.com/issues/567)
        _tweetTxt = _tweetTxt.replace( /RT @[\w_]+: /g, '' );
        
    /*
     * Pas d'entities : utilisation de regex
     */
    } else {
        
        _tweetTxt   = tweet.text,
        _urls       = _tweetTxt.match( /(https?:[0-9a-zA-Z\/\-_\.~&?=\#]+)/g );
        
        // Transformation des URLs en hyperliens
        for( var i in _urls ) {
            _link         = '<a class="url" href="' + _urls[i] + '" target="_blank">' + _urls[i] + '</a>';
            _tweetTxt     = _tweetTxt.replace( _urls[i], _link );            
        }

        // On remplace hashtags et mentions par des liens permettant de rechercher ceux-ci
        //_txt = _txt.replace(/(@|#)([0-9a-zA-Z_]+)/g,'<a href="#" onclick="Blu.fn.tweets.search(\'$1$2\', true); return false;" onmouseover="Blu.fn.map.survolNoeud(\'$1$2\');" onmouseout="Blu.map.params.hoverNode=-1;">$1$2</a>');

        // Mentions
        _tweetTxt = _tweetTxt.replace( /(^|\s)(@)([\w_]+)/g, 
                                '$1<a class="mention" href="http://twitter.com/$3" data-user="$3" target="_blank"><span>$2</span>$3</a>' );
        /*_txt = _txt.replace( /(@)([\w_àáâãäåçèéêëìíîïðòóôõöùúûüýÿ]+)/g, 
                                '<a class="mention" href="#" data-user="$2">$1$2</a>' );*/

        // Hashtags
        //_tweetTxt = _tweetTxt.replace( /(#)([\w_àáâãäåçèéêëìíîïðòóôõöùúûüýÿ]+)/g, 
        //                        '<a class="hashtag" href="#" data-hashtag="$2">$1$2</a>' );
        _tweetTxt = _tweetTxt.replace( /(^|[^\w'"]+)\#([a-zA-Z0-9_]+)/g, function( m, m1, m2 ) {
            return m1 + '<a class="hashtag" href="https://twitter.com/#!/search/%23' + m2 + '" data-hashtag="' + m2 + '" target="_blank">#' + m2 + '</a>';
        });

        
    }
    
    // Mise en surbrillance des textes correspondant à la chaîne de recherche
    _tweetTxt   = _highlight ? Blu.fn.tweets.highlightSearch( _tweetTxt, _regex ) : _tweetTxt;
    /*_usertxt    = ( _highlight && _regex ) ?    tweet.from_user.replace( _regex.from_user, '<span class="surbrillance">$1</span>' ) : 
                                                tweet.from_user;*/
    
    
    // Requêtes à l'API Embedly pour les méta-données sur les URLs
    for( var i in _urls ) {
        if( !Blu.fn.localhost() && Blu.config.others.embedly.activated ) {
            Blu.fn.tweets.embedly( _urls[i], tweet.id, i );
        }
    }    
    
    
    /* 
     * Code HTML pour le tweet
     */

    // sur <li> : data-tranche="' + _tweet.tranche + '" 
    var _li =   '<li class="tweet" id="tweet_' + tweet.id + '">' +
                    '<div class="profile-pic">' +
                        '<a href="http://twitter.com/' + tweet.from_user + '" title="' + Blu.txt('showProfile') + '">' + 
                            '<img class="avatar" src="' + tweet.profile_image_url + '" data-user="' + tweet.from_user + '" />' + 
                        '</a>' +
                    '</div>' +
                    '<div class="tweet-content">' +
                        '<h4>' + 
                            '<a href="http://twitter.com/' + tweet.from_user + '" data-user="' + tweet.from_user + '" title="' + Blu.txt('showProfile') + '">' + 
                                tweet.from_user_name + 
                            '</a>' + 
                            '<span>' + 
                                '@' + tweet.from_user +
                            '</span>' +
                        '</h4>' + 
                        '<p class="tweet-text">' + _tweetTxt + '</p>' + 
                        '<p class="time"> ' + 
                            '<a href="' + Blu.fn.tweet.statusUrl( tweet.from_user, tweet.id ) + '" target="_blank" title="' + Blu.fn.misc.dateObjectToString( tweet.dateObj ) + '" data-date="' + tweet.dateObj.toString() + '">' 
                                + Blu.fn.misc.prettyDate( tweet.dateObj ) + 
                            '</a>' + 
                        '</p>' + 
                        '<ul class="actions">'+ 
                            '<li><a class="favorite" href="#favorite"><span></span>'+ Blu.txt('twActions_favorite')+ '</a></li>' +
                            '<li><a class="retweet" href="#retweet"><span></span>'+ Blu.txt('twActions_retweet')+ '</a></li>' +
                            '<li><a class="reply" href="#reply"><span></span>'+ Blu.txt('twActions_reply')+ '</a></li>' +
                        '</ul>' +
                    '</div>' +
                '</li>';
    return _li;
    
};  // Fin de Blu.fn.tweet.display()

/**
 * Retourne l'URL d'un tweet sur twitter.com
 */
Blu.fn.tweet.statusUrl = function( screen_name, tweet_id_str ) {
    return 'http://twitter.com/' + screen_name + '/status/' + tweet_id_str;
};

/**
 * Retourne le nom de domaine d'une URL
 */
Blu.fn.misc.domainFromUrl = function( url ) {

    if( url.match( /:\/\/(.[^/]+)/ ) )
        return ( url.match( /:\/\/(.[^/]+)/ )[1] ).replace( 'www.', '' );
    else
        return url;
    
};


/**
 * Interroge l'API Embedly pour récupérer la miniature, 
 * le code embed et diverses infos associées à une URL
 * @todo paramètre urls => envoi de plusieurs URL en même temps (performance)
 */
Blu.fn.tweets.embedly = function( url, tweet_id, xhr_index ) {
    
    if( $( "#tweet_" + tweet_id ).data( 'show_embedly_'+ tweet_id + '_' + xhr_index ) ) {
        return;
    }

    var _firstTweet     = $('.tweets-list .tweet:first .tweet-content'),
        _width_embed    = _firstTweet.length ? _firstTweet.width() : $('.tweets-list').width() - 81; // Alternative quand pas encore de tweets
    
    // Requête à Embedly
    var _xhr = $.getJSON( "http://api.embed.ly/1/oembed?format=json&callback=?", 
        {
            'key'       : "744caa38fe4411e0ab234040d3dc5c07", // Clé pour labs.knowtex.com uniquement
            'url'       : url,
            'maxwidth'  : _width_embed,
            'autoplay'  : true,
            'chars'     : 200 // Nb de caractères max pour la description
        }, 
        // Traitement de la réponse
        function( json, status, xhr ) {
            
            //Blu.log(data);
            
            // En cas d'erreur
            if( typeof(json.type) === 'undefined' || json.type === 'error' ) {
                return;
            }

            // Infos de la page / image / vidéo…
            // http://twitter.com/' + Blu.tweets[i].from_user + '/status/' + Blu.tweets[i].id + '
            json.url            = ( typeof(json.url) !== 'undefined' ) ?             json.url                : '';
            json.provider_url   = ( typeof(json.provider_url) !== 'undefined' ) ?    json.provider_url       : '';
            json.title          = ( typeof(json.title) !== 'undefined' ) ?           json.title              : ( (typeof(json.provider_name) !== 'undefined') ? json.provider_name : '' );
            json.description    = ( typeof(json.description) !== 'undefined' ) ?     json.description        : '';
            json.thumbnail_url  = ( typeof(json.thumbnail_url) !== 'undefined' ) ?   json.thumbnail_url      : ( Blu.fn.app.isAppUrl( json.url ) ? Blu.app.urls.preview : '' );
            json.html           = ( typeof(json.html) !== 'undefined' ) ?            json.html               : '';
            
            if( json.thumbnail_url === '' && json.title === '' && json.description === '' ) {
                return;
            }
            
            var _tweet          = $( "#tweet_" + xhr.tweetid ),
                _hasThumb       = ( json.thumbnail_url != '' ),
                _hasHtml        = ( json.html != '' ),
                _source         = Blu.fn.misc.domainFromUrl( json.provider_url ),
                _embedlyid      = 'embedly_' + xhr.tweetid + '_' + xhr.index,
                _thumb          = _hasThumb ? {
                                        width       : json.thumbnail_width,
                                        height      : json.thumbnail_height,
                                        maxWidth    : 85,
                                        maxHeight   : 85
                                  } : 0;
            if( _thumb ) {
                var _ratio          = _thumb.width / _thumb.height,
                    _ratioRef       = _thumb.maxWidth / _thumb.maxHeight,
                    _renderWidth    = parseInt( Math.min( _thumb.maxWidth * _ratio,     _thumb.width * _ratioRef ), 10 ),
                    _renderHeight   = parseInt( Math.min( _thumb.maxHeight / _ratio,    _thumb.height / _ratioRef ), 10 );
            }
            var _infosStyle         = ( _thumb && _renderWidth < _thumb.maxWidth ) ? ' style="margin-left:' + ( _renderWidth + 8 ) + 'px"' : '';
            
            /*
             * Code HTML de l'embed
             */
            var _htmlEmbed =    '<div id="' + _embedlyid + '" class="embed type-' + json.type + ( !_hasThumb ? ' no-thumb' : '' ) + ( _hasHtml ? ' has-html' : '' ) + '">' + 
                                    ( !_hasThumb ? '' :  
                                    (   '<a class="thumb" href="' + json.url +'" target="_blank" title="' + Blu.txt('titleEmbedImage') + '">' + 
                                            '<img src="' + json.thumbnail_url + '" width="' + _renderWidth + '" height="' + _renderHeight + '"/>' + 
                                            '<div class="play"></div>' + 
                                        '</a>'    ) ) + 
                                    '<div class="infos"' + _infosStyle + '>' + 
                                        '<a class="title" href="' + json.url +'" target="_blank">' + json.title + '</a><br/>' +
                                        '<a class="source" href="' + json.provider_url +'" target="_blank">' + _source + '</a>' +
                                        '<div class="description">' + json.description + '</div>' +
                                    '</div>' +
                                '</div>';
                            
            // Ajout du code HTML de l'embed dans le tweet (en vérifiant qu'il n'y a pas de doublon)
            if( _tweet.data('show_'+_embedlyid) ) {
                Blu.log('embed déjà affiché > embedlyid = ' + _embedlyid );
                return;
            } else {
                _tweet.append( _htmlEmbed );
                _tweet.data( 'show_'+_embedlyid, true );
            }
            
            var _embed_block    = $( '#' + _embedlyid ),
                _links          = _embed_block.find('.thumb, .infos .title');
                
            // Remplacement de l'URL http://t.co/xyz dans le tweet

            // On a un code embed
            if( json.html && json.provider_name != 'Twitter' ) {

                // Evénement : lecture du code directement dans le tweet
                _links.click( function() {

                    //Blu.fn.UI.lightbox.open( data.html, data.width, data.height );

                    $(this).parent('.embed').html( json.html );

                    return false;
                });

            // Pas de code embed
            } else {
                switch( json.type ) {
                    // Hyperlien
                    case "link" :
                        _links.click( function() {
                            /*
                             * Lightbox si 
                             * - il ne s'agit pas de l'URL de l'appli
                             * - le site ne bloque pas les iframes
                             */
                            if( Blu.fn.app.isAppUrl( json.url ) || Blu.fn.app.blockingIframeWebsites( json.url ) ) {
                                return true;
                            } else {
                                Blu.fn.UI.lightbox.iframe( json.url );
                                return false;
                            }
                        });
                        break;
                    // Image
                    case "photo" :
                        _links.click( function() {
                            Blu.fn.UI.lightbox.image( json.url, json.width, json.height );
                            return false;
                        });
                        break;
                    // Par défaut
                    default :
                        _links.click( function() {
                            return true;
                        });
                        break;
                }
            }
    });
    // On affecte les informations nécessaires à la variable _xhr pour pouvoir les récupérer ensuite
    _xhr.tweetid    = tweet_id;
    _xhr.url        = url;
    _xhr.index      = xhr_index;

};


/**
 * Mise en surbrillance des textes correspondant à la chaîne de recherche
 * @return _txt
 */
Blu.fn.tweets.highlightSearch = function( _txt, _regex ){

    if( !_regex ) {
        return _txt;
    }

    var _element    = document.createElement('p'),
        _repl       = '<span class="surbrillance">$1</span>';

    _element.innerHTML = _txt;
    

    for( var k = 0; k < _element.childNodes.length; k++ ) {

        var _tmp = document.createElement('span');

        if( _element.childNodes[k].childNodes && _element.childNodes[k].childNodes[0] ) {

            _tmp.innerHTML = _element.childNodes[k].childNodes[0].textContent.replace( _regex.text, _repl );

            _element.childNodes[k].replaceChild( _tmp, _element.childNodes[k].childNodes[0] );

        } else {

            _tmp.innerHTML = _element.childNodes[k].textContent.replace( _regex.text, _repl );

            _element.replaceChild( _tmp, _element.childNodes[k] );

        }
    }
    
    return _element.innerHTML;
};



/**
 * Lancement de la récupération régulière des nouveaux tweets
 */
Blu.fn.tweets.timerNewTweets = function() {
    
    if( !Blu.config.tweets.getNew ) {
        return;
    }
    
    var _interval = 1*60*1000;
    
    Blu.timers.loadNewTweets = setInterval( function() {

        Blu.fn.project.loadNewTweetsFromDb();

    }, _interval );
    
};

/**
 * Lancement de la récupération régulière des nouveaux tweets via l'API Twitter
 */
Blu.fn.tweets.timerNewTweets_API = function() {
    
    if( !Blu.config.tweets.getNew_API ) {
        return;
    }
    
    var _interval = 2*60*1000;
    
    Blu.timers.checkNewTweets_API = setInterval( function() {

        Blu.fn.project.grabNewTweets();
        
    }, _interval );
    
};

/**
 * Lancement de la récupération régulière des anciens tweets
 */
Blu.fn.tweets.timerOldTweets = function() {
    
    if( !Blu.config.tweets.loadAllPrevious ) {
        return;
    }
    
    Blu.timers.getOldTweets = setInterval( function() {
        
        // On attend d'avoir chargé les premiers tweets, la Time Machine...
        if( Blu.tweets.length < 1 || !Blu.timemachine.initialized ) {
            return;
        }
        Blu.info('Premiers tweets chargés');

        // Les premiers tweets ont été chargés
        // => on charge tous les anciens tweets
        // Avec un gros volume, cela risque de prendre du temps
        var _countTweets = Blu.tweets.length,
            _tweetid_max = Blu.tweets[ _countTweets - 1 ].id;
            
        Blu.info('Chargement anciens tweets');

        Blu.fn.tweets.load( {'tweetid_max' : _tweetid_max, 'limit' : 0} );
        
        // Suppression du timer
        clearInterval( Blu.timers.getOldTweets );

    }, 200 );
    
};

/**
 * Mise à jour des "jolies dates" affichées sur les tweets
 */
Blu.fn.tweets.updateTweetDates = function() {
    
    if( Blu.config.mapOnly || !Blu.config.tweets.prettyDate ) {
        return;
    }
    
    Blu.fn.timers.resetInterval('updateTweetDates');
    Blu.timers.updateTweetDates = setInterval( function() {

        $('.tweets-list .tweet-content .time a').each( function() {
            
            var _a = $(this);
            
            _a.text( Blu.fn.misc.prettyDate( new Date( _a.data('date') ) ) );
            
        });

    }, 45*1000 );
    
};

/**
 * Retourne l'ID du tweet le plus récent
 * @return int
 */
Blu.fn.tweets.getLastTweetId = function() {
    return ( Blu.tweets.length > 0 && Blu.tweets[0].id ) ? Blu.tweets[0].id : 0;
};


Blu.fn.tweets.grab = {};

/**
 *  Récupération de tweets via la Search API (côté client)
 */
Blu.fn.tweets.grabViaSearchAPI = function( options ) {
        
    // Paramètres de recherche
    options.url_params   = "?q=" + encodeURIComponent( options.twQuery ) + "&include_entities=1" + 
                          ( options.since_id ? "&since_id=" + options.since_id : '' ) + 
                          ( options.lang ? "&lang=" + options.lang : '' ) + 
                          "&rpp=" + options.rpp + '&callback=?';
    options.url          = options.url_base + options.url_params;
    
    // Log
    Blu.info('Blu.fn.tweets.grabViaSearchAPI()');
    Blu.log( options );
    
    /*
     * Lancement des requêtes
     */
    Blu.is.grabbingTweets = true;
    
    if( options.showNotifications ) {
        Blu.fn.UI.notification({ 'message' : "Loading tweets...", 'type' : 'info', 'id' : 'grabbing-tweets' });
    }
    
    Blu.ajax = Blu.ajax || {};
    Blu.ajax.saveRequests       = [];
    Blu.ajax.countSavedTweets   = 0;
    
    Blu.fn.tweets.grabViaSearchAPI_request( options );

}; // Fin de Blu.fn.tweets.grabViaSearchAPI()


/**
 * Lancement d'une requête Twitter pour récupérer les tweets via la Search API (côté client)
 */
Blu.fn.tweets.grabViaSearchAPI_request = function( options ) {
    
/*
var jqxhr = $.getJSON("example.json", function() {
  alert("success");
})
.success(function() { alert("second success"); })
.error(function() { alert("error"); })
.complete(function() { alert("complete"); });*/     
    
    /* 
     * Problème de JSON malformé retourné par l'API Twitter : https://dev.twitter.com/discussions/9554
     */    
    
    
    /*
     * Requête JSONP
     */
    
    /*$.getJSON( options.url, function(){
        // success #1
    })*/
    
    Blu.log( options.url );
    
    $.ajax({
        url         : options.url,
        dataType    : 'json',
        timeout     : 10000,
        tryCount    : 0,
        retryLimit  : 3
    })
    
    /*
     * Succès de la requête
     */
    .success( function( json, status, xhr ) {
        
        Blu.log( 'status XHR : ' + status );
        
        json.results    = json.results || [];
        json.next_page  = json.next_page || ''; // Ex : "?page=3&max_id=190000449204658176&q=knowtex&rpp=100&include_entities=1"

        // Concaténation des tweets récupérés
        options.tweets = options.tweets.concat( json.results );
        Blu.counts.tweets.alltime += json.results.length;

        // Log
        Blu.log( json );
        Blu.log( '[' + json.page + '] ' + options.twQuery + " >> " + json.results.length + " tweets." );

        if( options.showNotifications ) {
            Blu.fn.UI.notification({ 'message' : options.tweets.length + " tweets loaded...", 'type' : 'info', 'id' : 'grabbing-tweets' });            
        }

        // Requête suivante
        var _next_page_missing  = ( json.next_page === "" && json.page == 1 && json.results.length > 0.90*options.rpp ),
            _continue           = ( ( json.next_page || _next_page_missing ) && json.page < options.max_pages );
        if( _next_page_missing ) {
            Blu.warn("Le paramètre next_page est vide (bug de l'API Twitter)");
        }
        options.url = options.url_base;
        options.url += !_next_page_missing ? json.next_page + '&callback=?' : options.url_params + "&page=" + (json.page+1);


        //Sauvegarde des tweets sur le serveur
        Blu.fn.tweets.grab.save( options, json );

        // Lancement d'une nouvelle requête ou fin de la récupération
        if( _continue ) {
            Blu.fn.tweets.grabViaSearchAPI_request( options );
        } else {
            Blu.is.grabbingTweets = false;
            Blu.fn.tweets.callbackAfterSearchAPI( options );
        }
    })
    
    /* 
     * Erreur de la requête
     */
    .error( function( xhr, textStatus, errorThrown ) { 
        
        Blu.warn("Problème avec la requête à la Search API.");
        Blu.log('Text Status : ' + textStatus);
        Blu.log('xhr.status = ' + xhr.status);
        Blu.warn( errorThrown );
        Blu.log(this);
        
        if( xhr.status == 500 ) {
            Blu.warn('Il semble y avoir un problème du serveur (erreur 500), veuillez réessayer plus tard.');
        }
            
        if( 1 /*textStatus === 'timeout'*/ ) {

            this.tryCount++;

            // Nouvel envoi de la requête Ajax
            if( this.tryCount <= this.retryLimit ) {

                Blu.warn('On relance la requête Ajax à la Search API... (' + this.tryCount + '/' + this.retryLimit + ')');
                Blu.fn.tweets.grabViaSearchAPI_request( options );
                //$.ajax( this );
                //this.abort();
                
                return;
            }

            Blu.warn('La requête Ajax à la Search API été exécutée ' + this.retryLimit + ' fois et il y a toujours un problème... on arrête.');

            return;
        }
        
        
    });
};


/**
 * Sauvegarde de tweets récupérés en Ajax
 */
Blu.fn.tweets.grab.save = function( options, data ) {

    var _request = $.ajax({
        type    : "POST",
        url     : Blu.app.urls.ajax_base,
        data : { 
            "action"        : "save-tweets", 
            "project_id"    : Blu.projects.current.id, 
            "tweets"        : data.results // JSON.stringify( data.results )
            // TODO : utiliser json2.js pour les vieux navigateurs (https://github.com/douglascrockford/JSON-js)
        },
        dataType : "json",
        timeout     : 30000,
        tryCount    : 0,
        retryLimit  : 3,
        success: function( data2, status, request ) {
            
            Blu.log( 'status XHR : ' + status );

            request.isDone = true;
            Blu.ajax.countSavedTweets += data.results.length;

            // Sauvegarde OK
            Blu.info( data.results.length + ' tweets sauvegardés.' );

        },
        error : function( xhr, textStatus, errorThrown ) { // cf http://zeroedandnoughted.com/defensive-ajax-and-ajax-retries-in-jquery/
            
            Blu.warn('status XHR : error');
            
            if( textStatus === 'timeout' ) {
                
                this.tryCount++;
                
                // Nouvel envoi de la requête Ajax
                if( this.tryCount <= this.retryLimit ) {
                    
                    Blu.warn('On relance la requête Ajax...');
                    var _request2 = $.ajax( this );
                    Blu.ajax.saveRequests.push( _request2 );
                    this.isDone = true;

                    return;
                }
                
                Blu.warn('La requête Ajax été exécutée ' + this.retryLimit + ' fois et il y a toujours un problème... on arrête.');
                
                return;
            }
            if( xhr.status == 500 ) {
                Blu.warn('Il semble y avoir un problème du serveur (erreur 500), veuillez réessayer plus tard.');
            } else {
                Blu.warn('Il y a un problème avec la requête Ajax... :/');
            }
        }
    });

    Blu.ajax.saveRequests.push( _request );
    
};


/**
 * Traitement des tweets après la récupération via la Search API
 * @param options
 */
Blu.fn.tweets.callbackAfterSearchAPI = function( options ) {
    
    if( options.showNotifications ) {
        Blu.fn.UI.notification({'id' : 'grabbing-tweets', 'delayOut' : 1});    
    }
    
    Blu.info('Blu.fn.tweets.callbackAfterSearchAPI()');
    
    
    // Traitement des tweets avant fusion
    for( var i in options.tweets ) {
        options.tweets[i].isFromTwitterAPI = true;
    }
    Blu.fn.tweets.process.basic( options.tweets );
    
    // Fusion des tweets
    Blu.tweets = Blu.tweets.concat( options.tweets );
    
    // Tri des tweets
    Blu.tweets.sort( Blu.fn.misc.sortLastTweets );
    
    // Filtrage des tweets : tous les tweets sont affichés
    Blu.timeline.params.filter.string = '';
    Blu.fn.tweets.filter();

    // Affichage des tweets
    if( !options.backgroundTask ) {
        Blu.fn.tweets.showList();
    }
    
    // Lancement de la création du graphe à la fin de la sauvegarde des tweets
    Blu.timers.waitingForTweets = setInterval( function() { Blu.fn.tweets.grab.waitingForTweets( options ); }, 100 );
    
};

/**
 * Callback pendant et après la sauvegarde des tweets
 */
Blu.fn.tweets.grab.waitingForTweets = function( options ) {

    // On attend la fin des requêtes Ajax envoyant les tweets au serveur
    for( var i in Blu.ajax.saveRequests ) {
        
        if( ! Blu.ajax.saveRequests[i].isDone ) {
            
            if( options.showNotifications ) {
                Blu.fn.UI.notification({
                    'message'   : "Synchronizing tweets... (" + Blu.ajax.countSavedTweets + ")",
                    'type'      : 'info', 
                    'id'        : 'syncing-tweets'
                });
            }
            
            return;
        }
    }

    Blu.log('Fin des requêtes Twitter.');

    // Suppression du timer
    clearInterval( Blu.timers.waitingForTweets );
    
    
    /* 
     * Création du graphe
     */
    var _needNewGraph = true || ( options.tweets.length > 0 );
    
    if( options && options.create_graph && _needNewGraph ) {
        Blu.fn.project.createGraph( options ); 
    }
    
};

/**
 * Création du graphe du projet et affichage
 */
Blu.fn.project.createGraph = function( options ) {
    
    options = options || {};
    
    if( options.showNotifications ) {
        Blu.fn.UI.notification({
            'message'   : "Calculating graph...",
            'id'        : 'syncing-tweets'
        });
    }

    /*
     * Création du graphe
     */
    Blu.fn.map.createGraph( {}, function( json ) {

        Blu.info('Graphe calculé');

        if( json.graph ) {
            
            if( options.showNotifications ) {
                Blu.fn.UI.notification({ 'message' : "Loading graph...", 'type' : 'ok', 'id' : 'syncing-tweets', 'delayOut' : 2 });
            }
            
            // Chrono
            if( Blu.app.getParams.chrono && Blu.chrono ) {
                Blu.chrono['Create graph (stop)'] = new Date();
                var _timeTweets = ( Blu.chrono['Create graph (start)'] - Blu.chrono['Loading tweets (start)'] )/1000,
                    _timeGraph  = ( Blu.chrono['Create graph (stop)'] - Blu.chrono['Create graph (start)'] )/1000,
                    _timeTotal  = ( Blu.chrono['Create graph (stop)'] - Blu.chrono['Loading tweets (start)'] )/1000;
                Blu.fn.UI.popupWindow.open({
                    'title'     : 'Temps de calcul',
                    'content'   : '<p class="align-right">' +
                                    'Récupération des tweets : ' + _timeTweets + 's' + '<br/>' + 
                                    'Calcul du graphe : ' + _timeGraph + 's' + '<br/>' + 
                                    '>> Temps total : ' + _timeTotal + 's' +
                                  '</p>'
                });
            }
            
            // Chargement automatique du graphe
            if( !options.backgroundTask ) {
                
                Blu.fn.map.chargeGraphe( json.graph );
                
            // Ou affichage du lien pour afficher le graphe
            } else {
                                    
                // Graphe bien calculé
                if( json.graph.filename ) {
                    
                    Blu.fn.UI.showGraphNotif({ 'html' : '<a href="#">' + 'Refresh graph' + '</a>', 'cssClass' : 'refresh' });
                    
                    $('#graph-notif').find('a').data( 'graph', json.graph );
                    
                // Problème : pas de graphe
                } else {
                    
                    Blu.fn.UI.removeGraphNotif();
                    
                }
                
                
            }
            
        } else {

        }
        
        $('#zonecentre').spinStop();
        
    });    
    
};


/**
 * Récupération des tweets d'un projet via la Search API (côté client)
 */
Blu.fn.project.grabTweetsViaSearchAPI = function( options ) {

    var _project = Blu.projects.current,
        _queries = {
            'search'        : _project.query,
            'search-user'   : '@' + _project.twitter_screen_name + ' OR from:' + _project.twitter_screen_name
        };
    
    if( _project.type !== 'search' && _project.type !== 'search-user' ) {
        return;
    }

    // Paramètres de recherche
    var _defaults = {
        since_id            : 0,
        rpp                 : 100,
        dataset             : 'global',
        twQuery             : _queries[ _project.type ],
        page                : 1,
        lang                : '',
        max_pages           : Blu.config.tweets.max_pages,
        url_base            : 'http://search.twitter.com/search.json',
        tweets              : [],
        create_graph        : false,
        showNotifications   : true,
        backgroundTask      : false
    };
    
    options = $.extend( _defaults, options || {} );
    
    Blu.fn.tweets.grabViaSearchAPI( options );

};  // Fin de Blu.fn.project.grabTweetsViaSearchAPI

   
/**
 * Récupération de nouveaux tweets (côté client pour search/search-user, côté serveur pour home-timeline)
 * @param {Object} options
 */
Blu.fn.project.grabNewTweets = function( options ) {
    
    // Cas problématiques
    if( !Blu.projects.current ) {
        Blu.fn.UI.notification({'message' : "Please create a project.", 'type' : 'fail', 'delayOut' : 5});
        return;
    }    
    if( Blu.is.grabbingTweets ) {
        Blu.fn.UI.notification({
            'message'   : "Bluenod is loading your tweets, please wait... :)", 
            'type'      : 'warning', 
            'delayOut'  : 5
        });
        return;
    }
    
    var _clientSide = ( Blu.projects.current.type === 'search' || Blu.projects.current.type === 'search-user' ) && Blu.config.tweets.grabClientSide;
    
    // API côté client
    if( _clientSide ) {
        
        Blu.fn.project.grabTweetsViaSearchAPI( { 'since_id' : Blu.fn.tweets.getLastTweetId(), 'create_graph' : true } );
        
    // API côté serveur
    } else {
        
        var _p = Blu.fn.project.ajaxParams();
        
        // Chrono (test nombre de tweets par graphe)
        if( Blu.app.getParams.limitTweets ) {
            _p.limitTweets = Blu.app.getParams.limitTweets;
            Blu.chrono = {};
            Blu.chrono['Loading tweets (start)'] = new Date();
        }
        
        if( options.showNotifications ) {
            Blu.fn.UI.notification({'message' : "Loading tweets...", 'type' : 'info', 'id' : 'grab-tweets'});
        }
        
        
        $.getJSON( Blu.app.urls.main + '/projects/refresh-tweets', _p, function( json ) {
            
            if( json.success ) {
                
                if( options.showNotifications ) {
                    Blu.fn.UI.notification({ 'message' : json.message, 'type' : 'ok', 'id' : 'grab-tweets', 'delayOut' : 4 });
                }
                
                // S'il y a des tweets nouveaux tweets
                if( json.count_new_tweets > 0 ) {
                    
                    Blu.fn.project.loadNewTweetsFromDb();

                    // Calcul du graphe
                    if( !Blu.graphs.current.filename || options.create_graph ) {
                        Blu.chrono['Create graph (start)'] = new Date();
                        Blu.fn.project.createGraph( options );
                    }
                    
                } else {
                    
                    Blu.fn.UI.showCanvasScreen({ error : true, no_tweets : true });
                    
                }
            
            } else {
                
                if( options.showNotifications ) {
                    Blu.fn.UI.notification({ 'message' : json.message, 'type' : 'fail', 'id' : 'grab-tweets', 'delayOut' : 8 });
                }
            }

        });
        
    }
    
};  // Blu.fn.project.grabNewTweets


/**
 * Chargement des nouveaux tweets sauvegardés dans la BDD
 */
Blu.fn.project.loadNewTweetsFromDb = function() {
    
    var _tweetid_min = 0;
    
    if( Blu.tweets.length > 0 && Blu.tweets[0].id ) {
        _tweetid_min = Blu.tweets[0].id;
    }
    if( Blu.newTweets.length > 0 && Blu.newTweets[0].id ) {
        _tweetid_min = Blu.newTweets[0].id;
    }

    Blu.fn.tweets.load({'tweetid_min' : _tweetid_min});
    
};


/**
 *  Récupère la liste des tweets en JSON, puis les traite et les affiche (ou pas)
 */
Blu.fn.tweets.load = function( options ) {
    
    if( Blu.config.mapOnly ) {
        return;
    }
    
    options             = options || {};
    options.tweetid_min = options.tweetid_min    || 0;
    options.tweetid_max = options.tweetid_max    || 0;
    options.time_max    = options.time_max       || 0;
    options.limit       = ( typeof options.limit !== 'undefined' ) ?  options.limit   : Blu.config.tweets.loadLimit;
    options.show        = ( typeof options.show !== 'undefined' ) ?   options.show    : false;
    
    Blu.info('Blu.fn.tweets.load() with params = ');
    Blu.log( options );
    
    //$('.tweets-list').addClass('loading');
    if( !Blu.counts.tweets.filter /*Blu.tweets.length < 1*/ ) {
        //$('.panel.tweets').spin('small');
    }
    Blu.is.loadingTweets = true;
    
    var _p = Blu.fn.project.ajaxParams();
    
    _p['action'] = 'list-some-tweets';
    _p['params'] = options;
    
    /*
     * Chargement des tweets en Ajax
     */
    $.getJSON(
        Blu.app.urls.ajax_base, 
        _p, 
        function( json ) {
            
            Blu.has.loadedTweets = true;
            
            $('.tweets-list').spinStop();
            
            // Pas de (nouveaux) tweets, on s'en va
            if( !json || !json.tweets || json.tweets.length < 1 ) {
                Blu.is.loadingTweets = false;
                return;
            }
            
            // Premiers ou nouveaux tweets ?
            var isFirstTweets = ( Blu.tweets.length < 1 );

            // Total des tweets
            if( isFirstTweets ) {
                Blu.counts.tweets.alltime   = parseInt( json.count_all_tweets, 10 );
                Blu.counts.tweets.filter    = parseInt( json.count_all_tweets, 10 );
            } else {
                //Blu.counts.tweets.alltime += json.tweets.length;
            }            


            /*
             * Sauvegarde dans le DOM des tweets récupérés
             */

            // Traitement des tweets
            Blu.fn.tweets.process.basic( json.tweets );
            
            // Intervalle de temps/ID des tweets récupérés
            Blu.intervals.push({ 
                'min' : { 
                    'id'        : json.tweets[ json.tweets.length - 1 ].id,
                    'date'      : json.tweets[ json.tweets.length - 1 ].created_at,
                    'date_utc'  : json.tweets[ json.tweets.length - 1 ].created_at_utc
                },
                'max' : {
                    'id'        : json.tweets[0].id, 
                    'date'      : json.tweets[0].created_at,
                    'date_utc'  : json.tweets[0].created_at_utc
                }
            });            
            Blu.fn.tweets.mergeIntervals();
            
            // [1] Premiers tweets
            if( isFirstTweets ) {
                
                //Blu.log('First tweets loaded');
                
                // Sauvegarde des tweets
                Blu.tweets = json.tweets;
                
            // [2] Nouveaux ou anciens tweets
            } else {
                
                // [a] Ajout des nouveaux tweets au début
                if( options.tweetid_min /*&& Blu.config.tweets.getNew*/ ) {
                    Blu.fn.tweets.process.newTweets( json );
                }
                
                // [b] Ajout des anciens tweets à la fin de Blu.tweets
                if( options.tweetid_max || options.time_max ) {
                    Blu.fn.tweets.process.oldTweets( json );
                }
                
                /* TODO : si on a un min et un max ? */
            }
            
            // Users
            Blu.fn.users.fillAll( json.tweets );
            
            // Filtrage des tweets : tous les tweets sont affichés
            Blu.timeline.params.filter.string = '';
            Blu.fn.tweets.filter();

            // Affichage des tweets
            if( options.show || isFirstTweets ) {
                Blu.fn.tweets.showList();
            }

            Blu.is.loadingTweets = false;
            
        }
    );
    
};  // Fin de Blu.fn.tweets.load()



Blu.fn.tweets.process = {};

/**
 * Traitement des tweets après sauvegarde dans le DOM
 */
Blu.fn.tweets.process.basic = function( tweets ) {

    for( var i in tweets ) {
        Blu.fn.tweet.process( tweets[i] );    
    }
};

/**
 * Traitement d'un tweet
 * @param {Object} tweet
 */
Blu.fn.tweet.process = function( tweet ) {
    
    // Tweet déjà traité
    if( tweet.isReady ) {
        return tweet;
    }
    
    /*
     * Traitement de la date du tweet
     * Format issu de Twitter : "Thu, 19 Jul 2012 09:11:21 +0000")
     * Format issu du serveur Bluenod : "2013-02-08 18:00:00" (heure de Paris)
     */
    if( !tweet.id_str ) {
        tweet.dateObj = tweet.created_at_utc ? 
                            Blu.fn.misc.dateStringToObject( tweet.created_at_utc, 0 ) : 
                            Blu.fn.misc.dateStringToObject( tweet.created_at );
    } else {
        tweet.dateObj = new Date( tweet.created_at ); // provient directement de l'API Twitter (via JS)
    }

    // Textes pour les dates des tweets
    if( typeof( tweet.texte_date ) != "undefined" ) {
        var _date = new Date( tweet.seconds * 1000 );
        tweet.texte_date    = Blu.fn.misc.texteJour( _date ) + " " + Blu.fn.misc.texteHeure( _date );
    }


    // Copie de l'ID (string) si le tweet vient de l'API
    if( tweet.id_str ) {
        tweet.id = tweet.id_str;
    }
    
    // Traitement du tweet : terminé
    tweet.isReady = true;
    
    return tweet;
};

/**
 * Traitement des nouveaux tweets
 */
Blu.fn.tweets.process.newTweets = function( json ) {
    
    Blu.newTweets = json.tweets.concat( Blu.newTweets );
    
    Blu.fn.tweets.process.basic( Blu.newTweets );

    Blu.fn.UI.notifNewTweets();
    
};
/**
 * Affichage des nouveaux tweets
 */
Blu.fn.UI.notifNewTweets = function() {
    
    var _countNew = Blu.newTweets.length;

    if( !_countNew ) {
        return;
    }
    
    // Titre de la page
    //document.title = '(' + _countNew + ') ' + Blu.app.titlePage;
    
    // Pas de notification si un user est affiché (aka les tweets sont filtrés)
    if( Blu.timeline.params.filter.string || $('.profile-info .profile-image-aside').length ) {
        return;
    }
    
    var _message     = ( _countNew > 1 ) ? Blu.txt( 'notifNewTweets', _countNew ) : Blu.txt('notifNewTweet'),
        _listTweets  = $('#panels .panel.tweets .tweets-list'),
        _li_message  = _listTweets.find('.new-tweets');
    
    // Message "x new tweets"
    if( _li_message.length ) {
        _li_message.html( '<a href="#">' + _message + '</a>' );
    } else {
        _listTweets.prepend( '<li class="new-tweets"><a href="#">' + _message + '</a></li>' );
    }


};

/**
 * Traitement des anciens tweets
 */
Blu.fn.tweets.process.oldTweets = function( json ) {
    
    //Blu.tweets = Blu.tweets.concat( json.tweets );

    /*Blu.tweets.sort( function(a,b ) {
        return b.seconds - a.seconds;
    });*/                    

    // Ajout des anciens tweets en évitant de créer des éventuels doublons
    var _tweetsIds = [],
        isKnown,
        i, j;
        
    for( i in Blu.tweets ) {
        isKnown = false;
        for( var j in _tweetsIds ) {
            if( Blu.tweets[i].id == _tweetsIds[j] )
                isKnown = true;
        }
        if( !isKnown ) {
            _tweetsIds.push( Blu.tweets[i].id );
        }
    }
    for( i in json.tweets ) {
        isKnown = false;
        for( j in _tweetsIds ) {
            if( json.tweets[i].id == _tweetsIds[j] )
                isKnown = true;
        }                
        if( !isKnown ) {
            Blu.tweets.push( json.tweets[i] );
        }                        

    }    
};



/**
 * Affichage des nouveaux tweets
 */
Blu.fn.tweets.showNewTweets = function() {
    
    var _listTweets = $('#panels .panel.tweets .tweets-list'),
        _notif_li   = _listTweets.find('.new-tweets');
        
    Blu.counts.tweets.alltime = parseInt( Blu.counts.tweets.alltime, 10 ) + Blu.newTweets.length;

    // Ajout des nouveaux tweets avec le reste des tweets
    Blu.tweets = Blu.newTweets.concat( Blu.tweets );
    
    // Reset des nouveaux tweets
    Blu.newTweets = [];
    
    // Suppression du message "x new tweets"
    if( _notif_li.length ) {
        _notif_li.remove();
    }
    
    // Filtrage et affichage des tweets
    Blu.timeline.params.filter.dates.max = ( new Date() ); // filtrage jusqu'à maintenant et non la date max du graphe
    Blu.fn.tweets.filter();
    Blu.fn.tweets.showList();
    
    // Restauration du titre de la page sans compteur
    //document.title = Blu.app.titlePage;
    
    // Bouton refresh
    if( Blu.config.clientMode ) {
        $('#refreshTweets').show();
    }
};

/**
 * Chargement des timestamps
 */
Blu.fn.timestamps.load = function() {
    
    if( !Blu.needs.timestamps ) {
        return;
    }
    
    Blu.warn('Initializing timestamps...');
    
    // Timer
    Blu.fn.timers.resetInterval('loadTimestamps');
    Blu.timers.loadTimestamps = setInterval( function() {

        if( Blu.needs.lastGraph && !Blu.has.loadedGraph ){
            return;
        }
        
        // Suppression du timer
        Blu.fn.timers.resetInterval('loadTimestamps');
        
        // Chargement des timestamps
        Blu.fn.timestamps.getAll();

    }, 100 );
};

/**
 * Chargement de la Time Machine (timer)
 */
Blu.fn.timemachine.load = function() {
    
    if( !Blu.config.timemachine.activated ) {
        Blu.warn('Time Machine not activated.');
        return;
    }
    
    Blu.warn('Initializing Time Machine...');
    
    Blu.timemachine.initialized = false;
    
    // Initialisation de l'interface
    Blu.fn.timemachine.initInterface();
    
    // Timer
    Blu.fn.timers.resetInterval('initTM');
    Blu.timers.initTM = setInterval( function() {

        if( Blu.needs.timestamps && !Blu.has.loadedTimestamps || 
            !Blu.has.loadedTweets || 
            Blu.needs.allGraphs && !Blu.has.loadedAllGraphs ){
            //Blu.info('Time Machine : waiting for initialization');
            return;
        }
        
        // Suppression du timer
        Blu.fn.timers.resetInterval('initTM');
        
        // Initialisation de la Time Machine
        Blu.fn.timemachine.init();
        
        Blu.info('Time Machine is now initialized.');

        // Curseur du graphe en cours
        Blu.fn.timemachine.currentGraphCursor();
        
        // Curseurs des autres graphes
        if( Blu.config.timemachine.hasArchive && Blu.timeNav.mode === 'archive' && !Blu.config.timeNavGlobal ) {
            Blu.fn.timemachine.createAllGraphCursors();
        }
        
        // Tracé de la TM
        Blu.fn.timemachine.trace();

    }, 100 );
};

/**
 * Initialisation de la Time Machine
 */
Blu.fn.timemachine.init = function() {
        
    Blu.log('timemachine.init()');

    // Initialisation de l'interface
    //Blu.fn.timemachine.initInterface();
    
    // Timeline
    Blu.fn.timeline.traceTimeline(); // Tracé
    Blu.timeline.cursors = []; // Curseurs
    Blu.fn.timemachine.trace(); // Tracé TM : curseurs
    
    // Initialisation terminée
    Blu.timemachine.initialized = true;
    
    // Affichage 
    $('#time-machine').spinStop();
    
}; // Fin de Blu.fn.timemachine.init()

/**
 * Initialisation des blocs / boutons de l'interface de la Time Machine
 */
Blu.fn.timemachine.initInterface = function() {
    
    var _tmZone         = $('#timemachine-zone'),
        _tm             = _tmZone.find('#time-machine'),
        _tmSideLeft     = _tmZone.find('.tm-side.left'),
        _canvas         = _tm.find('#mini-timeline'),
        _tmTitle        = _tmZone.find('#tm-title'),
        _tip            = _tmZone.find('#time-machine-tip'),
        _date           = _tmZone.find('#time-machine-date');

    if( Blu.config.timeline.autoWidth ) {
        var _graphHeader = $('#graph-header'),
            _countTweets = _graphHeader.find('.count-tweets-alltime'),
            _tmZoneWidth = _graphHeader.width() - _countTweets.outerWidth();
            
        Blu.timeline.mini.width = _tmZoneWidth - 2 * _tmSideLeft.outerWidth();
    }
    
    _tmZone.css({
        'width' : ( Blu.timeline.mini.width + 2 * _tmSideLeft.outerWidth() ) + 'px'
    });
    _tmZone.show();
    
    // Dimensions du canvas
    _canvas.attr({
        'width'   : Blu.timeline.mini.width,
        'height'  : Blu.timeline.mini.height
    });
    _tm.css({
        'width'   : Blu.timeline.mini.width + 'px',
        'height'  : Blu.timeline.mini.height + 'px'
    });
    
    //_tm.spin('small');
    
    // Titre de la Time Machine
    if( !_tmTitle.length ) {
        _tm.prepend(
            '<ul id="tm-title">' + 
                '<li class="interval min"></li>' + 
                '<li class="graph min"></li>' + 
                '<li class="graph max"></li>' + 
                '<li class="interval max"></li>' + 
                '<li class="timetravel"></li>' + 
            '</ul>'
        );
    }
    /*_tip
        /*.css({
            width   : ( Blu.timeline.mini.width + 2 ) + 'px',
            width   : ( parseInt( Blu.timeline.mini.width / 2, 10 ) ) + 'px'
        })*/
        /*.text( Blu.txt('timeMachineTip') )
        .click( function() {
            if( !$(this).hasClass('past') ) {
                return false;
            }
            Blu.fn.timemachine.backToThePresent();
        })
        .hover( function() {
            if( !$(this).hasClass('past') ) {
                $(this).text( Blu.txt('timeMachineTipHover') );
            }
        })
        .mouseout( Blu.fn.timemachine.displayTip );*/
        
        
    /*
     * Message au survol de la Time Machine
     */
    _tm
        /*.hover( function() {
            _tip.text( Blu.txt('timeMachineTipHover') );
        })*/
        .mouseout( Blu.fn.timemachine.displayTip );
    
    // Légende (date)
    /*if( !_date.length ) {
        _tm.before('<div id="time-machine-date"></div>');        
    }*/
    /*_date.css({
        //'width'   : ( Blu.timeline.mini.width + 2 ) + 'px'
        //'width'   : ( parseInt( Blu.timeline.mini.width / 2, 10 ) ) + 'px'
    });*/
    
};


/**
 * Ajout sur la mini-timeline d'un curseur à un temps donné
 */
Blu.fn.timemachine.setCursor = function( id, time, timeBegin ) {
    
    var _newCursor = {
        'time'          : time,
        'timeBegin'     : timeBegin || 0,
        'id'            : id,
        'isHovered'     : false
    };
    
    if( id === 'graph' ) {
        
        if( !Blu.timeline.cursors.graphs ) {
            Blu.timeline.cursors.graphs = [];
        }
        Blu.timeline.cursors.graphs.push( _newCursor );
        
    } else {
        Blu.timeline.cursors[ id ] = _newCursor;
    } 
    
    //Blu.info('New cursor "' + id + '" : ' + JSON.stringify( _newCursor ) );
};


/**
 * Suppression sur la mini-timeline d'un curseur
 */
Blu.fn.timemachine.deleteCursor = function( id ) {
    
    if( !Blu.timeline.cursors ) {
        return;
    }
    
    if( typeof( Blu.timeline.cursors[ id ] ) !== 'undefined' ) {
        delete Blu.timeline.cursors[ id ];
    }
    
};


/**
 * Création des curseurs de type "graph"
 */
Blu.fn.timemachine.createAllGraphCursors = function(){

    for( var i in Blu.graphs.all ) {
        
        var _graph      = Blu.graphs.all[i],
            _timeMax    = _graph.datesObj.max.getTime() / 1000,
            _timeMin    = _graph.datesObj.min.getTime() / 1000;
        
        Blu.fn.timemachine.setCursor( 'graph', _timeMax, _timeMin );
        
    }


};


/**
 * Ajout sur la mini-timeline du curseur correspondant au graphe en cours
 */
Blu.fn.timemachine.currentGraphCursor = function() {
    
    var _graph = Blu.graphs.current;
    
    if( !_graph ) {
        return;
    }
    
    var _dateMin        = _graph.datesObj.min,
        _dateMax        = _graph.datesObj.max,
        _projectDateMax = Blu.fn.misc.dateStringToObject( Blu.projects.current.dates.max );
    
    // Si date max du graphe est après celle du projet
    if( _dateMax.getTime() > _projectDateMax.getTime() && _projectDateMax.getTime() > 0 ) {
        _dateMax = _projectDateMax;
    }
    
    Blu.fn.timemachine.setCursor( 'current', _dateMax.getTime() / 1000, _dateMin.getTime() / 1000 );
    
};


/**
 * Rendu d'un curseur
 * @param cursor
 */
Blu.fn.timemachine.renderCursor = function( cursor ) {
    
    var _canvas     = Blu.canvas_timemachine.ctx,
        _xCursor, _xFuture, _xBegin, _xPast,
        _tm         = $('time-machine'),
        _tmTitle    = $('#tm-title'),
        _timetravel = _tmTitle.find('.timetravel'),
        _graphMin   = _tmTitle.find('.graph.min'),
        _graphMax   = _tmTitle.find('.graph.max');
    
    _xCursor    = Blu.fn.timeline.timeToX( cursor.time, true );
    _xBegin     = cursor.timeBegin ? Blu.fn.timeline.timeToX( cursor.timeBegin, true ) : -10;

    Blu.fn.timemachine.displayDate();

    _tm.css( 'cursor', 'default' );
    
    switch( cursor.id ) {

        /*
         * Curseur courant
         */
        case 'current':

            if( Blu.config.timeline.style.plotWave ) {
                break;
            }
            
            _canvas.strokeStyle = Blu.timemachine.colors.currentTime;
            _canvas.lineWidth   = 2;
            //_canvas.fillStyle   = Blu.config.timeline.style.bgNotSelected;

            // Borne supérieure (et futur)
            //_xFuture = Blu.timeline.mini.width + 100; // futur (on ne doit pas voir le côté droit du rectangle)
            _canvas.beginPath();
            _canvas.moveTo( _xCursor, -10 );
            _canvas.lineTo( _xCursor, Blu.timeline.mini.height + 10 );
            _canvas.closePath();
            _canvas.stroke();

            _graphMax.css( {'left' : Math.max( 0, _xCursor - _graphMax.outerWidth() )} );

            // Borne inférieure (et passé)
            if( Blu.config.timeline.style.cursorBegin ) {
                
                _canvas.beginPath();
                _canvas.moveTo( _xBegin, -10 );
                _canvas.lineTo( _xBegin, Blu.timeline.mini.height + 10 );
                _canvas.closePath();
                _canvas.stroke();
                
                _graphMin.css( {'left' : Math.max( 0, _xBegin - _graphMin.outerWidth() )} );

            }
            

            break;

        /*
         * Curseur de la Time Machine
         */
        case 'timetravel':
            
            if( ! Blu.timeline.cursors.graphs ) {
                
                _canvas.strokeStyle  = Blu.timemachine.colors.timeTravel;
                _canvas.lineWidth    = 1;

                _canvas.beginPath();
                _canvas.moveTo( _xCursor, -10 );
                _canvas.lineTo( _xCursor, Blu.timeline.mini.height + 10 );
                //_canvas.dashedLineTo( _xCursor, -10, _xCursor, Blu.timeline.mini.height + 10, [2, 0] );
                _canvas.closePath();
                _canvas.stroke();

                _timetravel.css( {'left' : Math.max( 0, _xCursor - _timetravel.outerWidth() )} ).show();
                
            }
            
            break;

        /*
         * Curseur de la Time Machine
         */
        case 'graph':
            
            _canvas.strokeStyle  = cursor.isHovered ? Blu.timemachine.colors.graphHover : Blu.timemachine.colors.graph;
            _canvas.lineWidth    = 1;

            // Survolé
            if( cursor.isHovered ) {
                
                // Max
                _canvas.beginPath();
                //_canvas.moveTo( _xCursor, -10 );
                //_canvas.lineTo( _xCursor, Blu.timeline.mini.height + 10 );
                _canvas.dashedLineTo( _xCursor, -10, _xCursor, Blu.timeline.mini.height + 10, [2, 3] );
                _canvas.closePath();
                _canvas.stroke();
                
                // Min
                _canvas.beginPath();
                //_canvas.moveTo( _xBegin, -10 );
                //_canvas.lineTo( _xBegin, Blu.timeline.mini.height + 10 );
                _canvas.dashedLineTo( _xBegin, -10, _xBegin, Blu.timeline.mini.height + 10, [2, 3] );
                _canvas.closePath();
                _canvas.stroke();
                
                _tm.css( 'cursor', 'pointer' );
                
            // Non survolé
            } else {
                
                _canvas.beginPath();
                _canvas.dashedLineTo( _xCursor, -10, _xCursor, Blu.timeline.mini.height + 10, [2, 3] );
                _canvas.closePath();
                _canvas.stroke();
            }
            
            _canvas.closePath();
            _canvas.stroke();


            break;
    }

};

/**
 * Définition des composantes RGBA d'un pixel dans un canvas
 */
Blu.fn.canvas.setPixel = function( imageData, x, y, r, g, b, a) {
    var _index = ( x + y * imageData.width ) * 4;
    imageData.data[_index+0] = r;
    imageData.data[_index+1] = g;
    imageData.data[_index+2] = b;
    imageData.data[_index+3] = a;
};

/**
 * Filtre des pixels en les passant en niveaux de gris
 * @source http://rocha.la/fun-with-pixels-html5-video-canvas
 */
Blu.fn.canvas.grayscale = function( pixels, args ) {
    
    var d = pixels.data;
    
    for( var i=0; i<d.length; i+=4 ) {
        var r = d[i],
            g = d[i+1],
            b = d[i+2];
            
        // CIE luminance for the RGB
        // The human eye is bad at seeing red and blue, so we de-emphasize them.
        var v = 0.2126*r + 0.7152*g + 0.0722*b;
        
        d[i] = d[i+1] = d[i+2] = v;
    }
    
    return pixels;
};


/**
 * Rendu des arrière-plans des curseurs
 */
Blu.fn.timemachine.renderBackgrounds = function() {

    if( typeof Blu.timeline.cursors === 'undefined' /*|| !Blu.timeline.cursors.graphs || !Blu.timeline.cursors.current*/ ) {
        return;
    }
    
    var _canvas         = Blu.canvas_timemachine.ctx,
        _cursorCurrent  = Blu.timeline.cursors.current,
        _cursor,
        _xCursor,
        _xBegin = -10;
        
    _canvas.fillStyle = Blu.config.timeline.style.bgNotSelected;

    // Curseur courant tout seul
    if( !Blu.timeline.cursors.graphs ) {
        
        if( !_cursorCurrent ) {
            return;
        }

        var _x1Cursor    = Blu.fn.timeline.timeToX( _cursorCurrent.timeBegin, true ),
            _x2Cursor    = Blu.fn.timeline.timeToX( _cursorCurrent.time, true );
            
        /*
         * Affichage de la timeline sous forme d'onde : les périodes avant et après le graphe courant sont en gris
         */
        if( Blu.config.timeline.style.plotWave ) {
            
            var _imgData, _grayPixels;
            
            // Avant graphe
            if( _x1Cursor > 0 ) {
                _imgData     = _canvas.getImageData( 0, 0, _x1Cursor, Blu.timeline.mini.height + 10 ),
                _grayPixels  = Blu.fn.canvas.grayscale( _imgData );

                _canvas.putImageData( _grayPixels, 0, 0 );
            }
            
            // Après graphe
            _imgData     = _canvas.getImageData( _x2Cursor, 0, Blu.timeline.mini.width + 10, Blu.timeline.mini.height + 10 ),
            _grayPixels  = Blu.fn.canvas.grayscale( _imgData );

            _canvas.putImageData( _grayPixels, _x2Cursor, 0 );
            
        } else {
            
            // Passé avant borne min
            _canvas.beginPath();
            _canvas.moveTo( _x1Cursor,  -10 );
            _canvas.lineTo( _x1Cursor,  Blu.timeline.mini.height + 10 );
            _canvas.lineTo( -10,        Blu.timeline.mini.height + 10 );
            _canvas.lineTo( -10,        -10 );
            _canvas.closePath();
            _canvas.fill();

            // Futur avant borne max
            _canvas.beginPath();
            _canvas.moveTo( _x2Cursor,                          -10 );
            _canvas.lineTo( _x2Cursor,                          Blu.timeline.mini.height + 10 );
            _canvas.lineTo( Blu.timeline.mini.width + 10,       Blu.timeline.mini.height + 10 );
            _canvas.lineTo( Blu.timeline.mini.width + 10,       -10 );
            _canvas.closePath();
            _canvas.fill();
        }
        
    // Fonds des curseurs des graphes de la TM
    } else {
        
        for( var i in Blu.timeline.cursors.graphs ) {

            _cursor = Blu.timeline.cursors.graphs[i];

            _cursor.hasBG = !( _cursor.isHovered || ( _cursor.timeBegin == _cursorCurrent.timeBegin && _cursor.time == _cursorCurrent.time ) );

            if( !_cursor.hasBG ) {
                continue;
            }

            _xCursor    = Blu.fn.timeline.timeToX( _cursor.time, true );
            _xBegin     = _cursor.timeBegin ? Blu.fn.timeline.timeToX( _cursor.timeBegin, true ) : -10;

            _canvas.beginPath();
            _canvas.moveTo( _xCursor,   -10 );
            _canvas.lineTo( _xCursor,   Blu.timeline.mini.height + 10 );
            _canvas.lineTo( _xBegin,    Blu.timeline.mini.height + 10 );
            _canvas.lineTo( _xBegin,    -10 );
            _canvas.closePath();
            _canvas.fill();

        }
        
    }


};

/**
 * Tracé des curseurs
 */
Blu.fn.timemachine.renderCursors = function() {
    
    var _cursor;
    
    // Curseurs de type "graph"
    if( Blu.timeline.cursors.graphs ) {
        
        for( var i in Blu.timeline.cursors.graphs ) {

            _cursor = Blu.timeline.cursors.graphs[i];
            
            Blu.fn.timemachine.renderCursor( _cursor );

        }
        
    }
    
    // Curseurs "current" et "timetravel"
    for( var i in Blu.timeline.cursors ) {
        
        _cursor = Blu.timeline.cursors[i];
        
        if( i != 'graphs' ) {
            Blu.fn.timemachine.renderCursor( _cursor );
        }

    }    
};


/**
 * Tracé de la mini-timeline de la Time Machine
 */
Blu.fn.timemachine.trace = function() {
    
    //Blu.log('timemachine.trace()');
    
    if( typeof( Blu.canvas_mini.timeline.image ) === 'undefined' || !Blu.canvas_mini.timeline.image ) {
        Blu.warn('Blu.canvas_mini.timeline.image est vide');
        return;
    }
    
    // Copie de l'image de la mini-timeline dans le canvas de la Time Machine
    Blu.canvas_timemachine.ctx.putImageData( Blu.canvas_mini.timeline.image, 0, 0 );
 
    Blu.fn.timemachine.renderBackgrounds();
    
    Blu.fn.timemachine.renderCursors();
    
}; // Fin de Blu.fn.timemachine.trace


/**
 * Survol des curseurs de la TM
 */
Blu.fn.timemachine.hoverCursors = function( mouseCoord ) {
    
    var _timeMouse = Math.round( Blu.fn.timeline.xToTime( mouseCoord.x - $('#mini-timeline').offset().left, true ) );
    
    // Curseur "timetravel"
    Blu.fn.timemachine.setCursor( 'timetravel', _timeMouse );

    if( !Blu.timeline.cursors.graphs ) {
        return;
    }

    // Survol des curseurs de type "graph"
    for( var i in Blu.timeline.cursors.graphs ) {
        
        var _graphCursor = Blu.timeline.cursors.graphs[i];
        
        _graphCursor.isHovered = ( _timeMouse >= _graphCursor.timeBegin && _timeMouse < _graphCursor.time );
        
    }
    
};

/**
 * Mouvement sur la mini-timeline (au milieu du drag & drop)
 * @param {event} evt
 */
Blu.fn.timemachine.mouseMove = function( evt ) {
    
    // Coordonnées de la souris
    var _coord = {
            x : evt.pageX,
            y : evt.pageY
        },
        _echelle = -Blu.timeline.echelleMiniature;
        
    // Clic glissé
    if( Blu.mouse.dragOn ) {
        // Coordonnées du déplacement à la souris
        Blu.mouse.dragPx.x += ( Blu.mouse.lastPos.x - _coord.x ) / _echelle;
        Blu.mouse.dragPx.y += ( Blu.mouse.lastPos.y - _coord.y ) / _echelle;
        
        // Sauvegarde des coordonnées de la souris
        Blu.mouse.lastPos = _coord;
    }
    
    // Curseur de la souris "main"
    //document.body.style.cursor = "move";

    // Survol des curseurs
    Blu.fn.timemachine.hoverCursors( _coord );
    
    // Tracé de la TM
    Blu.fn.timemachine.trace();

    // Affichage de la date de la Time Machine
    Blu.fn.timemachine.displayDate();
    
}; // Fin de Blu.fn.timemachine.mouseMove()


Blu.fn.timeNav = {};

/**
 * Création de la navigation temporelle
 */
Blu.fn.timeNav.createHtml = function() {
    
    var _ZC         = $('#zonecentre'),
        _timeNav    = $('#time-nav'),
        _html       = '';

    // Création du conteneur HTML
    if( _timeNav.length == 0 ) {
        _ZC.before('<div id="time-nav"></div>');
        _timeNav = $('#time-nav');
    } else {
        return;
    }

    // Initialisation
    Blu.timeNav = {
        'mode'      : Blu.config.timemachine.hasArchive ? 'archive' : 'live',
        'interval'  : Blu.config.timeNavGlobal ? 'custom' : '1day',
        'dates' : {
            'min' : '',
            'max' : ''
        },
        'datesObj' : {
            'min' : '',
            'max' : ''
        }
    };
    
    // Bornes temporelles
    var _now            = new Date(),
        _dateMaxProj    = Blu.fn.misc.dateStringToObject( Blu.projects.current.datesTotal.max ),
        _dateMaxCurr    = ( _dateMaxProj < _now ) ? _dateMaxProj : _now,
        _lastDay        = new Date( _dateMaxCurr.getFullYear(), _dateMaxCurr.getMonth(), _dateMaxCurr.getDate() - 1 );

    Blu.fn.timeNav.calcNewDates( _dateMaxCurr );

    // On cale la timeline sur le dernier jour
    Blu.projects.current.dates = Blu.timeNav.dates;
    

    // Contenu HTML
    _html +=    '<a id="datepicker" class="glyph general" href="#calendar" title="'+ 'Calendar'+ '">i</a>' + 
                '<div id="calendar"></div>' +
                '<ul id="time-prev-next">' + 
                    '<li>' + 
                        '<a class="prev" href="#prev" title="'+ 'Previous day'+ '"><span></span></a>' + 
                    '</li>' +
                    '<li>' + 
                        '<a class="next" href="#next" title="'+ 'Next day'+ '"><span></span></a>' + 
                    '</li>' +
                '</ul>' +
                '<span class="title"></span>';

    _timeNav.css( 'top', _ZC.css('top') );
    _timeNav.html( _html );

    // Apparition grâce au décalage de #zonecentre
    _ZC.animate( {'top' : '+=' + _timeNav.height() + 'px'}, 'slow' );
    
    // Création du calendrier
    var _calendar = $('#calendar');
    _calendar.datepicker({
        dateFormat          : 'yy-mm-dd',
        firstDay            : 1, // lundi = premier jour de la semaine
        onSelect            : Blu.fn.timeNav.calendarSelect,
        hideIfNoPrevNext    : true
    });
    _calendar.datepicker( 'option', 'minDate', Blu.fn.misc.dateStringToObject( Blu.projects.current.datesTotal.min ) );
    _calendar.datepicker( 'option', 'maxDate', _lastDay );
    
    // Mise à jour du HTML
    Blu.fn.timeNav.updateHtml();
    
};

/**
 * Mise à jour du HTML de la navigation temporelle
 */
Blu.fn.timeNav.updateHtml = function() {
    
    var _timeNav    = $('#time-nav'),
        _prevnext   = _timeNav.find('#time-prev-next'),
        _prev       = _prevnext.find('a.prev'),
        _next       = _prevnext.find('a.next'),
        _intervals  = _timeNav.find('#time-interval'),
        _title      = _prevnext.next('.title'),
        _calendar   = $('#calendar');
        
    if( _timeNav.length == 0 ) {
        return;
    }
    
    // Pas d'intervalle
    if( !Blu.timeNav.interval ) {
        
        _prev.addClass('deactivated');
        _next.addClass('deactivated');
        _intervals.find('a.live').addClass('selected');
        
    // Intervalle = jour, etc.
    } else {
        
        _prev.removeClass('deactivated');
        _next.removeClass('deactivated');
        
        var _date_min       = Blu.timeNav.datesObj.min,
            _date_max       = Blu.timeNav.datesObj.max,
            _prev_date      = new Date( _date_min.getFullYear(), _date_min.getMonth(), _date_min.getDate() - 1 ),
            _next_date      = new Date( _date_max.getFullYear(), _date_max.getMonth(), _date_max.getDate() + 1 ),
            _date_min_total = Blu.fn.misc.dateStringToObject( Blu.projects.current.datesTotal.min ),
            _date_max_total = Blu.fn.misc.dateStringToObject( Blu.projects.current.datesTotal.max );
            
        if( _prev_date.getTime() < _date_min_total.getTime() ) {
            _prev.addClass('deactivated');
        }
            
        if( _next_date.getTime() > _date_max_total.getTime() ) {
            _next.addClass('deactivated');
        }
        
    }
    
    // Live
    if( Blu.timeNav.mode === 'live' ) {
                
        //_title.text( 'Right now' );
        
    // Archive
    } else if( Blu.timeNav.mode === 'archive' ) {
        
        _intervals.find( 'a.archive-' + Blu.timeNav.interval ).addClass('selected');
        
        /*var _now = new Date();
        if( _now.getTime() < Blu.timeNav.datesObj.max.getTime() + Blu.timeNav.interval ) {
            _prevnext.find('a.next').addClass('deactivated');
        }*/
                
    }

    // Texte du jour courant
    if( Blu.timeNav.datesObj.min ) {

        _title.text( Blu.fn.misc.dateToTextDate( Blu.timeNav.datesObj.min ) );

        var _precisions = {'1hour':'min',  '1day':'min',  '1week':'day',  '1month':'day'},
            _precision  = _precisions[ Blu.timeNav.interval ],
            _titleTitle =   Blu.fn.misc.dateObjectToString( Blu.timeNav.datesObj.min, _precision ) + ' to ' + 
                            Blu.fn.misc.dateObjectToString( Blu.timeNav.datesObj.max, _precision );
        _title.attr('title', _titleTitle );
        
        _calendar.datepicker( 'setDate', Blu.fn.misc.dateObjectToString( Blu.timeNav.datesObj.min, 'day' ) );
        
    }
    
};

/**
 * Calcul de dates min et max pour la navigation temporelle
 */
Blu.fn.timeNav.calcDates = function( from_date, direction ) {

    var _date_min,
        _date_max,
        _direction = ( typeof direction === 'undefined' ) ? -1 : direction;
        
    if( typeof from_date === 'string' ) {
        from_date = Blu.fn.misc.dateStringToObject( from_date );
    }

    // Calcul des dates min et max du nouvel intervalle de temps
    switch( Blu.timeNav.interval ) {

        case 'custom':
            _date_min = Blu.fn.misc.dateStringToObject( Blu.projects.current.datesTotal.min );
            _date_max = Blu.fn.misc.dateStringToObject( Blu.projects.current.datesTotal.max );
            break;
            
        case '1hour':
            _date_min = new Date( from_date.getFullYear(), from_date.getMonth(), from_date.getDate(), from_date.getHours() + _direction );
            _date_max = new Date( _date_min.getFullYear(), _date_min.getMonth(), _date_min.getDate(), _date_min.getHours() + 1 );
            break;

        case '1day':
            _date_min = new Date( from_date.getFullYear(), from_date.getMonth(), from_date.getDate() + _direction );
            _date_max = new Date( _date_min.getFullYear(), _date_min.getMonth(), _date_min.getDate() + 1 );
            break;

        case '1week':
            // Lundi de la semaine précédente Le dimanche, getDay() = 0 >> on choisit le lundi de la semaine précédente
            var _firstDayWeek = from_date.getDate() + _direction * 7 - from_date.getDay() + 1 + ( ( from_date.getDay() == 0 ) ? -7 : 0 );

            _date_min = new Date( from_date.getFullYear(), from_date.getMonth(), _firstDayWeek );
            _date_max = new Date( _date_min.getFullYear(), _date_min.getMonth(), _date_min.getDate() + 7 );            
            break;

        default:
            return false;
    }

    return {'min' : _date_min, 'max' : _date_max};

};

/**
 * Calcul des nouvelles dates de l'intervalle de temps de la navigation temporelle
 */
Blu.fn.timeNav.calcNewDates = function( from_date, direction ) {
    
    Blu.timeNav.dates = {
        'min' : '',
        'max' : ''
    };
    Blu.timeNav.datesObj = {
        'min' : '',
        'max' : ''
    };
    
    
    var _dates = Blu.fn.timeNav.calcDates( from_date, direction );
    
    if( !_dates ) {
        return;
    }
    
    Blu.timeNav.datesObj = {
        'min' : _dates.min,
        'max' : _dates.max
    };
    
    Blu.timeNav.dates = {
        'min' : Blu.fn.misc.dateObjectToString( _dates.min ),
        'max' : Blu.fn.misc.dateObjectToString( _dshates.max )
    };
    
};

/**
 * Sélection d'un jour sur le calendrier
 */
Blu.fn.timeNav.calendarSelect = function( dateText ) {

    //Blu.log( dateText );

    var _picker     = $('#datepicker'),
        _calendar   = $('#calendar'),
        _from_date  = dateText;
        
        
    // Date en dehors des min/max du projet
    if( dateText < Blu.projects.current.datesTotal.min.substr(0,10) || dateText > Blu.projects.current.datesTotal.max.substr(0,10) ) {
        Blu.warn( dateText + ' is not in [ ' + Blu.projects.current.datesTotal.min + ' , ' + Blu.projects.current.datesTotal.max + ' ]' );
        _calendar.append('<p class="notif-calendar">' + 'Sorry, no data here.'+ '</p>').fadeIn();
        var _notifCalendar = $('.notif-calendar');
        setTimeout( function() {_notifCalendar.fadeOut('slow', function() {_notifCalendar.remove();} );}, 3000 );
        return false;
    }

    _calendar.hide();
    _picker.removeClass('selected');
        
    Blu.timeNav.interval = '1day';
    
    Blu.fn.timeNav.loadFromDate( Blu.fn.misc.dateStringToObject( _from_date ), 0 );
    
    Blu.fn.timeNav.updateHtml();
    
    _calendar.datepicker( 'setDate', dateText );

    return false;
};


/**
 * Chargement d'un ou plusieurs graphes sur une période de temps donnée
 * @param from_date
 * @param direction
 */
Blu.fn.timeNav.loadFromDate = function( from_date, direction ) {
    
    Blu.info('Blu.fn.timeNav.loadFromDate()');
    
    var _ZC = $('#zonecentre');
    
    // Calcul des dates min et max du nouvel intervalle de temps
    Blu.fn.timeNav.calcNewDates( from_date, direction );


    if( !Blu.timeNav.dates.min ) {
        return false;
    }

    Blu.fn.timeNav.updateHtml();


    // Live
    if( 1 /*Blu.timeNav.mode === 'live'*/ ) {

        // Reconfiguration du projet
        Blu.projects.current.dates = Blu.timeNav.dates;

        // Chargement du projet
        Blu.fn.project.loadCurrent();

    // Archive
    } else if( Blu.timeNav.mode === 'archive' ) {
        
        // Récup du graphe (avec calcul si besoin)
        _ZC.spin('big');
        Blu.fn.project.getGraph( Blu.timeNav, function( json ) {

            Blu.info('Méta-données sur le(s) graphe(s) : récupérées');

            if( json.graph ) {

                //Blu.fn.map.chargeGraphe( json.graph );
                Blu.fn.timetravel( json.graph );

            } else {

                Blu.fn.UI.graphNotAvailable();
                //Blu.fn.UI.mapNotification( 'No graph available' );
                _ZC.spinStop();

            }

        });
        
    }

    
    return true;
};

/**
 * Evénements de la navigation temporelle
 */
Blu.fn.timeNav.events = function() {
    
    if( ! Blu.config.timeNavigation ) {
        return;
    }

    var _calendar   = $('#calendar'),
        _datepicker = $('#datepicker');
    
    /*
     * Affichage du calendrier
     */
    _datepicker.live('click', function() {
        
        var _calendar = $('#calendar');
        
        $(this).toggleClass('selected');
        _calendar.toggle();
        
        return false;
        
    });

    /*
     * Navigation temporelle : choix de l'intervalle live/jour/heure/...
     */
    $('#time-interval a').live('click', function() {

        var _a          = $(this),
            _mode       = _a.data('mode'),
            _interval   = _a.data('interval'),
            _ul         = _a.parents('ul'),
            _ZC         = $('#zonecentre'),
            _prevnext   = $('#time-prev-next');

        // UI
        _ul.find('a').removeClass('selected');
        _a.addClass('selected');

        // Paramètres
        Blu.timeNav.mode     = _mode;
        Blu.timeNav.interval = _interval;


        // Live
        if( _mode === 'live' ) {

            Blu.fn.project.getLastGraph();

            Blu.fn.timeNav.updateHtml();

        // Archive
        } else if( _mode === 'archive' ) {


            var _now = new Date(); // Maintenant (date côté client)

            Blu.fn.timeNav.loadFromDate( _now );
            
        }

        return false;

    });
    
    
    /*
     * Navigation temporelle : précédent/suivant
     */
    $('#time-prev-next a').live('click', function() {

        var _a = $(this);

        if( _a.hasClass('deactivated') ) {
            return false;
        }

        /*if( Blu.timeNav.mode === 'live' ) {
            return false;
        }*/ 

        var _from_date = Blu.fn.misc.dateStringToObject( Blu.timeNav.dates.min ),
            _direction = _a.hasClass('prev') ? -1 : 1;

        Blu.fn.timeNav.loadFromDate( _from_date, _direction );

        return false;

    });


    /*
     * Navigation temporelle : apparition de la liste des jours
     */
    $('#time-nav-selector').live('click', function() {

        var _a          = $(this),
            _listDays   = $('#list-days');

        _a.toggleClass('selected');

        _listDays.toggle();

        return false;

    });

    /*
     * Clic sur la page faisant disparaître certains éléments
     */
    $('#zonecentre, #barre, .panel').click( function(event) {

        var _picker             = $('#datepicker'),
            _calendar           = $('#calendar');
            /*_target             = $(event.target),
            _is                 = _picker.is( _target ),
            _insideContainer    = (_calendar.find( _target )).length;

        if( _is || _insideContainer ) {
            return false;
        }*/
        _calendar.hide();
        _picker.removeClass('selected');
        
    });

    /*
     * Navigation temporelle : choix d'un jour
     */
    $('#list-days a').live('click', function() {

        var _a          = $(this),
            _listDays   = $('#list-days'),
            _selector   = $('#time-nav-selector');

        // UI
        _listDays.find('a').removeClass('selected');
        _a.addClass('selected');
        _selector.removeClass('selected');
        _listDays.hide();
        _selector.find('.title').text( _a.text() );

        // Config des dates
        var _date = Blu.fn.misc.dateStringToObject( _a.data('day') ),
            _monthMax,
            _dateMax;

        _date.setTime( _date.getTime() + 3600*24*1000 );
        _monthMax = (_date.getMonth()+1);
        _monthMax = ( _monthMax < 10 ) ? '0' + _monthMax : _monthMax;
        _dateMax = _date.getFullYear() + '-' + _monthMax + '-' + _date.getDate()

        // Reconfiguration du projet
        Blu.projects.current.dates = {
            'min' : _a.data('day'),
            'max' : _dateMax
        };

        // Chargement du projet
        Blu.fn.project.loadCurrent();    

        return false;

    });    

}; // Fin de Blu.fn.timeNav.events()


/** 
 * Recherche sur les tweets
 * @param {String} _newString requête
 * @param {boolean} _rechNoeud si vrai, centre la carte sur le user cherché
 * @param {boolean} forceSearch force le filtrage de la recherche (sinon on teste si le filtrage a changé)
 */
Blu.fn.tweets.search = function( _newString, _rechNoeud, forceSearch ) {
    
    Blu.info( 'tweets.search > ' + _newString );
    
    var _filter         = Blu.timeline.params.filter,
        _filterTime     = ( _filter.dates.min !== null || _filter.dates.max !== null ),
        _forceSearch    = ( typeof forceSearch === 'boolean' ) ? forceSearch : false;
    
    // Les opérations ne sont faites que si le filtrage a changé
    if( ! ( _newString !== _filter.string || _filterTime || _forceSearch ) ) {
        return;
    }
    
    Blu.is.tweetsSearchFinished = false;

    // Filtrage des tweets
    _filter.string = _newString;
    Blu.fn.tweets.filter();

    // Affichage des tweets
    Blu.fn.tweets.showList();

    // Champ de recherche
    $('#inputrecherche').val( _newString ); //.removeClass('tip');

    // Nombre de tweets par tranche
    Blu.fn.tranches.updateCounts();

    // Centrage de la carte sur le noeud
    if( _rechNoeud ) {
        Blu.fn.map.selectUser( _filter.string );
    }

    // Top users
    //Blu.fn.users.calcAndShowTopUsers();
    
};


/**
 * Filtrage des tweets
 */
Blu.fn.tweets.filter = function() { 
   
    var _filter                 = Blu.timeline.params.filter,
        _regex                  = Blu.fn.tweets.regexFilter(),
        _filterTime             = ( _filter.dates.min !== null && _filter.dates.min.getTime() > 0 || _filter.dates.max !== null && _filter.dates.max.getTime() > 0 ), 
        _countFilteredTweets    = 0,
        _tweet,
        _is_from_user, _mentions_user, _matchTime, _matchContent;

    Blu.info( 'Blu.fn.tweets.filter...' );
        
    /*
     * Parcours de l'ensemble des tweets pour les filtrer
     */
    for( var i in Blu.tweets ) {
        
        _tweet          = Blu.tweets[i],
        _matchTime      = true,
        _matchContent   = true;

        // Chaîne de recherche : nom du Twittos ou mention dans le tweet
        if( _regex && _regex.from_user ) {
            _is_from_user   = ( _tweet.from_user.search( _regex.from_user ) > -1 ),
            _mentions_user  = ( _tweet.text.search( _regex.text ) > -1 ),
            _matchContent   = ( _is_from_user || _mentions_user );
        }

        // Filtre temporel
        if( _filterTime ) {
            _matchTime =    (   _tweet.dateObj.getTime() >= _filter.dates.min.getTime() && 
                                _tweet.dateObj.getTime() <  _filter.dates.max.getTime()     );
        }

        // Filtrage final du tweet
        _tweet.matchFilter = _matchContent && _matchTime;
        
        // On compte les tweets
        if( _tweet.matchFilter ) {
            _countFilteredTweets++;
        }
        
    }
    
    Blu.warn( 'Filtered tweets: ' + _countFilteredTweets + ' / ' + Blu.tweets.length );
    
    // Nombre de tweets correspondant au filtrage
    // TODO : compteur via Ajax
    if( 1 /*filter.string != ''*/ ) {
        Blu.counts.tweets.filter = _countFilteredTweets;
    }
    
    Blu.fn.UI.miniStats( {'countTweets' : Blu.counts.tweets.filter, 'countUsers' : Blu.counts.users.graph} );
    
    if( true /*_regex === null || _regex.from_user*/ ) {
        Blu.fn.users.topUsers();
        //Blu.fn.users.calcAndShowTopUsers();
    }
    
};  // Fin de Blu.fn.tweets.filter


/**
 * Retoune une expression régulière correspondant au filtrage actuel
 * @param {String} theString
 * @returns {Object}
 */
Blu.fn.tweets.regexFilter = function( theString ) {
    
    if( typeof theString === 'undefined' ) {
        theString = Blu.timeline.params.filter.string;
    }
    
    var _regFrom, 
        _regText;
    
    if( theString === '' ) {
        return null;
    }
    
    // On commence par rajouter des caractères d'échappement au filtre
    // On crée une regexp de base pour le texte du tweet
    _regText = new RegExp( "(" + theString.replace(/([^0-9a-zA-Z ])/g,'\\$1') + ")", "gi" );

    // Si le filtre commence par "@", on crée une regexp n'en tenant compte 
    // pour traiter le champ "from" du tweet
    if( theString[0] === '@' ) {
        _regFrom = new RegExp("(" + theString.substr(1).replace(/([^0-9a-zA-Z ])/g,'\\$1') + ")","gi");
    } else {
        _regFrom = _regText;
    }
    return {
        from_user   : _regFrom,
        text        : _regText
    };

};


/**
 * Recherche multi-critères de tweets
 * @param {Object} options { id : "12789124124", 'string' : 'ylakim', dates : { min : new Date(2012), max : new Date(2013) } }
 * @returns {Array} liste de tweets
 */
Blu.fn.tweets.find = function( options ) {
    
    Blu.info( 'Blu.fn.tweets.find()' );
    
    var _defaults = {
        'id'        : '',
        'string'    : Blu.timeline.params.filter.string,
        'dates'     : Blu.timeline.params.filter.dates
    };
    options = $.extend( _defaults, options );
    Blu.log( options );
    
    var _tweet,
        _results = [];
   
    //var _filter                 = Blu.timeline.params.filter,
    var _regex                  = Blu.fn.tweets.regexFilter( options.string ),
        _isFilteringTime        = ( options.dates.min !== null && options.dates.min.getTime() > 0 || options.dates.max !== null && options.dates.max.getTime() > 0 ),
        _tweet,
        _is_from_user, _mentions_user, 
        _matchDates, _matchString,
        _match;
    
    for( var i in Blu.tweets ) {
        
        _tweet = Blu.tweets[i];

        // User mentionné dans le tweet ou auteur du tweet
        _matchString = ( _regex && _regex.from_user ) ? ( _tweet.from_user.search( _regex.from_user ) > -1 || _tweet.text.search( _regex.text ) > -1 ) : true;
        
        // Dates
        _matchDates = _isFilteringTime ? ( _tweet.dateObj.getTime() >= options.dates.min.getTime() && _tweet.dateObj.getTime() <  options.dates.max.getTime() ) : true;

        // Filtrage final
        _match =    _matchString && 
                    _matchDates && 
                    ( options.id ? options.id == _tweet.id : true );
        
        // On compte les tweets
        if( _match ) {
            _results.push( _tweet );
        }
        
    }
    
    Blu.log( _results.length + ' tweet(s) trouvé(s)' );
    //Blu.log( _results );
    
    return _results;
    
    //////////////////////
//    
//    // Nombre de tweets correspondant au filtrage
//    // TODO : compteur via Ajax
//    if( 1 /*filter.string != ''*/ ) {
//        Blu.counts.tweets.filter = _results.length;
//    }
//    
//    Blu.fn.UI.miniStats( {'countTweets' : Blu.counts.tweets.filter, 'countUsers' : Blu.counts.users.graph} );
//    
//    if( true /*_regex === null || _regex.from_user*/ ) {
//        Blu.fn.users.topUsers();
//        //Blu.fn.users.calcAndShowTopUsers();
//    }
    
};


/**
 * Met à jour la taille de la zone de travail
 */
Blu.fn.UI.updateSize = function() {
    
    var _ZC         = $("#zonecentre"),
        _leftZC     = 0,
        _header     = $("#barre"),
        _top = {
            top     : _header.height() + 'px'
        };    
    
    // Taille de la zone du graphe
    Blu.zoneGraphe.largeur  = _ZC.width();
    Blu.zoneGraphe.hauteur  = _ZC.height();
    Blu.map.isIdentical     = true;
    
    // Vérifie si Blu.zoneGraphe a changé
    for( var i in Blu.zoneGraphe ) {
        Blu.map.isIdentical = Blu.map.isIdentical && ( Blu.zoneGraphe[i] == Blu.oldZoneGraphe[i] );
    }
    // S'il y a eu du changement, on change également #canvas
    if( !Blu.map.isIdentical ) {
        $("#canvas")
            .attr({
                width   : Blu.zoneGraphe.largeur,
                height  : Blu.zoneGraphe.hauteur
            })
            .css({
                width   : Blu.zoneGraphe.largeur + 'px',
                height  : Blu.zoneGraphe.hauteur + 'px'
            });
        // On remet en mémoire zoneGraphe dans oldZoneGraphe
        for( var i in Blu.zoneGraphe ) {
            Blu.oldZoneGraphe[i] = Blu.zoneGraphe[i];
        }
    }

}; // Fin de Blu.fn.UI.updateSize()

/**
 * Transforme un nom de fichier JSON de graphe en une date "AAAA-MM-JJ hh:mm"
 */
Blu.fn.misc.filenameToDate = function( str ) {
    
    // Nettoie le nom du fichier du graphe si besoin
    var _matches;
    if( _matches = str.match(/[a-z]+.[\w]+.(.*).json/) ) {
        str = _matches[1]; // Ex : "mentions.hashtag.2011-11-16_16:02.json" devient "2011-11-16_16:02")
    }
    
    var _z = [0, 0, 0, 0, 0, 0]; // Au cas où on n'a pas les 6 paramètres (année, mois, ..., secondes)
    var _d = str.match(/\d+/g).concat( _z); // Extrait les nombres de la date
    
    /*for( var i in _d ) {
        if( _d[i] < 10 )
            _d[i] = '0' + _d[i];
    }*/
    return _d[0] + '-' + _d[1] + '-' + _d[2] + ' ' + _d[3] + ':' + _d[4];
    
};

/**
 * Retourne le timestamp en secondes d'une date "AAAA-MM-JJ hh:mm:ss" (ou moins précise)
 */
Blu.fn.misc.dateToTime = function( str ) {
    
    // Nettoie le nom du fichier du graphe si besoin
    var _matches;
    if( _matches = str.match(/[a-z]+.[\w]+.(.*).json/) ) {
        str = _matches[1]; // Ex : "mentions.hashtag.2011-11-16_16:02.json" devient "2011-11-16_16:02")
    }
    
    var _z = [0, 0, 0, 0, 0, 0]; // Au cas où on n'a pas les 6 paramètres (année, mois, ..., secondes)
    var _d = str.match(/\d+/g).concat( _z); // Extrait les nombres de la date
    
    var _date = new Date( _d[0], _d[1] - 1, _d[2], _d[3], _d[4], _d[5] );
    return Math.round( _date.getTime()/1000 ); // date en secondes
    // Note : l'objet Date gère les mois en partant de 0 pour janvier, 1 pour février, etc.
    
};

/**
 * Retourne les timestamps (secondes) min et max à partir d'un nom de fichier 
 * contenant une/deux dates "AAAA-MM-JJ hh:mm:ss"
 */
Blu.fn.misc.filenameToTimes = function( str ) {
    
    // Nettoie le nom du fichier du graphe si besoin
    var _matches;
    if( _matches = str.match(/[a-z]+.[\w_-]+.(.*).json/) ) {
        str = _matches[1]; // Ex : "mentions.hashtag.2011-11-16_16:02.json" devient "2011-11-16_16:02")
    }
    
    if( str === '' ) {
        return {timeMin : 0, timeMax : 0};
    }
    
    // Séparation des 2 dates (le cas échéant)
    str = str.split(',');
    
    var _dateMin = ( str.length == 2 ) ? str[0] : Blu.projects.current.dates.min,
        _dateMax = ( str.length == 2 ) ? str[1] : str[0];
    
    return { 
        timeMin : Blu.fn.misc.dateToTime( _dateMin ) + Blu.projects.current.dates.timeOffset * 3600, 
        timeMax : Blu.fn.misc.dateToTime( _dateMax ) + Blu.projects.current.dates.timeOffset * 3600 
    };
        
};

/**
 * Retourne la date "JJ/MM/AAAA hh:mm" d'un timestamp en secondes
 */
Blu.fn.misc.timeToDate = function( time ) {
    
    var _date = new Date();
    _date.setTime( time*1000 );
    
    var _month  = ( _date.getMonth() + 1 < 10 ) ?   '0' + ( _date.getMonth() + 1) : _date.getMonth() + 1,
        _day    = ( _date.getDate() < 10 ) ?        '0' + _date.getDate() : _date.getDate(),
        _hour   = ( _date.getHours() < 10 ) ?       '0' + _date.getHours() : _date.getHours(),
        _min    = ( _date.getMinutes() < 10 ) ?     '0' + _date.getMinutes() : _date.getMinutes();

    return  Blu.txt( 'date_hhmm', _day, _month, _date.getFullYear(), _hour, _min );
};

/**
 * Retourne la date "AAAA-MM-JJ hh:mm:ss" d'une Date (objet)
 * @param date Date
 * @param precision string (year, month, day, hour, min, sec)
 */
Blu.fn.misc.dateObjectToString = function( date, precision ) {
        
    var _date = {
            year   : date.getFullYear(),
            month  : ( date.getMonth() + 1 < 10 ) ?   '0' + ( date.getMonth() + 1) : date.getMonth() + 1,
            day    : ( date.getDate() < 10 ) ?        '0' + date.getDate() : date.getDate(),
            hour   : ( date.getHours() < 10 ) ?       '0' + date.getHours() : date.getHours(),
            min    : ( date.getMinutes() < 10 ) ?     '0' + date.getMinutes() : date.getMinutes(),
            sec    : ( date.getSeconds() < 10 ) ?     '0' + date.getSeconds() : date.getSeconds(),
            ms     : ( date.getMilliseconds() >= 100 ) ? date.getMilliseconds() : ( ( date.getMilliseconds() >= 10 ) ? '0' + date.getMilliseconds() : '00' + date.getMilliseconds() )
        },
        _string     = '',
        _precision  = ( precision === 'week' ) ? 'day' : precision || 'sec',
        _precisions = [
            {'interval' : 'year',      'separator' : ''},
            {'interval' : 'month',     'separator' : '-'},
            {'interval' : 'day',       'separator' : '-'},
            {'interval' : 'hour',      'separator' : ' '},
            {'interval' : 'min',       'separator' : ':'},
            {'interval' : 'sec',       'separator' : ':'},
            {'interval' : 'ms',        'separator' : ':'}
        ];

    for( var i in _precisions ) {
        
        var _interval = _precisions[i].interval;
        
        _string += _precisions[i].separator + _date[ _interval ];
        
        if( _interval == _precision ) {
            break;
        }
    }
    
    return _string;

};

/**
 * Retourne un objet Date à partir d'une chaîne de caractères "AAAA-MM-JJ hh:mm:ss" (ou moins précise)
 * L'heure de la string supposée configurée à l'heure du serveur, soit actuellement UTC+1
 * On prend en compte cette timezone pour créer l'objet Date en Javascript
 * @param {String} date_str
 * @param {integer} offset
 */
Blu.fn.misc.dateStringToObject = function( date_str, UTC_offset ) {
    
    if( !date_str ) {
        return new Date(0);
    }

    var _z              = [0, 0, 0, 0, 0, 0], // Au cas où on n'a pas les 6 paramètres (année, mois, ..., secondes)
        _d              = date_str.match(/\d+/g).concat( _z ), // Extrait les nombres de la date
        _offsetToUTC    = ( typeof UTC_offset === 'undefined' ) ? 1 : UTC_offset, // Heure du serveur (si pas d'heure UTC explicite) : UTC+1
        _date           = new Date( Date.UTC( _d[0], _d[1] - 1, _d[2], _d[3] - _offsetToUTC, _d[4], _d[5] ) );
        
    return _date;

};

/**
 * Retourne la date "31 Déc(embre) 2012 23:59" d'un timestamp en secondes
 */
Blu.fn.misc.timeToDate2 = function( time, abbrev ) {
    
    var _date = new Date();
    _date.setTime( time*1000 );
    
    var _abbrev = ( typeof abbrev === 'undefined' ) ? true : abbrev,
        _monthName = Blu.fn.misc.monthName( _date, _abbrev ),
        _day    = ( _date.getDate() < 10 ) ?        '0' + _date.getDate() : _date.getDate(),
        _hour   = ( _date.getHours() < 10 ) ?       '0' + _date.getHours() : _date.getHours(),
        _min    = ( _date.getMinutes() < 10 ) ?     '0' + _date.getMinutes() : _date.getMinutes();

    
    return  Blu.txt( 'date_hhmm2', _day, _monthName, _date.getFullYear(), _hour, _min );
};

/**
 * Retourne la date "Lundi 31 décembre 2012" d'une chaîne de caractères
 * @param date objet Date ou string (ex: "2012-12-31")
 */
Blu.fn.misc.dateToTextDate = function( date ) {
    
    var _date       = ( typeof date === 'string' ) ? Blu.fn.misc.dateStringToObject( date ) : date,
        _day        = _date.getDate(),
        _dayName    = Blu.txt('days')[ _date.getDay() ], 
        _monthName  = Blu.fn.misc.monthName( _date );
    
    return  Blu.txt( 'date_text', _day, _monthName, _date.getFullYear(), _dayName );
};

/**
 * Retourne l'heure (hh:mm) d'une date
 * @param date string/Date (ex: "2012-12-31" or new Date())
 */
Blu.fn.misc.dateHour = function( date ) {
    
    var _date   = ( typeof date === 'string' ) ? 
                        Blu.fn.misc.dateStringToObject( date ) : 
                        ( ( typeof( date ) === 'number' ) ? new Date( date ) : date ),
        _hour   = ( _date.getHours() < 10 ) ?       '0' + _date.getHours() : _date.getHours(),
        _min    = ( _date.getMinutes() < 10 ) ?     '0' + _date.getMinutes() : _date.getMinutes();
    
    return _hour + ':' + _min;
};


/**
 * Retourne l'heure locale au format hh:mm:ss
 * @returns {String} heure locale (hh:mm:ss)
 */
Blu.fn.misc.timeNow = function() {
    return ( new Date() ).toTimeString().slice( 0, 8 );
};
/**
 * Retourne l'heure locale à partir d'une date au format hh:mm:ss
 * @param {Date} date
 * @returns {String} heure locale (hh:mm:ss)
 */
Blu.fn.misc.timeHour = function( date ) {
    return date.toTimeString().slice( 0, 8 );
};


/**
 * JavaScript Pretty Date
 * @author John Resig
 * @author Mikaly Rodriguez-Ruiz
 * @link http://ejohn.org/blog/javascript-pretty-date/
 * @param date formats possibles : "2012-07-19 17:33", "Thu, 19 Jul 2012 09:11:21 +0000", objet Date
 */
// Takes an ISO time and returns a string representing how long ago the date represents.
Blu.fn.misc.prettyDate = function( date, shorten ){
    
    shorten = ( typeof shorten === 'undefined' ) ? false : shorten;
    
    if( !Blu.config.tweets.prettyDate ) {
        return date;
    }
    
    var _past               = ( typeof date === "string" ) ? Blu.fn.misc.dateStringToObject( date ) : date,
        _pastDay            = _past.getDate(),
        _pastDayName        = Blu.txt('days')[ _past.getDay() ],
        _hour               = ( _past.getHours() < 10 ) ?       '0' + _past.getHours() : _past.getHours(),
        _min                = ( _past.getMinutes() < 10 ) ?     '0' + _past.getMinutes() : _past.getMinutes(),    
        _now                = new Date(),
        _nowDay             = _now.getDate(),
        _diff               = ( _now.getTime() - _past.getTime() ) / 1000,
        _day_diff           = Math.floor( _diff / 86400 ); // différence de temps en jour (brut)
    
    if ( isNaN( _day_diff ) || _day_diff < 0 || _day_diff >= 31 ) {
        return Blu.fn.misc.timeToDate( _past.getTime() / 1000 );
    }
        
    return  _day_diff == 0 && (
                _diff < 10      && Blu.txt( 'just_now' ) ||
                _diff < 60      && Blu.txt( 'x_seconds_ago', Math.floor( _diff ) ) ||
                _diff < 120     && Blu.txt( '1_minute_ago' ) ||
                _diff < 3600    && Blu.txt( 'x_minutes_ago', Math.floor( _diff / 60 ) ) ||
                _diff < 7200    && Blu.txt( '1_hour_ago' ) ||
                _diff < 86400   && Blu.txt( 'x_hours_ago', Math.floor( _diff / 3600 ) ) 
            ) ||
            
            _day_diff <= 1      && Blu.txt( 'yesterday' ) || 
            // @todo pb : quand on il s'est passé un jour et demi, on affiche toujours "hier"...
            
            _day_diff < 7       && ( shorten ? 
                                        Blu.txt( 'x_days_ago', _day_diff ) : 
                                        Blu.txt( 'day_with_hour', _pastDayName, _pastDay, _hour, _min ) ) ||
            //_day_diff < 14      && Blu.txt( '1_week_ago', Math.ceil( _day_diff / 7 ) ) ||
            _day_diff < 31      && Blu.txt( 'day_with_hour', _pastDayName, _pastDay, _hour, _min ) /*Blu.txt( 'x_weeks_ago', Math.ceil( _day_diff / 7 ) )*/;
};

/**
 * Teste si une variable est un entier
 * @link http://www.inventpartners.com/content/javascript_is_int
 */
Blu.fn.misc.isInt = function( value ) {
    if( ( parseFloat(value) == parseInt(value) ) && !isNaN(value) ) {
        return true;
    } else {
        return false;
    }
};

// If jQuery is included in the page, adds a jQuery plugin to handle it as well
/*if ( typeof jQuery != "undefined" )
    jQuery.fn.prettyDate = function(){
        return this.each(function(){
            var date = Blu.fn.misc.prettyDate(this.title);
            if ( date )
                jQuery(this).text( date );
        });
    };*/


/**
 * Transforme un timestamp en sa position en X dans la timeline
 * @param timestamp
 * @param mini boolean
 */
Blu.fn.timeline.timeToX = function( timestamp, mini ) {
    var _mini = ( typeof(mini) !== 'undefined' ) ? mini : false;
    return  ( _mini == true ) ? 
                Blu.timeline.decalageXMini + timestamp * Blu.timeline.echelleMiniature :
                Blu.timeline.decalageX + timestamp * Blu.timeline.echelleGenerale;
};

/**
 * Transforme une position X en timestamp dans la timeline
 */
Blu.fn.timeline.xToTime = function( x, mini ) {
    var _mini = ( typeof(mini) !== 'undefined' ) ? mini : false;
    return  ( _mini == true ) ? 
                ( x - Blu.timeline.decalageXMini ) / Blu.timeline.echelleMiniature :
                ( x - Blu.timeline.decalageX ) / Blu.timeline.echelleGenerale;    
};

/**
 * Trace la timeline
 * @param {boolean} traceCanvas (default : false)
 * @param {boolean} traceMiniCanvas (default : true)
 * @param {boolean} forceTrace (default : true)
 */
Blu.fn.timeline.traceTimeline = function( traceCanvas, traceMiniCanvas, forceTrace ) {
    
    Blu.info('Blu.fn.timeline.traceTimeline...');
    
    var _traceCanvas        = ( typeof traceCanvas !== 'undefined' ) ?      traceCanvas     : false,
        _traceMiniCanvas    = ( typeof traceMiniCanvas !== 'undefined' ) ?  traceMiniCanvas : true,
        _forceTrace         = ( typeof forceTrace !== 'undefined' ) ?       forceTrace      : true,
        _canvas             = Blu.canvas.ctx,
        _canvasMini         = _traceCanvas ? Blu.canvas_mini.ctx : Blu.canvas_timemachine.ctx;
        
    Blu.fn.UI.updateSize();
    
    Blu.fn.timemachine.displayDate();
    
    // Si pas de tranches, on s'en va
    if( Blu.tranches.length < 1 ) {
        //Blu.warn('traceTimeline() : pas de tranches');
        //Blu.warn( Blu.tranches );
        _canvasMini.clearRect( 0, 0, Blu.timeline.mini.width, Blu.timeline.mini.height );
        return;
    }
    
    // On vérifie si les paramètres ont changé
    var _identique = Blu.map.isIdentical && !_forceTrace;
    for( var i in Blu.timeline.params ) {
        _identique = _identique && ( Blu.timeline.params[i] === Blu.timeline.oldParams[i] );
    }
    
    // Si pas de changement, on s'en va
    if( _identique ) {
        //Blu.warn("No changes in Blu.timeline.params or in the map.");
        return;
    }
    
    //Blu.dir( Blu.tranches );

    for( var i in Blu.timeline.params ) {
        Blu.timeline.oldParams[i] = Blu.timeline.params[i];
    }

    // Différence de temps entre un bout et l'autre de la timeline affichée
    Blu.timeline.timeInterval       = Blu.tranches[ Blu.tranches.length - 1 ].fin - Blu.tranches[ 0 ].debut;

    // Largeur totale en pixels
    Blu.timeline.largeurTotale      = Math.pow( Math.SQRT2, Blu.timeline.params.zoomLevel ) * Blu.timeline.width;

    // Echelle en pixels
    Blu.timeline.echelleGenerale    = Blu.timeline.largeurTotale / Blu.timeline.timeInterval;

    // Echelle de la timeline miniature (en bas à droite)
    Blu.timeline.echelleMiniature   = Blu.timeline.mini.width / Blu.timeline.timeInterval;

    // Décalage de la gauche du graphe par rapport au centre de la timeline
    Blu.timeline.decalageX          = Blu.zoneGraphe.largeur / 2 - ( Blu.timeline.params.centreX * Blu.timeline.echelleGenerale );

    // Comme decalageX, mais pour la miniature
    Blu.timeline.decalageXMini      = - ( Blu.timeline.echelleMiniature * Blu.tranches[ 0 ].debut );

    // Largeur d'une tranche horaire
    Blu.timeline.largeurTranche     = Blu.timeline.echelleGenerale * Blu.timeline.params.granularite;

    // Comme largeurTranche mais pour la miniature
    Blu.timeline.largeurTrancheMini = Blu.timeline.echelleMiniature * Blu.timeline.params.granularite;

    Blu.timeline.limGauche          = Blu.fn.timeline.timeToX( Blu.tranches[ 0 ].debut );


    Blu.timeline.initialise         = true;

    // Dimensions de la timeline
    Blu.timeline.hauteurGraphe      = Blu.zoneGraphe.hauteur - 120;
    Blu.timeline.decalageY          = 35;
    Blu.timeline.echelleY           = Blu.timeline.hauteurGraphe / Math.max( 1, Blu.timeline.maxTweets );
    Blu.timeline.echelleYMiniature  = Blu.timeline.mini.height / Math.max( 1, Blu.timeline.maxTweets );

    Blu.timeline.echelleRGB         = 255 / Math.max( 1, Blu.timeline.maxTweets );

    // Effacement du canvas et de sa miniature
    if( _traceCanvas ) {
        _canvas.clearRect( 0, 0, Blu.zoneGraphe.largeur, Blu.zoneGraphe.hauteur );
    }
    if( _traceMiniCanvas ) {    
        _canvasMini.clearRect( 0, 0, Blu.timeline.mini.width, Blu.timeline.mini.height );
    }

    //Blu.dir( Blu.timeline );

    // Jours en haut de la timeline (et fonds)
    if( _traceCanvas ) {
    
        _canvas.textBaseline     = "middle";
        _canvas.font             = "14px Arial";
        _canvas.textAlign        = "center";
        
        for( var i in Blu.jours ) {
            _canvas.fillStyle = ( i % 2 ? "transparent" : "rgba(240,240,240,.25)" );
            var _x = Blu.fn.timeline.timeToX( Blu.jours[i].debut ),
                _l = Blu.fn.timeline.timeToX( Blu.jours[i].fin ) - _x,
                _m = _x + _l / 2;
            //_canvas.fillRect( _x, Blu.timeline.decalageY, _l, Blu.timeline.hauteurGraphe );
            _canvas.fillStyle = "#888";
            //_canvas.fillText( Blu.jours[i].nom, _m, Blu.timeline.decalageY - 10 );
        }
        
    }

    // Calcul du pas en ordonnée
    var _lesPas     = [ 2, 5, 10, 20, 50, 100, 200, 500, 1000 ], // valeurs possibles de pas
        _pas        = 1,
        _aApprocher = Blu.timeline.maxTweets / 3;
    for( var k in _lesPas ) {
        if( Math.abs( _aApprocher - _lesPas[k] ) < Math.abs( _aApprocher - _pas ) ) {
            _pas = _lesPas[k];
        }
    }

    // Texte et lignes en ordonnée
    if( _traceCanvas ) {
        
        _canvas.font            = "12px Arial";
        _canvas.textAlign       = "right";
        _canvas.strokeStyle     = "#aaa";
        _canvas.lineWidth       = "0.5";
        _canvas.beginPath();
        
        for( var i = 0; i <= Blu.timeline.maxTweets; i += _pas ) {
            
            var _h = Blu.timeline.decalageY + Blu.timeline.hauteurGraphe - Blu.timeline.echelleY * i;
            
            _canvas.moveTo( Blu.timeline.limGauche - 5 , _h );
            _canvas.lineTo( Blu.timeline.limGauche + Blu.timeline.largeurTotale, _h );
            _canvas.fillText( i, Blu.timeline.limGauche - 8, _h );
        }
        _canvas.stroke();
        
    }

    // Parcours des tranches verticales avec textes, lignes et fonds
    var _countTranches = Blu.tranches.length;
    for( var i in Blu.tranches ) {

        var _tranche = Blu.tranches[i],
            _n = _tranche.nombre,
            _h = Blu.timeline.echelleY * _n,
            _y = Blu.timeline.decalageY + Blu.timeline.hauteurGraphe - _h,
            _x = Blu.fn.timeline.timeToX( _tranche.debut ),
            _g = 255 - Math.floor( Blu.timeline.echelleRGB * _n ),
            _d = _tranche.debut_heure,
            _t = Blu.timeline.decalageY + Blu.timeline.hauteurGraphe;
            
        var _hMini = Blu.timeline.echelleYMiniature * _n,
            _yMini = Blu.timeline.mini.height - _hMini,
            _xMini = Blu.timeline.echelleMiniature * _tranche.debut +  Blu.timeline.decalageXMini;

        // Affichage de l'heure de début
        /*if( _d === "00:00" || _d === "06:00" || _d === "12:00" || _d === "18:00" ) {
                _canvas.beginPath();
                _canvas.moveTo( _x , Blu.timeline.decalageY );
                //_canvas.lineTo( _x, _t + 5);
                _canvas.stroke();
                _canvas.save();
                _canvas.translate( _x, _t + 8);
                _canvas.rotate(- Math.PI / 3);
                _canvas.fillStyle = "rgb(0,0,0)";
                _canvas.fillText( _d, 0, 0);
                _canvas.restore();
        }*/

        // Au survol d'une tranche
        if( _traceCanvas ) {
            if( Blu.timeline.params.trancheHover == i ) {

                // Tranche
                _canvas.fillStyle = "rgba(255,255,0,.5)";
                _canvas.fillRect( _x, Blu.timeline.decalageY, Blu.timeline.largeurTranche, Blu.timeline.hauteurGraphe - _h );

                // Ligne               
                _canvas.beginPath();
                _canvas.moveTo( _x + Blu.timeline.largeurTranche / 2, _t );
                _canvas.lineTo( _x + Blu.timeline.largeurTranche / 2, _t + 40 );
                _canvas.strokeStyle = "#888";                 
                _canvas.stroke();

                // Date et heures                 
                _canvas.beginPath();
                _canvas.moveTo( _x , Blu.timeline.decalageY );
                _canvas.stroke();
                _canvas.save();
                _canvas.translate( _x - 5, _t + 12 );
                _canvas.fillStyle = "#888";           
                var _txtInfobulle = ( _tranche.debut_heure == _tranche.fin_heure ) ?                
                                            Blu.txt('legendSliceAxisOneDay', _tranche.jour) : 
                                            Blu.txt('legendSliceAxis', _tranche.jour, _tranche.debut_heure, _tranche.fin_heure); 
                _canvas.fillText( _txtInfobulle, 0, 0);
                _canvas.restore();

                // Nb tweets
                _canvas.beginPath();
                _canvas.moveTo( _x , Blu.timeline.decalageY );
                _canvas.stroke();
                _canvas.save();
                _canvas.translate( _x - 5, _t + 30 );
                _canvas.fillStyle   = "#000";
                _canvas.font        = "16px Arial";
                _txtInfobulle       = _n + ( ( _n > 1 ) ? ' tweets' : ' tweet' );
                _canvas.fillText( _txtInfobulle, 0, 0);                
                _canvas.restore();
            }
            // Style de la tranche
            _canvas.fillStyle =   ( Blu.timeline.params.trancheHover == i ? 
                                            "rgb(0,0,128)" : 
                                            ( 
                                                ( Blu.timeline.params.trancheCourante === -1 ) || 
                                                ( Blu.timeline.params.trancheCourante == i ) ? 
                                                    "rgb(0," + _g + ",255)" : 
                                                    "rgb(170," + ( 170 + Math.floor( _g/3) ) + ",255)" 
                                            ) 
                                        );
            _canvas.fillRect( _x, _y, Blu.timeline.largeurTranche + .5, _h );
        }

        // Tranche dans la miniature
        if( _traceMiniCanvas ) {
            
            _canvasMini.fillStyle = "rgb(0," + _g + ",255)";
            
            switch( Blu.config.timeline.style.plotType ) {
                
                case "bars":
                    _canvasMini.fillRect( _xMini, _yMini, Blu.timeline.largeurTrancheMini + 0.5, _hMini );
                    break;
                    
                case "lines":
                default:
                    
                    var _plot_current = {
                        x : _xMini,
                        y : _yMini
                    };

                    if( typeof( _plot_previous ) !== 'undefined' && i !== _countTranches - 1 ) {
                                                
                        // Onde sous la courbe
                        if( Blu.config.timeline.style.plotWave ) {
                            _canvasMini.fillStyle   = Blu.config.timeline.style.waveColor;
                            _canvasMini.strokeStyle = Blu.config.timeline.style.waveColor;
                            _canvasMini.beginPath();
                            _canvasMini.moveTo( _plot_current.x, _plot_current.y );  
                            _canvasMini.lineTo( _plot_previous.x, _plot_previous.y );
                            _canvasMini.lineTo( _plot_previous.x, Blu.timeline.mini.height + 10 );
                            _canvasMini.lineTo( _plot_current.x, Blu.timeline.mini.height + 10 );
                            _canvasMini.lineTo( _plot_current.x, _plot_current.y );
                            _canvasMini.closePath();
                            _canvasMini.fill();
                        }
                        
                        _canvasMini.strokeStyle = Blu.config.timeline.style.lineColor;
                        _canvasMini.beginPath();
                        _canvasMini.moveTo( _plot_current.x, _plot_current.y );  
                        _canvasMini.lineTo( _plot_previous.x, _plot_previous.y );
                        _canvasMini.closePath();
                        _canvasMini.stroke();
                    }

                    var _plot_previous = _plot_current;        
                    break;
            }
            
        }
        
    } // Fin de la boucle For parcourant les tranches

    // Sauvegarde des pixels de la timeline
    if( _traceMiniCanvas ) {
        //Blu.warn('Sauvegarde de la mini-timeline en image');
        Blu.canvas_mini.timeline.image = _canvasMini.getImageData( 0, 0, Blu.timeline.mini.width, Blu.timeline.mini.height );
    }
    
}; // Fin de Blu.fn.timeline.traceTimeline


/**
 * Charge des tweets si on n'a pas exploré l'intervalle de temps concerné
 */
Blu.fn.tweets.loadIfNecessary = function() {
    
    var _filterDateMin = Blu.timeline.params.filter.dates.min,
        _filterDateMax = Blu.timeline.params.filter.dates.max,
        _interval,
        _interDateMin,
        _interDateMax,
        _alreadyExplored;
    
    if( !_filterDateMax ) {
        return;
    }
    
    // Parcours des intervalles de temps déjà explorés
    for( var i in Blu.intervals ) {
        
        _interval       = Blu.intervals[i];
        _interDateMin   = Blu.fn.misc.dateStringToObject( _interval.min.date_utc, 0 );
        _interDateMax   = Blu.fn.misc.dateStringToObject( _interval.max.date_utc, 0 );
        
        _alreadyExplored =  _filterDateMax > _interDateMin && _filterDateMax.getTime() <= _interDateMax.getTime() && 
                            _filterDateMin > _interDateMin && _filterDateMin.getTime() <= _interDateMax.getTime();
        
        // Si on est dans un intervalle déjà exploré, 
        // pas besoin de charger des tweets
        if( _alreadyExplored ) {
            Blu.warn('Intervalle de temps déjà exploré (' + _interval.min.date + ' >> ' + _interval.max.date );
            return;
        }
        
    }
    
    // L'intervalle de temps n'a pas encore été exploré
    // => on charge des tweets et on les affiche
    Blu.warn('Chargement nécessaire de tweets avec date_max = ' + _filterDateMax );
    Blu.fn.tweets.load( {'time_max' : _filterDateMax.getTime() / 1000, 'show' : true} );
        
};


Blu.fn.misc.sortIntervals = function( a, b ) {
    return a.min.id - b.min.id;
};


/**
 * Fusion des intervalles de temps explorés
 * @todo terminer cette fonction ;)
 */
Blu.fn.tweets.mergeIntervals = function() {
    
    return;

    // Tri et fusion des intervalles
    Blu.intervals = Blu.intervals.sort( Blu.fn.misc.sortIntervals );

    for( var i = 0; i < Blu.intervals.length ; i = i + 2 ) {

        var _thisInterval = Blu.intervals[i],
            _nextInterval = ( i+1 < Blu.intervals.length ) ? Blu.intervals[ i+1 ] : null;

        if( !_nextInterval ) {
            break;
        }

        var _thisDateMax = Blu.fn.misc.dateStringToObject( _thisInterval.max.date_utc, 0 ),
            _nextDateMin = Blu.fn.misc.dateStringToObject( _nextInterval.min.date_utc, 0 );

        // Recouvrement entre l'intervalle courant et le suivant
        if( _thisDateMax.getTime() >= _nextDateMin.getTime() ) {

        }

    }    

};


/**
 * Voyage dans le temps de la Time Machine
 */
Blu.fn.timemachine.timeTravel = function() {
    
    Blu.info('Blu.fn.timemachine.timetravel()');
    
    //var _xCursor    = Blu.mouse.lastPos.x - $('#mini-timeline').offset().left;
    //var _timeDrop   = Math.round( Blu.fn.timeline.xToTime( _xCursor, true ) );
    
    var _goTravel = true;

    if( Blu.timeline.cursors.timetravel.time ) {
        
        // Sélection du graphe correspondant au curseur de la Time Machine
        var _timeDrop = ( typeof( Blu.timeline.cursors.timetravel ) !== 'undefined' ) ?
                            Math.round( Blu.timeline.cursors.timetravel.time ) : // glisser-déposer
                            Math.round( Blu.fn.timeline.xToTime( Blu.mouse.lastPos.x - $('#mini-timeline').offset().left, true ) );
                            
        _goTravel = Blu.fn.timemachine.selectGraphFromDate( new Date( _timeDrop*1000 ) );
        
    }

    if( _goTravel ) {
        Blu.fn.timemachine.deleteCursor('timetravel');
        Blu.fn.timetravel( Blu.graphs.timemachine );    
    }

    // Affichage de la date de la Time Machine
    Blu.fn.timemachine.displayDate();

    // Time Machine : message
    Blu.fn.timemachine.displayTip();

};

/**
 * Voyage temporel
 * @param {Object} graph
 */
Blu.fn.timetravel = function( graph ) {
    
    Blu.info('Blu.fn.timetravel()');

    var _ZC = $('#zonecentre');
    _ZC.spin('big');

    // Initialisation de la vue
    Blu.fn.initialiseVue('map');

    // Chargement du graphe
    Blu.fn.map.chargeGraphe( graph );

    var _date_min = Blu.fn.misc.dateStringToObject( graph.date_min_utc, 0 ),
        _date_max = Blu.fn.misc.dateStringToObject( graph.date_max_utc, 0 );

    // Filtrage des tweets
    Blu.timeline.params.filter.dates = {
        'min' : _date_min,
        'max' : _date_max
    };
    Blu.fn.UI.goHome();
    //Blu.fn.timestamps.calcSlices();
    
    // Chargement des tweets (Ajax) si nécessaire
    Blu.fn.tweets.loadIfNecessary();
    
    // Filtrage des tweets après avoir fini de charger le nouveau graphe 
    // (sinon le centrage de la carte sur le noeud courant ne fonctionne pas
    Blu.fn.timers.resetInterval('delaySearch');
    Blu.timers.delaySearch = setInterval( function() {
        
        if( !Blu.map.initialise && Blu.is.loadingTweets ) {
            return;
        }
        
        Blu.fn.tweets.search( Blu.timeline.params.filter.string, true, true );
        
        Blu.fn.timers.resetInterval('delaySearch');
        
    }, 100 );

    // Tracé de la carte
    Blu.fn.map.traceMap();
    Blu.log('refreshCanvas : map (timetravel)');
    Blu.timers.refreshCanvas = setInterval( Blu.fn.map.traceMap, 60 );

    _ZC.spinStop();    
};


/**
 * Retour au présent avec la Time Machine
 */
Blu.fn.timemachine.backToThePresent = function() {
    
    Blu.fn.timemachine.setCursor( 'timetravel', Blu.fn.misc.dateStringToObject( Blu.projects.current.dates.max ).getTime() / 1000 );
    
    Blu.fn.timemachine.timeTravel();
    
    Blu.timeline.params.filter.dates.min = null;
    Blu.timeline.params.filter.dates.max = null;
    
    Blu.fn.tweets.search( Blu.timeline.params.filter.string, false, true); 
    // On force le recalcul de la recherche car sinon 
    // c'est la date du dernier graphe qui fait office de date max 
    // ce qui peut faire perdre quelques tweets (les plus récents)
    
};


/**
 * Affichage de la date de la Time Machine
 */
Blu.fn.timemachine.displayDate = function() {
    
    var _tmZone     = $('#timemachine-zone'),
        _tmTitle    = _tmZone.find('#tm-title'),
        _timetravel = _tmTitle.find('.timetravel'),
        _tmSide1    = _tmZone.find('.tm-side.left'),
        _tmSide2    = _tmZone.find('.tm-side.right'),
        _start      = Blu.tranches.length ? Blu.tranches[0] : '',
        _end        = Blu.tranches.length ? Blu.tranches[ Blu.tranches.length - 1 ] : '',
        _day1       = _start ? Blu.fn.misc.texteJour( _start.dateStart, true ) : '',
        _day2       = _end ? Blu.fn.misc.texteJour( _end.dateStart, true ) : '',
        _hour1      = _start.debut_heure || '',
        _hour2      = _end.fin_heure || '';
        /*_graphMin   = _tmTitle.find('.graph.min'),
        _graphMax   = _tmTitle.find('.graph.max'),
        _intervMin  = _tmTitle.find('.interval.min'),
        _intervMax  = _tmTitle.find('.interval.max'),
        _time       = 0,
        _text       = '';*/

    // Bornes globales de la timeline
    _tmSide1.find('.date .day').text( _day1 );
    _tmSide1.find('.date .hour').text( _hour1 );
    _tmSide2.find('.date .day').text( _day2 );
    _tmSide2.find('.date .hour').text( _hour2 );

    // Timetravel
    if( Blu.timeline.cursors.timetravel && Blu.timeline.cursors.timetravel.time ) {
        _timetravel.text( Blu.timeline.cursors.timetravel ? Blu.fn.misc.dateObjectToString( new Date( Blu.timeline.cursors.timetravel.time*1000 ), 'min' ) : '' );
    } else {
        _timetravel.text('');
        _timetravel.hide();
    }
    
    /*
    // Graphe
    _graphMin.text( Blu.fn.misc.dateHour( Blu.graphs.current.datesObj.min ) );
    _graphMax.text( Blu.fn.misc.dateHour( Blu.graphs.current.datesObj.max ) );
        
    // Intervalle
    _intervMin.text( Blu.fn.misc.dateHour( Blu.projects.current.dates.min ) );
    _intervMax.text( Blu.fn.misc.dateHour( Blu.projects.current.dates.max ) );
    */
};

/**
 * Affichage du message de la Time Machine
 */
Blu.fn.timemachine.displayTip = function() {
    
    return;
    
    var _tip = $('#time-machine-tip');
    
    // Curseur de la Time Machine
    if( Blu.timeline.cursors && typeof( Blu.timeline.cursors.timetravel ) !== 'undefined' ) {
        
        
        
    // Temps figé (présent ou passé)
    } else {

        // Dans le passé
        if( Blu.graphs.current.datesObj.max.getTime() < Blu.graphs.last.datesObj.max.getTime() ) {     
            _tip.addClass('past').text( Blu.txt('timeMachineTipPresent') );
            
        // Présent
        } else {
            _tip.removeClass('past').text( Blu.txt('timeMachineTip') );
        }
            
    }
    
};

/**
 * Sélection d'un graphe lorsque l'ensemble des graphes est sans chevauchement
 */
Blu.fn.timemachine.selectGraphFromDate_NoOverlap = function( date ) {
    
    var i,
        _graph,
        _selectedGraph = null,
        _isFound;

    for( i in Blu.graphs.all ) {

        _graph      = Blu.graphs.all[i];
        _isFound    = ( date.getTime() >= _graph.datesObj.min.getTime() && date.getTime() < _graph.datesObj.max.getTime() );

        if( _isFound ) {

            _selectedGraph = _graph;

            if( _selectedGraph.filename == Blu.graphs.current.filename ) { // @todo comparer un ID plutôt pour être sûr de l'unicité
                return false;                    
            } else {
                // Sauvegarde du graphe pour la Time Machine
                Blu.graphs.timemachine = _selectedGraph;
                return true;
            }

        }

    }

    return false;
};

/**
 * Sélection du graphe dont la date max est la plus proche de la date
 */
Blu.fn.timemachine.selectGraphFromDate_detectMax = function( date ) {

    var i,
        _graph,
        _deltaNext, _deltaPrev, 
        _nextGraph, _prevGraph, _selectedGraph = null,
        _isFound;
        
    for( i in Blu.graphs.all ) {
        
        _graph = Blu.graphs.all[i];
        
        // On a dépassé le curseur, on a donc les 2 graphes avant et après le curseur
        if( _graph.datesObj.max > date ) {
                
            _nextGraph  = _graph;
            _prevGraph  = ( i > 0 ) ? Blu.graphs.all[i-1] : _graph;

            _deltaNext  = Math.abs( _nextGraph.datesObj.max - date );
            _deltaPrev  = Math.abs( date - _prevGraph.datesObj.max );
            
            /*Blu.log( _nextGraph );
            Blu.log( _deltaNext );
            Blu.log( _prevGraph );
            Blu.log( _deltaPrev );*/
            
            _selectedGraph = ( _deltaNext < _deltaPrev ) ? _nextGraph : _prevGraph;
            //Blu.log( _selectedGraph );
            break;
        }
    }
    // Le curseur est après le dernier graphe, on sélectionne donc ce dernier
    if( _selectedGraph === null ) {
        _selectedGraph = Blu.graphs.all[i];
    }
    
    // Sauvegarde du graphe pour la Time Machine
    Blu.graphs.timemachine = _selectedGraph;
    
    return true;

};

/**
 * Sélection du graphe dont la date moyenne est la plus proche de la date
 */
Blu.fn.timemachine.selectGraphFromDate_detectCenter = function( date ) {

    var i,
        _graph,
        _selectedGraph = null,
        _delta, _selectedDelta,
        _center;
        
    if( !Blu.graphs.all.length ) {
        return false;
    }
    
    for( i in Blu.graphs.all ) {
        
        _graph      = Blu.graphs.all[i];
        _center     = ( _graph.datesObj.min.getTime() + _graph.datesObj.max.getTime() ) / 2; 
        _delta      = Math.abs( date.getTime() - _center );
        
        if( _selectedGraph === null ) {
            
            _selectedGraph = _graph;
            _selectedDelta = _delta;
            
        } else {
            
            if( _delta < _selectedDelta ) {
                _selectedGraph  = _graph;
                _selectedDelta  = _delta;
            }
            
        }
        

    }
    
    // Sauvegarde du graphe pour la Time Machine
    Blu.graphs.timemachine = _selectedGraph;
    
    return true;

};

/**
 * Sélection d'un graphe à partir d'un temps donné
 * @param date Date
 */
Blu.fn.timemachine.selectGraphFromDate = function( date ) {
    
    Blu.info( 'selectGraphFromDate() : date = ');
    Blu.log( date );
       
    // Dans le cas de graphes sans chevauchement
    if( Blu.timeline.cursors.graphs ) {        
        return Blu.fn.timemachine.selectGraphFromDate_NoOverlap( date );
    }
    
    return Blu.fn.timemachine.selectGraphFromDate_detectCenter( date );
    //return Blu.fn.timemachine.selectGraphFromDate_detectMax( date );

};

/**
 * Clic sur le canvas
 * @param {event} evt
 */
Blu.fn.canvas.click = function(evt) {
    
    // Clic sans déplacement
    if( !Blu.is.movingCanvas ) {
        
        // Timeline
        if( Blu.viz.current === 'timeline' ) {
            Blu.fn.timeline.click();
        }
        
        // Map
        if( Blu.viz.current === 'map' ) {
            Blu.fn.map.click();
        }
        
    }
    
    Blu.fn.canvas.endMoving();
    
};

/**
 * Clic sur la timeline
 */
Blu.fn.timeline.click = function() {
    
    // Clic sans déplacement
    if( !Blu.is.movingCanvas ) {

        Blu.timeline.params.trancheCourante = Blu.timeline.params.trancheHover;
        
        Blu.fn.tweets.showList();

    }

};

/**
 * Clic sur la map
 */
Blu.fn.map.click = function() {
    
    // 0. Clic pendant un déplacement : on ne gère pas
    if( Blu.is.movingCanvas ) {
        return;
    }

    Blu.map.params.selectedNode = Blu.map.params.hoverNode; // L'éventuel noeud survolé est sélectionné

    /*
     * 1. Clic en zone blanche
     */
    
    if( Blu.map.params.selectedNode === -1 ) {
        
        // En mode infobulle : partir s'il n'y a pas d'infobulle, sauf si on l'a fermée // #1111 condition enveloppante avec config possible
        if( Blu.config.map.usercards.show
            && !( Blu.usercards.selected.state.show || Blu.usercards.hover.state.show ) 
            && !Blu.usercards.hover.state.closed  && !Blu.usercards.selected.state.closed ) {
            return;
        }

        // Reset des infobulles et de la sidebar
        Blu.fn.users.resetPanels();
        
        return;
    }
        
    /*
     * 2. Un noeud est sélectionné \o/
     */
    
    var _twittos    = Blu.carto.nodes[ Blu.map.params.selectedNode ],
        _username   = _twittos.name;


    if( !Blu.config.users.profilePopUp ) {

        if( Blu.config.map.usercards.show ) {

            /* 
             * Si on a un timer en cours (usercard hover pas encore affichée) et un noeud sélectionné
             * alors la usercard selected a la priorité sur la usercard hover
             */
            if( Blu.timers.showUserCard && 
                ( !Blu.usercards.selected.state.show || Blu.usercards.selected.node !== Blu.map.params.selectedNode ) && 
                !Blu.usercards.hover.state.show ) {

                $('#zonecentre .user-card').remove();
                Blu.fn.user.showUserCard( _username );
                Blu.usercards.selected.state.show = true; // ici pour permettre une suite rapide de clics sur la carte
            }

            // Retour si le noeud est déjà sélectionné
            if( Blu.usercards.selected.node === Blu.map.params.selectedNode ) {
                Blu.usercards.selected.state.show   = true;
                Blu.usercards.selected.state.closed = false;
                return;
            }
            Blu.fn.usercards.reset();
            Blu.usercards.selected.state.show   = true;
            Blu.usercards.selected.node         = Blu.map.params.selectedNode;
        }

        Blu.fn.user.showProfile( _username );
        
        mixpanel.track( 'Show Profile (via Map)', { 'User' : _username } );

    }

    //Blu.fn.tweets.search( _username, false, true );

    Blu.fn.UI.miniStats( {'username' : _twittos.name, 'countTweets' : _twittos.tweets, 'countUsers' : _twittos.mentions} );


};  // Fin de Blu.fn.map.click()

/**
 * Début du déplacement du canvas
 * @param {event} evt
 */
Blu.fn.canvas.startMoving = function( evt ) {
    
    //Blu.log('Blu.fn.canvas.startMoving()');
    
    evt.preventDefault();
    
    Blu.mouse.dragOn = true;
    
    Blu.mouse.dragPx = {
        x : 0,
        y : 0
    };
    
    if( evt.gesture ) {
        Blu.touch.lastPos = {
            x : evt.gesture.center.pageX,
            y : evt.gesture.center.pageY
        };
    } else {
        Blu.mouse.lastPos = {
            x : evt.pageX,
            y : evt.pageY
        };        
    }
    
    Blu.is.movingCanvas = false;
    
};

/**
 * Fin du survol / déplacement sur le canvas
 * @param {event} evt
 */
Blu.fn.canvas.endMoving = function( evt ) {
    //Blu.log('Blu.fn.canvas.endMoving()');
    document.body.style.cursor  = "default";
    Blu.mouse.dragOn            = false;
    Blu.is.movingCanvas         = false;
};

/**
 * Déplacement du canvas en fonction du mouvement sur la miniature 
 * @param {event} evt
 * @param {float} echelle
 */
Blu.fn.canvas.move = function( evt, echelle ) {
    
    // Curseur de la souris "main"
    document.body.style.cursor = "move";
    
    // Coordonnées de la souris
    var _coord      = evt.gesture ? { x : evt.gesture.center.pageX, y : evt.gesture.center.pageY } : { x : evt.pageX, y : evt.pageY },
        _lastPos    = evt.gesture ? Blu.touch.lastPos : Blu.mouse.lastPos;
        
    // Déplacement du canvas en conséquence
    Blu[ Blu.viz.current ].params.centreX += ( _lastPos.x - _coord.x ) / echelle;
    Blu[ Blu.viz.current ].params.centreY += ( _lastPos.y - _coord.y ) / echelle;
    
    // Sauvegarde des coordonnées de la souris
    if( evt.gesture ) {
        Blu.touch.lastPos = _coord;
    } else {
        Blu.mouse.lastPos = _coord;
    }
    //_lastPos = _coord;
};

/**
 * Survol et déplacement du canvas
 * @param {event} evt
 */
Blu.fn.canvas.mouseMove = function( evt ) {
    
    // Annule l'action par défaut de l'événement
    evt.preventDefault();
    
    // Si le canvas n'est pas initialisé, on s'en va
    if( !Blu[ Blu.viz.current ].initialise ) {
        //Blu.log(Blu.viz.current + ' non initialisee');
        return;
    }
    
    // Position de la souris
    if( evt.gesture ) {
        Blu.touch.pos = {
            x : evt.gesture.center.pageX - $(this).offset().left,
            y : evt.gesture.center.pageY - $(this).offset().top
        };
    } else {
        Blu.mouse.pos = {
            x : evt.pageX - $(this).offset().left,
            y : evt.pageY - $(this).offset().top
        };
    }
    
    /*
     * Déplacement du canvas (clic glissé)
     */
    if( Blu.mouse.dragOn ) {
        Blu.fn.canvas.move( evt, Blu[ Blu.viz.current ].echelleGenerale );
        Blu.is.movingCanvas = true;
        return;
    }
    
    /*
     * Survol du canvas
     */

    // Timeline
    if( Blu.viz.current === 'timeline' ) {
        
        Blu.fn.canvas.hoverTimeline();
        
    // Map
    } else if( Blu.viz.current === 'map' ) {

        Blu.fn.canvas.hoverMap();
        
    }

};  // Fin de Blu.fn.canvas.mouseMove()


/**
 * Survol de la (grande) timeline
 */
Blu.fn.canvas.hoverTimeline = function() {

    // Survol d'une tranche
    if(     ( Blu.mouse.pos.x > Blu.timeline.limGauche ) && 
            ( Blu.mouse.pos.x < Blu.timeline.limGauche + Blu.timeline.largeurTotale ) && 
            ( Blu.mouse.pos.y > Blu.timeline.decalageY ) && 
            ( Blu.mouse.pos.y < Blu.timeline.decalageY + Blu.timeline.hauteurGraphe )     ) {

        Blu.fn.timeline.hoverTranche( Math.floor( Blu.tranches.length * ( Blu.mouse.pos.x - Blu.timeline.limGauche ) / Blu.timeline.largeurTotale ) );

    // Aucune tranche survolée
    } else {
        Blu.fn.timeline.hoverTranche( -1 );
    }

    // Pointeur de la souris
    document.body.style.cursor = ( Blu.timeline.params.trancheHover != -1 ? "pointer" : "default" );

};


/**
 * Survol de la map
 */
Blu.fn.canvas.hoverMap = function() {

    var _twittos,
        _UC,
        _screen_name,
        _resetType,
        _survol,
        _hoverNode      = Blu.fn.map.getNodeFromPos( Blu.mouse.pos ),
        _UC_hover       = Blu.usercards.hover,
        _UC_selected    = Blu.usercards.selected;

    Blu.map.params.hoverNode = _hoverNode;

    document.body.style.cursor = ( _hoverNode != -1 ? "pointer" : "default" );

    /*
     * 1. Survol d'un noeud : affichage de ses infos
     */
    if( _hoverNode !== -1 ) {

        _twittos = Blu.carto.nodes[ _hoverNode ];
        var _hoverScreenName = _twittos.name.toLowerCase().replace('@','');
        _UC      = ( _UC_selected.node === _hoverNode ) ? _UC_selected : _UC_hover;
        _survol  = ( _UC_selected.node === _hoverNode ) ? !_UC_selected.state.show : ( _hoverNode !== _UC_hover.node );

        if( _twittos ) {
            Blu.fn.UI.miniStats( {'username' : _twittos.name, 'countTweets' : _twittos.tweets, 'countUsers' : _twittos.mentions} );
            
            $('.user-list').find( 'li.' + _hoverScreenName ).addClass('selected');
        }

        /* 
         * 1.1. Survol long d'un noeud : affichage de l'infobulle
         */
        
        var _create_usercard =  Blu.config.map.usercards.show && /*Blu.config.map.usercards.showHover &&*/
                            !Blu.timers.showUserCard && 
                            ( 
                                _survol || 
                                _UC_selected.state.closed || 
                                _UC_hover.state.closed 
                            );

        // Avec un noeud déjà sélectionné, le survol d'un autre noeud ne fait rien
        if( /*_UC_selected.node !== -1 && 
            _UC_selected.node !== _hoverNode &&             
            !Blu.config.map.usercards.showHover*/ 0 ) {
            
            _create_usercard = false;
        }
        
        if( _create_usercard ) {

            Blu.timers.showUserCard = setTimeout( function() {

                // On réouvre l'accès au retardateur
                Blu.timers.showUserCard = 0;

                // Type du noeud actuellement survolé
                _UC = ( _UC_selected.node === _hoverNode ) ? _UC_selected : _UC_hover;


                if( _hoverNode !== -1 && ( !_UC.state.show || _hoverNode !== _UC.node ) ) {

                    _screen_name    = Blu.carto.nodes[ _hoverNode ].name;
                    _resetType      = ( _UC_selected.node !== -1 ) ? 'hover' : 'all'; // #11111

                    // MAJ des variables globales
                    $('#zonecentre .user-card').remove();

                    // Reset des usercards
                    Blu.fn.usercards.reset( _resetType );

                    //Blu.usercards.selected.state.closed = false;
                    Blu.usercards.selected.state.show       = false;
                    Blu.usercards.selected.state.mouseOver  = false;
                    Blu.usercards.hover.state.show          = Blu.config.map.usercards.showHover;
                    Blu.usercards.hover.node                = Blu.map.params.hoverNode;

                    //if( Blu.config.map.usercards.showHover ) {
                    Blu.fn.user.showUserCard( _screen_name );
                    //}
                }


            }, 300 );

        }

    /* 
     * 2. Aucun noeud n'est survolé
     */
    } else {

        $('.user-list').find( 'li').removeClass('selected');
        
        /*$('#inputrecherche').val(''); 
         *Blu.fn.tweets.search( '', true);
         *$("#mini-stats").html( Blu.txt('legendTotal', Blu.counts.tweets.filter) );*/

        // Arrêt de l'horloge conditionnant la création de l'infobulle
        if( Blu.config.map.usercards.show ) {
            clearTimeout( Blu.timers.showUserCard );
            Blu.timers.showUserCard = 0;
        }

        // Si la souris survole l'infobulle (inclut le mode sans infobulle) on s'en va...
        if( _UC_hover.state.mouseOver || _UC_selected.state.mouseOver ) {
            return;
        }
        
        /*
         * Un noeud est sélectionné
         */
        if( Blu.map.params.selectedNode != -1 ) {

            var _selectedNodeId = Blu.map.params.selectedNode;

            _twittos = Blu.carto.nodes[ _selectedNodeId ];

            // Cas où un noeud différent du noeud sélectionné a une infobulle
            if( Blu.config.map.usercards.show && !_UC_selected.state.show && !Blu.timers.removeUC ) {

                // Suppression de l'infobulle après survol long de la zone blanche
                Blu.timers.removeUC = setTimeout( function() {

                    Blu.timers.removeUC = 0; // Réinitialisation du retardateur

                    // Si on considère qu'on est resté en dehors de tout noeud et infobulle 
                    // plus d'une seconde, sans en sélectionner de nouveau
                    if( !_UC_hover.state.mouseOver && !_UC_selected.state.mouseOver && 
                        _hoverNode === -1 && _selectedNodeId === Blu.map.params.selectedNode ) { // #1

                        _UC = $('#zonecentre .user-card');

                        // Reset de Blu.usercards.hover uniquement
                        _UC.remove();
                        Blu.fn.usercards.reset( 'hover' );

                        // Recréation de l'infobulle du noeud sélectionné
                        if( !_UC_selected.state.closed ) {

                            _UC_selected.state.show = true;
                            Blu.fn.user.showUserCard( _twittos.id );
                        }

                        // Reset de l'étendue de l'infobulle
                        //_UC_sel.state.expanded = false;

                    }

                }, 300);
            }

            if( _twittos ) {
                Blu.fn.UI.miniStats( {'username' : _twittos.name, 'countTweets' : _twittos.tweets, 'countUsers' : _twittos.mentions} );
            }

        /*
         * Aucun noeud sélectionné
         */
        } else {

            if( Blu.config.map.usercards.show && _UC_hover.state.show && !Blu.timers.removeUC ) {

                // Suppression de toutes les infobulles après un long survol de la zone blanche
                Blu.timers.removeUC = setTimeout( function() {

                    // Réinitialisation du retardateur
                    Blu.timers.removeUC = 0;

                    // Si on considère qu'on est resté en dehors de tout noeud et infobulle plus d'une seconde
                    if(  !Blu.usercards.hover.state.mouseOver && Blu.map.params.hoverNode === -1 ) { // #1

                        $('#zonecentre .user-card').remove();
                        Blu.fn.usercards.reset();
                    }

                }, 300);

            }

            Blu.fn.UI.miniStats( {'countTweets' : Blu.counts.tweets.filter, 'countUsers' : Blu.counts.users.graph} );

        }

    }

};


/**
 * Fin du survol / glisser-déposer sur la Time Machine
 * @param {event} evt
 */
Blu.fn.timemachine.endMoving = function( evt ) {
    
    if( evt.gesture ) {
        Blu.touch.lastPos = {
            x : evt.gesture.center.pageX,
            y : evt.gesture.center.pageY
        };
    } else {
        Blu.mouse.lastPos = {
            x : evt.pageX,
            y : evt.pageY
        };
    }

    /*
     * Survol sans clic
     */
    if( !Blu.mouse.dragOn ) {
        
        Blu.fn.timemachine.deleteCursor('timetravel');
        Blu.fn.timemachine.trace();
        Blu.fn.timemachine.displayDate();    
        Blu.fn.timemachine.displayTip();    
    
    /* 
     * Si c'est un glisser-déposer
     */
    } else {

        Blu.fn.timemachine.timeTravel();
        
    }
    
    // Réinitialisation des variables concernant le déplacement et le curseur de souris
    //document.body.style.cursor  = "default";
    Blu.mouse.dragOn    = false;
    Blu.is.movingCanvas = false;
    
};


/**
 * Sélection d'un user sur la carte
 * @param {String} username
 */
Blu.fn.map.selectUser = function( username ) {
    
    if( !Blu.carto ) {
        return;
    }

    //Blu.log('centrage de la carte sur un noeud');

    var _user_lc = username.replace('@', '').toLowerCase();

    // On recherche un noeud de même nom dans la liste des noeuds
    for( var i in Blu.carto.nodes ) {

        // Si on le trouve, on le met en noeud courant, et on centre la carte dessus
        if( Blu.carto.nodes[i].name.replace('@', '').toLowerCase() === _user_lc ) {

            //Blu.log( Blu.carto.nodes[i].name.toLowerCase() );

            Blu.map.params.selectedNode     = parseInt( i, 10 );
            if( Blu.config.map.usercards.show ) {
                Blu.usercards.selected.node = Blu.map.params.selectedNode;
            }
            Blu.map.params.centreX          = Blu.carto.nodes[i].coords.base.x;
            Blu.map.params.centreY          = Blu.carto.nodes[i].coords.base.y;
            return;

        }
    }
    // Pas de noeud courant
    Blu.map.params.selectedNode = -1;

};


/**
 * Survol d'une tranche de la timeline
 * @param _tranche
 */
Blu.fn.timeline.hoverTranche = function( _tranche ) {
    
    if(  Blu.viz.current === 'timeline' ) {
        
        Blu.timeline.params.trancheHover = _tranche;
        var _t = ( _tranche != -1 ? _tranche : Blu.timeline.params.trancheCourante );
        
        // Pas de tranche courante / sélectionnée
        if( _t === -1 ) {
            Blu.fn.UI.miniStats( {'countTweets' : Blu.counts.tweets.filter, 'countUsers' : Blu.counts.users.graph} );
        
        // Une tranche courante / sélectionnée
        } else {
            
            // Jour plein
            if( Blu.tranches[ _t ].debut_heure == Blu.tranches[ _t ].fin_heure ) {
                $('#mini-stats').html( Blu.txt('legendSliceOneDay', Blu.tranches[ _t ].jour, Blu.tranches[ _t ].nombre) );                        
            
            // Tranches horaires de quelques heures/min
            } else {
                $('#mini-stats').html(  
                    Blu.txt(    'legendSlice', 
                                Blu.tranches[ _t ].jour, 
                                Blu.tranches[ _t ].debut_heure, 
                                Blu.tranches[ _t ].fin_heure, 
                                Blu.tranches[ _t ].nombre
                            ) 
                );
            }
                        
        }
    }
};

/**
 * Mouvement sur la miniature (timeline ou map)
 * @param 
 */
Blu.fn.canvas.moveFromMini = function( event ) {
    if( Blu.mouse.dragOn ) {
        Blu.fn.canvas.move( event, -Blu[ Blu.viz.current ].echelleMiniature );
    }
};

/**
 * Scroll sur la map
 * @param {event} evt
 * @param {integer} delta
 * @param {integer} deltaX
 * @param {integer} deltaY
 */
Blu.fn.map.scrollMap = function( evt, delta, deltaX, deltaY ) {
    
    //Blu.log(evt);
    
    Blu.mouse.scroll += delta;
    
    //Blu.log( 'Blu.fn.map.scrollMap() : delta = ' + delta + ' and Blu.mouse.scroll = ' + Blu.mouse.scroll );
    //Blu.log( 'deltaX = ' + deltaX + ' // deltaY = ' + deltaY );
    
    // Animation
    if( Blu.config.map.zoomAnimation ) {
        
        if( Blu.timers.zoomingOnMap ) {
            return;
        }
        
        if( !Blu.timers.gettingScrollOnMap ) {
            
            Blu.map.scrollDelta = delta;
            
            Blu.timers.gettingScrollOnMap = setTimeout( function() {

                if( /*Math.abs( Blu.mouse.scroll ) >= 1 &&*/ !Blu.timers.zoomingOnMap ) {
                    //Blu.fn.map.zoom( evt, ( Blu.mouse.scroll < 0 ) ? -1 : 1 );
                    //Blu.warn( 'scrollDelta = ' + Blu.map.scrollDelta );
                    
                    if( Blu.mouse.pos !== null ) {
                        Blu.fn.map.zoom( evt, Blu.map.scrollDelta );
                    } else {
                        Blu.fn.map.zoom( evt, Blu.map.scrollDelta );
                    }
                }
                
                Blu.timers.gettingScrollOnMap = 0;

            }, 100 );
            
        } else {
            Blu.map.scrollDelta += delta;
        }

    // Pas d'animation        
    } else {
        
        if( Math.abs( Blu.mouse.scroll ) >= 1 ) {
           Blu.fn.map.zoom( evt, ( Blu.mouse.scroll < 0 ) ? -1 : 1 );
        }
        
    }
    
};  // Fin de map.scrollMap

/**
 * Pinch sur la map
 * @param {event} event
 */
Blu.fn.map.pinchMap = function( event ) {
    
    //Blu.log(evt);
    
    var gesture = event.gesture;
    
    Blu.touch.scale = gesture.scale; // scale en pourcentage : si 0.5 on diminue par 2 le zoom
    
    // Animation
    if( Blu.config.map.zoomAnimation ) {
        
        if( Blu.timers.zoomingOnMap ) {
            return;
        }
        
        if( !Blu.timers.gettingPinchOnMap ) {
            
            Blu.timers.gettingPinchOnMap = setTimeout( function() {

                if( !Blu.timers.zoomingOnMap ) {
                    
                    Blu.map.pinchDelta = ( Blu.touch.scale - 1 ) * 10;
                    
                    if( Blu.mouse.pos !== null ) {
                        Blu.fn.map.zoom( event, Blu.map.pinchDelta );
                    } else {
                        Blu.fn.map.zoom( event, Blu.map.pinchDelta );
                    }
                }
                
                Blu.timers.gettingPinchOnMap = 0;

            }, 100 );
            
        } else {
            Blu.map.pinchDelta = ( Blu.touch.scale - 1 ) * 10;
        }

    // Pas d'animation        
    } else {
        
        Blu.map.pinchDelta = ( Blu.touch.scale - 1 ) * 10;
        
        Blu.fn.map.zoom( event, Blu.map.pinchDelta );
        
    }
    
};  // Fin de map.scrollMap

/**
 * Reset du zoom sur la map
 */
Blu.fn.map.resetZoom = function() {

    var _slider     = $('#slider');

    Blu.map.params.zoomLevel    = Blu.map.defaults.zoomLevel;
    Blu.map.params.centreX      = Blu.map.defaults.centreX;
    Blu.map.params.centreY      = Blu.map.defaults.centreY;
    
    
    _slider.slider( 'value', Blu.map.defaults.zoomLevel );
        
    Blu.mouse.scroll = 0;
    
};

/**
 * Zoom sur la map
 * @param {event} evt
 * @param {integer} deltaZoom (positif : zoom avant, négatif : zoom arrière)
 */
Blu.fn.map.zoom = function( evt, deltaZoom ) {
    
    if( !deltaZoom ) {
        return;
    }
    
    var _viz                = Blu[ Blu.viz.current ],
        _zoomLevel          = _viz.params.zoomLevel,
        _slider             = $('#slider'),
        _animate            = Blu.config.map.zoomAnimation,
        _zoomingIn          = ( deltaZoom > 0 ), // zoom avant
        _targetZoom         = _zoomingIn ? Math.min( _zoomLevel + deltaZoom, _viz.maxZoom ) : Math.max( _zoomLevel + deltaZoom, _viz.minZoom ),
        _targetDeltaZoom    = ( _targetZoom - _viz.params.zoomLevel );
       
       
    if( _zoomLevel === _targetZoom ) {
        return;
    }
    
    /*
     * Zoom sans animation
     */
    
    if( !_animate ) {
        
        _viz.params.zoomLevel = _targetZoom;
        
        _slider.slider( 'value', _targetZoom );
        
        Blu.mouse.scroll = 0;
        
        // Centrage
        /*var _el = $(this),
            _off = $(this).offset(),
            _deltaX = evt.pageX - _el.width() / 2 - _off.left,
            _deltaY = evt.pageY - _el.height() / 2 - _off.top;
        Blu.map.params.centreX += deltaZoom * ( ( Math.SQRT2 - 1 ) * _deltaX / Blu.map.echelleGenerale );
        Blu.map.params.centreY += deltaZoom * ( ( Math.SQRT2 - 1 ) * _deltaY / Blu.map.echelleGenerale );
        */
        return;
        
    }
    
    /*
     * Zoom avec animation
     */
    
    if( Blu.timers.zoomingOnMap ) { // animation déjà en cours...
        return;
    }    
    
    var _timeAnimation  = 500, // ms
        _stepTime       = 40, // ms
        _stepZoom       = _targetDeltaZoom * _stepTime / _timeAnimation,
        _tempZoom,
        _startDate      = (new Date()),
        _fromCenterX    = Blu.map.params.centreX,
        _fromCenterY    = Blu.map.params.centreY;
        
    //Blu.info('Zoom Animation : zoom level  = ' + _zoomLevel + ' >> ' + _targetZoom + ' // start @ ' + Blu.fn.misc.dateObjectToString( _startDate, 'ms' ) );
    //Blu.log('Centre (x, y) = (' + centerX + ', ' + centerY + ')' );
    //Blu.log('Blu.map.params.centreX/Y = (' + Blu.map.params.centreX + ', ' + Blu.map.params.centreY + ')' );
    
    /*Blu.log('targetZoom = ' + _targetZoom );
    Blu.log('targetDeltaZoom = ' + _targetDeltaZoom );
    Blu.log('stepZoom = ' + _stepZoom );*/
    
    /*
     * Lancement de l'animation
     */
    Blu.fn.timers.resetInterval('zoomingOnMap');
    Blu.timers.zoomingOnMap = setInterval( function() {
        
        var _msSinceStart = ( (new Date()) - _startDate );
        
        // Fin de l'animation
        if( _msSinceStart > _timeAnimation ) {
            
            //Blu.info('Zoom Animation : end @ ' + _msSinceStart + 'ms' );
            Blu.fn.timers.resetInterval('zoomingOnMap');
            Blu.mouse.scroll = 0;
            Blu.fn.map.traceMap( true );
            return;
            
        // Animation en cours
        } else {
            
            /**
             * Paramètres de la fonction de easing :
             * t - The time between 0 and 1
             * millisecondsSince - The milliseconds since the start of the animation
             * startValue - hardcoded to 0
             * endValue - hardcoded to 1
             * totalDuration - The millisconds that the animation will run
             *
             * Return a value between 0 and 1, with 0 being the start and 1 being the end
             */
            
            var _easingValue = $.easing.easeOutExpo( _msSinceStart / _timeAnimation, _msSinceStart, 0, 1, _timeAnimation );
            
            // Zoom
            _viz.params.zoomLevel = _zoomLevel + _easingValue * ( _targetZoom - _zoomLevel );
            
            
            // Centrage
            /*if( centerX && centerY && Blu.user.id == 1 ) {
                
                _viz.params.centreX = _fromCenterX + _easingValue * ( centerX - _fromCenterX );
                _viz.params.centreY = _fromCenterY + _easingValue * ( centerY - _fromCenterY );
                
                //_viz.params.centreX = centerX;
                //_viz.params.centreY = centerY;
            }*/
            
            Blu.fn.map.traceMap( true );
        
            _slider.slider( 'value', _viz.params.zoomLevel );
        }
        
        /*
        // Nouveau zoom 
        _tempZoom = parseFloat( _viz.params.zoomLevel ) + _stepZoom;
        _tempZoom = parseFloat( _tempZoom.toFixed(2) );
        //Blu.log( 'tempZoom = ' + _tempZoom );
        
        // Fin de l'animation quand le zoom cible est atteint ou dépassé
        if( _zoomingIn && _tempZoom > _targetZoom || 
            !_zoomingIn && _tempZoom < _targetZoom ) {
            
            clearInterval( Blu.timers.zoomingOnMap );
            Blu.timers.zoomingOnMap = 0;
            Blu.mouse.scroll = 0;
            Blu.fn.map.traceMap( true );
            return;
        }
        
        // Mise à jour du zoom
        _viz.params.zoomLevel = _tempZoom;
        
        // Tracé de la map (entre 14 et 18 ms sur mes tests sur Firefox)
        //Blu.log('traceMap() // start @ +' + _msSinceStart + 'ms' );        
        Blu.fn.map.traceMap( true );
        //Blu.log('traceMap() // end   @ +' + _msSinceStart + 'ms' );
        
        _slider.slider( 'value', _viz.params.zoomLevel );*/
        
    }, _stepTime );

};  // Fin de Blu.fn.map.zoom

/**
 * Writes an image into a canvas taking into
 * account the backing store pixel ratio and
 * the device pixel ratio.
 *
 * @author Paul Lewis
 * @link http://www.html5rocks.com/en/tutorials/canvas/hidpi/
 * @param {Object} opts The params for drawing an image to the canvas
 */
Blu.fn.canvas.drawImage = function( opts ) {

    if(!opts.canvas) {
        throw("A canvas is required")   ;
    }
    if(!opts.image) {
        throw("Image is required");
    }

    // get the canvas and context
    var canvas = opts.canvas,
        context = canvas.getContext('2d'),
        image = opts.image,

    // now default all the dimension info
        srcx = opts.srcx || 0,
        srcy = opts.srcy || 0,
        srcw = opts.srcw || image.naturalWidth,
        srch = opts.srch || image.naturalHeight,
        desx = opts.desx || srcx,
        desy = opts.desy || srcy,
        desw = opts.desw || srcw,
        desh = opts.desh || srch,
        auto = opts.auto,

    // finally query the various pixel ratios
        devicePixelRatio = window.devicePixelRatio || 1,
        backingStoreRatio = context.webkitBackingStorePixelRatio ||
                            context.mozBackingStorePixelRatio ||
                            context.msBackingStorePixelRatio ||
                            context.oBackingStorePixelRatio ||
                            context.backingStorePixelRatio || 1,

        ratio = devicePixelRatio / backingStoreRatio;

    // ensure we have a value set for auto.
    // If auto is set to false then we
    // will simply not upscale the canvas
    // and the default behaviour will be maintained
    if (typeof auto === 'undefined') {
        auto = true;
    }

    // upscale the canvas if the two ratios don't match
    if (auto && devicePixelRatio !== backingStoreRatio) {

        var oldWidth = canvas.width;
        var oldHeight = canvas.height;

        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;

        canvas.style.width = oldWidth + 'px';
        canvas.style.height = oldHeight + 'px';

        // now scale the context to counter
        // the fact that we've manually scaled
        // our canvas element
        context.scale(ratio, ratio);

    }

    context.drawImage(pic, srcx, srcy, srcw, srch, desx, desy, desw, desh);
};

/**
 * Initialisation de la vue
 * @param _nomVue
 */
Blu.fn.initialiseVue = function( _nomVue ) {
    
    Blu.log('refreshCanvas : clear (initialiseVue)');
    clearInterval( Blu.timers.refreshCanvas );
    
    // Paramètres de la vue
    Blu.viz.current                     = _nomVue;
    Blu[ Blu.viz.current ].initialise   = false;
    Blu[ Blu.viz.current ].oldParams    = {};
    
    Blu.canvas.ctx.clearRect( 0, 0, Blu.zoneGraphe.largeur, Blu.zoneGraphe.hauteur );
    
    // Curseur Zoom (échelle)
    /*$('#slider').slider({
        orientation     : "vertical",
        value           : Blu[_nomVue].params.zoomLevel,
        min             : Blu[_nomVue].minZoom,
        max             : Blu[_nomVue].maxZoom,
        step            : 1,
        slide : function( event, ui ) {
            Blu[_nomVue].params.zoomLevel = ui.value;
        }
    });
    
    var _mini = $('#zonemini');
    _mini.css({
        width   : Blu[_nomVue].mini.width + 'px',
        height  : Blu[_nomVue].mini.height + 'px'
    });
    if( Blu.config.mapOnly ) {
        _mini.hide();
    }
    
    $('#miniature').attr({
        width   : Blu[_nomVue].mini.width,
        height  : Blu[_nomVue].mini.height
    });*/
};


/**
 * Initialisation de la timeline
 */
Blu.fn.timeline.init = function() {
    
    Blu.log('Blu.fn.timeline.init...');
	
    Blu.fn.initialiseVue('timeline');
        
    // Fragment d'URL
    document.location.href = Blu.currentDataset ? '#/' + Blu.currentDataset +'/chrono' : '#chrono';
        
    $('#ulgranul').show();
        
    $('#btnedges, #time-machine, #time-machine-date, #time-machine-tip').hide();
        
    if( typeof(Blu.canvas_mini.timeline.image ) === 'undefined' ) {
        Blu.canvas_mini.timeline.image = '';
    }
    
    Blu.log('refreshCanvas : timeline');
    Blu.timers.refreshCanvas = setInterval( function() { 
        Blu.fn.timeline.traceTimeline( false, true, false ); 
    }, 120 ); // 60
    
};

/**
 * Initialisation de la carte
 */
Blu.fn.map.init = function() {
    
    Blu.info('Blu.fn.map.init...');
    
    Blu.fn.initialiseVue('map');
	
    // Mise à jour du fragment d'URL
    /*if( Blu.currentDataset && Blu.datasets.length > 1 ) {
        var _fragment = '#/' + Blu.currentDataset;
        if( Blu.currentSubset.length > 0 ) {
            _fragment += '/' + Blu.currentSubset;
        }
        document.location.href = _fragment;
        //document.location.href = Blu.currentDataset ? '#/' + Blu.currentDataset +'/carto' : '#carto';
    }*/

    // UI
    $("#ulgranul").hide();
    Blu.fn.UI.updateBtnEdges();
    $("#time-machine, #time-machine-date, #time-machine-tip").show();

    // Timer du tracé de la map
    Blu.log('refreshCanvas : map');
    Blu.timers.refreshCanvas = setInterval( Blu.fn.map.traceMap, 60 );
    
    // Map déjà initialisée ?
    if( Blu.carto ) {
        
        Blu.map.initialise = true;
        
    // Première initialisation de la map
    } else {
        
        //$('#zonecentre').spin('big'); // fais doublon avec le spinner du client
        
        if( Blu.needs.lastGraph ) {
            Blu.fn.project.getLastGraph();
        }
        
        if( Blu.needs.allGraphs ) {
            Blu.fn.project.getAllGraphs();
        }
        
    }

}; // Fin de Blu.fn.map.init()


/**
 * Retourne les paramètres du projet pour une requête Ajax
 * @param {Object} options
 */
Blu.fn.project.ajaxParams = function( options ) {

    var _p = {
        'project_id'    : Blu.projects.current.id, 
        'dataset'       : Blu.currentDataset, 
        'subset'        : Blu.currentSubset, 
        'refresh'       : Math.random()
    };
    
    if( Blu.projects.current.dates.min ) {
        _p['date_min'] = Blu.projects.current.dates.min;
    }
    
    if( Blu.projects.current.dates.max ) {
        _p['date_max'] = Blu.projects.current.dates.max;
    }    

    return _p;

};

/**
 * Chargement du graphe courant
 */
Blu.fn.project.getLastGraph = function() {

    var _p = Blu.fn.project.ajaxParams();
    _p['action'] = 'get-last-graph';

    if( Blu.timeNav ) {
        _p['timeNav'] = {
            'mode' : Blu.timeNav.mode
        };
    }
    
    $.getJSON( Blu.app.urls.ajax_base, _p, function( json ) {
        
        Blu.log("Last graph is known, now let's load it...");
        Blu.has.loadedGraph = true;
        
        // Préparation du graphe
        Blu.fn.map.prepareGraph( json.last_graph );

        // Chargement du dernier graphe
        if( 1 /*json.last_graph.filename*/ ) {
            Blu.fn.map.chargeGraphe( json.last_graph );
        }

        
    });

};

/**
 * Récupération de la liste des graphes
 */
Blu.fn.project.getAllGraphs = function() {

    var _p = Blu.fn.project.ajaxParams();
    _p['action'] = 'get-all-graphs';
    
    if( Blu.timeNav ) {
        _p['timeNav'] = {
            'mode' : Blu.timeNav.mode
        };
    }

    $.getJSON( Blu.app.urls.ajax_base, _p, function(json) {

        Blu.has.loadedAllGraphs = true;
        
        if( json.graphs ) {
            

            // Préparation des graphes
            for( var i in json.graphs ) {
                Blu.fn.map.prepareGraph( json.graphs[i] );
            }
            
            // Sauvegarde de la liste des graphes
            Blu.graphs.all = json.graphs;

            // Dernier graphe disponible
            Blu.graphs.last = Blu.graphs.all[ Blu.graphs.all.length - 1 ];

        }
        
    });

};


/**
 * Préparation d'un graphe (méta-données) avant toute utilisation
 * @param graph
 */
Blu.fn.map.prepareGraph = function( graph ) {
    
    //graph.timeMin = Blu.fn.misc.dateToTime( graph.date_min );
    //graph.timeMax = Blu.fn.misc.dateToTime( graph.date_max );
        
    graph.datesObj = {
        'min' : ( graph.date_min_utc ? Blu.fn.misc.dateStringToObject( graph.date_min_utc, 0 ) : ( graph.date_min ? Blu.fn.misc.dateStringToObject( graph.date_min ) : '' ) ),
        'max' : ( graph.date_max_utc ? Blu.fn.misc.dateStringToObject( graph.date_max_utc, 0 ) : ( graph.date_max ? Blu.fn.misc.dateStringToObject( graph.date_max ) : '' ) )
    };
    
    graph.type = graph.type || 'mentions';
    
};


/**
 * Création du graphe côté serveur
 * @param options
 * @param callback
 */
Blu.fn.map.createGraph = function( options, callback ) {
    
    Blu.info( 'Blu.fn.map.createGraph()' );
    options = options || {};
    
    var _p = Blu.fn.project.ajaxParams();
    //_p['action'] = 'create-graph';
    _p['graph'] = options;
    
    Blu.is.creatingGraph = true;
    
    //$.getJSON( Blu.app.urls.ajax_base, _p, function( json ) {
    $.getJSON( Blu.app.urls.main + '/projects/create-graph', _p, function( json ) {

        if( typeof callback === 'function' ) {
            callback( json );
        }

    });
    
};

/**
 * Recherche du graphe côté serveur
 * @param options
 * @param callback
 */
Blu.fn.project.getGraph = function( options, callback ) {
    
    Blu.info( 'Blu.fn.project.getGraph()' );
    options = options || {};
    
    var _p = Blu.fn.project.ajaxParams();
    _p['action'] = 'get-graph';
    _p['graph']  = options;
    
    
    $.getJSON( Blu.app.urls.ajax_base, _p, function( json ) {

        if( typeof callback === 'function' ) {
            callback( json );
        }

    });
    
};


/**
 * Chargement d'un graphe
 * @param graph
 */
Blu.fn.map.chargeGraphe = function( graph ) {
    
    Blu.info( 'Chargement d\'un graphe > ' + ( graph.filename || '' ) );
    
    
    // Modifs de l'UI
    var _ZC = $('#zonecentre');
    Blu.fn.UI.removeCanvasScreen();
    

    // Remarque : le nom du graphe est utilisé par la Time Machine
    // avant qu'on ait fini de charger le graphe
    
    if( !graph.filename ) {
        Blu.fn.UI.graphNotAvailable();
        //Blu.fn.UI.mapNotification( 'No graph available' );
        Blu.carto = {
            nodes : [], 
            edges : []
        };
        Blu.fn.map.afterLoad();
        return;
    }
    
    if( !graph.datesObj ) {
        Blu.fn.map.prepareGraph( graph );
    }
    Blu.graphs.current = graph;
    
    Blu.timeline.params.filter.dates = {
        'min' : graph.datesObj.min,
        'max' : graph.datesObj.max
    };
    
    //var _timesGraph = Blu.fn.misc.filenameToTimes( graph );

    _ZC.spin('big');
    Blu.fn.UI.mapNotification('');

    
    /**
     * Chargement du graphe au format JSON
     */
    $.getJSON( 
        Blu.app.urls.graphs_base + Blu.projects.current.graphs_dir + graph.filename, 
        function( json ) {
            
            Blu.log('Graph JSON chargé');

            // UI
            $('#zonecentre').spinStop();
            Blu.fn.UI.mapNotification('');
            
            // Chargement du graphe JSON
            Blu.carto = json;
            
            if( !json.nodes.length ) {
                Blu.fn.UI.graphNotAvailable();
                //Blu.fn.UI.mapNotification( 'No graph available' );
            }

            // Traitements du graphe
            Blu.fn.map.afterLoad();

        }
    );
};


/**
 * Affichage de l'écran d'erreur sur le graphe
 */
Blu.fn.UI.graphNotAvailable = function() {
    
    Blu.fn.UI.mapNotification('');
    
    $('#zonecentre').spinStop();
    
    Blu.fn.UI.showCanvasScreen( { 'error' : true } );
    
};


/**
 * Traitements après chargement d'un graphe
 */
Blu.fn.map.afterLoad = function() {
    
    Blu.info('Blu.fn.map.afterLoad()');
    
    // Nombre total de users
    Blu.counts.users.graph = Blu.carto.nodes.length;
    Blu.fn.UI.miniStats();
    Blu.fn.UI.updateNodesCounts();
    
    Blu.map.isIdentical = false;

    // Curseur du graphe en cours sur la mini-timeline
    if( Blu.timemachine.initialized ) {
        Blu.fn.timemachine.currentGraphCursor();
        Blu.fn.timemachine.trace();
    }
    
    if( !Blu.carto.nodes.length ) {
        Blu.warn('No graph to display!');
        Blu.map.initialise = true;
        $('#zonecentre').spinStop();
        return;
    }

    // Coordonnées minimum et maximum du graphe + nombre de tweets maximal
    var _xmin       = 1e9, 
        _xmax       = -1e9, 
        _ymin       = 1e9, 
        _ymax       = -1e9, 
        _marge      = 30, 
        _tweetsmax  = 0,
        _node;
    
    for( var i in Blu.carto.nodes ) {
        
        _node       = Blu.carto.nodes[i];
        
        _xmin       = Math.min( _node.x, _xmin );
        _xmax       = Math.max( _node.x, _xmax );
        
        _ymin       = Math.min( _node.y, _ymin );
        _ymax       = Math.max( _node.y, _ymax );
        
        if( typeof( _node.tweets ) === 'undefined' ) {
            _node.tweets = "0";
        }
        
        _tweetsmax  = Math.max( _node.tweets, _tweetsmax );
    }

    // Echelle du graphe + delta X et Y
    var _scale = Math.min(  ( Blu.map.width - _marge ) / ( _xmax - _xmin ), 
                            ( Blu.map.height - _marge ) / ( _ymax - _ymin )  ),
        _deltax = ( Blu.map.width - _scale * ( _xmin + _xmax ) ) / 2,
        _deltay = ( Blu.map.height - _scale * ( _ymin + _ymax ) ) / 2;

    // Mini map
    //Blu.canvas_mini.ctx.clearRect( 0, 0, Blu.map.mini.width, Blu.map.mini.height );


    //Blu.log('Calcul des coordonnées de base et des couleurs pour chaque noeud du graphe');
    
    var _node;
    
    /*
     * Calcul des coordonnées de base et des couleurs pour chaque noeud du graphe
     */
    for( var i in Blu.carto.nodes ) {

        _node = Blu.carto.nodes[i];
        
        
        // Coordonnées de base
        _node.coords = {
            base : {
                x : _deltax + _scale * _node.x,
                y : _deltay + _scale * _node.y,
                r : _scale * _node.size
            }
        }
        
        // User dont c'est le mapping
        if( Blu.projects.current.type === 'search-user' && 
            _node.name.replace('@','').toLowerCase() == Blu.projects.current.twitter_screen_name.replace('@','').toLowerCase() ) {
            
            _node.coords.base.r = _scale * 5; // _node.size varie de 5 à 60
            _node.isUserMapped = true;
        }
        
        // Utilisateur connecté
        if( _node.name.replace('@','').toLowerCase() == Blu.user.screen_name.replace('@','').toLowerCase() ) {
            _node.isMe = true;
        }
        
         /*
         * Couleurs des noeuds
         */
        var _nc = 15,
            _rg = Math.sqrt( _node.tweets / _tweetsmax );
           
        _node.colors        = {};
        _node.colors.blue   = {};
        _node.colors.green  = {};
        
        // Bleu (ancienne version)
        //_node.colors.blue.base  = Blu.fn.color.hslToRgb( (.5 + .15 * _rg), 1, (.45 + .2 * _rg), 0.7 ).string;
        //_node.colors.blue.off   = Blu.fn.color.hslToRgb( (.5 + .15 * _rg), .3, (.45 + .2 * _rg), 0.5 ).string;

        if( Blu.config.map.style.nodes.monochrome ) {
            _rg = 0.52;
        }
        
        // Paramètres
        var _hue_blue   = 0.55,                     _hue_green  = 0.42,
            _sat_base   = 1.0,                      _sat_off    = 0.3,
            _lum_blue   = ( 0.75 - 0.5 * _rg ),     _lum_green  = ( 0.45 - 0.2 * _rg ),     _lum_offset  = 0.06,
            _alpha_base = 1.0,                      _alpha_off  = 0.5;
        
        // Bleu
        _node.colors.blue.base  = Blu.fn.color.hslToRgb( _hue_blue,     _sat_base,  _lum_blue,                  _alpha_base ).string;
        _node.colors.blue.base2 = Blu.fn.color.hslToRgb( _hue_blue,     _sat_base,  _lum_blue - _lum_offset,    _alpha_base ).string; // dégradé : -10 sur la luminosité
        
        _node.colors.blue.off   = Blu.fn.color.hslToRgb( _hue_blue,     _sat_off,   _lum_blue,                  _alpha_off ).string;
        _node.colors.blue.off2  = Blu.fn.color.hslToRgb( _hue_blue,     _sat_off,   _lum_blue - _lum_offset,    _alpha_off ).string;

        // Vert
        _node.colors.green.base  = Blu.fn.color.hslToRgb( _hue_green,   _sat_base,  _lum_green,                 _alpha_base ).string;
        _node.colors.green.base2 = Blu.fn.color.hslToRgb( _hue_green,   _sat_base,  _lum_green - _lum_offset,   _alpha_base ).string;
        
        _node.colors.green.off   = Blu.fn.color.hslToRgb( _hue_green,   _sat_off,   _lum_green,                 _alpha_off ).string;
        _node.colors.green.off2  = Blu.fn.color.hslToRgb( _hue_green,   _sat_off,   _lum_green - _lum_offset,   _alpha_off ).string;

        // Mini map
        /*Blu.canvas_mini.ctx.fillStyle = _node.colors.blue.base;
        Blu.canvas_mini.ctx.beginPath();
        Blu.canvas_mini.ctx.arc( _node.coords.base.x * Blu.map.echelleMiniature , _node.coords.base.y * Blu.map.echelleMiniature , _node.coords.base.r * Blu.map.echelleMiniature + 1 , 0 , Math.PI*2 , true );
        Blu.canvas_mini.ctx.closePath();
        Blu.canvas_mini.ctx.fill();*/
    }

    /*
     * Pour chaque connexion (edge) du graphe, 
     * on détermine les ID des noeuds source et cible
     */
    for( var j in Blu.carto.edges ) {

        // Parcours des noeuds
        var _trouve = 0;
        for( var k in Blu.carto.nodes ) {
            
            // On a trouvé le noeud source de la connexion
            if( Blu.carto.nodes[k].id == Blu.carto.edges[j].source ) {
                Blu.carto.edges[j].s = k;
                _trouve++;
            }
            // On a trouvé le noeud cible de la connexion
            if( Blu.carto.nodes[k].id == Blu.carto.edges[j].target ) {
                Blu.carto.edges[j].t = k;
                _trouve++;
            }
            // On a tout trouvé ! (source + cible de la connexion)
            if( _trouve == 2 ) {
                break;
            }
            
        }
    }

    // Sauvegarde de la mini-map en image
    //Blu.canvas_mini.map.image = Blu.canvas_mini.ctx.getImageData( 0, 0, Blu.map.mini.width, Blu.map.mini.height );

    // Map initialisée :)
    Blu.map.initialise = true;
    
    // Tracé du graphe
    Blu.fn.map.traceMap( true );
    
    // Recherche d'infos sur les noeuds du graphe pour déterminer les noeuds suivis
    if( Blu.config.map.showFollowing ) {
        //Blu.fn.map.lookupUsers(); // redondant avec l'appel suivant le calcul du top users
    }
    
    
}; // Fin de Blu.fn.map.afterLoad()


/**
 * Calcul des noeuds suivis sur le graphe courant (et affichage)
 */
Blu.fn.map.calcFollowed = function() {
    
    Blu.info( 'Blu.fn.map.calcFollowed...' );
    
    if( ! Blu.user.following.list ) {
        Blu.warn('No following...');
        return;
    } else if ( !Blu.carto ) {
        Blu.warn('No graph...');
        return;
    }
    
    var _node;
    
    Blu.graphs.current.followedNodes = 0;
    
    for( var i in Blu.carto.nodes ) {
        
        _node = Blu.carto.nodes[i];
        
        if( Blu.fn.user.isFollowed( _node.name ) ) {        
            _node.followed = true;
            Blu.graphs.current.followedNodes++;
        } else {
            _node.followed = false;
        }
        
    }
    
    Blu.log( Blu.graphs.current.followedNodes + ' users are followed on this graph.' );
    
    Blu.fn.UI.updateNodesCounts();
    
    Blu.fn.map.traceMap( true );
};

/**
 * Survol d'un noeud sur la carte
 * @param {String} _nomNoeud
 */
Blu.fn.map.survolNoeud = function( _nomNoeud ) {
    
    if( Blu.carto && Blu.viz.current === 'map' ) {
        
        var _nomNoeud_lc = _nomNoeud.toLowerCase();
        
        for( var i in Blu.carto.nodes ) {
            
            if( Blu.carto.nodes[i].name.toLowerCase() === _nomNoeud_lc ) {
                
                Blu.map.params.hoverNode = i;
                return;
                
            }
        }
    }
    
}; // Fin de Blu.fn.map.survolNoeud()


/**
 * Retourne le noeud présent aux coordonnées (x, y) de la souris
 * @param {Object} _coords
 * @returns {integer} indice du noeud ou -1 si aucun noeud n'est trouvé
 */
Blu.fn.map.getNodeFromPos = function( _coords ) {
    
    if( !Blu.carto || !Blu.carto.nodes ) {
        return -1;
    }
    
    var _d;
    
    for( var i = Blu.carto.nodes.length - 1; i >= 0 ; i-- ) {
        
        if( typeof Blu.carto.nodes[i].coords.actuel === "undefined" ) {
            continue;
        }
        
        _d  = Math.sqrt(
            Math.pow( Blu.carto.nodes[i].coords.actuel.x - _coords.x, 2 ) + 
            Math.pow( Blu.carto.nodes[i].coords.actuel.y - _coords.y, 2 ) 
        );
        
        if( _d < Blu.carto.nodes[i].coords.actuel.r ) {
            return i;
        }
        
    }
    return -1;
    
}; // Fin de Blu.fn.map.getNodeFromPos()


/**
 * Calcul des coordonnées (x, y, r) sur le canvas
 */
Blu.fn.canvas.calcCoord = function( x, y, coord ) {
    
    var _r = Math.sqrt( Math.pow( coord.x - x , 2 ) + Math.pow( coord.y - y , 2 ) );
    
    if(  _r < Blu.rayonLoupe ) {
        var _cos    = ( coord.x - x ) / _r,
            _sin    = ( coord.y - y ) / _r,
            _newr   = Blu.rayonLoupe * Math.pow( _r / Blu.rayonLoupe, Blu.gammaLoupe ),
            _coeff  = ( Blu.gammaLoupe * Math.pow( ( _r + 1 ) / Blu.rayonLoupe, Blu.gammaLoupe - 1 ) );
        return {
            "x" : x + _newr * _cos,
            "y" : y + _newr * _sin,
            "r" : _coeff * coord.r
        }
        
    } else {
        return coord;
    }
    
};


/**
 * Reset des usercards
 * @param resetType hover/selected/all
 */
Blu.fn.usercards.reset = function( resetType ) {
    
    resetType = resetType || 'all';
    
    Blu.log('Blu.fn.usercards.reset( ' + resetType + ' )' );
    
    for( var i in Blu.usercards ) {
        
        if( resetType == i || resetType === 'all' ) {
            
            Blu.usercards[i] = {
                'node'              : -1,
                'position' : {
                    'align'         : '',
                    'fromNode'      : 0,
                    'x'             : 0,
                    'y'             : 0
                },
                'state' : {
                    'closed'        : false,
                    'expanded'      : true,
                    'locked'        : false,
                    'mouseChanged'  : false,
                    'mouseOver'     : false,
                    'show'          : false
                }
            };

        }
    }
};


/**
 * Evénements liés aux usercards
 */
Blu.fn.usercards.events = function() {
    
    $('.user-card').live({
        mouseover : function() {
            var _cardType = ( Blu.usercards.hover.state.show ) ? 'hover' : 'selected';
            Blu.usercards[ _cardType ].state.mouseOver = true;
            Blu.usercards[ _cardType ].state.mouseChanged = true;
            Blu.fn.map.traceMap(); // #1
        },
        mouseout : function() {
            var _cardType = ( Blu.usercards.hover.state.show ) ? 'hover' : 'selected';
            Blu.usercards[ _cardType ].state.mouseOver = false;
            Blu.usercards[ _cardType ].state.mouseChanged = true;
        }
    });
     
    $('.user-card .bt-more').live({
        click : function() {
            
            var _cardType   = ( Blu.usercards.hover.state.show ) ? 'hover' : 'selected',
                _$UC        = $('.user-card'),
                _UC         = Blu.usercards[ _cardType ];
                
            _UC.state.expanded = true;
            
            _$UC.addClass('expanded');
            _$UC.find('.twitter-follow-button');
            _$UC.find('.more-container .more').removeClass('hide');
            
            Blu.fn.user.positionUserCard(); // #1 pour adapter immédiatement l'infobulle
            
            _UC.state.locked = true;
            
            return false;
        }
    });
     
    // Fermeture de l'infobulle // #1
    $('.user-card .close').live({
        click : function() { // ou créer une partie dédiée dans Blu.fn.usercards.reset() // closed inutile ?
            
            $('.user-card').remove();
            
            var _selectedState  = Blu.usercards.selected.state,
                _hoverState     = Blu.usercards.hover.state;
            
            _selectedState.closed     = true;  // le faire pour hover ne sert à rien => TODO: supprimer closed dans .hover
            _selectedState.mouseOver  = false;
            _selectedState.expanded   = false;
            
            _hoverState.mouseOver     = false;
            _hoverState.mouseChanged  = true;
            
            _selectedState.show       = false; // LOURD => adapter reset pr intégrer la modif des selected.state uniquement
            
            Blu.fn.usercards.reset( 'hover' );
            
            return false;
        }
    });
    

    /**
     * Affichage automatique des avatars
     */
    /*Blu.timers.avatarsAutoLoad = setInterval( function() {

        $('img[data="need-avatar"]').each( function() {

            var _img    = $(this),
                _avatar = Blu.fn.user.get( _img.data('twitter-screen-name') ).data.profile_image_url;

            if( !_avatar || _avatar == Blu.images.default_user ) {
                return;
            }

            _img.removeData('need-avatar');

            _img.attr( 'src', _avatar );

        });


    }, 1000 );*/

};


/**
 * Tracé d'un arc sur le graphe
 */
Blu.fn.map.traceArc = function( contexte, source, target ) {
    
    contexte.beginPath();
    contexte.moveTo( source.x, source.y );
    
    var x3, y3, 
        x4, y4;
    
    if( source.x == target.x && source.y == target.y ) {
        
        x3 = source.x + 2.8 * source.r;
        y3 = source.y - source.r;
        x4 = source.x;
        y4 = source.y + 2.8 * source.r;
        
        contexte.bezierCurveTo( x3, y3, x4, y4, source.x + 1, source.y );
        
    } else {
        
        x3 = .3 * target.y - .3 * source.y + .8 * source.x + .2 * target.x;
        y3 = .8 * source.y + .2 * target.y - .3 * target.x + .3 * source.x;
        x4 = .3 * target.y - .3 * source.y + .2 * source.x + .8 * target.x;
        y4 = .2 * source.y + .8 * target.y - .3 * target.x + .3 * source.x;
        
        contexte.bezierCurveTo( x3, y3, x4, y4, target.x, target.y );
        
    }
    
    contexte.stroke();
    
}; // Fin de Blu.fn.map.traceArc()

Blu.fn.map.resetCanvas = function() {
    
    var _canvas = Blu.canvas.ctx;
    
    _canvas.clearRect( 0, 0, Blu.zoneGraphe.largeur, Blu.zoneGraphe.hauteur );
    
    /*var _gradient = _canvas.createRadialGradient(   Blu.zoneGraphe.largeur/2, Blu.zoneGraphe.hauteur/2, 0, 
                                                    0, 0, Blu.zoneGraphe.largeur/2 );
    _gradient.addColorStop( 0, '#ffffff' );
    _gradient.addColorStop( 1, '#000000' );
    _canvas.fillStyle = _gradient;*/
    
};

/**
 * Tracé de la map
 * @param forceTrace bool
 */
Blu.fn.map.traceMap = function( forceTrace ) {
    
    forceTrace = ( typeof forceTrace === 'boolean' ) ? forceTrace : false; 
    
    if( forceTrace ) {
        //Blu.info('traceMap() forcé');
    }
    
    Blu.fn.UI.updateSize();
    
    if( !Blu.carto || !Blu.map.initialise ) {
        Blu.counts.users.graph = 0;
        Blu.fn.map.resetCanvas();
        if( forceTrace ) {
            //Blu.warn('pas de carto / map non initialisée');
        }
        return;
    }
    
    var _canvas = Blu.canvas.ctx,
        _node, _node2, _edge, _fs, _colorEdge, _traceEdge, _label, _colorMode, _colorState, _gradient;
    
    Blu.map.params.posSouris = ( Blu.map.params.loupeActive ? ( Blu.mouse.pos ? ( Blu.mouse.pos.x + "," + Blu.mouse.pos.y ) : "out" ) : null );
    
    // Les paramètres de la map sont-ils identiques ?
    var _identique = Blu.map.isIdentical && !Blu.usercards.hover.state.mouseChanged;
    for( var i in Blu.map.params ) {
        _identique = _identique && ( Blu.map.params[i] == Blu.map.oldParams[i] );
    }
    
    if( _identique && !forceTrace ) {
        
        // Placement de l'infobulle
        if( Blu.usercards.hover.node !== -1 || Blu.usercards.selected.node !== -1 ) {
            Blu.fn.user.positionUserCard();
        }
        
        return;
    } else {
        //Blu.log('pas identique');
        for( var i in Blu.map.params ) {
            Blu.map.oldParams[i] = Blu.map.params[i];
        }
    }
       
    // Effacement du canvas
    Blu.fn.map.resetCanvas();
    
    // Dimensions / position
    Blu.map.echelleGenerale = Math.pow( Math.SQRT2, Blu.map.params.zoomLevel );
    Blu.map.decalageX       = ( Blu.zoneGraphe.largeur / 2 ) - ( Blu.map.params.centreX * Blu.map.echelleGenerale );
    Blu.map.decalageY       = ( Blu.zoneGraphe.hauteur / 2 ) - ( Blu.map.params.centreY * Blu.map.echelleGenerale );
	
    var _coeffSize          = Math.pow( Blu.map.echelleGenerale, -.15 ),
        _coeffText          = 1,
        _limTxt             = 9;
	
    // Effet Loupe
    if( Blu.map.params.loupeActive && Blu.mouse.pos ) {
        _canvas.fillStyle = "rgba(220,220,250,0.4)";
        _canvas.beginPath();
        _canvas.arc( Blu.mouse.pos.x, Blu.mouse.pos.y, Blu.rayonLoupe , 0, Math.PI*2, true );
        _canvas.closePath();
        _canvas.fill();
    }

    // Noeud survolé, ou sinon sélectionné
    var _hoverSelectedNode = -1;
    
    if( Blu.map.params.hoverNode != -1 ) {
        
        _hoverSelectedNode = Blu.map.params.hoverNode;
        
    } else if( Blu.usercards.hover.state.mouseOver || Blu.usercards.selected.state.mouseOver ) {
        
        _hoverSelectedNode = ( Blu.usercards.hover.node != -1 ) ? Blu.usercards.hover.node : Blu.usercards.selected.node;
        
        if( Blu.usercards.hover.state.mouseOver ) {
            Blu.map.params.hoverNode = Blu.usercards.hover.node;
        }
        
    } else {
        
        _hoverSelectedNode = Blu.map.params.selectedNode;
        
    }
    
    var //_hoverSelectedNode      = ( Blu.map.params.hoverNode != -1 ) ? Blu.map.params.hoverNode : Blu.map.params.selectedNode,
        _hasHoverOrSelectedNode = ( _hoverSelectedNode != -1 ),
        _activeNodes            = [ Blu.map.params.selectedNode, Blu.map.params.hoverNode ],
        _node;


    /*
     * Parcours des noeuds (1) : calcul des coordonnées "actuelles" et de la visibilité
     */
    for( var i in Blu.carto.nodes ) {
        
        _node = Blu.carto.nodes[i];
        
        _node.coords.actuel = {
            x : Blu.map.echelleGenerale * _node.coords.base.x + Blu.map.decalageX,
            y : Blu.map.echelleGenerale * _node.coords.base.y + Blu.map.decalageY,
            r : Blu.map.echelleGenerale * _node.coords.base.r * _coeffSize
        }
        
        _node.visible = (   ( _node.coords.actuel.x + _node.coords.actuel.r > 0 ) && 
                            ( _node.coords.actuel.x - _node.coords.actuel.r < Blu.zoneGraphe.largeur ) && 
                            ( _node.coords.actuel.y + _node.coords.actuel.r > 0 ) && 
                            ( _node.coords.actuel.y - _node.coords.actuel.r < Blu.zoneGraphe.hauteur )   );
    }
    
    /*
     * Noeuds "mis en avant"
     */
    var _featuredNodes = [];
    if( _hoverSelectedNode != -1 ) {
        _featuredNodes = [ _hoverSelectedNode ];
        //_featuredNodes = [ Blu.map.params.selectedNode, Blu.map.params.hoverNode ];
    }
    
    /*if( listeTagsCourants.length ) {
        Blu.map.params.selectedNode = -1;
        _featuredNodes = listeTagsCourants.slice(0);
    } else {
        if( Blu.map.params.selectedNode != -1) {
            _tagsMisEnValeur = [ Blu.map.params.selectedNode ];
        }
    }*/
	
    /* 
     * Parcours des connexions
     */
    for( var i in Blu.carto.edges ) {
        
        _edge       = Blu.carto.edges[i],
        _colorEdge  = "rgba(100,100,100,0.2)",
        _traceEdge  = false;
        
        
        // Tracé des connexions liées à un noeud survolé/sélectionné
        if( _hasHoverOrSelectedNode /*_hoverSelectedNode != -1*/ ) {
            
            for( var j in _activeNodes ) {

                if( _activeNodes[j] === -1 ) {
                    continue;
                }
                
                _node = _activeNodes[j];
                
                // Noeuds liés à un noeud survolé/sélectionné
                if( _edge.source == Blu.carto.nodes[ _node ].id ) {
                    
                    _featuredNodes.push( _edge.target ); // Affiche le nom du noeud
                    _node2        = Blu.carto.nodes[ _edge.t ];
                    _colorEdge    = ( _node2.followed && Blu.config.map.showFollowing ) ? _node2.colors.green.base : _node2.colors.blue.base;
                    _traceEdge    = true;
                    
                }

                if( _edge.target == Blu.carto.nodes[ _node ].id ) {
                    
                    _featuredNodes.push( _edge.source );
                    _node2        = Blu.carto.nodes[ _edge.s ];
                    _colorEdge    = ( _node2.followed && Blu.config.map.showFollowing ) ? _node2.colors.green.base : _node2.colors.blue.base;
                    _traceEdge    = true;
                    
                }
            }
        }
        
        /*if( listeTagsCourants) {
        _n = 0;
        for( var j = 0; j < listeTagsCourants.length; j++ ) {
                if( _edge.source == listeTagsCourants[j] ) {
                    _n++;
                }
                if( _edge.target == listeTagsCourants[j] ) {
                    _n++;
                }
                if( _n == 2 ) {
                    _traceEdge = true;
                    _colorEdge = Blu.fn.color.fondu( Blu.carto.nodes[_edge.s].colors.blue.base,Blu.carto.nodes[_edge.t].colors.blue.base );
                    break;
                }
            }
        }*/

        // Tracé d'une connexion sur le graphe
        if( ( _traceEdge || Blu.map.params.showEdges ) && 
            ( Blu.carto.nodes[ _edge.s ].visible || Blu.carto.nodes[ _edge.t ].visible ) ) {
            
            _canvas.lineWidth = Blu.map.echelleGenerale * _coeffSize * _edge.weight;
            var _s          = _edge.s,
                _t          = _edge.t,
                _coords     = ( ( Blu.map.params.loupeActive && Blu.mouse.pos ) ? 
                                    Blu.fn.canvas.calcCoord( Blu.mouse.pos.x , Blu.mouse.pos.y , Blu.carto.nodes[_s].coords.actuel ) : 
                                    Blu.carto.nodes[_s].coords.actuel ),
                _coordt     = ( ( Blu.map.params.loupeActive && Blu.mouse.pos ) ? 
                                    Blu.fn.canvas.calcCoord( Blu.mouse.pos.x , Blu.mouse.pos.y , Blu.carto.nodes[_t].coords.actuel ) : 
                                    Blu.carto.nodes[_t].coords.actuel );
            _canvas.strokeStyle = _colorEdge;
            Blu.fn.map.traceArc( _canvas, _coords, _coordt );
            
        }
        
    }   // Fin du parcours des connexions
    
	
    /*if( tagVerrouille && (Blu.map.params.hoverNode != -1)) {
        if( _featuredNodes.indexOf(Blu.map.params.hoverNode) === -1) {
            _tagsMisEnValeur.push(Blu.map.params.hoverNode);
        }
    }*/

    _canvas.lineWidth = 4;
    

    if( _hasHoverOrSelectedNode ) {
        
        for( var j in _activeNodes ) {
            
            if( _activeNodes[j] === -1 ) {
                continue;
            }
            
            _node = Blu.carto.nodes[ _activeNodes[j] ];

            _node.coords.reel =  ( Blu.map.params.loupeActive && Blu.mouse.pos ) ? 
                                                Blu.fn.canvas.calcCoord( Blu.mouse.pos.x , Blu.mouse.pos.y , _node.coords.actuel ) : 
                                                _node.coords.actuel;
        }
    }

    /*
     * Parcours des noeuds (2) : tracé des noeuds
     */
    for( var i in Blu.carto.nodes ) {
        
        _node = Blu.carto.nodes[i];
        
        if( _node.visible ) {
            
            if( i != _hoverSelectedNode && i != Blu.map.params.selectedNode ) {
                
                // Coordonnées réelles
                _node.coords.reel  =    ( Blu.map.params.loupeActive && Blu.mouse.pos ) ? 
                                            Blu.fn.canvas.calcCoord( Blu.mouse.pos.x , Blu.mouse.pos.y , _node.coords.actuel ) : 
                                            _node.coords.actuel;
                                                    
                // Noeud mis en avant
                _node.isFeatured = ( _featuredNodes.indexOf( _node.id ) != -1 );
                
                // Tracé du cercle du noeud
                _canvas.beginPath();
                _colorState = ( _featuredNodes.length && !_node.isFeatured ) ?      'off'   : 'base';
                _colorMode  = ( _node.followed && Blu.config.map.showFollowing ) ?  'green' : 'blue';
                
                // Dégradé sur le noeud
                if( Blu.config.map.style.nodes.gradient ) {
                    _gradient = _canvas.createRadialGradient(   _node.coords.reel.x, _node.coords.reel.y, Blu.config.map.style.nodes.gradRadius * _node.coords.reel.r, 
                                                                _node.coords.reel.x, _node.coords.reel.y, _node.coords.reel.r   );
                    _gradient.addColorStop( 0, _node.colors[ _colorMode ][ _colorState ] );
                    _gradient.addColorStop( 1, _node.colors[ _colorMode ][ _colorState + '2' ] );
                    _canvas.fillStyle = _gradient;
                    
                // Aplat de couleur
                } else {
                    _canvas.fillStyle = _node.colors[ _colorMode ][ _colorState ];
                }
                
                /*if( _node.isMe ) {
                    _canvas.fillStyle = "rgb(191,28,28)";
                }
                
                if( _node.isUserMapped ) {
                    _canvas.strokeStyle  = "rgb(131,28,191)";
                    _canvas.lineWidth    = 3;
                    _canvas.stroke();
                }*/
                
                _canvas.arc( _node.coords.reel.x, _node.coords.reel.y, _node.coords.reel.r , 0, Math.PI*2, true );
                _canvas.closePath();


                _canvas.fill();
            }
        }
    }
	
    /*
     * Parcours des noeuds (3) : textes des noeuds non survolés/sélectionnés
     */
    for( var i in Blu.carto.nodes ) {

        _node = Blu.carto.nodes[i];

        if( _node.visible ) {

            if( i != _hoverSelectedNode && i != Blu.map.params.selectedNode ) {

                _fs = _node.coords.reel.r * _coeffText;

                // Noeud mis en avant
                if( _node.isFeatured ) {
                    if( _hoverSelectedNode != -1 ) {
                        var _d = Math.sqrt( Math.pow( _node.coords.reel.x - Blu.carto.nodes[_hoverSelectedNode].coords.reel.x, 2 ) 
                                + Math.pow( _node.coords.reel.y - Blu.carto.nodes[_hoverSelectedNode].coords.reel.y, 2 ) );
                        if( _d > 80 ) {
                            _fs = Math.max( _limTxt + 2, _fs );
                        }
                    } else {
                        _fs = Math.max( _limTxt + 2, _fs );
                    }
                }

                // Texte : suivant le niveau de zoom de la map et la taille du noeud, on l'affiche ou pas
                if( _fs > _limTxt && Blu.config.map.showLabels ) {

                    _label                      = _node[Blu.config.map.nodeLabel];
                    _canvas.font         = Math.floor( _fs ) + "px " + Blu.config.map.style.nodes.font_family;
                    _canvas.textAlign    = "center";
                    _canvas.textBaseline = "middle";

                    // Halo blanc du texte
                    _canvas.fillStyle    = "rgba(255,255,250,0.3)";
                    _canvas.fillText( _label,    _node.coords.reel.x - 2,     _node.coords.reel.y );
                    _canvas.fillText( _label,    _node.coords.reel.x + 2,     _node.coords.reel.y );
                    _canvas.fillText( _label,    _node.coords.reel.x,         _node.coords.reel.y - 2 );
                    _canvas.fillText( _label,    _node.coords.reel.x,         _node.coords.reel.y + 2 );

                    // Texte en noir                    
                    _canvas.fillStyle    =   (   _node.id != Blu.map.params.hoverNode && 
                                                        _featuredNodes.length && 
                                                        ( !_node.isFeatured || _hasHoverOrSelectedNode ) ? 
                                                            "rgba(60,60,60,1.0)" : 
                                                            "rgb(0,0,0)"   );
                    _canvas.fillText( _label, _node.coords.reel.x, _node.coords.reel.y );
                }
            }
        }
    }

    /*
     * Tracé et texte des noeuds survolés/sélectionnés
     */
    if( _hasHoverOrSelectedNode /*_hoverSelectedNode != -1*/ ) {
                
        for( var j in _activeNodes ) {
            
            if( _activeNodes[j] === -1 ) {
                continue;
            }

            _node    = Blu.carto.nodes[ _activeNodes[j] ];
            _label   = _node[ Blu.config.map.nodeLabel ];

            // Cercle
            _colorState = 'base';
            _colorMode  = ( _node.followed && Blu.config.map.showFollowing ) ?  'green' : 'blue';
            _canvas.fillStyle = _node.colors[ _colorMode ][ _colorState ];   
            
            // Dégradé sur le noeud
            if( Blu.config.map.style.nodes.gradient ) {
                _gradient = _canvas.createRadialGradient(    _node.coords.reel.x, _node.coords.reel.y, Blu.config.map.style.nodes.gradRadius * _node.coords.reel.r, 
                                                                    _node.coords.reel.x, _node.coords.reel.y, _node.coords.reel.r   );
                _gradient.addColorStop( 0, _node.colors[ _colorMode ][ _colorState ] );
                _gradient.addColorStop( 1, _node.colors[ _colorMode ][ _colorState + '2' ] );
                _canvas.fillStyle = _gradient;
            }            
            
            _canvas.beginPath();
            _canvas.arc( _node.coords.reel.x, _node.coords.reel.y, _node.coords.reel.r, 0, Math.PI*2, true );
            _canvas.closePath();
            _canvas.fill();
            
            // Contour du cercle
            //_canvas.strokeStyle  = "rgba( 0, 100, 0, 0.8 )";
            _canvas.strokeStyle  = "rgba( 0, 0, 0, 0.7 )";
            _canvas.lineWidth    = 3;
            //_canvas.strokeStyle  = "rgba( 130, 27, 51, 1.0 )";
            _canvas.stroke();

            /*
             * Texte
             */
            
            _fs = Math.max( _limTxt + 2, _node.coords.reel.r * _coeffText ) + 2;

            _canvas.font              = "bold " + Math.floor( _fs ) + "px " + Blu.config.map.style.nodes.font_family;
            _canvas.textAlign         = "center";
            _canvas.textBaseline      = "middle";

            // Halo blanc du texte
            _canvas.fillStyle         = "rgba(255,255,250,0.8)";
            _canvas.fillText( _label,    _node.coords.reel.x - 2,     _node.coords.reel.y );
            _canvas.fillText( _label,    _node.coords.reel.x + 2,     _node.coords.reel.y );
            _canvas.fillText( _label,    _node.coords.reel.x,         _node.coords.reel.y - 2 );
            _canvas.fillText( _label,    _node.coords.reel.x,         _node.coords.reel.y + 2 );
            
            // Texte en noir
            _canvas.fillStyle = "rgb(0,0,0)";
            _canvas.fillText( _label,    _node.coords.reel.x,         _node.coords.reel.y );
            
        }
    }
    /*
    // Copie de l'image de la mini-map dans le mini-canvas
    if( Blu.canvas_mini.map.image ) {
        Blu.canvas_mini.ctx.putImageData( Blu.canvas_mini.map.image, 0, 0 );
    }
    
    // Ajout du cadre visible (rouge) sur la mini-map
    var _r = Blu.map.echelleMiniature / Blu.map.echelleGenerale,
        _x = - _r * Blu.map.decalageX,
        _y = - _r * Blu.map.decalageY,
        _w = _r * Blu.zoneGraphe.largeur,
        _h = _r * Blu.zoneGraphe.hauteur;
    Blu.canvas_mini.ctx.strokeStyle = "rgb(220,0,0)";
    Blu.canvas_mini.ctx.lineWidth   = 1;
    Blu.canvas_mini.ctx.fillStyle   = "rgba(120,120,120,0.1)";
    Blu.canvas_mini.ctx.beginPath();
    Blu.canvas_mini.ctx.fillRect( _x, _y, _w, _h );
    Blu.canvas_mini.ctx.strokeRect( _x, _y, _w, _h );*/
    
    // Placement de l'infobulle
    if( Blu.config.map.usercards.show && ( Blu.usercards.hover.state.show || Blu.usercards.selected.state.show ) ) {
        Blu.fn.user.positionUserCard();
    }
    
}; // Fin de Blu.fn.map.traceMap()


/**
 * Survol de l'autocomplete
 */
Blu.fn.AC.hoverAC = function() {
    
    $('#autocomplete li').removeClass('hover');
    
    var _li = $('#liac_'+Blu.AC.position);
    
    _li.addClass('hover');
    
    if( _li.text()[0] === '@' ) {
        Blu.fn.map.survolNoeud( _li.text() );
    }
    
};

Blu.fn.AC.changePosAC = function( _n ) {
    Blu.AC.position = _n;
    Blu.fn.AC.hoverAC();
};

/**
 * Mise à jour de l'autocomplete
 */
Blu.fn.AC.majAC = function( input_id ) {
    
    var _val            = $(input_id).val().toLowerCase(),
        _ac             = $('#autocomplete'),
        _inputSearch    = $('#inputrecherche');

    //Blu.log('majAC : val = "'+_val+'", lastEntry = "'+Blu.AC.lastEntry+'"'  );

    // S'il y a lieu de regénérer l'autocomplete
    if( _val != Blu.AC.lastEntry || _ac.html() === "" ) {
        
        Blu.AC.lastEntry = _val;        
        
        var _htmlAC     = "",
            _tabTags    = [];
            
        var _n = 0;
        
        // Chaîne vide, on s'en va
        if( _val === '' ) {
            _ac.html('').fadeOut();
            return;
        }
        
        /*
         * Mots / hashtags
         */
        
        // Recherche des mots
        /*var _word, _search_word;
        
        for( var i in Blu.wordsBase ) {
            
            _word = Blu.wordsBase[i];
            _search_word = _word.mot.search( _val );
            
            if( _search_word != -1 && _search_word <= 1 && _word.mot[0] != '@' ) {
                _tabTags.push( _word.mot );
            }
            if( _tabTags.length >= 8) {
                break;
            }
            
        }
        // HTML des mots
        if( _tabTags.length ) {
            
            _htmlAC += '<div><h4>' + Blu.txt('AC_words') + '</h4><ul>';
            for( var i in _tabTags ) {
                _htmlAC +=    '<li class="item" id="liac_' + _n + '" data-posAC="' + _n + '">' + 
                                    '<a href="#" data-tag="' + _tabTags[i] + '"><span>' + _tabTags[i] + '</span></a>' + 
                                '</li>';
                _n++;
            }
            _htmlAC += '</ul></div>';
            
        }*/
        
        /*
         * Users
         */
        
        // Recherche des users
        var _users = [],
            _user,
            _search_user;
            

        // V1 : Blu.usersBase
        if( 0 ) {

            for( var i in Blu.usersBase ) {
            
                _user           = Blu.usersBase[i];
                _search_user    = _user.mot.search( _val );
                
                if( _search_user != -1 && _search_user <= 1 ) {
                    _users.push( { 'screen_name' : _user.mot } );
                }
                if( _users.length >= 8) {
                    break;
                }
                
            }
            
        // V2 : Blu.carto.nodes
        } else {

            for( var i in Blu.carto.nodes ) {
                
                _user           = Blu.carto.nodes[i];
                _search_user    = _user.id.search( _val );
                
                if( _search_user != -1 && _search_user == 0 ) {
                    _users.push( { 'screen_name' : _user.id } );
                }
                if( _users.length >= 8) {
                    break;
                }
                
            }


        }
        // HTML des users
        if( _users.length ) {
            _htmlAC += '<div><ul>';
            for( var i in _users ) {
                _htmlAC +=    '<li class="item" id="liac_' + _n + '" data-posAC="' + _n + '">' + 
                                    '<a href="#" data-user="' + _users[i].screen_name + '">' + 
                                        '<img src="' + Blu.fn.user.getAvatarUrl( _users[i].screen_name, 'mini' ) + '" />' + 
                                        '<span>@' + _users[i].screen_name + '</span>' + 
                                    '</a>' + 
                                '</li>';
                _n++;
            }
            _htmlAC += '</ul></div>';
            
            // HTML
            _ac.html( _htmlAC );
        } else {
            _ac.hide();
        }
        
        Blu.AC.position = 0;
        
    }
    Blu.fn.AC.hoverAC();
    
    // CSS de l'autocomplete
    _ac.css({
        top     : ( _inputSearch.offset().top + _inputSearch.outerHeight() ) + 'px',
        left    : _inputSearch.offset().left + 'px',
        width   : ( _inputSearch.outerWidth() - parseInt( _ac.css('border-left-width'), 10) - parseInt( _ac.css('border-right-width'), 10) ) + 'px'
    });
    
    // Affichage de l'autocomplete
    _ac.show();
    
    
}; // Fin de Blu.fn.AC.majAC()


/**
 * Lightbox
 */
Blu.fn.UI.lightbox = {
    
    open : function( _contenu, _largeur, _hauteur, showClose ) {
        
        var _lightbox = $('#lightbox'),
            _box        = _lightbox.find('.box'),
            _bg         = _lightbox.find('.bg'),
            _content    = _lightbox.find('.content'),
            _close      = _lightbox.find('.box > .close'),
            _showClose = ( typeof( showCloseButton ) === 'undefined' ) ? true : showClose;
        
        _showClose ? _close.show() : _close.hide();
        
        _content.html( _contenu );
        //var _x = Math.floor( Math.max( 0, ( $(window).width() - _largeur - 20 ) / 2 ) );
        //var _y = Math.floor( Math.max( 0, ( $(window).height() - _hauteur - 20 ) / 2 ) );
        if( _hauteur === 'auto' ) {
            _hauteur = _content.outerHeight(true) + 30;
            //Blu.log( _content.outerHeight(true) );
        }
        _hauteur = Math.min( _hauteur, $(window).height() - 40 );
        _box.css({
            'left'          : '50%', //_x + 'px',
            'top'           : '50%', //_y + 'px',
            'width'         : _largeur + 'px',
            'height'        : _hauteur + 'px',
            'margin-top'    : '-' + ( _hauteur/2) + 'px',
            'margin-left'   : '-' + ( _largeur/2) + 'px'
        });


        // Affichage de la lightbox
        _bg.show();
        _box.show();
        _lightbox.show();
        //_lightbox.fadeIn();
    },
    close : function() {

        $('#lightbox').fadeOut(500);
    },
    image : function( _src, _largeur, _hauteur ) {
        var _ww         = $(window).width(),
            _wh         = $(window).height(),
            _rapport    = Math.min(1, Math.min( ( _ww - 40 ) / _largeur , ( _wh - 50 ) / _hauteur ) ),
            _iw         = Math.round( _rapport * _largeur ),
            _ih         = Math.round( _rapport * _hauteur );
        Blu.fn.UI.lightbox.open('<img src="' + _src + '" width="' + _iw + '" height="' + _ih + '" />', _iw, _ih )
    },
    iframe : function( _src, _largeur, _hauteur ) {
        var _ww         = $(window).width(),
            _wh         = $(window).height(),
            _w          = _largeur ? _largeur : Math.min( ( _ww - 40 ), 960 ),
            _h          = _hauteur ? _hauteur : Math.min( ( _wh - 60 ), 700 );
        Blu.fn.UI.lightbox.open('<iframe src="' + _src + '" width="' + _w + '" height="' + _h + '" frameborder="0"></iframe>', _w, _h )
    }

};

/**
 * PopupWindow
 */
Blu.fn.UI.popupWindow = {
        
    /**
     * Ouverture d'une popup
     * @param options
     *  {
     *       'title'         : '',
     *       'content'       : '',
     *       'width'         : 400,
     *       'height'        : 'auto',
     *       'closeButton'   : true,
     *       'closeOverlay'  : true,
     *       'callback'      : function() {} // callback à la fermeture de la popup
     *   }
     */
    open : function( options ) {
        
        var _defaults = {
            'title'         : '',
            'content'       : '',
            'width'         : 400,
            'height'        : 'auto',
            'closeButton'   : true,
            'closeOverlay'  : true,
            'top'           : '90px',
            'bg'            : '',
            'padding'       : '20px',
            'callback'      : function() {} // callback à la fermeture de la popup
        };
        options = $.extend( _defaults, options || {} );
        
        if( ! $('#popupWindow').length ) {
            $('body').append(
                '<div id="popupWindow" class="hide">' + 
                    '<div class="bg"></div>' +
                    '<div class="box">' +
                        '<a href="#close" class="close glyph general">g</a>' +
                        '<div class="title"></div>' +
                        '<div class="content">' + 
                            '<div class="wrap">' + 
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
        }
        
        var _popup      = $('#popupWindow'),
            _box        = _popup.find('.box'),
            _bg         = _popup.find('.bg'),
            _title      = _box.find('.title'),
            _content    = _box.find('.content > .wrap'),
            _close      = _box.children('.close');
        
        // Options de la popup
        _close[ options.closeButton ? 'show' : 'hide']();
        _popup[ options.closeOverlay ? 'addClass' : 'removeClass' ]('closeOverlay');
        
        // Remplissage du contenu
        _content.html( options.content );
        _title.html( '<h3>' + options.title + '</h3>' );
        
        _bg.attr( 'style', options.bg );
        _box.find('.content').css('padding', options.padding );

        // Affichage
        _bg.show();
        _box.show();
        _popup.show();
        
        var _box_height         = _box.height(),
            _box_oheight        = _box.outerHeight(),
            _box_oheighttrue    = _box.outerHeight(true),
            _box_width          = _box.width(),
            _box_owidth         = _box.outerWidth(),
            _box_owidthtrue     = _box.outerWidth(true);
            
        var _h_top  = ( options.height === 'auto' ) ? _box_height : options.height;
        
        // Positionnement de la box
        if( options.height === 'auto' ) {
            _popup.css('visibility', 'hidden');
            options.height = _box_height;
        }
        options.height = Math.min( options.height, $(window).height() - 40 );
        
        var _cssBox = {
            //'left'          : '50%',
            //'top'           : '50%',
            'width'         : options.width,
            //'height'        : options.height + 'px',
            'margin'        : options.top + ' auto 0',
            'position'      : 'relative'
            //'margin-top'    : '-' + parseInt( _h_top / 2, 10 ) + 'px',
            //'margin-left'   : '-' + parseInt( options.width / 2, 10 ) + 'px'
        };        
        _box.css( _cssBox );
        
        _popup.css({'visibility' : 'visible'});
        
        //_popup.data( options );
        _popup.data( 'callback', options.callback );
        
        //_popup.fadeIn();
        
    },
    close : function() {
        
        var _popup  = $('#popupWindow'),
            _box    = _popup.find('.box');
        
        _popup.data('callback')();
        
        _popup.hide();
        _popup.find('.content > .wrap').html('');
        _box.attr('style', '');
    }
};


/**
 * Evénements des lightbox/popupWindow
 */
Blu.fn.UI.lightbox.events = function() {

    // Lightbox
    $('#lightbox .bg, #lightbox .close').click( function() {

        var _lightbox = $('#lightbox');

        _lightbox.hide();
        _lightbox.find('.content').html('');
        /*_lightbox.fadeOut( function() {
            _lightbox.find('.content').html('');
        });*/

        return false;
    });

    // PopupWindow
    $('#popupWindow .bg').live({
        click : function() {
            if( $('#popupWindow').hasClass('closeOverlay') ) {
                Blu.fn.UI.popupWindow.close();
            }
            return false;
        }
    });
    $('#popupWindow .close, #popupWindow a[data-action="close"]').live({
        click : function() {
            Blu.fn.UI.popupWindow.close();
            return false;
        }
    });
    
};


/**
 * Ouverture d'une popup
 */
Blu.fn.UI.openPopup = function( url, width, height, callback ) {
    
    var _left   = ( $(window).width()  - width )  / 2,
        _top    = ( $(window).height() - height ) / 2,
        _popup  = window.open( url, '', 'width=' + width + ',height=' + height + ',left=' + _left + ',top=' + _top ),
        _key    = url + ' @ ' + (new Date()).getTime();
        
    Blu.info( 'openPopup("' + url + '")' );
    
    
    // Lancement d'un callback à la fermeture de la fenêtre
    if( typeof( callback ) === 'function' ) {
        
        Blu.timers.popups = Blu.timers.popups || {};

        Blu.timers.popups[ _key ] = setInterval( function() {

            if( _popup && _popup.closed ) {
                
                clearInterval( Blu.timers.popups[ _key ] );
                delete Blu.timers.popups[ _key ];
                
                Blu.log('Fermeture de la popup "' + _key + '"');
                
                callback();
            }

        }, 200 );
    }
    
    if( _popup ) {
        _popup.focus();
    }
    
};


/**
 * Notification au centre de la map
 */
Blu.fn.UI.mapNotification = function( message ) {
    
    var _notif  = $('#map-notification'),
        _ZC     = $('#zonecentre');
    
    if( _notif.length < 1 ) {
        _ZC.append('<div id="map-notification"></div>');
        _notif = $('#map-notification');
    }

    _notif.text( message ).show();
    
    if( !message ) {
        _notif.hide();
    }
    
    _notif.css({
        'margin-left'   : '-' + parseInt( _notif.width()/2, 10 ) + 'px',
        'margin-top'    : '-' + parseInt( _notif.height()/2, 10 ) + 'px'
    });
    
};

/**
 * Affichage d'une notification
 * @param options.message message displayed
 * @param options.type ok/info/warning/fail (or empty)
 * @param options.id id used in HTML (#notif-{id})
 * @param options.delayOut lifetime in seconds 
 */

Blu.fn.UI.notification = function( options ) {
    
    options         = options           || {};
    options.id      = options.id        || (new Date()).getTime();
    
    var _notifs = $('#notifications'),
        _ZC     = $('#zonecentre'),
        _notif,
        _li;
    
    if( _notifs.length < 1 ) {
        _ZC.append('<ul id="notifications"></ul>');
        _notifs = $('#notifications');
    }
    
    _notif  = _notifs.find( '#notif-' + options.id );
    
    // Création de la notification si elle n'existe pas encore
    if( _notif.length < 1 ) {
        
        _li = '<li ' + ( options.id ? 'id="notif-' + options.id + '" ' : '' ) + '></li>';
        _notifs.prepend( _li );
        
        _notif = _notifs.find( '#notif-' + options.id );
        _notif.hide();
        //_notif.attr({ 'height' : '0', 'display' : 'block'});
        _notif.html( options.message );
        
        _notif.fadeIn();
        //_notif.slideDown( 10000,'linear');
        //_notif.animate( { 'height' : "auto", "opacity" : "1" }, 'slow', 'easeOutCubic' );
        
    }
    
    if( options.message ) { 
        _notif.html( options.message ); 
    }
    if( options.type ) {
        _notif.attr( 'class', options.type );
    }    
    if( options.delayOut ) {
        setTimeout( function(){_notif.fadeOut('slow', function(){_notif.remove()});}, options.delayOut * 1000 );
    }
    
};





/**
 * Mise à jour du bouton Connexions sur la carto
 */
Blu.fn.UI.updateBtnEdges = function() {
    var button = $('#btnedges');
    button.attr( "class", Blu.map.params.showEdges ? "" : "off" )
    button.attr( "title", ( Blu.map.params.showEdges ? Blu.txt('hideEdges') : Blu.txt('showEdges') ) );
};


/**
 * Affichage des stats
 * @param {Object} options
 */
Blu.fn.UI.miniStats = function( options ) {

    var _miniStats      = $('#mini-stats');
    
    options             = options || {};

    options.mode        = options.mode          || 'all';
    options.username    = options.username      || '';
    options.countTweets = options.countTweets   || 0;
    options.countUsers  = options.countUsers    || Blu.counts.users.graph;

    // User
    if( options.username ) {

        options.mode = 'user';
        
        if( Blu.graphs.current.type === 'mentions' ) {
            _miniStats.addClass('user').removeClass('general');
        }

    // Général
    } else {
        
        var _filterTime = ( Blu.timeline.params.filter.dates.min !== null || Blu.timeline.params.filter.dates.max !== null );

        _miniStats.removeClass('user').addClass('general');
        
        // Pas de filtrage sémantique ni temporel : compteur total "all-time"
        if( !Blu.timeline.params.filter.string && !_filterTime ) {
            options.countTweets = Blu.counts.tweets.alltime;
            
        // Filtrage temporel ou sémantique
        } else {
            //_params.countTweets = ( !Blu.timeline.params.filter.string ) ? Blu.counts.tweets.alltime : Blu.counts.tweets.filter;
            
            // On a chargé tous les tweets : le compteur "filter" est correct
            if( 1 /*Blu.config.tweets.loadAllPrevious*/ ) {
                options.countTweets = Blu.counts.tweets.filter;
                
            // @todo sinon le compteur doit venir d'une requête Ajax... 
            } else {
            }
        }
           
    }

    _miniStats.find('.user-preview').text( options.username );
    _miniStats.find('.tweets .count').text( options.countTweets );
    _miniStats.find('.users .count').text( options.countUsers );

    // Compteur dans le titre
    if( $('h1 a.text .count').length < 1 ) {
        $('h1 a.text').append(' <span class="count"></span>');
    }
    $('h1 a.text .count').text( '(' + Blu.counts.tweets.alltime + ' tweets)' );
    var _countTweetsAlltime = $('.count-tweets-alltime .count');
    _countTweetsAlltime.text( Blu.counts.tweets.alltime + ' tweets' ).show();
    if( !Blu.counts.tweets.alltime ) {
        _countTweetsAlltime.hide();
    }

};

/**
 * Affichage d'un panneau
 * @param {String} type (users/tweets/profile)
 */
Blu.fn.UI.showPanel = function( type ) {
    
    if( !type ) {
        type = Blu.user.id ? 'users' : 'tweets'; // onglet par défaut
    }
    
    // Calcul et affichage du top users
    if( type === 'users' ) {
        Blu.fn.users.topUsers();
        //Blu.fn.users.calcAndShowTopUsers();
    }

    var _menu   = $('#tabs-menu'),
        _tab    = _menu.children('.'+type),
        _panel  = $('.panel.'+type);
        
    if( _panel.is(':visible') && _tab.hasClass('selected') ) {
        //return; // Le panneau est déjà affiché
    }
    
    // Mise à jour du menu
    _menu.children('li').removeClass('selected');
    _tab.addClass('selected');
    
    // Affichage du panneau
    //$('.panel').fadeOut( 100 );
    $('.panel').fadeOut( 10 ); // Avec 100 ms, on avait un bug sur Chrome : le panneau "users" restait (parfois) avec une opacité de 0 !
    _panel.fadeIn( 200, function() {
        if( type === 'profile' && !_panel.find('.profile-image-aside').length ) {
            _panel.find('#inputrecherche').focus();
        }
    });
    
    return;

};

/**
 * Réinitialisation des panneaux
 */
Blu.fn.users.resetPanels = function() {
    
    Blu.info('Blu.fn.users.resetPanels()');
    
    var _search = $('#inputrecherche');

    if( Blu.config.map.usercards.show ) {
        // Suppression des infobulles
        $('#zonecentre .user-card').remove();
        Blu.fn.usercards.reset();
    }

    // Users
    $('.panel.users .wrap').html('');
    //Blu.fn.users.calcAndShowTopUsers();
    
    // Tweets
    Blu.fn.tweets.search('');
    Blu.fn.tweets.showList();
    
    // Profil
    Blu.fn.user.emptyProfile();
    
    
};

/**
 * Retour à la "home" de l'interface
 */
Blu.fn.UI.goHome = function() {
    
    // Reset sidebar
    Blu.fn.users.resetPanels();

    // Reset map
    Blu.map.params.hoverNode        = -1;
    Blu.map.params.selectedNode     = -1;
    Blu.fn.map.resetZoom();
    Blu.fn.map.traceMap( true );
    
};


/**
 * Création d'un panneau utilisateur
 * @param user
 */
Blu.fn.user.createPanel = function( user ) {
    
    // Création d'un panneau utilisateur
    var _li = '<li class="panel user ' + user + ' flying">' +
                '<a class="prev-user" href="#prev-user"></a>' +
                '<ul class="sidebar-tabs-content">' +
                    '<li class="tweets">' +
                        '<ul class="tweets-list"></ul>' +
                    '</li>' +
                    '<li class="by_mentions hide">' +
                        '<div class="statistics"></div>' +
                    '</li>' +
                '</ul>' +
              '</li>';
              
     $('#panels').append( _li );
};


/**
 * Création d'un panneau utilisateur
 */
/*Blu.fn.user.createPanel_old = function( _user ){
    
    // création d'une nouvelle barre latérale
    var _li = '<li class="panel user ' + _user + ' flying">' +
                '<a class="toggle" href="#" title="' + Blu.txt('togglePanel') + '">&nbsp;</a>' +
                '<a class="bthome glyph general" href="#home" title="' + Blu.txt('home') + '">M</a>' +
                '<a class="prev-user" href="#prev-user"></a>' +
                '<div class="twitter-panel">' +
                    '<div class="loading"></div>' +
                    '<div class="tw-status"></div>' +
                    '<div class="profile-info">' +
                        '<div class="profile-image-container">' +
                            '<a target="_blank" class="profile-picture" href="#" title="' + Blu.txt('showTwitterProfile') + '">' +
                                '<img alt="" src="#">' +
                            '</a>' +
                        '</div>' +
                        '<div class="profile-image-aside">' +
                            '<div class="full-name">' +
                                '<h3></h3>' +
                            '</div>' +
                            '<div class="screen-name-and-location">' +
                                '<a target="_blank" class="screen-name" href="#" title="' + Blu.txt('showTwitterProfile') + '"></a>' + 
                            '</div>' +
                            '<div class="bio"></div>' +
                            '<div class="url"><a href="#" target="_blank"></a></div>' +
                        '</div>' +
                        '<ul class="user-stats">' +
                            '<li><a href="#" target="_blank"><span class="count"></span> <span class="label">' + Blu.txt('stats_tweets') + '</span></a></li>' +
                            '<li><a href="#" target="_blank"><span class="count"></span> <span class="label">' + Blu.txt('stats_following') + '</span></a></li>' +
                            '<li><a href="#" target="_blank"><span class="count"></span> <span class="label">' + Blu.txt('stats_followers') + '</span></a></li>' +
                            '<li><a href="#" target="_blank"><span class="count"></span> <span class="label">' + Blu.txt('stats_listed') + '</span></a></li>' +
                        '</ul>' +
                    '</div>' +
                '</div> <!-- Fin de twitter-panel -->' +
                '<ul class="sidebar-tabs">' +
                    '<li class="tweets selected"><a href="#tweets">Tweets</a></li>' +
                    '<li class="mentions"><a href="#mentions">Mentions</a></li>' +
                '</ul>' +
                '<ul class="sidebar-tabs-content">' +
                    '<li class="tweets">' +
                        '<ul class="tweets-list"></ul>' +
                    '</li>' +
                    '<li class="mentions hide">' +
                        '<div class="statistics"></div>' +
                    '</li>' +
                '</ul>' +
            '</li>';
     
    // Agrandissement de la taillle de #panels
     //$('#panels').css('width', "+=390");
     
    // Insertion du nouveau panneau utilisateur dans le HTML
    $('#panels').append( _li );
    
};  // Fin de Blu.fn.user.createPanel()
*/

/**
 * Création d'un panneau de conversation
 * @param _users
 */
Blu.fn.users.createPanel = function( _users ) {
    
    Blu.log("2 utilisateurs");
    
    // Création d'une nouvelle barre latérale (on pourrait y ajouter des onglets pour afficher plus d'interactions ou similarités)
    var _li =   '<li class="panel user ' + _users + ' flying">' +
                    '<a class="toggle" href="#" title="' + Blu.txt( 'togglePanel' ) + '">&nbsp;</a>' +
                    '<a class="bthome" href="#">HOME</a>' +
                    '<a class="prev-user"></a>' +
                    '<a class="main-user"></a>' +
                    '<ul class="sidebar-tabs">' +
                    '</ul>' +
                    '<ul class="sidebar-tabs-content">' +
                        '<li class="tweets">' +
                            '<ul class="tweets-list"></ul>' +
                        '</li>' +
                    '</ul>' +
                '</li>';
                
    Blu.log(_li);
    // Insertion de la barre latérale user dans le html
    var _sel       = $('#panels .panel.user').filter(':last')[0],
        _selector  = $( _sel.className );
         
    Blu.log(_selector.selector);
     
    //_selector.after( _li );
    $("#zonecentre").before( _li );
     
};  // Fin de Blu.fn.users.createPanel


/**
 * Création de l'infobulle affichant la bio de l'utilisateur
 * @param user
 */
Blu.fn.user.createUserCard = function( user ) {
    
    Blu.info("Blu.fn.user.createUserCard()");
    
    var _div =      '<div class="user-card ' + user + '">' +
                        '<div class="tw-status"></div>' +
                        '<div class="profile-info">' +
                            '<div class="profile-image-container">' +
                                '<a target="_blank" class="profile-picture" href="#" title="' + Blu.txt( 'showTwitterProfile' ) + '">' +
                                    '<img alt="" src="#">' +
                                '</a>' +
                            '</div>' +
                            '<div class="avatar-infos">' +
                                '<div class="full-name">' +
                                    '<h3></h3>' +
                                '</div>' +
                                '<div class="screen-name-and-location">' +
                                    '<a target="_blank" class="screen-name" href="#" title="' + Blu.txt( 'showTwitterProfile' ) + '"></a>' + 
                                '</div>' +
                                '<div class="location"></div>' +
                            '</div>' +
                            '<div class="more-infos">' +
                                '<div class="bio"></div>' +
                                '<div class="url"><a href="#" target="_blank"></a></div>' +
                                '<ul class="user-stats">' +
                                    '<li><a href="#" target="_blank"><span class="count"></span> <span class="label">' + Blu.txt( 'stats_tweets' ) + '</span></a></li>' +
                                    '<li><a href="#" target="_blank"><span class="count"></span> <span class="label">' + Blu.txt( 'stats_following' ) + '</span></a></li>' +
                                    '<li><a href="#" target="_blank"><span class="count"></span> <span class="label">' + Blu.txt( 'stats_followers' ) + '</span></a></li>' +
                                    /*'<li><a href="#" target="_blank"><span class="count"></span> <span class="label">' + Blu.txt( 'stats_listed' ) + '</span></a></li>' +*/
                                '</ul>' +
                            '</div>' +
                        '</div>' +
                        '<a class="bt-more" href="#more">' +
                            'More...' +
                        '</a>' +
                        '<a class="close glyph general" href="#close">g</a>' +
                    '</div> <!-- Fin de user-card -->';
                
    $("#canvas").after( _div );
    
};  // Fin de Blu.fn.user.createUserCard()


/**
 * Affiche une conversation en barre latérale
 * @param two_names
 */
Blu.fn.user.showConversation = function ( two_names ) {
    
    Blu.log("Blu.fn.user.showConversation");
    
    var _id          = Blu.history.length,
        _two_names = two_names.replace('@', '').toLowerCase(),
        _users        = "user" + _id + _two_names,
        _lastPanel   = $('#panels .panel.user').filter(':last'),
        _lastUser    = !_lastPanel[0] ? 'none' : _lastPanel.find('.screen-name-and-location a').html(),
        _lc_lastUser = _lastUser.replace('@', '').toLowerCase(); // récupère le nom de l'utilisateur courant

    // Ne prend pas en compte la recherche de la même conversation
    if( _two_names !== _lc_lastUser || _lc_lastUser === 'none' ) {

        Blu.fn.users.createPanel( _users );
        var _sidebarName = ".panel.user." + _users,
            _sidebar   = $( ".panel.user." + _users );
        Blu.fn.UI.showPanel( _sidebar );

        // Ajout du couple étudié à l'historique    
        if( _two_names !== Blu.history[ Blu.history.length-1 ] ) {
            Blu.fn.history.add( _users );
        }
    }
};

/**
 * Positionne l'infobulle
 **/
Blu.fn.user.positionUserCard = function() {
        
    if( typeof Blu.usercards.hover.node === 'undefined' ) {
        // Initialisation de Blu.usercards // #1 meillleur endroit?
        Blu.fn.usercards.reset();
        return;
    }
    
    
    //Blu.info('Blu.fn.user.positionUserCard()');
    
    // Considérant qu'une infobulle est à afficher, on détermine son type
    var _UC_type    = ( Blu.usercards.selected.state.show ) ? 'selected' : 'hover',
        _UC_html    = $('.user-card'),
        _UC         = Blu.usercards[ _UC_type ];
        
    // Si finalement aucune infobulle n'est à afficher, on part
    if( _UC.node === -1 ) {
        return;
    }
    
    if( !Blu.config.map.usercards.showHover && _UC_type === 'hover' ) {
        return;
    }
    
    var _node       = Blu.carto.nodes[ _UC.node ],
        _radiusNode = _node.coords.reel.r,
        _position   = _UC.position.align,
        _left       = ( _position.search('left') !== -1 ),
        _right      = ( _position.search('right') !== -1 ),
        _bottom     = ( _position.search('bottom') !== -1 ),
        _top        = ( _position.search('top') !== -1 ),
        _custom     = ( _position.search('custom') !== -1 ),
        _distNodeUC = ( !_custom ) ? 0 : _UC.position.fromNode,
        _distChange = ( !_custom ) ? _distNodeUC : _distNodeUC - ( _node.coords.reel.y - _UC.position.y ),
        _expanding  = !_UC.state.locked && _UC.state.expanded;
    
        
    // Infobulle à gauche // #1 possible en opérateur ternaire
    if( _left || !_right && _node.coords.reel.x > ( Blu.zoneGraphe.largeur - _UC_html.outerWidth() - Blu.config.map.usercards.distance - _radiusNode ) ) {
        
        _UC.position.x      = _node.coords.reel.x - _UC_html.outerWidth() - Blu.config.map.usercards.distance - _radiusNode;
        _UC.position.align  = 'left';
        
    // Infobulle à droite
    } else {
        
        _UC.position.x      = _node.coords.reel.x + Blu.config.map.usercards.distance + _radiusNode;
        _UC.position.align  = 'right';
        
    }

    // Infobulle en bas
    if( _bottom && !_expanding
        || _bottom && _expanding && _UC.position.y + _UC_html.outerHeight() > Blu.zoneGraphe.hauteur
        || _top && _expanding && _UC.position.y < 0
            /* Quand l'infobulle est nouvelle (englobe aussi le cas _bottom) */ 
        || !_top
            && _node.coords.reel.y < _UC_html.outerHeight() + Blu.config.map.usercards.distance + _radiusNode
        ) {
        
        _UC.position.y      = _node.coords.reel.y + Blu.config.map.usercards.distance + _radiusNode;
        _UC.position.align += ' bottom';
        
    // Infobulle en haut
    } else {
        
        if( _custom 
                /* Positionne l'infobulle qui est en top mais peut se déployer vers le bas */
            || _top && _expanding && _UC.position.y + _UC_html.outerHeight() < Blu.zoneGraphe.hauteur
                /* Positionne celle qui n'est pas placée dans un des 4 coins du noeud */
            || _top && _node.coords.reel.y - _UC_html.outerHeight() - Blu.config.map.usercards.distance - _radiusNode < 0
            ) {
            
            _UC.position.y      = _UC.position.y - _distChange;
            _UC.position.align += ' custom';
            
        // Positionne l'infobulle placée dans un coin
        } else {
            
            _UC.position.y = _node.coords.reel.y - _UC_html.outerHeight() - Blu.config.map.usercards.distance - _radiusNode;

        }
        
        _UC.position.align += ' top';
        
    }

    _UC.position.fromNode = ( !_UC.state.locked ) ? _node.coords.reel.y - _UC.position.y : _UC.position.fromNode;
    _UC_html.css({'left' : _UC.position.x + 'px', 'top' :_UC.position.y + 'px'});
    
};  // Fin de Blu.fn.user.positionUserCard()


/**
 * Affiche une infobulle
 * @param screen_name
 */
Blu.fn.user.showUserCard = function( screen_name ) {
    
    Blu.log("Blu.fn.user.showUserCard");
    
    var _screen_name = screen_name.replace('@', '').toLowerCase();
    
//    // Ne prend pas en compte le clic sur l'utilisateur courant
//    if( Blu.is.profileChanged === false ) {
//        return false;
//    }
    
    Blu.fn.user.createUserCard( _screen_name );
    
    // Préparation de la usercard
    var _UC_html        = $('#zonecentre').find( '.user-card.' + _screen_name ),
        _UC_selected    = Blu.usercards.selected;
        
    _UC_html.find('.profile-info, .tw-status').hide();

    //var _usercard = $( '.user-card.' + user );
    
    _UC_html.spin('small');
    _UC_html.addClass('loading');
    
    // Affichage complet de l'infobulle
    if( _UC_selected.state.expanded /*&& _selected.state.show*/ /* && !_selected.state.closed  */ ) {

        _UC_html.addClass('expanded');
    }    

    // On demande à Twitter les infos de l'utilisateur recherché quand on ne les a pas toutes
    if( !Blu.fn.user.get( _screen_name ).data.id ) {

        var _callback = function( json ) {

            var _json = ( typeof( json.code ) === 'undefined' ) ? json : json.response;

            // Si on a bien récupéré des infos de Twitter...
            if( !_json.error ) {

                Blu.fn.user.fillUsercard( _json, _screen_name );

            // En cas d'erreur (limitation de Twitter par exemple)
            } else {

                //_twPanel.find('.loading').fadeOut();
                //_twPanel.spinStop();
                //_twPanel.find('.tw-status').text( Blu.txt('errorTwitterProfile') ).fadeIn();

            }
        };

        // Requête Twitter
        Blu.fn.app.twitterAuthRequest( 'users/show', {'screen_name' : screen_name}, _callback );

        // @todo : marche pas :( ajouter un timer pour gérer erreur 404, 
        // ex. sur les profils supprimés ("NetworkError: 404 Not Found")
        /*.error(function() {
            _twPanel.find('.loading').fadeOut();
            _twPanel.find('.tw-status').text( Blu.txt('errorTwitterProfile') ).fadeIn();
        });*/

    } else {

        Blu.fn.user.fillUsercard( Blu.users[ _screen_name ].data, _screen_name );

    }
    
    Blu.fn.user.positionUserCard();
    
};  // Fin de Blu.fn.user.showUserCard()


/**
 * Affiche le profil d'un user dans la sidebar
 * @param {String} screen_name
 */
Blu.fn.user.showProfile = function( screen_name ) {
    
    Blu.info( 'showProfile > ' + screen_name );
    
    //Blu.fn.tweets.search( screen_name, true, true );
    
    Blu.fn.map.selectUser( screen_name );
    
    screen_name = screen_name.replace('@','').toLowerCase();
    
    // Profil dans une iframe Twitter
    if( Blu.config.users.profilePopUp ) {

        var _urlIntentTwitter = 'https://twitter.com/intent/user?screen_name=' + screen_name;

        Blu.fn.UI.openPopup( _urlIntentTwitter, 550, 550 );

        return;
    }
    
    // Vidage du profil
    Blu.fn.user.emptyProfile();
    
    // Affichage du panneau de profil
    Blu.fn.UI.showPanel('profile');

    // Affichage des données Twitter (avec requête Twitter si besoin)
    if( !Blu.fn.user.get( screen_name ).data.id_str ) {

        $('.panel.profile').spin('sidebar');

        Blu.fn.app.twitterAuthRequest( 'users/show', {'screen_name' : screen_name}, Blu.fn.user.fillProfile );

    } else {

        Blu.fn.user.fillProfile( Blu.users[ screen_name ].data );

    }
    
}; // Fin de Blu.fn.user.showProfile


/**
 * Récupération des infos des users du top users
 * @param {Array(String)} users
 */
Blu.fn.user.lookupTopUsers = function( users ) {
    
    Blu.info( 'Blu.fn.user.lookupTopUsers...' );
    
    var _users_api = {
            in_sidebar  : [],
            others      : []
        },
        _users_loop,
        _user;

    // Pas d'utilisateurs à rechercher
    if( !users.length ) {
        Blu.warn('Users lookup: no users.');
        return;
    }

    // Utilisateurs du top mentionnés à chercher via l'API Twitter
    for( var i in users ) {
        _user       = users[i].user;
        _users_loop = _users_api[ i < 36 ? 'in_sidebar' : 'others' ];
        if( ! Blu.fn.user.get( _user ).data.id_str ) {
            _users_loop.push( _user );
        }
    }

    // Récupération des infos en 2 salves : d'abord les users affichés dans la sidebar puis les autres
    Blu.fn.users.lookup( _users_api.in_sidebar, function() { 
        
        Blu.fn.users.lookup( _users_api.others, function() { Blu.fn.map.calcFollowed(); } );
        
        Blu.fn.map.calcFollowed();
        
    } );
    
};

/**
 * Récupération des infos des utilisateurs présents sur le graphe courant
 */
Blu.fn.map.lookupUsers = function() {

    if( !Blu.carto ) {
        return;
    }
    
    //Blu.fn.UI.notification({ 'message' : 'Looking for your following...', 'type' : 'info', 'id' : 'following-mode', 'delayOut' : 5 });
    
    var _users_map = [],
        _node;

    // Users sur la carte dont on n'a pas encore d'infos détaillées
    for( var i in Blu.carto.nodes ) {
        _node = Blu.carto.nodes[i];
        if( ! Blu.fn.user.get( _node.id ).data.id_str ) {
            _users_map.push( _node.id );
        }
    }

    Blu.warn( 'Users lookup: looking for ' + _users_map.length + ' users on this map...' );
    
    Blu.fn.users.lookup( 
        _users_map, 
        function( json ) {
        
            if( json.error ) {
                /*Blu.fn.UI.notification({
                    'message'   : Blu.txt('twitter-rate-limit-exceeded'),
                    'type'      : 'fail',
                    'id'        : 'twitter-api',
                    'delayOut'  : 8 
                });*/
            } else {
                
                Blu.fn.map.calcFollowed();

                /*Blu.fn.UI.notification({
                    'message'   : 'You follow ' + Blu.graphs.current.followedNodes + ' user(s) on this map',
                    'type'      : 'ok',
                    'id'        : 'following-mode', 
                    'delayOut'  : 10 

                });*/
                
            }
        }, 
        false // sequential 
    );

};

/**
 * Récupération des infos complètes sur des utilisateurs via l'API Twitter
 * @param {Array} screen_names
 * @param {function} endCallback
 * @param {boolean} sequential
 */
Blu.fn.users.lookup = function( screen_names, endCallback, sequential ) {

    var options = {
        screen_names    : screen_names,
        offset          : 0,
        num_items       : 100,
        results         : [],
        callback        : endCallback || {},
        ajax_id         : 'start-' + (new Date()).getTime(),
        sequential      : ( typeof sequential !== 'undefined' ) ? sequential : false
    };
    
    
    Blu.info( 'Blu.fn.users.lookup... >> looking for ' + screen_names.length + ' users');
    Blu.log( options );
        
    if( screen_names.length < 1 ) {
        Blu.warn('Users lookup : no users. We stop here.');
        return;
    }

    Blu.ajax = Blu.ajax || {};
    Blu.ajax[ options.ajax_id ] = {
        'requests'      : [],
        'countResults'  : 0
    };

    Blu.fn.users.lookup_request( options );
    
};

/**
 * Requête de récupération d'infos sur des users
 * @param {Object} options
 */
Blu.fn.users.lookup_request = function( options ) {
    
    var _offset2        = Math.min( options.offset + options.num_items - 1, options.screen_names.length ),
        _screen_names   = options.screen_names.slice( options.offset, _offset2 ),
        _request;

    // Prochaine requête (en asynchrone)
    if( !options.sequential ) {
        var options2 = $.extend( {}, options ); // copie (clone) de options
        options2.offset = _offset2 + 1;
        
        if( options2.offset < options.screen_names.length ) {
            Blu.fn.users.lookup_request( options2 );
        }
    }
    
    /*
     * Requête Twitter
     */
    _request = Blu.fn.app.twitterAuthRequest( 'users/lookup', {'screen_name' : _screen_names.toString()}, function( json, status, request ) {
        
        var _json = json.response;
        
        // Erreur
        if( json.code !== 200 || _json.errors || _json.error ) {
            if( typeof( options.callback ) === 'function' ) {
                (options.callback)( _json );
            }
            return;
        }
        
        // Concaténation des résultats
        //options.results = (options.results).concat( _json );
        
        /*
         * Ajout des users et traitement
         */
        for( var i in _json ) {

            _user = _json[i];

            // Ajout dans Blu.users des infos
            Blu.fn.users.add( _user );

            // Update des noms et avatars dans l'interface
            _user_li    = $( '.user-list .rank-user.' + _user.screen_name.toLowerCase() );
            _user_li.find('.user-content span').text( _user.name );
            _user_li.find('.profile-pic img').attr( 'src', Blu.fn.user.getAvatarUrl( _user.screen_name, 'bigger' ) );

        }
        Blu.warn( 'Users lookup: ' + _json.length + ' users have been added.' );
        
        // Requête suivante
        var _next_offset = options.offset + options.num_items;
        
        if( _next_offset < options.screen_names.length && options.sequential ) {
            
            options.offset = _next_offset;
            
            Blu.fn.users.lookup_request( options );
            
        // Fin des requêtes
        } else {
            

            var _user, _user_li;
            

            // Callback
            if( typeof( options.callback ) === 'function' ) {
                (options.callback)( _json );
            }

            return;
            
        }

    });
    
    //_request.name = 'Users lookup : "' + _screen_names.slice(0,3).toString() + '..." @ ' + (new Date()).toString();
    //Blu.log( _request.name );
    
    Blu.ajax[ options.ajax_id ].requests.push( _request );
    
};


/**
 * Evénements liés aux utilisateurs
 */
Blu.fn.users.events = function() {
    
    // Champ de recherche
    var inputRech = $('#inputrecherche');
    //inputRech.val( inputRech.attr('title') ); //.addClass('tip');
    inputRech.live({
        keyup : function(evt) {
            
            Blu.fn.AC.majAC(this);

            if( $(this).val() === '' ) {
                //Blu.fn.tweets.search( inputRech.val(), true );
                Blu.fn.UI.miniStats( {'countTweets' : Blu.counts.tweets.filter, 'countUsers' : Blu.counts.users.graph} );
            }
            
        },
        keydown : function(evt) {
            
            var _AC     = $('#autocomplete'),
                _length = _AC.find('li').length;
                
            switch( evt.keyCode ) {
                
                // Flèche bas
                case 40 :
                    if( Blu.AC.position < _length - 1 ) {
                        Blu.AC.position++;
                    } else {
                        Blu.AC.position = 0;
                    }
                    break;
                    
                // Flèche haut
                case 38 :
                    if( Blu.AC.position > 0 ) {
                        Blu.AC.position--;
                    } else {
                        Blu.AC.position = _length - 1;
                    }
                    break;
                    
                // Echap
                case 27 :
                    _AC.fadeOut();
                    break;
                    
                // Entrée
                case 13 :
                    if( _AC.is(':visible') ) {
                        Blu.warn('[Enter] on autocomplete');
                        var _liac = $( '#liac_' + Blu.AC.position );
                        if( _liac.length ) {
                            $(this).val( _liac.find('span').text() );
                        }
                    } else {
                        Blu.warn('[Enter] on autocomplete : AC not visible');
                    }
                    break;
                    
                default :
                    Blu.AC.position = 0;
                    break;
            }
            
            Blu.fn.AC.majAC( this );
            
            if( evt.keyCode === 38 || evt.keyCode === 40 ) { // Flèches haut/bas
                return false;
            }
            
        },
        blur : function() {
            
            var _AC = $('#autocomplete');
            
            if( !_AC.length ) {
                return;
            }
            
            setTimeout( function() {
                _AC.hide();
            }, 100 );
            
        }
    });
                
    // Recherche
    $('#recherche').submit(function() {
        
        // Reset de l'infobulle
        if( Blu.config.map.usercards.show ) {
            $('#zonecentre .user-card').remove();
            Blu.fn.usercards.reset();
            Blu.usercards.selected.state.show = true;
        }
        
        Blu.fn.user.showProfile( inputRech.val() );
        
        $('#autocomplete').hide();
        
        if( Blu.config.map.usercards.show ) {
            Blu.fn.user.showUserCard( inputRech.val() );
        }
        
        return false;
    });
    
};  // Fin de Blu.fn.users.events


/**
 * Récupération des abonnements de l'utilisateur connecté
 * @param callback fonction lancée à la fin de la récupération
 */
Blu.fn.user.getFollowing = function( callback ) {
    
    var options         = {},
        _screen_name    = Blu.user.screen_name;
    
    if( !_screen_name ) {
        Blu.warn("Logged out visitor: no following to look for.");
        return;
    }
    
    options.screen_name = _screen_name;
    options.cursor      = -1;
    options.user_ids    = [];
    options.callback    = callback || {};
    
    Blu.log( "Let's see who @" + _screen_name + " is following..." );
    
    /*
     * Lancement des requêtes
     */
    Blu.is.getFollowing = Blu.is.getFollowing || {};
    Blu.is.getFollowing[ options.screen_name ] = true;
    
    Blu.fn.user.getFollowing_request( options );

};

/**
 * Requête Twitter pour la récupération des abonnements d'un utilisateur (5000 utilisateurs max par requête)
 * @param {Object} options
 */
Blu.fn.user.getFollowing_request = function( options ) {
    
    var _params_api = {
        'screen_name'   : options.screen_name,
        'cursor'        : options.cursor,
        'stringify_ids' : true
    };
    
    Blu.fn.app.twitterAuthRequest( 'friends/ids', _params_api, function( json ) {
        
        var _json = ( typeof( json.code ) !== 'undefined' ) ? json.response : json;

        // Erreur
        if( _json.error ) {
            if( typeof( options.callback ) === 'function' ) {
                (options.callback)();
            }
            return;
        }
        
        // Concaténation des ids récupérés
        options.user_ids = (options.user_ids).concat( _json.ids );
        
        // Requête suivante
        if( _json.next_cursor_str !== '0' ) {
            
            options.cursor = _json.next_cursor_str;
            
            Blu.fn.user.getFollowing_request( options );
            
        // Fin des requêtes
        } else {
            
            // Flags
            Blu.is.getFollowing[ options.screen_name ] = false;
            Blu.user.following.isLoaded = true;
            
            // Update de la liste des following
            Blu.user.following.list = options.user_ids;
            
            Blu.warn( "@" + options.screen_name + " follows " + Blu.user.following.list.length + " users (in general)" );

            // Récupération des infos des users sur le graphe
            //Blu.fn.map.lookupUsers(); // redondant avec lookup du top users
            
            // Callback
            if( typeof( options.callback ) === 'function' ) {
                (options.callback)();
            }
            return;
            
        }
        
    });
    
};


/**
 * Vérifie qu'un utilisateur est suivi dans Blu.user.following.list
 * @param {String} screen_name
 * @returns {boolean}
 */
Blu.fn.user.isFollowed = function( screen_name ) {
    
    if( Blu.user.following.list.length < 1 ) {
        return false;
    }
    
    var _user = Blu.fn.user.get( screen_name );
    
    return ( _user.data.id_str && $.inArray( _user.data.id_str, Blu.user.following.list ) !== -1 );

};


/**
 * Follow d'un utilisateur
 */
Blu.fn.user.follow = function( screen_name, callback ) {
    
    Blu.info( 'Blu.fn.user.follow("' + screen_name + '")' );
    
    Blu.fn.app.twitterAuthRequest( 'friendships/create', {'screen_name' : screen_name}, function( json ) {
        
        if( typeof( callback ) === 'function' ) {
            callback( json );
        }
    });
};

/**
 * Unfollow d'un utilisateur
 */
Blu.fn.user.unfollow = function( screen_name, callback ) {
    
    Blu.info( 'Blu.fn.user.unfollow("' + screen_name + '")' );
    
    Blu.fn.app.twitterAuthRequest( 'friendships/destroy', {'screen_name' : screen_name}, function( json ) {
        
        Blu.log( json );
        
        if( typeof( callback ) === 'function' ) {
            callback( json );
        }
    });
};


/**
 * Affichage d'un bouton Follow :
 * - via l'API si le compte Twitter est connecté et que la liste des followings a été récupérée
 * - avec le widget Twitter sinon
 * @param screen_name string
 * @param isFollowed boolean
 */
Blu.fn.UI.followButton = function( screen_name, isFollowed ) {
    
    if( !Blu.user.following.isLoaded ) {
        return Blu.fn.user.twitterFollowButton( screen_name );
    }
    
    var _button     = '',
        _isFollowed = ( typeof( isFollowed ) === 'undefined' ) ? Blu.fn.user.isFollowed( screen_name ) : isFollowed;
    
    // Utilisateur déjà suivi
    if( _isFollowed ) {
        
        _button =   '<a href="#unfollow" class="follow-button-api followed" data-user="' + screen_name + '" ' +
                        'data-text-change="' + Blu.txt('unfollowButton') + '" ' + 
                        '>' +
                        Blu.txt('following') + 
                    '</a>';
        
    // Pas encore suivi
    } else {
        
        _button =   '<a href="#follow" class="follow-button-api unfollowed" data-user="' + screen_name + '" ' + 
                        'data-text-change="' + Blu.txt('followButton') + '" ' +
                        '>' +
                        Blu.txt('followButton') + 
                    '</a>';
    }
    
    return _button;
    
};

/**
 * Affichage d'un bouton Follow :
 * - via l'API si le compte Twitter est connecté et que la liste des followings a été récupérée
 * - avec le widget Twitter sinon
 * @param screen_name string
 * @param isFollowed boolean
 */
$.fn.setFollowButton = function( screen_name, isFollowed ) {
    
    if( !Blu.user.following.isLoaded && typeof isFollowed === 'undefined' ) {
        return this;
    }
    
    var _a     = this,
        _isFollowed = ( typeof( isFollowed ) === 'undefined' ) ? Blu.fn.user.isFollowed( screen_name ) : isFollowed;
    
    // Utilisateur déjà suivi
    if( _isFollowed ) {
        
        _a.data({
            'action'        : 'unfollow',
            'user'          : screen_name,
            'text-change'   : Blu.txt('unfollowButton')
        });
        _a.addClass('followed').removeClass('unfollowed');
        _a.children('.text').text( Blu.txt('following') );
        
    // Pas encore suivi
    } else {
        
        _a.data({
            'action'        : 'follow',
            'user'          : screen_name,
            'text-change'   : Blu.txt('followButton')
        });
        _a.addClass('unfollowed').removeClass('followed');
        _a.children('.text').text( Blu.txt('followButton') );
        
    }
    
    return _a;
    
};

/**
 * Activation du following mode
 */
Blu.fn.user.activateFollowingMode = function() {
    
    if( !Blu.user.screen_name ) {
        Blu.warn('Following Mode can\'t be activated (logged out visitor).');
        return;
    }
    
    Blu.config.map.showFollowing = true;

    // Récupération des followers
    Blu.fn.user.getFollowing();

    // UI
    var _button = $('#options-map #following-mode');
    _button.addClass('activated');

};

/**
 * Activation du following mode
 */
Blu.fn.user.deactivateFollowingMode = function() {
    
    Blu.config.map.showFollowing = false;
    
    // UI
    var _button = $('#options-map #following-mode');
    _button.removeClass('activated');

};

/**
 * Evénements autour du follow
 */
Blu.fn.user.followEvents = function() {

    /*
     * Following mode
     */
    $('#options-map #following-mode').live('click', function() {
        
        if( !Blu.config.map.showFollowing ) {
            
            Blu.fn.user.activateFollowingMode();
            mixpanel.track( 'Show Following' );
            
        } else {
            
            Blu.fn.user.deactivateFollowingMode();
            mixpanel.track( 'Hide Following' );
            
        }
        
        Blu.fn.map.traceMap( true );
        Blu.fn.UI.updateNodesCounts();
        
        return false;
        
    });


    /*
     * Bouton Follow via l'API
     */
    $('.user-actions .follow a').live({
        click : function() {

            var _a      = $(this),
                _action = _a.data('action');

            if( _a.hasClass('locked') || $.inArray( _action, ['follow','unfollow'] ) === -1 ) {
                return false;
            }

            _a.setFollowButton( _a.data('user'), ( _action === 'follow' ) );
            _a.addClass('locked');


            // Follow
            if( _action === 'follow' ) {

                Blu.fn.user.follow( _a.data('user'), function( json ) {

                    if( json.code == 200 ) {

                        // Ajout à la liste des utilisateurs suivis
                        var _user_data  = Blu.fn.user.get( _a.data('user') ).data,
                            _user_id    = _user_data.id_str;
                        if( _user_id ) {
                            (Blu.user.following.list).push( _user_id );
                        }
                        _user_data.following = true;
                        Blu.fn.map.calcFollowed();

                        _a.addClass('unlocked');
                        
                        mixpanel.track( 'Follow User', { 'User' : _a.data('user') } );
            
                    } else {

                        _a.setFollowButton( _a.data('user'), false );

                    }

                });

            // Unfollow
            } else if( _action === 'unfollow' ) {

                Blu.fn.user.unfollow( _a.data('user'), function( json ) {

                    if( json.code == 200 ) {

                        // Suppression de la liste des following
                        var _user_data  = Blu.fn.user.get( _a.data('user') ).data,
                            _index_user = $.inArray( _user_data.id_str, Blu.user.following.list );
                        if( _index_user != -1 ) {
                            //Array.remove( Blu.user.following.list, _index_user );
                            Blu.user.following.list.splice( _index_user, 1 );
                        }
                        _user_data.following = false;
                        Blu.fn.map.calcFollowed();

                        _a.addClass('unlocked');
                        
                        mixpanel.track( 'Unfollow User', { 'User' : _a.data('user') } );

                    } else {

                        _a.setFollowButton( _a.data('user'), true );

                    }

                });
            }

            return false;

        },
        mouseover : function() {

            var _a = $(this);

            if( _a.hasClass('locked') ) {
                return false;
            }

            _a.addClass('hover');

            _a.data( 'text-original', _a.children('.text').text() );

            if( _a.data('text-change') ) { 
                _a.children('.text').text( _a.data('text-change') );
            }

        },
        mouseout : function() {

            var _a = $(this);

            if( _a.hasClass('unlocked') ) {
                _a.removeClass('locked unlocked');
                return false;
            }

            _a.removeClass('hover');

            if( _a.data('text-original') ) {
                _a.children('.text').text( _a.data('text-original') );
            }

        }
    });
    
    /*
     * Bouton Follow via l'API
     */
    $('.follow-button-api').live({
        click : function() {

            var _a      = $(this),
                _a2,
                _action = _a.data('action');

            if( _a.hasClass('locked') || $.inArray( _action, ['follow','unfollow'] ) === -1 ) {
                return false;
            }

            _a.after( Blu.fn.UI.followButton( _a.data('user'), ( _action === 'follow' ) ) );
            _a.hide();
            _a2 = _a.next('.follow-button-api');
            _a2.addClass('locked');


            // Follow
            if( _action === 'follow' ) {

                Blu.fn.user.follow( _a.data('user'), function( json ) {

                    if( json.code == 200 ) {

                        // Ajout à la liste des utilisateurs suivis
                        var _user_id = Blu.fn.user.get( _a.data('user') ).data.id_str;
                        if( _user_id ) {
                            (Blu.user.following.list).push( _user_id );
                        }
                        Blu.fn.map.calcFollowed();

                        _a2.addClass('unlocked');
                        _a.remove();
                        
                        mixpanel.track( 'Follow User', { 'User' : _a.data('user') } );
            
                    } else {

                        _a.show();
                        _a2.remove();

                    }

                });

            // Unfollow
            } else if( _action === 'unfollow' ) {

                Blu.fn.user.unfollow( _a.data('user'), function( json ) {

                    if( json.code == 200 ) {

                        // Suppression de la liste des following
                        var _user       = Blu.fn.user.get( _a.data('user') ),
                            _index_user = $.inArray( _user.data.id_str, Blu.user.following.list );
                        if( _index_user != -1 ) {
                            //Array.remove( Blu.user.following.list, _index_user );
                            Blu.user.following.list.splice( _index_user, 1 );
                        }
                        Blu.fn.map.calcFollowed();

                        _a2.addClass('unlocked');
                        _a.remove();
                        
                        mixpanel.track( 'Unfollow User', { 'User' : _a.data('user') } );

                    } else {

                        _a.show();
                        _a2.remove();

                    }

                });
            }

            return false;

        },
        mouseover : function() {

            var _a = $(this);

            if( _a.hasClass('locked') ) {
                return false;
            }

            _a.addClass('hover');

            _a.data( 'text-original', _a.text() );

            if( _a.data('text-change') ) { 
                _a.text( _a.data('text-change') );
            }

        },
        mouseout : function() {

            var _a = $(this);

            if( _a.hasClass('unlocked') ) {
                _a.removeClass('locked unlocked');
                return false;
            }

            _a.removeClass('hover');

            if( _a.data('text-original') ) {
                _a.text( _a.data('text-original') );
            }

        }
    });

};


/**
 * Requête authentifiée à Twitter via Bluenod
 * @param {String} api_function
 * @param {Object} api_params
 * @param {function} callback
 * @returns {jqXHR}
 */
Blu.fn.app.twitterAuthRequest = function( api_function, api_params, callback ) {
    
    var _params = {
        'api_function'  : api_function,
        'api_params'    : api_params,
        'refresh'       : Math.random()
    };
     
   var _request = $.getJSON( Blu.app.urls.main + '/twitter-api', _params, function( json, status, request ) {
        
        request.isDone = true;
        
        request.tw_api.ended_at = new Date();
        request.tw_api.duration = ( request.tw_api.ended_at - request.tw_api.started_at ) / 1000;
        
        Blu.info( _request.tw_api.func + ' > ends   ' + _request.tw_api.params + '... @ ' + Blu.fn.misc.timeHour( _request.tw_api.ended_at ) + ' (' + request.tw_api.duration + 's)' );
        
        Blu.log( json );
        
        if( !json ) {
            json = { code : 0, response : {} };
        }
        if( !json.code ) {
            json.code = 0;
        }
        
        if( typeof( callback ) === 'function' ) {
            callback( json, status, request );
        }
        
    });
    
    _request.tw_api = {
        'func'          : api_function,
        'params'        : JSON.stringify( api_params ).slice( 0, 50 ),
        'started_at'    : new Date() 
    };
    Blu.info( _request.tw_api.func + ' > starts ' + _request.tw_api.params + '... @ ' + Blu.fn.misc.timeHour( _request.tw_api.started_at ) );
    
    return _request;

};


/**
 * Remplit les infos de profil d'un compte dans la sidebar 2
 */
Blu.fn.user.emptyProfile = function() {
    var _profileInfo = $('.panel.profile').find('.profile-info, .tw-status');
    _profileInfo.html('');
    _profileInfo.hide();
};
    
/**
 * Retourne le template HTML du profile utilisateur
 */
Blu.fn.UI.getProfileTemplate = function() {
    
    if( Blu.templates.profile ) {
        return Blu.templates.profile;
    }
    
    Blu.templates.profile = 
        '<div class="profile-image-container">' +
            '<a class="profile-picture" href="#" target="_blank" title="' + Blu.txt('showTwitterProfile') + '">' +
                '<img alt="" src="' + Blu.images.default_user + '">' +
            '</a>' +
        '</div>' +
        '<div class="profile-image-aside">' +
            '<a class="name" href="#" target="_blank" title="' + Blu.txt('showTwitterProfile') + '">'+ 
                '<strong class="fullname"></strong>' + 
                '<span class="screen-name"></span>' +
            '</a>' + 
            '<p class="bio"></p>' +
            '<span class="location"></span>' +
            '<span class="divider">·</span>' +
            '<a class="url" href="#" target="_blank"></a>' +
            '<ul class="user-stats">' +
                '<li class="tweets"><a href="#" target="_blank"><span class="count"></span> <span class="label">' + Blu.txt('stats_tweets') + '</span></a></li>' +
                '<li class="following"><a href="#" target="_blank"><span class="count"></span> <span class="label">' + Blu.txt('stats_following') + '</span></a></li>' +
                '<li class="followers"><a href="#" target="_blank"><span class="count"></span> <span class="label">' + Blu.txt('stats_followers') + '</span></a></li>' +
            '</ul>' + 
        '</div>' +
        '<ul class="user-actions">' +
            '<li class="follow">' + 
                '<a href="#">' +
                    '<span class="ico"></span>' + 
                    '<span class="text">Follow</span>'+ 
                '</a>' + 
            '</li>' +
            '<li class="visualize">' +
                '<a href="#" target="_blank">' +
                    '<span class="ico"></span>' + 
                    '<span class="text">Visualize</span>'+ 
                '</a>' + 
            '</li>' +
            '<li class="mention">' +
                '<a href="#">' +
                    '<span class="ico"></span>' + 
                    '<span class="text">Mention</span>'+ 
                '</a>' + 
            '</li>' +
        '</ul>' + 
        '<!--<p class="full-profile"><a href="#" target="_blank">Go to full profile →</a></p>-->';
    
    return Blu.templates.profile;

};

Blu.fn.UI.getPleaseConnectTemplate = function() {
    
    if( Blu.templates.pleaseConnect ) {
        return Blu.templates.pleaseConnect;
    }
    
    Blu.templates.pleaseConnect = 
        '<div class="please-connect-msg">' + 
            '<p>' + 
                'Please connect your Twitter account in order to explore user profiles.' + 
            '</p>' + 
            '<p class="align-center">' + 
                '<a class="btn btn-primary twitter-connect" data-action="connect-visitor" href="#twitter-connect">' + 
                    'Connect with Twitter' + 
                '</a>' + 
            '</p>' +
        '</div>';

    return Blu.templates.pleaseConnect;
    
};

/**
 * Remplit les infos de profil d'un compte dans le panneau user
 * @param json
 */
Blu.fn.user.fillProfile = function( json ) {
    
    json = json || {};
    if( json.screen_name ) {
        json.code = 200;
    }
    var _user = json.response || json; // si les données sont déjà dans le DOM alors json représente ces données (pas de code HTTP)
    
    Blu.info("Blu.fn.user.fillProfile avec pour données :");
    Blu.log( json );
    
    // Ajout des données dans la liste des users
    Blu.fn.users.add( _user );
    
    var _panel = $('.panel.profile');
    _panel.spinStop();
    _panel.find('.profile-info').html( Blu.fn.UI.getProfileTemplate() ).hide();
    
    var _tw_panel       = _panel.find('.twitter-panel'),
        _tw_status      = _tw_panel.find('.tw-status'),
        _profileInfo    = _tw_panel.find('.profile-info'),
        _aside          = _tw_panel.find('.profile-image-aside'),
        _actions        = _tw_panel.find('.user-actions'),
        _tweetsList     = _tw_panel.find('.tweets-list');

    /*
     * Impossible d'afficher le profil
     */
    if( json.code !== 200 ) {
         
       // Visiteur non connecté
        if( !Blu.user.id ) {

            _profileInfo.html( Blu.fn.UI.getPleaseConnectTemplate() ).removeClass('profile-info').show();
            
        // Autre erreur
        } else {
            
            var _errorMsg = 'Sorry, we couln\'t get data from Twitter.';
            
            if( json.code === 404 ) {
                _errorMsg =     'Sorry, that user does not exist.' + 
                                '<span class="detail">' + 
                                    'It may have been deleted or the username was just misspelled.' + 
                                '</span>';
            /*
             * Message d'erreur fourni par Twitter
             * json.response.errors = [
             *  { 'code' : 63, 'message' : "User has been suspended" }
             * ]
             */
            } else if( _user.errors && _user.errors[0] && _user.errors[0].message ) {
                _errorMsg = _user.errors[0].message;
            }
            _tw_status.html( _errorMsg ).fadeIn();
            _tw_panel.spinStop();
            
        }
        
        return;
    }
    
    /**
     * Remplissage du profil
     */
    var _screen_name    = _user.screen_name.toLowerCase(),
        _user_url       = 'http://twitter.com/' + _user.screen_name,
        _profile_pic    = ( typeof _user.profile_image_url !== 'undefined' ) ? Blu.fn.user.getAvatarUrl( _user.screen_name, 'bigger' ) : Blu.images.default_user;

    // Image
    _tw_panel.find('.profile-picture img').attr( 'src', _profile_pic );
    _tw_panel.find('.profile-picture, a.name, .full-profile a').attr( 'href', _user_url );
 
    // Name, screen_name, bio, location
    _aside.find('.fullname').text( _user.name );
    _aside.find('.screen-name').text( '@'+_user.screen_name );
    _aside.find('.bio').text( _user.description );    
    _aside.find('.location').text( _user.location );
    if( _user.url ) {
        _aside.find('.url').attr( 'href', _user.url ).text( _user.url.replace(/^https?:\/\/(www.)?/,'') );
    }
    if( _user.location && _user.url ) {
        _aside.find('.divider').show();
    }

    // Compteurs tweets / following / followers
    var _stats = _tw_panel.find('.user-stats');
    _stats.find('li.tweets a').attr( 'href', _user_url ).find('.count').text( _user.statuses_count );
    _stats.find('li.following a').attr( 'href', _user_url + '/following' ).find('.count').text( _user.friends_count );
    _stats.find('li.followers a').attr( 'href', _user_url + '/followers' ).find('.count').text( _user.followers_count );
    
    // Actions
    if( Blu.user.screen_name.toLowerCase() !== _screen_name ) {
        _actions.find('li.follow a').setFollowButton( _screen_name, _user.following );
    } else {
        _actions.find('li.follow').hide();
    }
    _actions.find('li.visualize a').attr( 'href', Blu.fn.user.visualizeLink( _screen_name ) );
    _actions.find('li.mention a').data( 'prefill-tweet', '@' + _user.screen_name + ' ' );
    
    // Dernier tweet
    /*var _lastTweet = _user.status; // _user.status.retweeted_status
    if( _lastTweet ) {
        _lastTweet.from_user           = _user.screen_name;
        _lastTweet.from_user_name      = _user.name;
        _lastTweet.profile_image_url   = _profile_pic;
        _tweetsList.html( Blu.fn.tweet.display( _lastTweet ) );
    }*/
    
    // Top users V2
    var _tweets     = Blu.fn.tweets.find({ 'string' : _screen_name }),
        _topUsers   = Blu.fn.users.topUsers( _tweets, _screen_name ),
        _users      = _topUsers.user.mentions;

    if( _users.length > 0 ) {
        _profileInfo.append(
            '<div class="extra-data">' + 
                '<h3>Connections</h4>' + 
                Blu.fn.users.listUsers({
                    "theClass"      : "topUsers by_mentions",
                    "userRanked"    : "User",
                    "numberTitle"   : "Mentions",
                    "tab"           : _users.slice(0, 14)
                }) + 
            '</div>'
        );
        Blu.fn.user.lookupTopUsers( _users );
    }
    
    // Top users V1
    /*Blu.fn.timers.resetInterval('topUsersProfile');
    Blu.timers.topUsersProfile = setInterval( function() {

        if( !Blu.topUsers.global || !Blu.is.topUsersReady ) {
            Blu.warn('waiting Blu.topUsers.user.mentions...');
            //Blu.log( _users );
            return;
        }
                
        var _users = Blu.topUsers.user.mentions;
        
        Blu.info('Top users on profile is ready >> ' + _users.length + ' users' );

        Blu.fn.timers.resetInterval('topUsersProfile');
        
        if( _users.length > 0 ) {
            _tw_panel.find('.full-profile').after(
                '<div class="extra-data">' + 
                    '<h4>Connections</h4>' + 
                    Blu.fn.users.listUsers({
                        "theClass"      : "topUsers by_mentions",
                        "userRanked"    : "User",
                        "numberTitle"   : "Mentions",
                        "tab"           : _users.slice(0, 14)
                    }) + 
                '</div>'
            );
            Blu.fn.user.lookupTopUsers( _users );
        }
        
    }, 100 );*/
    
    // Tweets
    if( _tweets.length > 0 ) {
        var _tweets_ul = '';
        for( var i in _tweets ) {
            _tweets_ul += Blu.fn.tweet.display( _tweets[i] );
        }
        _profileInfo.append(
            '<div class="extra-data">' + 
               '<h3>' + _tweets.length + ' ' + ( _tweets.length > 1 ? 'tweets' : 'tweet' ) + ' with @' + _user.screen_name + '</h4>' + 
               '<ul class="tweets-list">' + _tweets_ul + '</ul>' + 
            '</div>'
        );
    }
    
    
    // Affichage des infos
    //_tw_panel.find('.loading').hide();
    _tw_panel.spinStop();
    _profileInfo.show();

    Blu.log("fin de Blu.fn.user.fillProfile");

}; // Fin de Blu.fn.user.fillProfile


/**
 * Reset d'un timer (interval)
 */
Blu.fn.timers.resetInterval = function( name ) {
    
    if( typeof Blu.timers[ name ] === 'undefined' ) {
        return;
    }
    clearInterval( Blu.timers[ name ] );
    Blu.timers[ name ] = 0;
    
};
/**
 * Reset d'un timer (Timeout)
 */
Blu.fn.timers.resetTimeout = function( name ) {
    
    if( typeof Blu.timers[ name ] === 'undefined' ) {
        return;
    }
    clearTimeout( Blu.timers[ name ] );
    Blu.timers[ name ] = 0;
    
};

/**
 * Remplit les infos de profil d'un compte dans une infobulle
 * @param data
 * @param screen_name
 */
Blu.fn.user.fillUsercard = function( data, screen_name ) {
    
    Blu.info("Blu.fn.user.fillUsercard()");
    
    // On traite la réponse de Twitter
    if( data.screen_name ) {

        var _count_tweets    = data.statuses_count,
            _count_following = data.friends_count,
            _count_followers = data.followers_count,
            _count_listed    = data.listed_count,
            _user,
            _screen_name     = data.screen_name.toLowerCase(),
            
            _user_url        = 'http://twitter.com/' + data.screen_name,
            
            _profile_pic     = data.profile_image_url ? data.profile_image_url : Blu.images.default_user,
            
            _user_card       = $('#zonecentre').find( '.user-card.' + screen_name ),
            
            _avatar_infos    = _user_card.find('.avatar-infos'),
            
            _more            = _user_card.find('.more-infos'),
            _close           = _user_card.find('.close');

        _user_card.spinStop();
        _user_card.removeClass('loading');
        
        // On MAJ le tableau des users REVOIR
        Blu.fn.users.add( data );

        _user_card.find('.profile-picture img').attr( 'src', _profile_pic );
        _user_card.find('.profile-picture').attr( 'href', _user_url );
        _user_card.find('a.screen-name').attr( 'href', _user_url );

        if( data.name ) {
            _avatar_infos.find('.full-name h3').text( data.name );
        }

        _avatar_infos.find('.screen-name').text( '@'+data.screen_name );
        _avatar_infos.find('.location').text( data.location );
        _more.find('.bio').text( data.description );
        
        if( data.url ) {
            _more.find('.url a').text(data.url).attr('href', data.url);
        }
        //_more.after( Blu.fn.user.twitterFollowButton( data.screen_name ) );
        _more.after( Blu.fn.UI.followButton( data.screen_name ) );
        Blu.fn.user.renderFollowButtons();

        // Stats
        var _stats = _user_card.find('.user-stats');
        _stats.find('li:nth-child(1) .count').text( _count_tweets );
        _stats.find('li:nth-child(2) .count').text( _count_following );
        _stats.find('li:nth-child(3) .count').text( _count_followers );
        _stats.find('li:nth-child(4) .count').text( _count_listed );

        _stats.find('li:nth-child(1) a').attr( 'href', _user_url );
        _stats.find('li:nth-child(2) a').attr( 'href', _user_url + '/following' );
        _stats.find('li:nth-child(3) a').attr( 'href', _user_url + '/followers' );
        _stats.find('li:nth-child(4) a').attr( 'href', _user_url + '/lists/memberships');

        // Affichage des infos
        _user_card.find('.profile-info').fadeIn();
        
        // Bouton "Map this user"
        if( Blu.user.can.oneClickMapUser ) {
            var _title_map_user = 'Visualize the Twitter Community of @' + _screen_name;
            _close.before( '<a class="visualize-map button-gray" href="' + Blu.fn.user.visualizeLink( _screen_name ) + '" title="' + _title_map_user + '" data-user="' + _screen_name + '" target="_blank">' + 'Visualize' + '</a>' );
        }
    }
    
    Blu.log("fin de Blu.fn.user.fillUsercard");

}; // Fin de Blu.fn.usercards.fillUsercard()



/**
 * URL du mapping d'un utilisateur
 */
Blu.fn.user.visualizeLink = function( screen_name ) {
        
    return Blu.app.urls.main + '/user/' + screen_name.toLowerCase();
};

/**
 * Clic sur le bouton Visualize
 */
$('.visualize-map').live( 'click', function() {
    
    mixpanel.track( 'Button: Visualize User', { 'User' : $(this).data('user') } );
    
});

/**
 * Clic sur le bouton Visualize
 */
$('.user-actions .visualize a').live( 'click', function() {
    
    if( !Blu.user.can.oneClickMapUser ) {
        Blu.fn.UI.popupEnterYourMail();
        return false;
    }
    
    mixpanel.track( 'Button: Visualize User', { 'User' : $(this).data('user') } );
    
});

/**
 * Bouton Follow Twitter (version JS) pour un compte donné
 */
Blu.fn.user.twitterFollowButton = function( screen_name ) {
        
    return '<a class="twitter-follow-button" href="https://twitter.com/' + screen_name + '" data-show-count="false" ' + 
           'data-align="right" data-lang="'+Blu.lang+'" data-show-screen-name="false"></a>';
};

/**
 * Bouton Follow Twitter pour un compte donné
 */
Blu.fn.user.twitterFollowButtonIframe = function( screen_name ) {
    
    var _params = 'screen_name=' + screen_name + '&show_count=false&show_screen_name=false&lang=' + Blu.lang;
    
    return  '<iframe class="twitter-follow-button" allowtransparency="true" frameborder="0" scrolling="no" ' + 
            ' src="https://platform.twitter.com/widgets/follow_button.html?' + _params + '"></iframe>';
};

/**
 * Rendu des boutons Follow de Twitter
 */
Blu.fn.user.renderFollowButtons = function() {
    
    if( typeof twttr === 'undefined' || typeof( twttr.widgets ) === 'undefined' ) {
        $.getScript('http://platform.twitter.com/widgets.js', function() {
            twttr.widgets.load();    
        });
    } else {
        twttr.widgets.load();
    }
    
};

/**
 * Chargement de twitter-text.js
 */
Blu.fn.tweet.loadTextFunctions = function( callback ) {
    
    var _afterLoad = function() {
        if( typeof callback === 'function' ) {
            callback();
        }
    };
    
    if( typeof twttr === 'undefined' || typeof( twttr.txt ) === 'undefined' ) {
        Blu.log('Premier chargement de twitter-text.js');
        $.getScript( Blu.app.urls.main + '/js/twitter/twitter-text-1.5.0.min.js', _afterLoad );
    } else {
        Blu.log('twitter-text.js est déjà chargé');
        _afterLoad();
    }
    
};


/*
 * Connexion à d'autres services web
 */

Blu.fn.connect = {};
Blu.fn.connect.twitter = {};


/**
 * Lancement de la popup pour le Twitter Connect
 */
Blu.fn.connect.twitter.authorize = function( options ) {
    
    var _url = Blu.app.urls.main + '/connect/twitter';
    
    if( options.action === 'connect-visitor' ) {
        _url += '?action=' + options.action;
    }
    
    Blu.fn.UI.openPopup( _url, 700, 550, function() {
        
        Blu.fn.connect.twitter.afterOAuthProcess( options );
        
    });
};


/**
 * Callback après connexion OAuth à Twitter
 */
Blu.fn.connect.twitter.afterOAuthProcess = function( options ) {
    
    var _defaults = {
        'action' : '',
        'callback' : null
    };
    options = $.extend( _defaults, options || {} );
    
    $.getJSON(
        Blu.app.urls.ajax_base, {'action' : 'get-twitter-connect-info', 'refresh' : Math.random()}, function( json ) {
            
            // Si pas de changement (fermeture manuelle de la popup, annulation...)
            if( Blu.user.user_id == json.user_id && Blu.user.screen_name === json.screen_name ) {
                
                // Refus de connexion
                if( json['twitter-connect-denied'] ) {
                    Blu.fn.UI.notification({ 'message' : Blu.txt('twitter-connect-denied'), 'type' : 'fail', 'id' : 'twitter-connect', 'delayOut' : 8 });
                }
                
                return;
            }
            
            /*
             * Reload
             */
            
            //return;
            
            // Remplissage des infos du twitto
            Blu.user = $.extend( Blu.fn.user.getDefaultUser(), json );
            
            //Blu.fn.misc.configMixpanel();
            
            
            // Classes du <body>
            if( Blu.user.screen_name && Blu.user.user_id ) {
                $('body').removeClass('tw-unconnected').addClass('tw-connected');
            } else {
                $('body').removeClass('tw-connected').addClass('tw-unconnected');
            }
            
            
            // UI : affichage screen_name + avatar, menu account
            Blu.fn.UI.mainMenu();
            Blu.fn.UI.menuAccount();
            $('#account').hide();

            // Notification
            var _message =  Blu.user.screen_name ? 
                                Blu.txt('twitter-connect-success',  '@' + Blu.user.screen_name ):
                                Blu.txt('twitter-disconnect');
            
            //Blu.fn.UI.notification({ 'message' : _message, 'type' : 'ok', 'id' : 'twitter-connect', 'delayOut' : 8 });
            
            Blu.fn.UI.popupWindow.close();
            
            // Récupération des followers
            /*if( options.action === 'connect-visitor' ) {
                Blu.config.map.showFollowing = 1;
                $('#following-mode').addClass('activated');
            }
            
            if( Blu.config.map.showFollowing ) {
                Blu.fn.user.getFollowing();
            }*/
            
            if( typeof options.callback === 'function' ) {
                (options.callback)();
            }
        }
    );
    
};

/**
 * Menu du compte Twitter
 */
Blu.fn.UI.menuAccount = function() {
    
    /*if( !Blu.config.clientMode &&*/ /*!Blu.config.users.connectVisitor ) {
        return;
    }*/
    
    var _list = [];
    
    // Connecté à Bluenod
    if( Blu.user.id ) {
        
        //_list.push( '<li><a class="" href="'+ Blu.app.urls.main + '/about">' + 'Go to Website' + '</a></li>' );
        
        if( Blu.config.clientMode ) {
            _list.push( '<li><a class="my-searches" href="#">' + 'My Searches' + '</a></li>' );
        }
        
        if( Blu.user.can.createPremiumProjects ) {
            _list.push( '<li><a href="'+ Blu.app.urls.main + '/my-maps">' + 'Bluenod Pro' + '</a></li>' );
            //_links.push( '<li><a href="'+ Blu.app.urls.main + '/new-map" target="_blank">' + 'New map' + '</a></li>' );
        }
        
        if( _list.length ) {
            _list.push( '<li class="divider"></li>' );
        }
        
        if( Blu.user.can.createHashtagSearch ) {
            _list.push( '<li><a href="'+ Blu.app.urls.main + '/settings">' + 'Settings' + '</a></li>' );
            _list.push( '<li class="divider"></li>' );
        }
        
        _list.push( '<li><a href="'+ Blu.app.urls.main + '/about">' + 'About' + '</a></li>' );
        
        _list.push( '<li class="divider"></li>' );
        
        _list.push( '<li><a href="'+ Blu.app.urls.main + '/tos">' + 'Terms of Service' + '</a></li>' );
        _list.push( '<li><a href="'+ Blu.app.urls.main + '/privacy">' + 'Privacy Policy' + '</a></li>' );
        
        _list.push( '<li class="divider"></li>' );
        
        _list.push( '<li><a class="logout" href="'+ Blu.app.urls.main + '/logout?redirect=' + encodeURIComponent( document.URL ) + '">' + 'Log out' + '</a></li>' );
        
    } else {
        
        //_links.push( '<li><a class="request-invite" href="'+ Blu.app.urls.main + '/logout?redirect=' + encodeURIComponent( document.URL ) + '">' + 'Logout' + '</a></li>' );
    }

    var _dropdown = $('#main-menu .dropdown');
    _dropdown.find('.dropdown-menu').html( _list.join('') );
    _dropdown.find('.dropdown-toggle').dropdown();
};

/**
 * Menu principal
 */
Blu.fn.UI.mainMenu = function() {
    
    if( 0 /*!Blu.config.clientMode*/ /*&& !Blu.config.users.connectVisitor*/ ) {
        return;
    }
    
    var _bar        = $('#barre'),
        _title      = _bar.find('#titre'),
        _mainMenu   = _bar.find('#main-menu'),
        _html       = '';
    
    if( !_mainMenu.length ) {
        //_bar.append('<ul id="main-menu"></ul>');
        _title.after('<ul id="main-menu"></ul>');
        _mainMenu = _bar.find('#main-menu');
    }
    
    /*'<li>' + 
        '<a class="my-feed glyph general" href="#home-timeline" title="Home">m</a>' +
    '</li>' +
    '<li>' +
        '<a class="new-search-general" href="#new-search-general" title="Search Map">#</a>' +
    '</li>' +
    '<!--<li>' +
        '<a class="new-search-user" href="#new-search-user" title="User Map">@</a>' +
    '</li>-->' +
    '<!--<li>' +
        '<a class="compose-tweet glyph general" href="#compose-tweet" title="Compose new tweet">[</a>' +
    '</li>-->' +*/
    
    if( Blu.user.screen_name ) {
        var _avatar_url = Blu.user.profile_image_url || 'https://api.twitter.com/1/users/profile_image?size=mini&screen_name='+ Blu.user.screen_name;
        _html +=    '<li class="dropdown">' +
                        '<a class="settings dropdown-toggle" id="account-toggle" href="#settings" role="button" data-toggle="dropdown">' + 
                            '<img src="' + _avatar_url + '" />' +
                            '<span>' + Blu.user.screen_name + '</span>' +
                            '<b class="caret"></b>' +
                        '</a>' +
                        '<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="account-toggle"></ul>' +
                    '</li>';
    }

    _mainMenu.html( _html );

    
    // Input création de projets
    if( Blu.config.clientMode && _bar.find('.new-search').length < 1 ) {
        var _placeholder = Blu.user.can.createHashtagSearch ? 'Search for a @username or a #hashtag' : Blu.txt('enter-search-user');
        _mainMenu.after( '<input type="text" class="new-search" data-type="search-user" placeholder="' + _placeholder + '"/>' );
    }
};


/**
 * Bas du graphe
 */
Blu.fn.UI.createGraphBottom = function() {
    
    var _ZC                 = $('#zonecentre'),
        _actionsProj        = [],
        _htmlActionsProj    = '';

    if( Blu.user.can.exportTopUsersCsv ) {
        _actionsProj.push( '<a class="export-users-csv" href="#export-users-csv">Export Top Users (CSV)</a>' );
    }

    /*if( Blu.config.clientMode && Blu.user.isFromTeam ) {
        _actionsProj.push( '<a class="tour" href="#tour">Getting started</a>' );
    }*/

    _ZC.before(
        '<div id="graph-bottom">' +
            '<ul>' +
                '<li>' +
                    '<ul class="count-nodes">' + 
                        '<li class="total" title="Users on the map">' + 
                            '<span class="count"></span>' + 
                            '<span class="title">Users</span>' + 
                            '<span class="img"></span>' + 
                        '</li>' +
                        '<li class="following" title="People you follow">' + 
                            '<span class="count"></span>' + 
                            '<span class="title">Following</span>' + 
                        '</li>' +
                        '<li class="not-following" title="People you don\'t follow">' + 
                            '<span class="count"></span>' + 
                            '<span class="title">Not Following</span>' + 
                        '</li>' +
                    '</ul>' +
                '</li>' +
                /*'<li>' +
                    '<ul id="options-map">' +
                        '<li>' + 
                            '<a class="" id="following-mode" href="#following-mode" title="See people you follow">' + 
                                '<span class="glyph general">f</span>' + 
                                '<span class="text">Show Following</span>' + 
                            '</a>' + 
                        '</li>' +
                    '</ul>' + 
                '</li>' +*/
                '<li class="actions-project dropdown dropup">' +
                    '<a class="dropdown-toggle" id="toggle-actions-project" href="#" role="button" data-toggle="dropdown">' + 
                        '<span class="glyph general">a</span>' + 
                        /*'<span class="text">Options</span>' + */
                        '<b class="caret"></b>' +
                    '</a>' +
                    '<ul class="dropdown-menu" role="menu" aria-labelledby="toggle-actions-project"></ul>' +
                '</li>'  +
                '<li class="feedback">' + 
                    '<a href="javascript:UserVoice.showPopupWidget();">Feedback</a>' +
                '</li>' +
                '<li class="tour">' + 
                    '<a href="#tour">Tour</a>' +
                '</li>' +
            '</ul>' +
         '</div>'
    );
        
    for( var i in _actionsProj ) {
        _htmlActionsProj += '<li>' + _actionsProj[i] + '</li>';
    }
    
    if( _actionsProj.length ) {
        
        var _dropdown   = $('#graph-bottom li.actions-project'),
            _menuAP     = _dropdown.find('.dropdown-menu'),
            _toggleAP   = _dropdown.find('.dropdown-toggle');
        
        _menuAP.html( _htmlActionsProj );
        
        _toggleAP.show();
        _toggleAP.dropdown();
        
    }
    
    Blu.fn.UI.updateNodesCounts();
};


/**
 * Légende sur le graphe
 */
Blu.fn.UI.createGraphHeader = function() {

    var _ZC = $('#zonecentre');

    _ZC.before(
        '<div id="graph-header">' +
            '<ul>' +
                '<li class="count-tweets-alltime">' +
                    '<span class="count"></span>' +
                '</li>' +
                '<li id="timemachine-zone">' +
                    '<div class="tm-side left">' +
                        '<div class="date"><span class="day"></span><span class="hour"></span></div>' +
                    '</div>' +
                    '<div id="time-machine"><canvas id="mini-timeline" width="0" height="0"></canvas></div>' +
                    '<div class="tm-side right">' +
                        '<div class="date"><span class="day"></span><span class="hour"></span></div>' +
                    '</div>' +
                '</li>' +
            '</ul>' +
         '</div>'
    );

};


/**
 * Mise à jour des compteurs de users sur le graphe
 */
Blu.fn.UI.updateNodesCounts = function() {
    
    var _gh             = $('#graph-header, #graph-bottom'),
        _counts         = _gh.find('.count-nodes'),
        _total          = ( Blu.carto && Blu.carto.nodes ) ? Blu.carto.nodes.length : 0,
        _following      = Blu.graphs.current.followedNodes || 0,
        _notfollowing   = _total - _following;
    
    if( _counts.length < 1 ) {
        return;
    }
    
    _counts.find('li.following .count').text( _following );
    _counts.find('li.not-following .count').text( _notfollowing );
    _counts.find('li.total .count').text( _total );
    
    if( Blu.config.map.showFollowing ) {
        _counts.find('li').show();
    } else {
        _counts.find('li').hide();
        _counts.find('li.total').show();
    }
    
}

/**
 * Evénements des éléments d'interface
 */
Blu.fn.UI.bindEvents = function() {
	
    // Changement de l'ancre (hash) de l'URL
    /*$(window).hashchange( function(){
        
        Blu.info('Hash has changed');
        
        var _filterParams = Blu.fn.url.getFilterParams();
        
        // Time Machine
        if( 0 && typeof( _filterParams['time'] ) !== 'undefined' ) {


        }
        
        // Sélection de l'utilisateur
        if( typeof( _filterParams['user'] ) !== 'undefined' ) {
            
            Blu.log( 'map.selectUser( @'+ _filterParams['user'] + ' )' );
            Blu.fn.map.selectUser( '@' + _filterParams['user'] );
            
        }

    
    });*/
        
    Blu.fn.users.events();
    
    
    var _canvas = $('#canvas');
    
    _canvas
        .mousemove(     Blu.fn.canvas.mouseMove     )
        .click(         Blu.fn.canvas.click         )
        .mousedown(     Blu.fn.canvas.startMoving   )
        .mouseout(      function() { Blu.mouse.pos = null; Blu.fn.canvas.endMoving(); } )
        .mousewheel(    Blu.fn.map.scrollMap        );
    /*$('#canvas')
            .tap(function(e){ alert('tap'); })
            .swipe(function(e){ alert('swipe'); });*/

    /*
     * Blocage de l'overscroll iOS
     * http://www.html5rocks.com/en/mobile/touch/
     */
    document.body.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, false);
    
    
    if( Blu.user.id == 1 || ( Blu.app.getParams.dev ) ) {
        
        /*var _logGesture = function( _gesture ) {
            return 'center = ( ' + _gesture.center.pageX + ', ' + _gesture.center.pageY + ' ) <br/>' + 
                'deltaTime = ' + _gesture.deltaTime + ' <br/>' + 
                'delta = ( ' + _gesture.deltaX + ', ' + _gesture.deltaY + ' ) <br/>' + 
                'velocity = ( ' + _gesture.velocityX + ', ' + _gesture.velocityY + ' ) <br/>' + 
                'angle = ' + _gesture.angle + ' <br/>' + 
                'direction = ' + _gesture.direction + ' <br/>' + 
                'distance = ' + _gesture.distance + ' <br/>' + 
                'rotation = ' + _gesture.rotation + ' <br/>' + 
                'eventType = ' + _gesture.eventType + '<br/>' + 
                'scale = ' + _gesture.scale;  
        };
        
        $('h1').append('// 1').css('color', 'white');

        // Touch events
        //$('.panel').hammer({ drag_lock_to_axis: true }).on("release dragleft dragright swipeleft swiperight", function( event ) {
        var _panelTouch = $('.panel:visible > .wrap');
        _canvas.hammer({ drag_lock_to_axis: false }).on({
            'pinch' : function( event ) {
                _panelTouch.html( 'Pinch <br/>' + _logGesture( event.gesture ) );
                Blu.fn.map.pinchMap( event );
            },
            'drag' : function( event ) {
                _panelTouch.html( 'Drag <br/>' + _logGesture( event.gesture ) );
                Blu.fn.canvas.mouseMove( event );
            },
            'dragstart' : function( event ) {
                //alert('dragstart');
                _panelTouch.html( 'Drag start <br/>' + _logGesture( event.gesture ) );
                Blu.fn.canvas.startMoving( event );
            },
            'dragend'   : function( event ) { 
                //alert('dragend');
                _panelTouch.html( 'Drag end <br/>' + _logGesture( event.gesture ) );
                Blu.mouse.pos = null; 
                Blu.fn.canvas.endMoving( event );
            } 
        });*/
        
    }


    Blu.fn.usercards.events();

    /*$('#miniature')
        .mousemove(     Blu.fn.canvas.moveFromMini      )
        .mousedown(     Blu.fn.canvas.startMoving       )
        .mouseup(       Blu.fn.canvas.endMoving         )
        .mouseout(      Blu.fn.canvas.endMoving         )
        .mousewheel(    Blu.fn.map.scrollMap            );*/

    $('#mini-timeline')
        .mousemove(     Blu.fn.timemachine.mouseMove    )
        .mousedown(     Blu.fn.canvas.startMoving       )
        .mouseup(       Blu.fn.timemachine.endMoving    )
        .mouseout(      Blu.fn.timemachine.endMoving    );
    
    // Granularité de la timeline
    /*$('#ulgranul a').click(function() {
        
        var _tab                            = this.id.split('_');
        
        Blu.timeline.params.granularite     = parseInt( _tab[1], 10 );
        
        Blu.timeline.params.trancheCourante = -1;
        
        Blu.fn.timestamps.calcSlices();
        Blu.fn.tranches.updateCounts();
        
        Blu.fn.tweets.showList();
        
        $("#ulgranul li").removeClass('actif');
        $(this).parent().addClass('actif');
    });*/
    
    // Zoom avant/arrière
    $('#ctlzoom .zoom').click( function(evt) {
        
        var //_viz    = Blu[ Blu.viz.current ],
            //_slider = $('#slider'),
            _offset = $(this).hasClass('in') ? 2 : -2;
            
        //_viz.params.zoomLevel = Math.max( _viz.minZoom, _viz.params.zoomLevel + _offset );
        //_slider.slider( 'value', _viz.params.zoomLevel );
        
        Blu.fn.map.zoom( evt, _offset );
        
        $(this).blur();
        
        return false;
        
    });
    
    /*$(document).click(function(evt) {
        $('#autocomplete').hide();
    });*/
    
    if( document.location.hash === "#tags") {
        $('#lien_tags').click();
    }
    
    /*$("#btnloupe").click(function () {
        Blu.map.params.loupeActive = !Blu.map.params.loupeActive;
        $(this) .attr("class",Blu.map.params.loupeActive?"":"off")
                .attr("title",(Blu.map.params.loupeActive?"Désa":"A")+"ctiver le mode loupe");
    });*/
    
    // Afficher les connexions sur le graphe
    $('#btnedges').click(function () {
        Blu.map.params.showEdges = !Blu.map.params.showEdges;
        Blu.fn.UI.updateBtnEdges();    
    });

    // Supprimer tous les panneaux utilisateur
    $('#sidebar-menu .bthome a, #ctlzoom .home').live({
        click : function() {
            
            Blu.fn.UI.goHome();
            
            mixpanel.track( 'Button: Back Home' );
            
            $(this).blur();
            
            return false;
        }
    });

    /**
     * Afficher ou cacher un panneau
     */
    $('.prev-user').live({
        click : function() {

            var _a           = $(this),
                _panel       = _a.parents('.panel'),
                _panels      = $('#panels'),
                _miniStats   = $('#mini-stats'),
                _screen_name = Blu.history[ Blu.history.length - 2 ];

            //_toggle.hide();

            // #1 reprise du centrage initial de la carto
//            Blu.map.params.centreX = Blu.zoneGraphe.largeur / 2;
//            Blu.map.params.centreY = Blu.zoneGraphe.hauteur;

            if( Blu.config.map.usercards.show ) {
                // MAJ de l'infobulle
                $('#zonecentre .user-card').remove();
                Blu.fn.usercards.reset();
                Blu.usercards.selected.state.show = true;

                // Création de l'infobulle utilisateur
                Blu.fn.user.showUserCard( _screen_name );
            }
            
            // Recentrage du graphe
            Blu.fn.map.selectUser( _screen_name );

            _miniStats.find('li').removeClass('selected');

            // Si le panneau est affiché, on le cache
            if( _panel.hasClass('showed') ) {

                    _panels.animate( 
                        {
                            'left'  : "+=" + _panel.width() + 'px'
                        },
                        'slow', 'easeOutCubic',
                        function() {

                            Blu.log($(this));

                            // Traitement après animation à ne faire qu'une seule fois
                                    _a.addClass('show-panel'); // ??
                                    _panel.remove();
                                    //_panel.css( 'left', '+' + _panel.width() + 'px' ).fadeIn(); 
                                    // on déplace tous les panneaux home+user à droite
                                //}
                        }
                    );

                // Elimine le dernier utilisateur cherché de l'historique
                Blu.history.pop();

                $('#inputrecherche').val( _screen_name );

            // S'il est caché, on l'affiche
            } else {
                Blu.fn.UI.showPanel( _panel );          
            }
            
            return false;
        }
    });
        
    // retour à l'utilisateur cherché précédent
//    $(".prev-user").live({
//        click : function() {
//            if( Blu.history.length > 1 ) {
//                // élimine le dernier utilisateur cherché de l'historique
//                Blu.history.pop();
//                var _prev_user = Blu.history[ Blu.history.length-1 ];
//                Blu.fn.user.showProfile( _prev_user );
//                // supprime le dernier panel user
//                $('#zonecentre').prev('.user').remove();
//            }
//        }
//    });
    
    /*
     * Onglets dans une sidebar
     */
    $('#mini-stats a').live({
        click : function() {
            var _a = $(this),
                _href        = _a.attr('href').replace('#',''),
                _ul_numbers  = _a.parents('.numbers'),
                _menu        = _a.parents('#sidebar-menu'),
                _panels      = $('#panels'),
                _lastPanel   = _panels.find('.panel:last'),
                _ul_content  = _lastPanel.find('.sidebar-tabs-content');

            _menu.children('li').removeClass('selected'); // le bouton home n'est plus sélectionné
            _ul_numbers.children('li').removeClass('selected');
            _ul_numbers.children('li.'+_href).addClass('selected');
            
            _ul_content.children('li').addClass('hide');
            _ul_content.children('li.'+_href).removeClass('hide');

            _a.blur();
            
            return false;
        }
    });
    
    /*
     * Menu de la sidebar
     */
    $('#tabs-menu a').live({
        click : function() {
            
            var _a          = $(this),
                _type       = _a.attr('href').replace('#',''),
                _panels     = $('#panels'),
                _panel      = _panels.find( '.panel.' + _type );

            if( _type === 'users' ) {
                Blu.fn.UI.goHome();
            }

            // Affichage panneau
            Blu.fn.UI.showPanel( _type );
            
            _a.blur();
                   
            return false;
        }
    });
            
    // Classement des top bavards
    /*$('#sidebar-menu .by_tweets a').live({
        click : function() {
            var _a = $(this),
                _sidebar    = _a.parents('.panel'),
                _tab_content = _sidebar.find('.sidebar-tabs-content .by_tweets .statistics');
            _tab_content.html( Blu.fn.users.tableUsers( {
                'theClass'          : 'topUsers by_tweets',
                'userRanked'        : 'Auteur',
                'numberTitle'       : 'Nb de tweets',
                'tab'               : Blu.topUsers.global.by_tweets
            } ) );
            return false;
        }
    });*/
    
        
    /* 
     * Clic sur une mention ou un hashtag dans un tweet ou un classement
     */
    $('.tweets-list .tweet h4 a, .rank-user h4 a, .profile-pic .avatar, p.tweet-text a.mention').live({
        
        click : function() {
            
            var _this       = $(this),
                _user       = _this.data('user') ? _this.data('user') : _this.find('a').data('user') || '',
                _context    = ( _this.parents('.tweet').length ) ? 'Tweet' : 'User';
                _miniStats  = $('#mini-stats');
             
             _miniStats.find('li').removeClass('selected');
             _miniStats.find('.tweets').addClass('selected');
            
            if( !_user ) {
                return false;
            }
            
            // Reset de l'infobulle
            if( Blu.config.map.usercards.show ) {
                $('#zonecentre .user-card').remove();
                Blu.fn.usercards.reset();
                Blu.usercards.selected.state.show = true;
            }

            // Affichage du profil
            Blu.fn.user.showProfile( _user );
            mixpanel.track( 'Show Profile (via ' + _context + ')', { 'User' : _user } );

            if( Blu.config.map.usercards.show ) {
                Blu.fn.user.showUserCard( _user );
            }
            
            return false;
        },
        mouseover : function() {
            if( $(this).data('user') ) {
                Blu.fn.map.survolNoeud( '@' + $(this).data('user') );
                
            } else {
                Blu.fn.map.survolNoeud( '@' + $(this).find('a').data('user') );
            }
        },
        mouseout : function() {
            
            Blu.map.params.hoverNode = -1;
            
        },
        focusin : function() {
            if( $(this).data('user') ) {
                Blu.fn.map.survolNoeud( '@' + $(this).data('user') );
            } else {
                Blu.fn.map.survolNoeud( '@' + $(this).find('a').data('user') );
            }
        },
        focusout : function() {
            Blu.map.params.hoverNode = -1;
        },
        keyup : function(evt) { // #1 à revoir: ne fonctionne pas.
            Blu.fn.map.survolNoeud( '@' + $(this).find('a').data('user') );
        },
        keydown : function(evt){
            Blu.fn.map.survolNoeud( '@' + $(this).find('a').data('user') );
        }
    });
    
    /*
     * Hyperliens dans les tweets
     */
    $('.tweet-text a.url').live({
        click : function() {
            
            var _url = $(this).attr('href');
            
            if( Blu.fn.app.isAppUrl( _url ) || Blu.fn.app.blockingIframeWebsites( _url ) ) {
                return true;
            } else {
                //Blu.fn.UI.lightbox.iframe( _url );
                return true;
            }
            
        }
    });
    /* 
     * Actions sur un tweet
     */
    $('.tweet .actions a').live({
        click : function() {
            var _a          = $(this),
                _tweet_id   = _a.parents('.tweet').attr('id').replace('tweet_', ''),
                _urls       = {
                    'favorite'  : 'https://twitter.com/intent/favorite?tweet_id=',
                    'retweet'   : 'https://twitter.com/intent/retweet?tweet_id=',
                    'reply'     : 'https://twitter.com/intent/tweet?in_reply_to='
                },
                _action = _a.attr('class'),
                _url_popup = ( typeof( _urls[_action] ) !== 'undefined' ) ? ( _urls[_action] + _tweet_id ) : 0;
            
            if( _url_popup !== 0 ) {
                Blu.fn.UI.openPopup( _url_popup, 550, 550 );
            }
            
            return false;
        }
    });
    $('.tweets-list > li').live({
        mouseover : function() {
            if( $(this).data('tranche') ) {
                Blu.fn.timeline.hoverTranche( $(this).data('tranche') );
            }
        },
        mouseout : function() {
            Blu.fn.timeline.hoverTranche( -1 );
        }
    });
    
    // Timestamp du tweet
    /*$('.tweets-list .tweet-content .time a').live({
        click : function() {
            var _a = $(this);
            Blu.fn.UI.openPopup( _a.attr('href'), 750, 550 );
            return false;
        }
    });*/
    
    // Affichage des nouveaux tweets (chargés en Ajax)
    $('.tweets-list .new-tweets').live( 'click', Blu.fn.tweets.showNewTweets );
    
    
    // Clic sur un élément de l'autocomplete
    $('#autocomplete li.item a').live({
        click : function() {
            
            var _user = $(this).data('user');

            if( _user ) {
                
                $('#autocomplete').hide();
                
                // Reset de l'infobulle
                if( Blu.config.map.usercards.show ) {
                    $('#zonecentre .user-card').remove();
                    Blu.fn.usercards.reset();
                    Blu.usercards.selected.state.show = true;
                }
               
                Blu.fn.user.showProfile( _user );
                
                mixpanel.track( 'Show Profile (via Search)', { 'User' : _user } );
                
                if( Blu.config.map.usercards.show ) {
                    Blu.fn.user.showUserCard( _user );
                }
                
                //mixpanel.track( 'Find User within the Map', { 'User' : _user } );
            
            }
            /*if( $(this).data('tag') ) {
                Blu.fn.tweets.search( $(this).data('tag'), true );
            }*/
            return false;
        }
    });
    $('#autocomplete li.item').live({
        mouseover : function() {
            Blu.fn.AC.changePosAC( $(this).data('posAC') );
        }
    });
    
        
    // Logo
    $('#bluenod-logo a').click( function() {
        
        if( $('body').hasClass('has-logo-img') ) {
            return false;
        } else {
            
            if( Blu.config.clientMode ) {
                Blu.fn.UI.showGallery();
                return false;
            } else {
                return true;
            }
        }
        
    });
    
    // Accueil
    $('h1 a').click( function() {
        
        $('#inputrecherche').val('');
        
        Blu.fn.tweets.search( '', true);
        
        Blu.fn.UI.miniStats( {'countTweets' : Blu.counts.tweets.filter, 'countUsers' : Blu.counts.users.graph} );
        
        return false;
    });
    
    
    Blu.fn.project.events();
    
    // Tooltips
    $('a[data-tooltip]').tipsy({ 
        //'gravity'   : $.fn.tipsy.autoNS,
        'gravity'   : $.fn.tipsy.autoBounds(0, 'sw'),
        'fade'      : true
        //live      : true
    });
    
    
    /*
     * Connexion à Twitter
     */
    $('.twitter-connect').live('click', function() {
        
        var _a          = $(this),
            _action     = _a.data('action') || 'default',
            _callbacks  = {
                'default' : {},
                'load-home-timeline' : function() {
                    Blu.fn.project.loadHomeTimeline();
                },
                'compose-tweet' : function() {
                    $('.compose-tweet').click();
                },
                'connect-visitor' : function() {
                    
                    if( Blu.user.status === 'visitor' ) {
                        Blu.fn.UI.popupEnterYourMail({ 'after_oauth' : true });
                    }
                    
                }
            };
        
        if( !_callbacks[ _action ] ) {
            _action = 'default';
        }
        
        Blu.fn.connect.twitter.authorize( { 'action' : _action, 'callback' : _callbacks[ _action ] } );
        
        return false;
    });

    /*
     * Déconnexion à Twitter
     */
    $('#account .twitter-disconnect').live('click', function() {
        
        $.getJSON( Blu.app.urls.main + '/connect/twitter/disconnect', {}, function() {
            Blu.fn.connect.twitter.afterOAuthProcess( { 'action' : 'disconnect' } ); 
        });
        
        return false;
    });
    
    /**
     * Disparition du menu Account
     */
    $('#zonecentre, #barre, .panel, #graph-header, #graph-bottom').click( function(event) {

        $('#account').hide();
        
    });
    
    
    
    Blu.fn.user.followEvents();
    
    Blu.fn.UI.lightbox.events();
    
    Blu.fn.timeNav.events();
    
    
    // Input contenant du texte à copier
    $('input.copy, textarea.copy').live('click', function(){
	$(this).select();
    });    
    
    
    
}; // Fin de Blu.fn.UI.bindEvents()




/**
 * Publication d'un projet
 */
Blu.fn.project.publish = function() {
    
    if( !Blu.projects.current.id ) {
        return;
    }

    $.getJSON( Blu.app.urls.main + '/projects/publish', {'project_id' : Blu.projects.current.id}, function(json) {

        if( json.success ) {

            Blu.fn.UI.popupWindow.open({
                'title'     : 'Share your map',
                'content'   : '<p>This map has its own URL now:</p>' + 
                              '<input type="text" class="copy" value="' + json.map_url + '">',
                'width'     : '550'
            });


        } else {
            Blu.fn.UI.notification({'message' : json.message, 'type' : 'fail', 'delayOut' : 8});                
        }

    });
    
};


/**
 * Suppression d'un projet
 * @param {integer|String} project_id
 * @param {String} context
 */
Blu.fn.project.deleteProject = function( project_id, context ) {
    
    context = context || '';
    
    var _project    = project_id ? Blu.fn.projects.findOne({ 'id' : project_id }) : Blu.projects.current,
        _isCurrent  = ( _project.id == Blu.projects.current.id );
    
    if( !_project.id ) {
        return;
    }
    
    Blu.warn( 'deleteProject > project ' + _project.id + '  (current : ' + Blu.projects.current.id + ')' );
    

    $.getJSON( Blu.app.urls.main + '/projects/delete', {'project_id' : _project.id}, function( json ) {

        if( json.success ) {

            Blu.log('Project ' + _project.id + ' has been deleted.');
            mixpanel.track( 'Delete Search' );
            
            /*
             * UI
             */
            if( context === 'AC' ) {
                var _AC     = $('#new-search-ac'),
                    _li     = _AC.find('.list-projects li[data-project-id="' + project_id + '"]');
                _li.animate({ 'height' : '0px' }, 700, 'easeOutCubic', function() {
                    $('#new-search-ac').removeClass('stay-displayed');
                    Blu.fn.UI.showNewSearchAC();
                });
            }
            var _liGal  = $('#gallery li[data-project-id="' + project_id + '"]');
            _liGal.fadeOut(700, function() {
                $(this).remove();
            });

            // Reset
            if( _isCurrent ) {
                Blu.fn.project.resetCurrent();
                $('h1 a').text('');
                $('h1 a .count').text('');
            }
            
            var _type = _project.type;
            
            // Suppression du DOM
            if( _type === 'search' || _type === 'search-user' ) {

                var _lists      = { 'search' : Blu.projects.search, 'search-user' : Blu.projects.user },
                    _listProj   = _lists[_type];

                for( var i in _listProj ) {
                    if( _listProj[i].id == _project.id ) {
                        //Blu.log('Removing a "' + _type + '" project. Before : ' + _listProj.length + ' projects' );
                        //Blu.log( _listProj[i] );
                        //Array.remove( _listProj, i ); 
                        _listProj.splice( i, 1 );
                        break;
                    }
                } 
               
            } else if( _type === 'home-timeline' ) {
                Blu.projects.home_timeline = {};
            }

        } else {
            //Blu.fn.UI.notification({'message' : json.message, 'type' : 'fail', 'delayOut' : 8});
            Blu.warn('Search NOT deleted.');
            Blu.warn( json.message );
        }

    });        
    
};

/**
 * Configuration de l'interface liée au projet
 * @param {Object} project
 */
Blu.fn.project.configUI = function( project ) {

    var _a      = $('h1 a'),
        _title  = '',
        _input  = $('#barre .new-search');
    
    _a.html('');
    
    if( !project || Blu.config.clientMode ) {
        _a.hide();
    } else {
        _a.show();
    }
    
    
    // Hashtag
    if( project.type === 'search' ) {
        
        if( project.query ) {
            _title = 'Search: ' + project.query;
            if( Blu.config.clientMode ) {
                _input.val( project.query );
            }
        }
        if( project.title ) {
            _title = project.title;
        }
        
        
    // User
    } else if( project.type === 'search-user' ) {
        
        _title = project.title;
        
        if( Blu.config.clientMode ) {
            _input.val( '@' + ( project.twitter_screen_name || '' ) );
        }
        
    // Timeline Home
    } else if( project.type === 'home-timeline' ) {
       _title = 'Home';
    }
    
    _a.text( _title );
    
    if( project.isPremium ) {
        //_a.append('<span class="powered-by">by <em>Bluenod</em></span>');
    }
    
    // Avatar du twitto recherché
    if( 0 && project.type === 'search-user' ) {
        
        var _avatar = Blu.fn.user.get( project.twitter_screen_name || '' ).data.profile_image_url,
            _img;
        
        _a.prepend('<img src="' /*+ _avatar*/ + 'http://twitter.com/api/users/profile_image/' + project.twitter_screen_name + '" />');
        
        _img = _a.find('img');
        _img.data( 'twitter-screen-name', project.twitter_screen_name );
        
        if( _avatar == Blu.images.default_user ) {
            _img.data( 'need-avatar', true );
        }
        
    }

};

/**
 * Sélection d'un projet en tant que projet courant
 * @param {Object} project
 */
Blu.fn.project.select = function( project ) {
    
    if( !project ) {
        Blu.warn( 'Pas de projet à sélectionner' );
        return;
    }
    
    Blu.info( 'Sélection du projet ' + project.id );
    
    if( project ) {
        Blu.projects.current = project;
    }
    
};


/**
 * Sélection du dernier projet
 * @returns bool
 */
Blu.fn.project.selectLast = function() {
    
    var _project = Blu.projects.current.id ? Blu.projects.current : Blu.fn.projects.findOne({ 'orderBy' : 'refreshed_at DESC' });
    
    if( _project.id > 0 ) {
        
        Blu.fn.project.select( _project );
        
        return true;
        
    } else {
        
        Blu.fn.project.select();
        
        Blu.warn('Aucun projet à sélectionner.');
        
        return false;
        
    }
    
};


/**
 * Recherche d'un projet d'après son ID
 * @param {integer} project_id
 * @deprecated
 */
Blu.fn.project.get = function( project_id ) {
    
    for( var i in Blu.projects.search ) {
        
        if( Blu.projects.search[i].id == project_id ) {
            return Blu.projects.search[i];
        }
        
    }
    
    // Projet non trouvé
    return {
        'id'        : '0',
        'query'     : '',
        'type'      : '',
        'dates' : {
            'min' : '',
            'max' : ''
        }
    };
};


/**
 * Recherche multi-critères retournant un seul projet (premier résultat s'il y en a plusieurs)
 * @param {Object} options
 */
Blu.fn.projects.findOne = function( options ) {
    
    // Paramètres de recherche
    var _defaults = {
        limit   : 1,
        hideDup : false
    };
    
    options = $.extend( _defaults, options || {} );
        
    var _projects   = Blu.fn.projects.find( options ),
        _result     = _projects[0] || {};
    
    return _result;
};

/**
 * Recherche multi-critères de projets
 * @param {Object} options
 */
Blu.fn.projects.find = function( options ) {
    
    Blu.info( 'Blu.fn.projects.find()' );
        
    // Paramètres de recherche
    var _defaults = {
        'id'      : '',
        'query'   : '',
        'type'    : '',
        'ac'      : '',
        'orderBy' : '',
        'limit'   : 0,
        'offset'  : 0,
        'hideDup' : true,
        'premium' : false // null
    };
    
    options = $.extend( _defaults, options || {} );
    
    Blu.log( options );
    
    var _project,
        _otherProj,
        _match,
        _results    = [],
        _duplicates = [],
        _isDuplicate,
        _countDups  = 0;
    
    
    // Filtrage
    for( var i in Blu.projects ) {
        
        if( $.inArray( i, [/*'home-timeline',*/ 'search', 'user'] ) === -1 ) {
            continue;
        }
        
        for( var j in Blu.projects[i] ) {

            _project = Blu.projects[i][j];
            
            if( !_project.id ) {
                continue;
            }

            _match   =  ( options.id ? options.id == _project.id : true ) && // comparer avec == car l'id peut être un entier
            
                        ( options.query ? options.query.toLowerCase() === _project.query.toLowerCase() : true ) &&
                        
                        ( options.type ? options.type === _project.type : true ) && 
                        
                        ( options.ac.length ? 
                            ( 
                                ( _project.type === 'search-user' ) ? 
                                    ( _project.twitter_screen_name.toLowerCase().search( options.ac.toLowerCase().replace('@','') ) !== -1 ) : 
                                    ( _project.query.toLowerCase().search( options.ac.toLowerCase().replace('#','') ) !== -1 )
                            ) 
                            : true ) && 
                        ( ( options.premium !== null ) ? 
                            ( options.premium && _project.isPremium || !options.premium && !_project.isPremium )  : 
                            true
                        );

            if( _match ) {
                
                _isDuplicate = false;
                
                // Recherche de doublons
                if( options.hideDup /*&& _project.type === 'search-user'*/ ) {
                    
                    for( var k in _results ) {
                        
                        _otherProj = _results[k];
                        
                        if( _otherProj.type === 'search-user' && _otherProj.twitter_screen_name.toLowerCase() === _project.twitter_screen_name.toLowerCase() || 
                            _otherProj.type === 'search' && _otherProj.query.toLowerCase() === _project.query.toLowerCase()
                            ) {
                            _isDuplicate = true;
                            if( typeof _duplicates[ 'dups_of_project'+_project.id ] === 'undefined' ) {
                                _duplicates[ 'dups_of_project'+_project.id ] = [];
                            }
                            _duplicates[ 'dups_of_project'+_project.id ].push( _otherProj );
                            _countDups++;
                            break;
                        }
                    }
                    
                }
                
                if( !_isDuplicate ) {
                    _results.push( _project );
                }
            }

        }

    }
    
    // Tri
    if( options.orderBy ) {
        
        var _sortFunc = function( a, b ) {
            
            switch( options.orderBy ) {
                
                case 'id DESC':
                    return b.id - a.id;
                    
                case 'id ASC':
                    return a.id - b.id;
                    
                case 'refreshed_at DESC':
                    if( a.refreshed_at && b.refreshed_at ) {

                        if( b.refreshed_at < a.refreshed_at ) {
                            return -1;
                        } else if( b.refreshed_at > a.refreshed_at ) {
                            return 1;
                        } else {
                            return 0;                        
                        }

                    } else {
                        return b.id - a.id;
                    }
                    
                default:
                    return 0;
            }

        };
        
        _results.sort( _sortFunc );
    }
    
    // Limit
    if( options.limit ) {
        _results = _results.slice( options.offset, options.offset + options.limit );
    }
    
    Blu.log( _results.length + ' project(s) found, out of a total ' + ( Blu.projects.search.length + Blu.projects.user.length ) );
    if( _results.length ) {
        //Blu.log( _results );
    }
    
    if( options.hideDup ) {
        Blu.warn( _countDups + ' duplicates found on all projects:');
        Blu.log( _duplicates );
    }
    
    return _results;
    
};  // Fin de Blu.fn.projects.find

/**
 * Retoune le code HTML de la liste des projets dans l'autocomplete
 * @param {Object} options
 */
Blu.fn.UI.listProjects = function( options ) {

    var _defaults = {
        classList       : 'list-projects',
        classWrapper    : 'list-projects-wrapper',
        orderBy         : 'refreshed_at DESC',
        projects        : null,
        avatarSize      : 'normal',
        titleMaxChar    : 22,
        returnItemsOnly : false
    };
    
    options = $.extend( _defaults, options || {} );
    
    if( options.projects === null ) {
        options.projects = Blu.fn.projects.find( options );
    }

    var _html       = '',
        _ul_content = '',
        _project, _title, _avatar, _img, _needAvatar;
    
    for( var i in options.projects ) {

        _project        = options.projects[i],
        _title          = ( _project.type === 'search' ) ? _project.query : '@' + _project.twitter_screen_name,
        _avatar         = ( _project.type === 'search' ) ? Blu.images.default_search : Blu.images.default_user,
        _needAvatar     = false;
        
        if( _project.type === 'search-user' ) {
            _avatar = Blu.fn.user.getAvatarUrl( _project.twitter_screen_name || '', options.avatarSize );
            if( _avatar === Blu.images.default_user ) {
                _needAvatar = true;
                _avatar = 'https://api.twitter.com/1/users/profile_image?size=' + options.avatarSize + '&screen_name=' + _project.twitter_screen_name;
            }
        }

        _img =  '<img src="' + _avatar + '"' + ' />';
                    /*( _needAvatar ? ' data-twitter-screen-name="'+ _project.twitter_screen_name + '" data-need-avatar="true" ' : '' )+ */ 
        
        _ul_content +=  '<li class="proj ' + _project.type + '" data-project-id="' + _project.id + '" data-project-type="' + _project.type + '">' +
                            '<a class="item" href="#project' + _project.id + '">' + 
                                _img + 
                                '<span class="title">' + Blu.fn.misc.cutLongString( _title, options.titleMaxChar ) + '</span>' + 
                            '</a>' +
                            '<a class="delete" href="#" title="' + 'Remove search' + '">' + 'Remove' + '</a>' + 
                        '</li>';
                    
    }
    
    if( options.returnItemsOnly ) {
        return _ul_content;
    }
    
    _html =     _ul_content ?
                    '<ul class="' + options.classList + '">' + _ul_content + '</ul>' : 
                    '' /*<p class="no-data">' + Blu.txt( 'no-history-'+options.type ) + '</p>'*/; 

    return  '<div class="' + options.classWrapper + '">' + _html + '</div>';
    
}; // Fin de Blu.fn.UI.listProjects


/**
 * Coupe une string avec "..." à la fin si celle-ci dépasse un nombre de caractères
 * @param {String} string
 * @param {integer} max_characters
 * @return {String}
 */
Blu.fn.misc.cutLongString = function( string, max_characters ) {
    return ( string.length > max_characters ) ?  string.slice( 0, max_characters-1 ) + '…' : string;
};

/**
 * Affichage de la gallerie de recherches
 */
Blu.fn.UI.showGallery = function() {
    
    var _gallery = $('#gallery'),
        _defaultMsg = 'In the search field above, you can enter <br/> any @username or #hashtag you want to visualize.',
        _options = { 
            limit         : 20,
            classWrapper  : 'maps-wrap', 
            classList     : 'maps', 
            avatarSize    : 'reasonably_small',
            titleMaxChar  : 16,
            returnItemsOnly : true
        },
        _htmlProj = '';
    
    // Premier affichage
    if( !_gallery.length ) {
        
        $('#barre').after(
            '<div id="gallery">' +
                '<div class="wrap">' +
                    '<h2>' + 'My Search History' + '</h2>' +
                '</div>' +
                '<div class="maps-wrap">' +
                    '<ul class="maps"></ul>' +
                '</div>' +
            '</div>'
        );
        
        _gallery = $('#gallery');
        
        
        // Scroll
        _gallery.onScrollEnd( function() {
            
            var _newOptions = {
                offset          : _gallery.find( 'ul.' + _options.classList + ' li' ).length,
                returnItemsOnly : true
            };
            
            var _newProjects    = Blu.fn.UI.listProjects( $.extend( _options, _newOptions ) );
            
            if( _newProjects ) {
                _gallery.find('ul.' + _options.classList).append( _newProjects );
            }
            
        });
        
    }
    
    //_gallery.find('ul.' + _options.classList).remove();
    _gallery.find('ul.' + _options.classList).html('');
    _gallery.find('p.info-msg').remove();
    
    //_options.projects = Blu.fn.projects.find( _options );
    //_htmlProj = _options.projects.length ? Blu.fn.UI.listProjects( _options ) : ;
    
    _htmlProj = Blu.fn.UI.listProjects( _options );
    
    if( !_htmlProj.length ) {
        _htmlProj = '<p class="info-msg">' +
                        '<img class="hand-arrow-up" class="" src="' + Blu.app.urls.main + '/style/img/Handwritten_Arrow_StraightUp.png?20130415_2" />' +
                        '<br/>' +
                        'Hi @' + Blu.user.screen_name + '!' +
                        '<br/>' +
                        _defaultMsg + 
                    '</p>';
        _gallery.find('h2').hide();
    }
    //_gallery.children('.wrap').append( _htmlProj );
    _gallery.find('ul.' + _options.classList).html( _htmlProj );
    
    _gallery.show();
    
    _gallery.scrollTop(0);
    
};




/**
 * Evénéments sur les projets
 */
Blu.fn.project.events = function() {

    /*
     * Récupération de nouveaux tweets du projet courant
     */
    /*$('#refreshTweets').live({
        click : function() {
                
            Blu.fn.project.grabNewTweets();
            
            return false;
        }
    });
    
    $('#select-actions-project').live({
        click : function() {
            $(this.hash).toggle();
            return false;
        }
    });*/
    
    /*
     * Publication du projet courant
     */
    $('#actions-project .publish').live({
        click : function() {

            Blu.fn.project.publish();
            
            $(this).blur();            
            return false;
        }
    });
    
    /*
     * Suppression du projet courant
     */
    /*$('#actions-project .delete').live({
        click : function() {

            Blu.fn.project.deleteProject();
            
            $(this).blur();            
            return false;
        }
    });*/
    
    /*
     * Export CSV des users
     */
    $('.actions-project .export-users-csv').live({
        click : function() {
            
            if( !Blu.user.can.exportTopUsersCsv ) {
                return false;
            }

            Blu.fn.UI.openPopup( Blu.app.urls.main + '/projects/export/top-users/csv?id=' + Blu.projects.current.id, 500, 300 );
            
            $(this).blur();            
            return false;
        }
    });
    
    /*
     * Visite guidée
     */
    $('#graph-bottom .tour').live({
        click : function() {
            
            Blu.fn.UI.showTour();
            
            $(this).blur();            
            return false;
        }
    });

    /*
     * Menu principal du client
     */
    
    var _mainMenu = $('#main-menu');
    
    /*
     * Historique de recherches
     */
    _mainMenu.find('a.my-searches').live({
        'click' : function() { 
           
            var _a = $(this);
            
            Blu.fn.UI.showGallery();

            _a.blur();
            return false;
        }
    });
    
    /*
     * Mapping flux perso
     */
    /*_mainMenu.find('a.my-feed').live({
        'click' : function() { 
           
            var _a = $(this);
            
            Blu.fn.project.loadHomeTimeline();

            _a.blur();
            return false;
        }
    });*/
    
    /*
     * Recherche #
     */
    /*_mainMenu.find('a.new-search-general').live({
        click : function() {
            
            var _a      = $(this);

            Blu.fn.UI.popupWindow.open({
                'title'     : 'Search Map',
                'content'   : '<input type="text" class="new-search" data-type="search" placeholder="' + Blu.txt('enter-search-general') + '"/>' +
                              '<h3>' + Blu.txt('search-history') + '</h3>' +
                              Blu.fn.UI.listProjects( {'type' : 'search-general'} ),
                'width'     : 620
            });
            
            _a.blur();
            return false;
        } 
    });*/
    
    /*
     * Recherche @
     */
    /*_mainMenu.find('a.new-search-user').live({
        click : function() {
            
            var _a      = $(this);

            Blu.fn.UI.popupWindow.open({
                'title'     : 'User Map',
                'content'   : '<input type="text" class="new-search" data-type="search-user" placeholder="' + Blu.txt('enter-search-user') + '"/>' +
                              '<h3>' + Blu.txt('search-history') + '</h3>' +
                              Blu.fn.UI.listProjects( {'type' : 'search-user'} ),
                'width'     : 620
            });
            
            _a.blur();
            return false;
        } 
    });*/
    
    /**
     * Disparition de l'autocomplete des projets
     */
    Blu.fn.UI.hideNewSearchAC = function() {
        
        var _AC = $('#new-search-ac');
        
        if( _AC.hasClass('stay-displayed') ) {
            return;
        }
        
        //Blu.warn('AC projets supprimé');
        _AC.remove();
        
    };
    
    /**
     * Affichage de l'autocomplete des projets
     */
    Blu.fn.UI.showNewSearchAC = function() {
        
        Blu.fn.UI.hideNewSearchAC();
        
        var _AC = $('#new-search-ac');

        if( _AC.length > 0 ) {
            return;
        }

        var _input      = $('input.new-search'),
            _text       = _input.val(),
            _options    = {
                'ac'        : _text, 
                'limit'     : 5
            };
            
        _options.projects = Blu.fn.projects.find( _options );
        
        // Affichage de l'autocomplete
        if( _options.ac && _options.projects.length > 0 ) {
            
            $('body').append( '<div id="new-search-ac">' + Blu.fn.UI.listProjects( _options ) + '</div>' );
            
            _AC = $('#new-search-ac');

            _AC.css({
                'left'  : _input.position().left,
                'top'   : _input.position().top + _input.outerHeight(true),
                'right' : 'auto'
            });

            
        }
        
    };
    
    /**
     * Changement de la sélection dans l'autocomplete des projets
     */
    Blu.fn.UI.offsetNewSearchAC = function( offset ) {
        
        Blu.info( 'Blu.fn.UI.offsetNewSearchAC( ' + offset + ' )' );
        
        var _AC         = $('#new-search-ac'),
            _lis        = _AC.find('li'),
            _length     = _lis.length,
            _oldIndex   = _lis.filter('.selected').length ? _lis.filter('.selected').index() : -1;
        
        if( !_length ) {
            return;
        }
       
        //Blu.log( _lis );
        //Blu.log( 'Index sélectionné (avant) : ' + _oldIndex );
        
        _lis.removeClass('selected');
        
        var _newIndex = ( _oldIndex + offset ) % _length;
        
        if( _newIndex < 0 ) {
            _newIndex = _length - 1;
        }
        
        //Blu.log( 'Index sélectionné (après) : ' + _newIndex );
        
        var _li_sel = _lis.eq( _newIndex );
        //Blu.log( _li_sel );
        
        _li_sel.addClass('selected');
        
    };
    
    

    /*
     * Champ pour rechercher / créer un projet
     */
    $('input.new-search').live({

        keyup : function( evt ) {

            var _input  = $(this),
                _text   = $.trim( _input.val() );

            switch( evt.keyCode ) {

                // Flèche bas
                case 40 : Blu.fn.UI.offsetNewSearchAC( 1 ); break;
                    
                // Flèche haut
                case 38 : Blu.fn.UI.offsetNewSearchAC( -1 ); break;
                    
                // Echap
                case 27 : Blu.fn.UI.hideNewSearchAC(); break;
                    
                // [Entrée] 
                case 13 :
                    
                    var _selected_li = $('#new-search-ac').find('li.selected');
                    
                    // 1. Sélection d'une recherche de l'autocomplete
                    if( _selected_li.length === 1 ) {
                        
                        _selected_li.children('a').trigger('click');
                        
                    // 2. Nouvelle recherche
                    } else {
                        
                        var _type = ( ( _text[0] === '#' ) ? 'search' : 'search-user' );
                        
                        // Texte trop court / vide
                        if( _type === 'search-user'  && _text.length < 1 || 
                            _type === 'search'       && _text.length <= 1 ) {
                            return;
                            
                        // Hashtag : fonctionnalité non autorisée
                        } else if( _type === 'search' && !Blu.user.can.createHashtagSearch ) { 

                            _input.attr('title', 'Please type a username :)');
                            _input.tipsy({ 'gravity' : 'nw', 'fade' : true, 'trigger' : 'manual' });
                            _input.tipsy('show');

                            setTimeout( function() {
                                if( _input.attr('title') ) {
                                    _input.tipsy('hide');
                                    _input.attr('title', '');
                                } else {
                                    $('.tipsy-nw').remove(); // disparition forcée si l'input n'existe plus à ce moment là
                                }

                            }, 4000 );
                            return;
                        }

                        // Création du projet
                        var _proj = { 'type' : _type };

                        if( _proj.type === 'search' ) {

                            _proj.query = _text;

                        } else if( _proj.type === 'search-user' ) {

                            _proj.twitter_screen_name = _text.replace( '@', '' );

                        }

                        Blu.fn.project.create( _proj );

                        // UI
                        //Blu.fn.UI.popupWindow.close();
                        $('#gallery').hide();

                    }
                    
                    _input.blur();
                
                    break;
                    
                // Par défaut, affichage de l'autocomplete
                default:
                    Blu.fn.UI.showNewSearchAC();
                    break;
            }

        },
        
        focus : function() {
            
            /*var _input  = $(this),
                _text   = _input.val();
                
            $('#new-search-ac').remove();
            
            $('body').append( '<div id="new-search-ac">' + Blu.fn.UI.listProjects( {'type' : 'search-user', 'ac' : _text, 'limit' : 7 } ) + '</div>' );
            */
        },
        
        blur : function() {
            
            var _AC = $('#new-search-ac');
            
            if( !_AC.length ) {
                return;
            }
            
            setTimeout( function() {
                //Blu.log('blur event: #new-search-ac removed after 100ms timeout');
                Blu.fn.UI.hideNewSearchAC();
            }, 100 );
            
        }

    });
    
    $(document).click( function(evt) {
        //Blu.log('clic document >> #new-search-ac removed')
        Blu.fn.UI.hideNewSearchAC();
    });
    
    /*
     * Sélection d'un projet
     */
    $('li.proj a.item').live({
        click : function() {

            var _a          = $(this),
                _li         = _a.parent('li'),
                _project_id = _li.data('project-id'),
                _type       = _li.data('project-type'),
                _project;
                
            if( !_project_id ) {
                Blu.warn("No 'project-id' data for this project. We stop here.");
                return;
            }
            
            // Copie du projet
            _project = Blu.fn.projects.findOne( { 'id' : _project_id } );
            
            if( !_project.id ) {
                Blu.warn("No project found with that id.");
            }
            
            
            var _newProj = { 'type' : _project.type };
            
            if( _project.type === 'search' ) {
                _newProj.query = _project.query;
            } else if( _project.type === 'search-user' ) {
                _newProj.twitter_screen_name = _project.twitter_screen_name;
            }

            // Création du nouveau projet
            Blu.fn.project.create( _newProj );

            // Suppression de l'ancien projet
            Blu.fn.project.deleteProject( _project_id );
            
            // Sélection et chargement du projet
            /*Blu.fn.project.select( _project );
            Blu.fn.project.loadCurrent();*/
            //Blu.fn.UI.popupWindow.close();
            
            Blu.fn.UI.hideNewSearchAC();
            $('#gallery').hide();
            
            mixpanel.track( 'Show Previous Search (Autocomplete)' );

            return false;
        },
        mouseover : function() {
            
            var _a  = $(this),
                _li = _a.parent('li');
                
            _li.siblings().removeClass('selected');
            _li.addClass('selected');
            
        },
        mouseout : function() {
            $(this).removeClass('selected');
        }
    });
    
    /*
     * Suppression d'une recherche
     */
    $('li.proj > .delete').live({
        click : function( event ) {
            
            event.stopPropagation();
            
            var _project_id = $(this).parent().data('project-id'),
                _context    = $(this).parents('ul').hasClass('list-projects') ? 'AC' : '';
            
            Blu.fn.project.deleteProject( _project_id, _context );
            
            return false;
        }
    });
    $('.list-projects li .delete').live({
        mouseover: function() {
            var _AC = $(this).closest('#new-search-ac');
                
            _AC.addClass('stay-displayed');
            
        },
        mouseout: function() {
            var _AC = $(this).closest('#new-search-ac');
                
            _AC.removeClass('stay-displayed');
            
        }
    });
    

    /*
     * Composition d'un tweet
     */
    $('a.compose-tweet, .user-actions .mention a').live({
        
        click : function() {
            
            if( !Blu.user.user_id ) {
                Blu.fn.connect.twitter.infoPopup('compose-tweet');
                return false;
            }
            
            var _a = $(this),
                _compose;
            
            _compose = function() {

                Blu.fn.UI.popupWindow.open({
                    'title'         : 'Compose Tweet',
                    'content'       : '<div class="compose">' + 
                                        '<div class="composer">' + 
                                            '<span>Tweeting as <strong>@' + Blu.user.screen_name + '</strong></span>' +
                                        '</div>' +
                                        '<textarea class="compose-input" autofocus></textarea>' + 
                                        '<div class="bottom">' + 
                                            '<p class="info"></p>' +
                                            '<a class="btn btn-primary disabled" href="#">Tweet</a>' + 
                                            '<span class="count">140</span>' +
                                        '</div>' + 
                                      '</div>',
                    'width'         : 550,
                    'closeOverlay'  : false
                });

                /*
                 * Evénements du champ .compose-input
                 */
                var _composeInput = $('.compose-input');
                
                if( _a.data('prefill-tweet') ) {
                    _composeInput.val( _a.data('prefill-tweet') );
                    Blu.fn.tweet.composeInputEvent( _composeInput );
                }
                
                _composeInput.focus();
                
                _composeInput
                    .keydown( function() { 
                        //Blu.log('keydown');
                        var _input = $(this);
                        setTimeout( function() {
                            Blu.fn.tweet.composeInputEvent( _input ); 
                        }, 10 );
                    })
                    .change( function() { 
                        //Blu.info('change'); 
                        var _input = $(this);
                        setTimeout( function() {
                            Blu.fn.tweet.composeInputEvent( _input ); 
                        }, 10 );
                    })
                    .bind( 'paste', function() { 
                        // On attend un tout petit peu que le champ texte ait la nouvelle valeur
                        var _input = $(this);
                        setTimeout( function() {
                            Blu.fn.tweet.composeInputEvent( _input ); 
                        }, 10 );
                    });
            };
            
            Blu.fn.tweet.loadTextFunctions( _compose );

            
            _a.blur();
            
            return false;
        }
        
    });
    

    /**
     * Calcul de la longueur du tweet et modification de l'UI en fonction
     */
    Blu.fn.tweet.composeInputEvent = function( input ) {

        var _container  = input.parents('.compose'),
            _count      = _container.find('.count'),
            _info       = _container.find('.info'),
            _button     = _container.find('.btn-primary'),
            _countChar  = twttr.txt.getTweetLength( input.val() ),
            _countLeft  = 140 - _countChar;

        _count.text( _countLeft );
        _info.text('');
        

        if( _countLeft < 0 ) {
            
            _button.addClass('disabled');
            _count.addClass('error');
            
        } else {
            
            if( _countChar == 0 ) {
                _button.addClass('disabled');
            } else {
                _button.removeClass('disabled');
            }
            
            if( _countLeft <= 10 ) {
                _count.addClass('error');
            } else {
                _count.removeClass('error');
            }
        }

    };    
    
    /*
     * Composition d'un tweet : bouton d'envoi
     */
    $('.compose .btn-primary').live({
        
        click : function() {
            
            var _button     = $(this),
                _container  = _button.parents('.compose'),
                _input      = _container.find('.compose-input'),
                _info       = _container.find('.info'),
                _countChar  = twttr.txt.getTweetLength( _input.val() ),
                _errors     = {
                    empty       : ( _countChar == 0 ),
                    tooLong     : ( _countChar > 140 ),
                    disconnect  : !( Blu.user.user_id )
                },
                _isReady    = !( _errors.empty || _errors.tooLong || _errors.disconnect );
            
            if( _input.data('sending') ) {
                return false;
            }
            
            // Erreurs
            _info.text('');
            
            if( _errors.disconnect ) {
                Blu.fn.connect.twitter.authorize();
            } else if( _errors.tooLong ) {
                _info.text( 'Your tweet is over 140 characters. The shorter the better ;)' );
            }
            
            if( !_isReady ) {
                _info.addClass('error');
                _button.blur();
                return false;
            }
            
            _input.data('sending', 1).addClass('inactive');
            _button.addClass('inactive');
            
            // Requête à Twitter
            Blu.fn.app.twitterAuthRequest( 'statuses/update', {'status' : _input.val()}, function(json) {
                
                // UI
                _input.removeData('sending').removeClass('inactive');
                _button.removeClass('inactive');
                
                // Erreur
                if( json.code != 200 ) {
                    _info.text( json.response.error ).addClass('error');
                } else {
                    _info.text( 'Tweet posted!' ).addClass('ok');
                    setTimeout( function() {
                        Blu.fn.UI.popupWindow.close();
                    }, 5000 );
                    mixpanel.track( 'Post a Tweet', { 'Tweet URL' : Blu.fn.tweet.statusUrl( json.response.user.screen_name, json.response.id_str ) } );
                }
                
                
            });
        
            _button.blur();
            return false;
        
        }
    });
    
    
    /*
     * Paramètres du compte
     */
    _mainMenu.find('a.settings').live({
        click : function() {
            var _a = $(this);

            $('#account').toggle();

            _a.blur();
            return false;
        } 
    });


    var _searchZone = $('#sidebar-menu');
    
    /* 
     * Affichage du graphe avec le lien "Refresh graph"
     */
    $('#graph-notif.refresh a').live( 'click', function() {

        var _graph = $(this).data('graph');

        Blu.fn.map.chargeGraphe( _graph );

        Blu.fn.tweets.filter();
        Blu.fn.tweets.showList();

        Blu.fn.UI.removeGraphNotif();

        return false;
    });    

}; // Fin de Blu.fn.project.events()


/**
 * Création d'un projet
 * @param {Object} project
 * @param {Object} options
 */
Blu.fn.project.create = function( project, options ) {
    
    var _defaults = {
        reload   : false
    };    
    options = $.extend( _defaults, options || {} );


    if( project.type === 'search' && !project.query ) {
        Blu.fn.UI.notification( {'message' : 'Please type a query', 'type' : 'fail', 'delayOut' : 4});
        return;
    } else if( project.type === 'search-user' && !project.twitter_screen_name ) {
        Blu.fn.UI.notification( {'message' : 'Please type a username', 'type' : 'fail', 'delayOut' : 4});
        return;
    } else if( project.type === 'home-timeline' && !project.twitter_user_id ) {
        //Blu.fn.UI.notification({'message' : 'You need to connect your Twitter account', 'type' : 'info', 'delayOut' : 8});
        Blu.fn.connect.twitter.infoPopup( 'load-home-timeline' );
        return;
    }
    
    // Reset
    Blu.fn.project.resetCurrent();
    Blu.fn.map.traceMap( true );
    Blu.fn.tweets.search('');
    Blu.fn.UI.miniStats();
    
    var _p = { 'project' : project, 'refresh' : Math.random() };
    
    
    // Création du projet
    $.getJSON( Blu.app.urls.main + '/projects/create', _p, function( json ) {

        if( json.success ) {
            
            var _mixpanel_proj = { 
                'Type'      : ( ( json.project.type === 'search-user' ) ? 'User' : 'Hashtag' ),
                'Search'    : ( ( json.project.type === 'search-user' ) ? json.project.twitter_screen_name : json.project.query )
            };
            
            mixpanel.track( 'New Search', _mixpanel_proj );
            
            // Ajout à la liste des projets
            if( json.project.type === 'search' ) {
                Blu.projects.search.push( json.project );
            } else if( json.project.type === 'search-user' ) {
                Blu.projects.user.push( json.project );
            } else if( json.project.type === 'home-timeline' ) {
                Blu.projects.home_timeline = json.project;
            }

            // Sélection du projet
            Blu.fn.project.select( json.project );
            
            Blu.needs.lastGraph = false;
            Blu.needs.allGraphs = false;

            // Récupération des tweets
            Blu.fn.project.grabNewTweets({ 'create_graph' : true });

            // UI
            Blu.fn.UI.showCanvasScreen();
            
            // Rechargement du projet (permet d'éviter le bug lié à initialisation incorrecte, utile après l'inscription)
            //if( options.reload ) {
                Blu.fn.project.loadCurrent();
            //}

        } else {
            
            Blu.fn.UI.notification({'message' : json.message, 'type' : 'fail', 'delayOut' : 8});
            // @todo : relancer la requête Ajax et mieux gérer l'erreur le cas échéant...
        }

    });
    
};

/**
 * Affichage de l'écran de chargement / erreur d'un mapping
 * @param {Object} options { error : false, no_tweets : false }
 */
Blu.fn.UI.showCanvasScreen = function( options ) {

    var _defaults = {
        error       : false,
        no_tweets   : false
    };
    
    options = $.extend( _defaults, options || {} );

    var _project        = Blu.projects.current,
        _screen_name    = _project.twitter_screen_name || '',
        _query          = _project.query || '',
        _term           = _screen_name ? '@' + _screen_name : _query,
        _avatar         = _screen_name ? 'https://api.twitter.com/1/users/profile_image?size=reasonably_small&screen_name='+ _screen_name : Blu.images.default_search,
        _ZC             = $('#zonecentre'),
        _message        = _screen_name ? 'You are mapping <br>the Twitter community <br>of <strong>@' + _screen_name + '</strong>' : 'You are mapping the Twitter community of <br/><strong>' + _query + '</strong>';
        
    if( options.error ) {
        if( options.no_tweets ) {
            _message = 'Hmm... There are no tweets for this search so we can\'t visualize the community of <strong>' + _term + '</strong><br/><br/>';
        } else {
            _message = 'Hmm... Looks like we don\'t have enough data to visualize the Twitter community of <strong>' + _term + '</strong><br/><br/>';
        }
    }
    
    Blu.fn.UI.removeCanvasScreen();
     
    _ZC.prepend(
        '<div id="canvas-screen" class="' + ( options.error ? 'error ' : '' ) + ( _avatar ? 'user' : 'hashtag' ) + '">' + 
            /*'<img class="bg_graph" src="' + Blu.app.urls.main + '/style/mapping/img/bg_graph_blue_512px.png">' +*/
            '<div class="loader">&nbsp;</div>' +
            '<div class="main-msg">' +
                ( _avatar ? '<img class="avatar" src="' + _avatar + '">' : '' ) +
                '<div class="text">' + 
                    _message + 
                '</div>' +
            '</div>' +
            ( !options.error ?  '<div class="secondary-msg">' + 
                                    'Please wait a few seconds before starting exploration...' + 
                                '</div>' : '' ) +
        '</div>'
    );
    
    // Animation de chargement
    if( !options.error ) {
        
        _ZC.find('#canvas-screen .loader').spin('create-graph');
        
        /*function timerCanvasScreenLoading() {
            var _loop = 2000; // durée totale de l'animation
            $('#canvas-screen .bg_graph')
                .animate({ opacity: 0.25 }, 0.4*_loop )
                .animate({ opacity: 1.0 }, 0.4*_loop )
                .animate({ opacity: 1.0 }, 0.2*_loop, timerCanvasScreenLoading ); // boucle infinie
        }
        timerCanvasScreenLoading();
        */
    }

};

/**
 * Suppression de l'écran de chargement / erreur d'un mapping
 */
Blu.fn.UI.removeCanvasScreen = function() {
    
    $('#zonecentre').find('#canvas-screen').remove();
    
};

/**
 * Affichage de l'écran de bienvenue
 */
Blu.fn.UI.showWelcomeScreen = function() {

    Blu.fn.UI.popupWindow.open({
        'title'         : 'Welcome to Bluenod',
        'content'       :   '<p>' + 'Hello @' + Blu.user.screen_name + ', we are happy to welcome you here!' + '</p>' +
                            '<p>' + 'Just before you start using Bluenod, let\'s have a quick tour.' + '</p>' +
                            '<p class="align-center"><a href="#" class="btn btn-primary next">' + 'Start the tour' + '</a></p>',
        'bg'            : 'background: rgba(0,0,0, 0.85);',
        'closeButton'   : true,
        'closeOverlay'  : false
    }); 
    
    $('#popupWindow .next').click( function() {
        Blu.fn.UI.popupWindow.close();
        Blu.fn.UI.showTour();
        return false;
    });
};

/*
 * Tutoriel présentant l'interface
 */
Blu.fn.UI.showTour = function() {

    var _nextButton     = '<a class="btn btn-primary next" href="#">Next</a>',
        _prevButton     = '<a class="btn prev" href="#">Back</a>',
        _closeButton    = '<a class="btn btn-primary finish" href="#" data-action="close">Close</a>',
        _backButton     = '<a class="btn replay" href="#">Replay</a>',
        _slides = [
        {
            'title'     : 'Search',
            'content'   : 'You can search any Twitter account or hashtag you want. Get a quick access to your search history.',
            'focus' : {
                height  : '24%',
                left    : '40%',
                top     : '0%',
                width   : '30%'
            },
            'placement' : 'bottom',
            'img'       : 'step1.jpg'
        },
        {
            'title'     : 'Explore',
            'content'   : 'Each circle is a Twitter user. Browse the map to see how people are connecting.',
            'focus' : {
                height  : '89%',
                left    : '33.5%',
                top     : '11%',
                width   : '66.5%'
            },
            'placement' : 'left',
            'img'       : 'step2.jpg'
        },
        {
            'title'     : 'Discover',
            'content'   : 'Dig into users profiles to get to know them better.',
            'focus' : {
                height  : '94.4%',
                left    : '0%',
                top     : '5.6%',
                width   : '33.3%'
            },
            'placement' : 'right',
            'img'       : 'step3.jpg'
        },
        {
            'title'     : 'Get in action!',
            'content'   : 'Follow interesting people, interact with them or visualize their own community.',
            'focus' : {
                height  : '94.4%',
                left    : '0%',
                top     : '5.6%',
                width   : '33.3%'
            },
            'placement' : 'right',
            'img'       : 'step4.jpg'
        }
    ],
    _tour = Blu.config.clientMode ? _slides : _slides.splice(1),
    _html =     '<div class="carousel slide" id="carousel-tour">' +
                    /*'<ol class="carousel-indicators">' +
                        '<li data-slide-to="0" data-target="#carousel-tour" class="active"></li>' +
                        '<li data-slide-to="1" data-target="#carousel-tour"></li>' +
                        '<li data-slide-to="2" data-target="#carousel-tour"></li>' +
                        '<li data-slide-to="3" data-target="#carousel-tour"></li>' +
                    '</ol>' +*/
                    '<div class="carousel-inner">';
    
    for( var i in _tour ) {
        
        var _step = _tour[i];
        
        _html +=        '<div class="item ' + ( i == 0 ? ' active' : '' ) +'" data-step="' + i + '">' +
                            '<div class="focus-block" data-toggle="popover" href="#"></div>' +
                            '<img alt="" src="' + Blu.app.urls.main + '/style/img/tour/'+ _step.img +'">' +
                        '</div>';
    }
    
    _html +=        '</div>' +
                    /*'<a data-slide="prev" href="#carousel-tour" class="left carousel-control">‹</a>' +
                    '<a data-slide="next" href="#carousel-tour" class="right carousel-control">›</a>' +*/
                '</div>';
    
    Blu.fn.UI.popupWindow.open({
        'title'     : 'Bluenod Tour',
        'content'   : _html,
        //'height'    : parseInt( 0.8 * $(window).height(), 10 ),
        //'width'     : parseInt( 0.8 * $(window).width(), 10 ),
        'width'     : '965px',
        //'top'       : parseInt( 0.1 * $(window).height(), 10 ) + 'px',
        'top'       : '30px',
        'bg'        : 'background: rgba(0,0,0, 0.85);',
        'padding'   : '0'
    });
    
    var _carousel       = $('#popupWindow .carousel'),
        _focusBlocks    = _carousel.find('.focus-block');
    
    _carousel.carousel({ interval : false });
    
    _focusBlocks.each( function() {
        
        var _block  = $(this),
            _item   = _block.parents('.item'),
            _step   = _tour[ parseInt( _item.data('step'), 10 ) ];
            
        _block.css( _step.focus ); 
        
        _block.after(
            '<div class="focus-overlay top"></div>' +
            '<div class="focus-overlay left"></div>' +
            '<div class="focus-overlay right"></div>' +
            '<div class="focus-overlay bottom"></div>'
        );
            
        var _overlays   = _item.find('.focus-overlay'),
            _top        = parseFloat( _step.focus.top ), // conversion px => %
            _left       = parseFloat( _step.focus.left ),
            _height     = parseFloat( _step.focus.height ),
            _width      = parseFloat( _step.focus.width );
            
        _overlays.filter('.top').css( { 'top' : 0, 'height' : _top + '%', 'left' : 0, 'right' : 0 } );
        _overlays.filter('.left').css( { 'top' : _top + '%', 'height' : _height + '%', 'width' : _left + '%' } );
        _overlays.filter('.right').css( { 'top' : _top + '%', 'left' : ( _left+_width )  + '%', 'height' : _height + '%', 'right' : 0 } );
        _overlays.filter('.bottom').css( { 'top' : ( _top + _height ) + '%', 'left' : 0, 'bottom' : 0, 'right' : 0 } );
        
        _block.popover({
            title       : 'Step ' + (_item.data('step')+1) + ': ' + _step.title,
            content     : _step.content + 
                          '<div>' + 
                            ( _item.data('step') > 0 ? _prevButton : '' ) + 
                            ( _item.data('step') < _tour.length - 1 ? _nextButton : '' ) + 
                            ( _item.data('step') == _tour.length - 1 ? _closeButton : '' ) + 
                          '</div>',
            placement   : _step.placement,
            html        : true,
            trigger     : 'manual',
            delay: { 
                show: 1500, 
                hide: 100
            }
        });
        
    });
    
    setTimeout( function() {
        _focusBlocks.filter(':first').popover('show');
    }, 600 );
    
    
    _carousel.find('.popover .next, .popover .replay').live('click', function() {
        _carousel.carousel('next');
        return false;
    });
    _carousel.find('.popover .prev').live('click', function() {
        _carousel.carousel('prev');
        return false;
    });
    
    _carousel.on({
        'slide' : function() {
            _carousel.find('.item.active .focus-block').popover('hide');
        },
        'slid' : function() {
            setTimeout( function() {
                _carousel.find('.item.active .focus-block').popover('show');            
            }, 600 );
        }
    });
    
    
};


/**
 * Affichage de la notification sur le graphe
 */            
Blu.fn.UI.showGraphNotif = function( options ) {

    var _defaults = {
        'text'      : '',
        'html'      : '',
        'spinner'   : false,
        'cssClass'  : ''
    };

    options = $.extend( _defaults, options || {} );

    if( !options.text && !options.html ) {
        return;
    }

    Blu.fn.UI.removeGraphNotif();

    var _ZC     = $('#zonecentre'),
        _html   = '<div id="graph-notif" class="'+ options.cssClass + '">' + 
                    ( options.spinner ? '<span class="spin">&nbsp;</span>' : '' ) + 
                    ( options.html ? options.html : '<span class="text">' + options.text + '</span>' ) + 
                  '</div>';

    _ZC.append( _html );

    if( options.spinner ) {
        _ZC.find('#graph-notif .spin').spin('very-small');
    }
};


/**
 * Suppression de la notification sur le graphe
 */
Blu.fn.UI.removeGraphNotif = function() {
    
    $('#graph-notif').remove();
    
};


/**
 * Popup pour la connexion à Twitter
 */
Blu.fn.connect.twitter.infoPopup = function( action ) {
    
    Blu.fn.UI.popupWindow.open({
        'title'         : 'Twitter Connect',
        'content'       : '<p>' + 
                            'Hello! In order to enjoy the Bluenod experience, please connect your Twitter account.' + 
                          '</p>' + 
                          '<p class="align-center">' + 
                            '<a class="btn btn-primary twitter-connect" data-action="' + action + '" href="#twitter-connect">' + 
                                'Connect with Twitter' + 
                            '</a> ' + 
                            '<a class="btn btn-mini btn-link cancel" href="#" data-action="close">' +
                                'No thanks' + 
                            '</a>' +
                          '</p>',
        'width'         : 450,
        'closeButton'   : true,
        'closeOverlay'  : false
    });
    
};

/**
 * Popup pour l'inscription à la newsletter
 */
Blu.fn.UI.popupEnterYourMail = function( options ) {
    
    var _defaults = {
        after_oauth : false
    };
    options = $.extend( _defaults, options || {} );
    
    Blu.fn.UI.popupWindow.open({
        'title'     : options.after_oauth ? 'Congrats!' : 'Sign up',
        'content'   : ( options.after_oauth ? '<p class="">' + 'You\'re now connected as <strong>@'+ Blu.user.screen_name + '</strong>' + '</p>' : '' ) + 
                      '<p class="">' + 
                        'If you want to sign up to Bluenod, please enter your email.' + '<br/>' + 
                      '</p>' +
                      '<form class="create-user" action="' + Blu.app.urls.main + '/users/create" method="post" data-after-oauth="' + Number( options.after_oauth ) + '">' +
                        '<input type="hidden" name="signup[stfu]" value=""/>' +
                        '<input type="text" name="signup[mail]" class="size1" placeholder="' + 'Enter your mail' + '"/>' +
                        '<input type="submit" class="btn btn-primary" value="' + 'Sign up' + '"/>' +
                      '</form>' /*+
                      '<form class="request-invite" action="' + Blu.app.urls.main + '/invites/requests/create" method="post" data-after-oauth="' + Number( options.after_oauth ) + '">' +
                        '<input type="text" name="mail" class="size1" placeholder="' + 'Enter your mail' + '"/>' +
                        '<input type="submit" class="btn btn-primary" value="' + 'Request an invite' + '"/>' +
                      '</form>' /*+
                        '<a class="cancel" href="#" data-action="close">' +
                            'Skip' + 
                        '</a>'*/,
        'width'     : 400,
        'callback'  : options.after_oauth ? function() { window.location.reload( true ); } : function() {}
    });
    
};

/**
 * Demande d'invite
 */
$('form.request-invite').live({
    'submit' : function() {
        
        var _form = $(this);
        
        $.getJSON( _form.attr('action'), _form.serializeArray(), function( json ) {
                
            var _popup      = $('#popupWindow'),
                _popup_c    = _popup.find('.content');

            if( json.success ) {
                
                if( Boolean( _form.data('after-oauth') ) ) {
                    
                    Blu.fn.UI.popupWindow.open({ 
                        'title'     : 'Welcome to Bluenod!', 
                        'content'   : '<p class="align-center">' +
                                        '<a class="btn btn-primary" href="#" data-action="close">' +
                                            'Let\'s go' + 
                                        '</a>' +
                                      '</p>',
                        'callback'  : function() {
                            window.location.reload( true );
                        }
                    });
                    Blu.fn.connect.twitter.afterOAuthProcess();
                    
                } else {
                    
                    Blu.fn.UI.popupWindow.open({ 
                        'title'     : 'Thanks!', 
                        'content'   : '<p>' +
                                        'You\'re now on our waiting list. We will come back to you in a couple of days. Stay tuned!' +
                                      '</p>' +
                                      '<p class="align-center">' +
                                        '<a class="btn btn-primary" href="#" data-action="close">' +
                                            'Ok' + 
                                        '</a>' +
                                      '</p>'
                    });
                    
                }
                

            } else {

                _popup_c.find('p.message').remove();
                _popup_c.append( '<p class="message">' + json.message + '</p>' );

            }

        });
        
        return false;
    }
});



/**
 * Chargement de la timeline "Home"
 */
Blu.fn.project.loadHomeTimeline = function() {
    
    // Affichage du projet déjà créé
    if( Blu.projects.home_timeline.id ) {

        Blu.fn.project.select( Blu.projects.home_timeline );
        Blu.fn.project.loadCurrent();

    // Création d'un nouveau projet de type home-timeline
    } else {

        if( Blu.user.user_id ) {

            Blu.fn.project.create( {'type' : 'home-timeline', 'twitter_user_id' : Blu.user.user_id} );

        } else {

            Blu.fn.connect.twitter.infoPopup();

        }

    }

};

/**
 * Retourne les paramètres GET de l'URL
 * @return Object
 */
Blu.fn.url.extractGetParams = function() {

    if( window.location.search.length <= 1 ) {
        return {};
    }
    
    var _getParams  = {},
        _couples    = window.location.search.substr(1).split("&"),
        _keyValue;
    
    for( var i = 0; i < _couples.length; i++ ) {

        _keyValue = _couples[i].split("=");

        _getParams[ decodeURIComponent( _keyValue[0] ) ] = ( _keyValue.length > 1 ) ? decodeURIComponent( _keyValue[1] ) : "";
    }
    
    return _getParams;

};

/**
 * Retourne les paramètres de filtrage dans le fragment d'URL
 */
Blu.fn.url.getFilterParams = function() {

    // On peut avoir des paramètres de filtrage dans le fragment après "::"    
    // Ex : domaine.com/app/#carto::user=username&time=1324053246
    var _hash           = document.location.hash,
        _filter         = _hash.split('::'), 
        _filterParams   = {};
        
    //Blu.log(_hash);
    
    /* 
     * Paramètres dans le fragment après "::"
     * Ex : user=username&time=1324053246
     */
    if( typeof( _filter[1] ) !== 'undefined' ) {
        
        var _keyValues = _filter[1].split('&');
        
        for( var i in _keyValues ) {
            
            var _k_and_v    = _keyValues[i].split('='),
                _key        = ( typeof( _k_and_v[0] ) !== 'undefined' ) ? _k_and_v[0] : '',
                _value      = ( typeof( _k_and_v[1] ) !== 'undefined' ) ? _k_and_v[1] : '';
            
            if( _key != '' ) {
                _filterParams[ _key ] = _value;
            }
        }
    }
    
    Blu.log( _filterParams );
    
    return _filterParams;

};


/**
 * Analyse du fragment de l'URL pour déterminer le dataset et la visualisation
 */
Blu.fn.url.parseFragment = function() {
    
    // Gérer aussi /#/hashtag/carto::user=capsciences&time=100000
    
    
    

    // Si menu de datasets, sélection du dataset courant // à revoir
    if( $('#datasets li').length > 0 ) {
        
        $('#datasets li').each( function() {
            Blu.datasets.push( {'name' : $(this).data('set')} );
        });
        if( Blu.datasets.length > 0 && typeof( Blu.datasets[0].name ) !== 'undefined' ) {
            Blu.currentDataset = Blu.datasets[0].name;
        }
    }
    
    // Variables internes
    var _hash           = document.location.hash,
        _rawFragment    = _hash.match( /#\/?(\w+)\/?(\w+)?\/?/ ),
        _fragment       = [],
        _viz            = Blu.viz.by_default,
        _dataset        = Blu.currentDataset,
        _filterParams   = Blu.fn.url.getFilterParams(),
        _first, 
        _second, 
        _subset         = '';

    /*
     * Analyse du fragment s'il existe
     */
/*    if( _rawFragment !== null ) {
        
        // Fragment filtré
        for( var i=1 ; i < _rawFragment.length ; i++ ) {
            if( typeof( _rawFragment[i] ) !== 'undefined' )
                _fragment[ _fragment.length ] = _rawFragment[i];
        }
        
        // Premier terme
        _first = _fragment[0];
        
        // 2 termes et plus
        if( _fragment.length >= 2 ) {
            
            _second = _fragment[ _fragment.length - 1 ]; // @todo : à revoir. A priori, on n'a pas utilisé plus de 2 termes dans notre historique de dataviz donc on pourrait juste prendre le 2e terme…
            
            // Premier terme >> dataset
            _dataset = _first;
            
            // Deuxième terme >> subset ou le choix de la viz (carto ou chrono) pour les anciennes dataviz
            if( _second === "carto" || _second === "chrono" ) {
                _viz     = _second;
            } else {
                _subset  = _second;
            }
            
        }
        // 1 seul terme
        else {
            if( _first === "carto" || _first === "chrono" ) {
                _viz        = _first;
            } else {
                _dataset    = _first;
            }
        }
    }
    
    //Blu.log( _fragment ); Blu.log( _dataset ); Blu.log( _viz );*/
    
    Blu.viz.current     = _viz;
    Blu.currentDataset  = _dataset;
    Blu.currentSubset   = _subset;
    
    // Sélection de l'onglet du dataset courant
    var _datasets = $('#datasets');
    
    if( _datasets.find( 'li' ).length > 0 ) {
        _datasets.find( 'li[data-set="' + _dataset + '"]' ).addClass('active');
        _datasets.find( 'li' ).hide();
        _datasets.find( 'li.' + _dataset ).show();
    }

};

/**
 * (Ré)initialisation de l'utilisateur courant
 */
Blu.fn.user.getDefaultUser = function() {
    return {
        id                  : 0,
        screen_name         : '',
        user_id             : '',
        created_at          : new Date(),
        isFromTeam          : false,
        following : {
            list            : [],
            isLoaded        : false
        },
        can                 : {}
    };
};

/**
 * Initialisation de la configuration
 */
Blu.fn.initConfig = function() {
    
    // Urls
    Blu.app.urls.ajax_base      = Blu.app.urls.main + '/ajax/';
    Blu.app.urls.graphs_base    = Blu.app.urls.main + '/static/graphs/';
    
    // Proxy Ajax
    Blu.config.bluenodProxy     = ( Blu.user.screen_name.length > 0 );
    
    // Timezone
    Blu.config.timezoneOffset   = (new Date()).getTimezoneOffset();
    
    // Users
    Blu.images.default_user     = Blu.app.urls.main + Blu.images.default_user;
    
    // Map
    Blu.map.defaults.zoomLevel  = Blu.map.params.zoomLevel;
    Blu.map.defaults.centreX    = Blu.map.params.centreX;
    Blu.map.defaults.centreY    = Blu.map.params.centreY;
    
    Blu.app.getParams = Blu.fn.url.extractGetParams();
    
    if( Blu.app.getParams.timeNavGlobal || Blu.app.getParams.global ) {
        Blu.config.timeNavGlobal = true;
    }

};

/**
 * Initialisation générale de l'interface (canvas, position #zonecentre, granularité)
 */
Blu.fn.initInterface = function() {

    Blu.fn.UI.createGraphHeader();
    Blu.fn.UI.createGraphBottom();
    
    // Canvas utilisés par l'appli
    Blu.canvas.ctx              = $('#canvas').get(0).getContext('2d');
    Blu.canvas_mini.ctx         = $('#miniature').get(0).getContext('2d');
    Blu.canvas_timemachine.ctx  = $('#mini-timeline').get(0).getContext('2d');
    
    /*
     * Ajuste la position de #zonecentre
     */
    var _barre          = $('#barre'),
        _panelsWrap     = $('#panels-wrapper'),
        //_panels         = $('.panel.home, .panel.user'),
        _ZC             = $('#zonecentre'),
        _graphHeader    = $('#graph-header'),
        _graphBottom    = $('#graph-bottom');
        
    _graphHeader.css( 'top', _barre.outerHeight() );
    _panelsWrap.css( 'top', _barre.outerHeight() );
    
    var _posZC = {
        'left'      : parseInt( _panelsWrap.outerWidth(), 10 ),
        'top'       : _barre.outerHeight() + _graphHeader.outerHeight() - 1,
        'bottom'    : _graphBottom.outerHeight() || 0
    };
        
        
    // Carte seule
    if( Blu.config.mapOnly ) {
        //_panelHome.removeClass('showed').hide();
        //_panels.css('top', '0');
        _panelsWrap.hide();
        _barre.hide();
    }
    
    _ZC.css( _posZC );
    
    Blu.fn.UI.showPanel();
    
    /*
     *  Chargement dynamique des tweets quand on scrolle
     */
    $('.panel.tweets').onScrollEnd( Blu.fn.tweets.showPartialList );
    
    // Scrollbar
    $('.panel').niceScroll( Blu.config.style.scrollbar );
    
    
    // Granularité de la timeline
    var _lien_granul = $('#ulgranul li.actif a');
    if( _lien_granul.length ) {
        Blu.timeline.params.granularite = parseInt( _lien_granul.attr('id').replace( 'granul_', '' ), 10 );
    }
    
    // Sauvegarde du titre de la page
    //Blu.app.titlePage = document.title;
    
    
    // Menu principal
    Blu.fn.UI.mainMenu();
    
    // Menu du compte
    Blu.fn.UI.menuAccount();
    
    // Notifications pré-load
    Blu.fn.UI.preloadNotifications();
    
    //
    
};

/**
 * Chargement des notifications de pré-chargement
 */
Blu.fn.UI.preloadNotifications = function() {
    
    if( !Blu.notifications || Blu.notifications.length < 1 ) {
        return;
    }
    
    for( var i in Blu.notifications ) {
        
        var _notif = Blu.notifications[i];
        
        _notif.delayOut = 8;
        
        Blu.fn.UI.notification( _notif );
    }
    
};

/**
 * Détection du support du canvas HTML5 (même code que Modernizr)
 */
Blu.fn.misc.isCanvasSupported = function() {
    var elem = document.createElement('canvas'); 
    return !!(elem.getContext && elem.getContext('2d'));
};

/**
 * Détection si la largeur de la page web est trop petite pour afficher la sidebar et la carte en même temps
 */
Blu.fn.misc.isPageWidthTooSmall = function() {
    return ( $('body').width() < 1010 );
};

/**
 * Configuration de Mixpanel : activation / désactivation suivant les cas
 */
Blu.fn.misc.configMixpanel = function() {
    
    var _trackInMixpanel = Blu.user.id && !Blu.user.isFromTeam && !Blu.fn.localhost();
    
    if( !_trackInMixpanel ) {
        Blu.fn.misc.disableMixpanel();
        return;
    }
    
    mixpanel.identify( Blu.user.id );

    mixpanel.people.identify( Blu.user.id );

    mixpanel.name_tag( Blu.user.screen_name );

    mixpanel.people.set({
        $name           : Blu.user.screen_name,
        $username       : Blu.user.screen_name,
        //$email          : Blu.user.email,
        $created        : Blu.user.created_at,
        $last_login     : new Date(),
        'Profile URL'   : 'http://twitter.com/' + Blu.user.screen_name
    });
    
    Blu.warn( 'Mixpanel : config OK');
    
};

/**
 * Désactivation de Mixpanel (liste de fonctions à mettre à jour si d'autres méthodes sont appelées)
 */
Blu.fn.misc.disableMixpanel = function() {
    mixpanel.disable();
    mixpanel.set_config({ 'track_pageview' : false });    
    Blu.warn('Mixpanel : disabled');
};

/**
 * Initialisation générale de l'appli
 */
Blu.init = function() {
    
    Blu.log( 'Initializing App... @ ' + Blu.fn.misc.timeNow() );
    
    Blu.fn.misc.configMixpanel();
    
    mixpanel.track( Blu.config.clientMode ? 'Page Client Loaded' : 'Page Mapping Loaded' );
    
    // Vérifie la compatibilité du navigateur
    if( !Blu.fn.misc.isCanvasSupported() ) {
        Blu.fn.UI.popupWindow.open({
            'title'         : 'Please Upgrade Your Browser',
            'content'       : Blu.txt('error_oldBrowser'), 
            'width'         : 600,
            'closeButton'   : false,
            'closeOverlay'  : false
        });
        mixpanel.track( "Error: Canvas Not Supported", { 'User Agent' : navigator.userAgent } );
        return;
    } else if( Blu.fn.misc.isPageWidthTooSmall() ) {
        Blu.fn.UI.popupWindow.open({
            'title'         : 'Device Not Supported',
            'content'       : '<p>Sorry, the Bluenod experience is not optimized for small screens and mobile devices... yet!</p>' + 
                              '<p>If you want to explore Bluenod, please use a device with a bigger screen.</p>' + 
                              '<p class="align-center"><a class="btn btn-primary" href="' + Blu.app.urls.main + '/about">Discover what is Bluenod</a></p>', 
            'closeButton'   : false,
            'closeOverlay'  : false
        });
        mixpanel.track( "Error: Device Not Supported (Small Screen)", { 'User Agent' : navigator.userAgent } ); 
        return;
    }
    
    // Initialisation de la configuration
    Blu.fn.initConfig();
    
    // Analyse de l'URL pour déterminer la vue et le dataset
    Blu.fn.url.parseFragment();
    
    // Initialisation générale de l'interface
    Blu.fn.initInterface();
    
    // Mise à jour de la taille de la zone de travail
    Blu.fn.UI.updateSize();
    
    
    /*
     * Chargement du projet courant
     */
    Blu.fn.project.resetCurrent();
    Blu.fn.project.loadCurrent();
    
    
    // Evénements
    Blu.fn.UI.bindEvents();  
    
    // Partage sur les médias sociaux
    Blu.fn.socialShare();    
    
    // Mise à jour automatique des "jolies dates" des tweets
    Blu.fn.tweets.updateTweetDates();

    Blu.fn.test();

}; // Fin initialisation de l'appli


Blu.fn.test = function() {


};


/**
 * Réinitialisation du projet courant
 */
Blu.fn.project.resetCurrent = function() {
    
    Blu.info( 'Blu.fn.project.resetCurrent()' );
    
    Blu.has = {
        loadedTweets        : false,
        loadedTimestamps    : false,
        loadedGraph         : false,
        loadedAllGraphs     : false
    };
    
    Blu.needs = {
        timestamps          : true,
        graph               : true,
        lastGraph           : true,
        allGraphs           : true,
        newGraph            : false
    };

    if( !Blu.projects.current || !Blu.projects.current.id ) {
        Blu.warn('Pas de projet courant.');
        return;
    }
    
    Blu.fn.users.resetPanels();
    
    // Tweets / timestamps / tranches
    Blu.tweets.length               = 0;
    Blu.newTweets.length            = 0;
    Blu.counts.tweets.alltime       = 0;
    Blu.timestamps.length           = 0;
    Blu.tranches.length             = 0;
    Blu.timeline.params.granularite = 'auto';
    Blu.intervals.length            = 0;
    
    // Timeline
    var _canvasMini = Blu.canvas_timemachine.ctx;
    _canvasMini.clearRect( 0, 0, Blu.timeline.mini.width, Blu.timeline.mini.height );
    Blu.canvas_mini.timeline.image = '';
    Blu.fn.timeline.traceTimeline();
    
    // Dates de filtrage de tweets
    var _date_min = Blu.fn.misc.dateStringToObject( Blu.projects.current.dates.min ),
        _date_max = Blu.fn.misc.dateStringToObject( Blu.projects.current.dates.max );

    Blu.timeline.params.filter.dates = {
        'min' : _date_min,
        'max' : _date_max
    };
    
    // Dates globales du projet
    if( !Blu.projects.current.datesTotal ) {
        Blu.projects.current.datesTotal = {
            'min' : Blu.projects.current.dates.min,
            'max' : Blu.projects.current.dates.max
        };
    }
    
    
    // Map
    Blu.carto                       = null;
    Blu.map.isIdentical             = false;
    Blu.map.params.hoverNode        = -1;
    Blu.map.params.selectedNode     = -1;
    Blu.fn.map.resetZoom();
    Blu.graphs.all.length           = 0;
    
    
    // Affichage / UI
    Blu.fn.map.traceMap( true );
    Blu.fn.tweets.search('');
    Blu.fn.UI.mapNotification('');
    Blu.fn.UI.miniStats();
    Blu.fn.UI.removeCanvasScreen();
    
    Blu.fn.UI.removeGraphNotif();
    
    $('#graph-header').find('.count-tweets-alltime .count').text( '' );
    $('#graph-bottom').find('.count-nodes .total .count').text( '' );
    
    //document.title = Blu.app.titlePage;
    
    //$('.new-search').val('');
    
    /*
     * Timers
     */
    if( Blu.timers.waitAndLoadNewData ) {
        clearInterval( Blu.timers.waitAndLoadNewData );
        Blu.timers.waitAndLoadNewData = 0;
    }
    if( Blu.timers.calcTopUsers ) {
        clearInterval( Blu.timers.calcTopUsers );
        Blu.timers.calcTopUsers = 0;
    }
    
};
    
/**
 * Chargement du projet courant
 * @param {Object} options
 */
Blu.fn.project.loadCurrent = function( options ) {
    
    options = options || {};
    
    Blu.info( 'Blu.fn.project.loadCurrent()' );

    /*
     * S'il n'y a aucun projet à charger (car nouvel utilisateur ou zéro projets)
     */ 
    if( /*!Blu.fn.project.selectLast() &&*/ !Blu.projects.current.id ) {
        
        //Blu.warn('This user has no projects.');
                
        // Url de type /user/screen_name => création de la recherche (si des doublons existent, ils sont supprimés en amont côté serveur)
        if( window.location.pathname.search(/\/user\/[\w]+/) !== -1 ) {
            Blu.fn.project.create({
                'type' : 'search-user', 
                'twitter_screen_name' : window.location.pathname.replace('/user/', '') 
            });
            return;
        }
        
        if( !Blu.config.clientMode ) {
            return;
        }
        
        /*
         * Chargement par défaut en mode client
         */

        //Blu.fn.project.loadHomeTimeline();
        
        if( Blu.config.welcomeScreen ) {
            Blu.fn.UI.showWelcomeScreen();
        }
        
        // Création d'un projet
        /*if( Blu.user.user_id ) {
            Blu.fn.project.create( { 'type' : 'search-user', 'twitter_screen_name' : Blu.user.screen_name }, { 'reload' : true } );
        } else {
            Blu.fn.connect.twitter.infoPopup();
        }*/
        
        Blu.fn.UI.showGallery();
        
        return;
    }
    
    Blu.fn.project.configUI( Blu.projects.current );
    
    // Popup Twitter Connect pour mapping public vu par un visiteur
    if( Blu.config.users.connectVisitor && !Blu.user.user_id ) {
        Blu.fn.connect.twitter.infoPopup('connect-visitor');
    }
    
    // Reset du projet courant
    //Blu.fn.project.resetCurrent(); // fait en dehors de loadCurrent
    
    if( Blu.projects.current.isNew ) {
        Blu.needs.newGraph = true;
    }
    
    if( Blu.config.timeNavGlobal ) {
        Blu.timeNav.mode = 'archive';
    }
    
    // Navigation temporelle
    if( Blu.config.timeNavigation ) {
        Blu.fn.timeNav.createHtml();
    }
    
    /*
     * Map
     */
    Blu.fn.map.init();
    
    /*
     * Tweets + Time Machine
     */
    
    // Chargement et affichage des derniers tweets (ou de tous les tweets suivant la config)
    Blu.fn.tweets.load( {'show' : true} );

    // Chargement différé des timestamps
    Blu.fn.timestamps.load();
    
    // Chargement différé de la Time Machine
    Blu.fn.timemachine.load();
    
    // Top users
    //Blu.fn.users.calcAndShowTopUsers();
    
    // Récupération de nouvelles données du projet
    //if( !Blu.projects.current.isNew ) {
        Blu.fn.project.waitAndLoadNewData();
    //}
    
    // Lancement de la récupération des nouveaux et anciens tweets (timer)
    Blu.fn.tweets.timerNewTweets();
    Blu.fn.tweets.timerNewTweets_API();
    Blu.fn.tweets.timerOldTweets();


    if( Blu.config.map.showFollowing ) {
        Blu.fn.user.activateFollowingMode();
    }


    /*
     * Divers
     */

    // Listes des top words et users déjà compilées
    //Blu.fn.topWordsUsers();
    

}; // Fin de Blu.fn.project.loadCurrent()


/**
 * Chargement automatique des nouveaux tweets et du nouveau graphe en arrière-plan
 */
Blu.fn.project.waitAndLoadNewData = function() {
    
    if( !Blu.config.clientMode ) {
        return;
    }
    
    //Blu.info('Blu.fn.project.waitAndLoadNewData()');
    
    Blu.timers.waitAndLoadNewData = setInterval( function() {
        
        //Blu.log('in Blu.timers.waitAndLoadNewData...');

        // On attend que les tweets soient chargés
        if( !Blu.has.loadedTweets /*Blu.timestamps.length < 1 || Blu.tweets.length < 1 || Blu.graphs.all.length < 1*/ /*|| 
            Blu.config.timemachine.activated && Blu.timemachine.initialized*/ ) {
            return;
        }
        
        // OK. Suppression du timer
        clearInterval( Blu.timers.waitAndLoadNewData );
        Blu.timers.waitAndLoadNewData = 0;
        
        Blu.info('Projet chargé. On va charger de nouvelles données en arrière-plan.');
        
        /*
         * Chargement d'un nouveau graphe
         */
        if( Blu.needs.newGraph ) {
            
            var _options = {
                'since_id'          : Blu.fn.tweets.getLastTweetId(),
                'create_graph'      : true, 
                'backgroundTask'    : ( !Blu.projects.current.isNew ), 
                'showNotifications' : false,
                'reload'            : true
            };

            // UI
            if( _options.backgroundTask ) {
                Blu.fn.UI.showGraphNotif({ 'text' : 'Loading new graph...', 'spinner' : true });
            } else {
                Blu.fn.UI.showCanvasScreen();
            }

            /*
             * Récupération des tweets puis calcul du graphe
             */
            Blu.fn.project.grabNewTweets( _options );
            
        }

    }, 100 );
};

/**
 * Retourne l'URL d'un avatar d'utilisateur dans une autre taille
 * @param {String} screen_name
 * @param {String} size 'mini' (24x24), 'normal' (48x48), 'bigger' (73x73), 'reasonably_small' (128x128)
 */
Blu.fn.user.getAvatarUrl = function( screen_name, size ) {
    
    var _user       = Blu.fn.user.get( screen_name ),
        _avatar48px = _user.data.profile_image_url;
    
    if( !_avatar48px ) {
        _avatar48px = Blu.images.default_user;
    }
    
    if( _avatar48px === Blu.images.default_user ) {
        return _avatar48px;
    } else {
        return _avatar48px.replace( '_normal.', '_'+size+'.' );
    }
    /*
     * Cas particuliers : 
     * - répétition de "_normal" : 
     *      @ChrisLove      : http://a0.twimg.com/profile_images/492735348/Chris_Love_Close_Up_normal_normal.jpg
     * - pas d'extension de fichier :
     *      @dagautier      : http://a0.twimg.com/profile_images/2572474386/temp1346671937strip20120903-20220-1ytcs5_normal
     *      @PHT75          : https://si0.twimg.com/profile_images/1366930896/Avatar_normal
     */ 
};

/**
 * Génère une liste d'utilisateurs
 */
Blu.fn.users.listUsers = function( options ) {
    
    Blu.log('Blu.fn.users.listUsers');
    
    var _ul = '', _li, _user;

    for( var i in options.tab ) {
    
        _user = options.tab[i];

        _li =   '<li class="rank-user ' + _user.user + '">' +
                    '<a class="profile-pic" href="http://twitter.com/' + _user.user + '" data-user="'+_user.user+'" target="_blank" title="' + Blu.txt('showProfile') + '">' + 
                        '<img class="avatar" src="' + Blu.fn.user.getAvatarUrl( _user.user, 'bigger' ) + '" data-user="' + _user.user + '" />' + 
                    '</a>' +
                '</li>';

        _ul += _li;
    }

    if( !options.tab.length ){
        _ul = '<li class="rank-user no-data"><!--' + Blu.txt('noData') + '--></li>';
    }

    return '<ul class="user-list">' + _ul + '</ul>';
};

/**
 * Génère un tableau d'utilisateurs
 */
Blu.fn.users.tableUsers = function( options ) {
    
    Blu.log('Blu.fn.users.tableUsers');
    
    var _len    = options.tab.length,
        _userRanked = options.userRanked || '',
        _numberTitle = options.numberTitle || '',
        _class = options.theClass,
        _table     = '',
        _tr     = '',
        _trTotal = '';
    
    for( var i=0 ; i < _len ; i++ ) {
    
        var _user = options.tab[i];
        
        // Mentions
        var _user_link = _user.user.replace( /(^|\s)(@)([\w_àáâãäåçèéêëìíîïðòóôõöùúûüýÿ]+)/g, 
                                     '$1<a class="mention" href="http://twitter.com/$3" data-user="$3" target="_blank"><span>$2</span>$3</a>' );

        _tr = '<tr>'+
                '<td class="rank">' + ( i + 1 ) + '</td>' +
                '<td class="img"><img src="' + Blu.fn.user.get(_user.user).data.profile_image_url + '"/></td>' +
                '<td class="username">' + _user_link + '</td>' +
                '<td class="number" title="'+_user.user+' le mentionne '+_user.searchMentioned+' fois & est mentionné '+_user.searchMentioning+' fois par lui">' + _user.count + '</td>' +
              '</tr>';

        _trTotal += _tr;
    }
    _table = '<table class="'+_class+ '">' +
                '<thead>' +
                    '<tr>' +
                        '<th class="rank">Rang</th>'+
                        '<th class="img"></th>'+
                        '<th class="username">'+_userRanked+'</th>'+
                        '<th class="number">'+_numberTitle+'</th>'+
                    '<tr>' +
                '</thead>' +
                '<tbody>' + _trTotal + '</tbody>' +
             '</table>';
    
    return _table;
    
}; // Fin de Blu.fn.users.tableUsers()


/**
 * Affichage des boutons de partage sur les médias sociaux
 */
Blu.fn.socialShare = function() {
    
    if( Blu.config.mapOnly || Blu.config.clientMode ) {
        return;
    }
    
    // Partage sur les médias sociaux
    var _share = $('#share');
    
    _share.hide().html( Blu.share.html );
    _share.show();

};


if( typeof CanvasRenderingContext2D !== 'undefined' ) {
    
    /**
     * Tracé de ligne en pointillés sur un canvas
     * @link http://davidowens.wordpress.com/2010/09/07/html-5-canvas-and-dashed-lines/
     */
    CanvasRenderingContext2D.prototype.dashedLineTo = function (fromX, fromY, toX, toY, pattern) {
        // Our growth rate for our line can be one of the following:
        //   (+,+), (+,-), (-,+), (-,-)
        // Because of this, our algorithm needs to understand if the x-coord and
        // y-coord should be getting smaller or larger and properly cap the values
        // based on (x,y).
        var lt = function (a, b ) {
            return a <= b;
        };
        var gt = function (a, b ) {
            return a >= b;
        };
        var capmin = function (a, b ) {
            return Math.min(a, b );
        };
        var capmax = function (a, b ) {
            return Math.max(a, b );
        };

        var checkX = {
            thereYet: gt, 
            cap: capmin
        };
        var checkY = {
            thereYet: gt, 
            cap: capmin
        };

        if (fromY - toY > 0) {
            checkY.thereYet = lt;
            checkY.cap = capmax;
        }
        if (fromX - toX > 0) {
            checkX.thereYet = lt;
            checkX.cap = capmax;
        }

        this.moveTo(fromX, fromY);
        var offsetX = fromX;
        var offsetY = fromY;
        var idx = 0, dash = true;
        while (!(checkX.thereYet(offsetX, toX) && checkY.thereYet(offsetY, toY))) {
            var ang = Math.atan2(toY - fromY, toX - fromX);
            var len = pattern[idx];

            offsetX = checkX.cap(toX, offsetX + (Math.cos(ang) * len));
            offsetY = checkY.cap(toY, offsetY + (Math.sin(ang) * len));

            if (dash) this.lineTo(offsetX, offsetY);
            else this.moveTo(offsetX, offsetY);

            idx = (idx + 1) % pattern.length;
            dash = !dash;
        }
    };

}

/**
 * Teste si l'URL est l'URL courante de l'appli (sur labs.knowtex.com ou en embed sur un site externe)
 * @return bool
 */
Blu.fn.app.isAppUrl = function( url ) {
    
    var location_short = location.protocol + "//" + location.host + "/" + location.pathname; // URL courante sans fragment et paramètres GET

    location_short  = location_short.replace(/\/$/, ''); // on enlève l'éventuel slash final
    url             = url.replace(/(\/?(#(.*))?)$/, ''); // on enlève l'éventuel #hash + slash final

    if( url == Blu.app.urls.main || url == location.href || url == location_short )
        return true;
    
    var altUrl;
    
    for( var i in Blu.app.urls.alt ) {
        
        altUrl = Blu.app.urls.alt[i].replace(/\/$/, '');
        
        if( url == altUrl )
            return true;
        
    }

    return false;
};

/**
 * Teste si l'URL appartient à un domaine qui bloque les iframes (parmi une liste de quelques sites identifiés)
 */
Blu.fn.app.blockingIframeWebsites = function( url ) {

    var domain              = Blu.fn.misc.domainFromUrl( url ),
        blockingDomains     = [
                                'youtube.com',
                                'facebook.com',
                                'vimeo.com',
                                'flickr.com',
                                'livestream.com',
                                'lefigaro.fr',
                                'scribd.com',
                                'over-blog.com',
                                'knol.google.com',
                                'metacafe.com',
                                'stackoverflow.com', 
                                'nytimes.com',
                                'boston.com',
                                'eurekalert.org',
                                'palais-decouverte.fr',
                                'leparisien.fr',
                                'megavideo.com',
                                'revoirlatele.com',
                                'rnews.be',
                                'unblog.fr'
                            ];
                            
    for( var i in blockingDomains )
    {
        if( domain == blockingDomains[i] )
            return true;
    }
    return false;
};


/**
 * Teste si l'on est en local
 */
Blu.fn.localhost = function() {
    var domain = location.host;
    return ( domain.search(/localhost/) != -1 );
};

/**
 * Log dans la console
 * @nosideeffects
 */
Blu.log = function( log ) {
    if( ( Blu.fn.localhost() || Blu.debugMode )
        && typeof console != "undefined" ) {
        
        console.log( log );
    }
};

/**
 * Log dans la console
 * @nosideeffects
 */
Blu.dir = function( log ) {
    if( ( Blu.fn.localhost() || Blu.debugMode )
        && typeof( window.console ) !== 'undefined' && typeof( window.console.dir ) !== 'undefined' ) {
        
        console.dir( log );    
    } 
};

/**
 * Log dans la console (avertissement)
 * @nosideeffects
 */
Blu.warn = function( log ) {
    if( ( Blu.fn.localhost() || Blu.debugMode ) 
        && typeof( window.console ) !== 'undefined' && typeof( window.console.warn ) !== 'undefined' ) {
        
        console.warn( log );
    }
};

/**
 * Log dans la console (info)
 * @nosideeffects
 */
Blu.info = function( log ) {
    if( ( Blu.fn.localhost() || Blu.debugMode ) 
        && typeof( window.console ) !== 'undefined' && typeof( window.console.info ) !== 'undefined' ) {
        
        console.info( log );
    }
};


/**
 * Chaînes de caractères de l'interface
 */
Blu.localizedStrings = {
    date_format : {'fr' : '{0} {1}',               'en' : '{1} {0}'}, // jour mois
    date_yymmdd : {'fr' : '{0}/{1}/{2}',           'en' : '{1}/{0}/{2}'},
    date_text   : {'fr' : '{3} {0} {1} {2}',       'en' : '{3}, {1} {0}, {2}'}, // Vendredi 15 juin 2012 // Friday, June 15, 2012
    date_hhmm   : {'fr' : '{0}/{1}/{2}  {3}:{4}',  'en' : '{1}/{0}/{2}  {3}:{4}'},
    date_hhmm2  : {'fr' : '{0} {1} {2}  {3}:{4}',  'en' : '{1} {0} {2}  {3}:{4}'},
    months : { 
        'fr' : [ 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre' ], 
        'en' : [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
    },
    days : { 
        'fr' : [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ], 
        'en' : [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
    },
    months_abbrev : { 
        'fr' : [ 'jan', 'fev', 'mars', 'avr', 'mai', 'juin', 'juil', 'aout', 'sept', 'oct', 'nov', 'dec' ], 
        'en' : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
    },
    /*
     * Chaînes "il y a X minutes", etc.
     */
    'just_now'        : {fr : 'à l\'instant',                en : 'just now'},
    'x_seconds_ago'   : {fr : 'il y a {0} secondes',         en : '{0} seconds ago'},
    '1_minute_ago'    : {fr : 'il y a 1 minute',             en : '1 minute ago'},
    'x_minutes_ago'   : {fr : 'il y a {0} minutes',          en : '{0} minutes ago'},
    '1_hour_ago'      : {fr : 'il y a 1 heure',              en : '1 hour ago'},
    'x_hours_ago'     : {fr : 'il y a {0} heures',           en : '{0} hours ago'},
    'yesterday'       : {fr : 'Hier',                        en : 'Yesterday'},
    'x_days_ago'      : {fr : "il y a {0} jours",            en : '{0} days ago'},
    'day_with_hour'   : {fr : '{0} {1}, à {2}:{3}',          en : '{0} {1}, at {2}:{3}'},
    '1_week_ago'      : {fr : 'il y a 1 semaine',            en : '1 week ago'},
    'x_weeks_ago'     : {fr : 'il y a {0} semaines',         en : '{0} weeks ago'},
    
    error_oldBrowser : { 
        'fr' : '<p><strong>Mauvaise nouvelle</strong>: votre navigateur est obsolète et ne peut afficher correctement les cartes Bluenod...</p>\n\
                <p><strong>Bonne nouvelle</strong>: mettre à jour votre navigateur est simple et ne prend que quelques minutes ! Choisissez un navigateur à télécharger depuis le site officiel : \n\
                </p>\n\
                <p class="align-center">\n\
                    <a class="btn btn-primary" href="http://www.mozilla.com/" target="_blank">Firefox</a> \n\
                    <a class="btn btn-primary" href="http://www.google.com/chrome/" target="_blank">Chrome</a> \n\
                    <a class="btn btn-primary" href="http://www.apple.com/safari/" target="_blank">Safari</a> \n\
                    <a class="btn btn-primary" href="http://windows.microsoft.com/fr-FR/internet-explorer/products/ie/home" target="_blank">Internet Explorer</a>\n\
                </p>',
        'en' : '<p><strong>Bad news</strong>: the browser you are using is out of date and cannot display our maps correctly...</p>\n\
                <p><strong>Good news</strong>: updating your browser is easy and just takes a few minutes! Just choose a browser to download from the official website: \n\
                </p>\n\
                <p class="align-center">\n\
                    <a class="btn btn-primary" href="http://www.mozilla.com/" target="_blank">Firefox</a> \n\
                    <a class="btn btn-primary" href="http://www.google.com/chrome/" target="_blank">Chrome</a> \n\
                    <a class="btn btn-primary" href="http://www.apple.com/safari/" target="_blank">Safari</a> \n\
                    <a class="btn btn-primary" href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home" target="_blank">Internet Explorer</a>\n\
                </p>'
    },
    loading : { 
        'fr' : 'Chargement...', 
        'en' : 'Loading...' 
    },
    home : { 
        'fr' : 'Accueil', 
        'en' : 'Home' 
    },
    search : { 
        'fr' : 'Recherche', 
        'en' : 'Search' 
    },
    showEdges : { 
        'fr' : 'Afficher les connexions', 
        'en' : 'Show connections' 
    },
    hideEdges : { 
        'fr' : 'Cacher les connexions', 
        'en' : 'Hide connections' 
    },
    tweetsWithX : { 
        'fr' : '{0} tweets avec {1}', 
        'en' : '{0} tweets with {1}' 
    },
    tweetWithX : { 
        'fr' : '{0} tweet avec {1}', 
        'en' : '{0} tweet with {1}' 
    },
    legendTotal : { 
        'fr' : '{0} tweets', 
        'en' : '{0} tweets' 
    },
    legendSlice : { 
        'fr' : '{0} ({1} - {2}) : {3} tweets', 
        'en' : '{0} ({1} - {2}) : {3} tweets' 
    },
    legendSliceOneDay : { 
        'fr' : '{0} : {1} tweets', 
        'en' : '{0} : {1} tweets' 
    },
    legendSliceAxis : { 
        'fr' : '{0} ({1} - {2})', 
        'en' : '{0} ({1} - {2})' 
    },
    legendSliceAxisOneDay : { 
        'fr' : '{0}', 
        'en' : '{0}' 
    },
    legendUser : { 
        'fr' : '{0} <br/> {1} tweet(s) <br/> {2} mention(s)', 
        'en' : '{0} <br/> {1} tweet(s) <br/> {2} mention(s)' 
    },
    showProfile : { 
        'fr' : 'Afficher le profil', 
        'en' : 'Show profile' 
    },
    followButton : { 
        'fr' : 'Suivre', 
        'en' : 'Follow' 
    },
    following : { 
        'fr' : 'Abonné', 
        'en' : 'Following' 
    },
    unfollowButton : { 
        'fr' : 'Ne plus suivre', 
        'en' : 'Unfollow' 
    },
    lookTwitterStatus : { 
        'fr' : 'Voir le statut sur Twitter', 
        'en' : 'Look status on Twitter' 
    },
    errorTwitterProfile : { 
        'fr' : 'Impossible de récupérer les informations (compte supprimé ou problème de l\'API Twitter).', 
        'en' : 'Sorry, we couldn\'t get data from this Twitter account. \n\
                It could be a temporary problem from the Twitter API or maybe this account has been deleted.'
    },
    titleEmbedImage : { 
        'fr' : 'Ouvrir le lien', 
        'en' : 'Open link' 
    },
    AC_words : {'fr' : 'Hashtags', 'en' : 'Hashtags'},
    AC_people : {'fr' : 'Personnes', 'en' : 'People'},
    timeMachine : { 
        'fr' : 'Machine à remonter le temps', 
        'en' : 'Time Machine' 
    },
    timeMachineTip : { 
        'fr' : '‹ Remonter dans le temps', 
        'en' : '‹ Go back in time' 
    },
    timeMachineTipHover : { 
        'fr' : 'Cliquez pour remonter le temps', 
        'en' : 'Click for a time travel' 
    },
    timeMachineTipPresent : { 
        /*'fr' : 'Revenir au present ›', // pb d'accent avec la police Digital7Mono
        'en' : 'Back to the present ›'*/
        'fr' : 'Reinitialisation ›', // pb d'accent avec la police Digital7Mono
        'en' : 'Reset ›' 
    },
    timeMachineTraveling : { 
        'fr' : 'Chargement des tweets…', 
        'en' : 'Loading tweets…'
        /*'fr' : 'Convecteur temporel activé…', 
        'en' : 'Flux capacitor activated…'*/
    },
    notifNewTweets : { 
        'fr' : '{0} nouveaux tweets', 
        'en' : '{0} new tweets'
    },
    notifNewTweet : { 
        'fr' : '1 nouveau tweet', 
        'en' : '1 new tweet'
    },
    twActions_favorite : {
        'fr' : 'Favori', 
        'en' : 'Favorite'
    },
    twActions_retweet : {
        'fr' : 'Retweeter', 
        'en' : 'Retweet'
    },
    twActions_reply : {
        'fr' : 'Répondre', 
        'en' : 'Reply'
    },
    stats_tweets : {
        'fr' : 'Tweets',
        'en' : 'Tweets'
    },
    stats_following : {
        'fr' : 'Abonnements',
        'en' : 'Following'
    },
    stats_followers : {
        'fr' : 'Abonnés',
        'en' : 'Followers'
    },
    stats_listed : {
        'fr' : 'Listé',
        'en' : 'Listed'
    },
    showTwitterProfile : {
        'fr' : 'Afficher le profil Twitter',
        'en' : 'Show Twitter profile'
    },
    togglePanel : {
        'fr' : 'Afficher / cacher le panneau',
        'en' : 'Show / hide the panel'
    },
    noData : {
        'fr' : 'Pas de données disponibles',
        'en' : 'No data available'
    },
    close : {
        'fr' : 'Fermer',
        'en' : 'Close'
    },
    more : {
        'fr' : '+',
        'en' : '+'
    },
    'delete-project' : {
        'fr' : 'Le projet va être supprimé. Êtes-vous sûr ?', 
        'en' : 'You are about to remove this search. Are you sure?'
    },
    'twitter-connect-success' : {
        'fr' : 'Vous avez connecté votre compte Twitter ({0})', 
        'en' : 'You have connected your Twitter account ({0})'
    },
    'twitter-disconnect' : {
        'fr' : 'Vous avez déconnecté votre compte Twitter', 
        'en' : 'You have disconnected your Twitter account'
    },
    'twitter-connect-denied' : {
        'fr' : 'Vous n\'avez pas autorisé Bluenod à se connecter à votre compte Twitter !', 
        'en' : 'You didn\'t authorize Bluenod to connect your Twitter account!'
    },
    'twitter-rate-limit-exceeded' : {
        'fr' : 'Erreur Twitter : nombre de requêtes maximum atteint.', 
        'en' : 'Twitter error: rate limit exceeded.'
    },
    'Disconnect' : {
        'fr' : 'Déconnexion', 
        'en' : 'Disconnect'
    },
    'Connect your Twitter account' : {
        'fr' : 'Connectez votre compte Twitter', 
        'en' : 'Connect your Twitter account'
    },
    'search-history' : {
        'fr' : 'Précédentes recherches', 
        'en' : 'Search history'
    },
    'enter-search-general' : {
        'fr' : 'Entrez un #hashtag ou n\'importe quel terme à chercher', 
        'en' : 'Type a #hashtag or any search term'
    },
    'enter-search-user' : {
        'fr' : 'Rechercher un @utilisateur', 
        'en' : 'Search for a @username'
    },
    'no-history-search-general' : {
        'en' : 'No search yet.<br/> Type any #hashtag or topic and hit [Enter] to create a map.'
    },
    'no-history-search-user' : {
        'en' : 'No search yet.<br/> Type any Twitter username and hit [Enter] to create a map.'
    }
};

/**
 * Array Remove - By John Resig (MIT Licensed)
 * @link http://ejohn.org/blog/javascript-array-remove/
 * @param {Array} array
 * @param {integer} from
 * @param {integer} to
 */
Array.remove = function( array, from, to ) {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};

/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
//(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);


/*
 * Tipsy, Facebook-style tooltips for jQuery
 * @version 1.0.0a
 * (c) 2008-2010 
 * @author jason frame [jason@onehackoranother.com]
 * @link https://github.com/jaz303/tipsy/blob/master/src/javascripts/jquery.tipsy.js
 * Released under the MIT license
 */
(function(b){function i(a,c){this.$element=b(a);this.options=c;this.enabled=!0;this.fixTitle()}i.prototype={show:function(){var a=this.getTitle();if(a&&this.enabled){var c=this.tip();c.find(".tipsy-inner")[this.options.html?"html":"text"](a);c[0].className="tipsy";c.remove().css({top:0,left:0,visibility:"hidden",display:"block"}).prependTo(document.body);var a=b.extend({},this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight}),d=c[0].offsetWidth,f=c[0].offsetHeight, e="function"==typeof this.options.gravity?this.options.gravity.call(this.$element[0]):this.options.gravity,g;switch(e.charAt(0)){case "n":g={top:a.top+a.height+this.options.offset,left:a.left+a.width/2-d/2};break;case "s":g={top:a.top-f-this.options.offset,left:a.left+a.width/2-d/2};break;case "e":g={top:a.top+a.height/2-f/2,left:a.left-d-this.options.offset};break;case "w":g={top:a.top+a.height/2-f/2,left:a.left+a.width+this.options.offset}}2==e.length&&(g.left="w"==e.charAt(1)?a.left+a.width/2- 15:a.left+a.width/2-d+15);c.css(g).addClass("tipsy-"+e);c.find(".tipsy-arrow")[0].className="tipsy-arrow tipsy-arrow-"+e.charAt(0);this.options.className&&c.addClass("function"==typeof this.options.className?this.options.className.call(this.$element[0]):this.options.className);this.options.fade?c.stop().css({opacity:0,display:"block",visibility:"visible"}).animate({opacity:this.options.opacity}):c.css({visibility:"visible",opacity:this.options.opacity})}},hide:function(){this.options.fade?this.tip().stop().fadeOut(function(){b(this).remove()}): this.tip().remove()},fixTitle:function(){var a=this.$element;if(a.attr("title")||"string"!=typeof a.attr("original-title"))a.attr("original-title",a.attr("title")||"").removeAttr("title")},getTitle:function(){var a,b=this.$element,d=this.options;this.fixTitle();d=this.options;"string"==typeof d.title?a=b.attr("title"==d.title?"original-title":d.title):"function"==typeof d.title&&(a=d.title.call(b[0]));return(a=(""+a).replace(/(^\s*|\s*$)/,""))||d.fallback},tip:function(){this.$tip||(this.$tip=b('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'));return this.$tip},validate:function(){this.$element[0].parentNode||(this.hide(),this.options=this.$element=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled}};b.fn.tipsy=function(a){function c(c){var d=b.data(c,"tipsy");d||(d=new i(c,b.fn.tipsy.elementOptions(c,a)),b.data(c,"tipsy",d));return d}function d(){var b=c(this);b.hoverState="in";0==a.delayIn?b.show():(b.fixTitle(),setTimeout(function(){"in"==b.hoverState&&b.show()}, a.delayIn))}function f(){var b=c(this);b.hoverState="out";0==a.delayOut?b.hide():setTimeout(function(){"out"==b.hoverState&&b.hide()},a.delayOut)}if(!0===a)return this.data("tipsy");if("string"==typeof a){var e=this.data("tipsy");if(e)e[a]();return this}a=b.extend({},b.fn.tipsy.defaults,a);a.live||this.each(function(){c(this)});if("manual"!=a.trigger){var e=a.live?"live":"bind",g="hover"==a.trigger?"mouseleave":"blur";this[e]("hover"==a.trigger?"mouseenter":"focus",d)[e](g,f)}return this};b.fn.tipsy.defaults= {className:null,delayIn:0,delayOut:0,fade:!1,fallback:"",gravity:"n",html:!1,live:!1,offset:0,opacity:0.8,title:"title",trigger:"hover"};b.fn.tipsy.elementOptions=function(a,c){return b.metadata?b.extend({},c,b(a).metadata()):c};b.fn.tipsy.autoNS=function(){return b(this).offset().top>b(document).scrollTop()+b(window).height()/2?"s":"n"};b.fn.tipsy.autoWE=function(){return b(this).offset().left>b(document).scrollLeft()+b(window).width()/2?"e":"w"};b.fn.tipsy.autoBounds=function(a,c){return function(){var d= c[0],f=1<c.length?c[1]:!1,e=b(document).scrollTop()+a,g=b(document).scrollLeft()+a,h=b(this);h.offset().top<e&&(d="n");h.offset().left<g&&(f="w");b(window).width()+b(document).scrollLeft()-h.offset().left<a&&(f="e");b(window).height()+b(document).scrollTop()-h.offset().top<a&&(d="s");return d+(f?f:"")}}})(jQuery);


/* 
 * ---------
 *  Spin.js - Version 1.2.8 (28.1.2013)
 * ---------
 * http://fgnass.github.com/spin.js
 * 
 *  An animated CSS3 loading spinner with VML fallback for IE.
 *  No images, no external CSS
 *  No dependencies
 *  Highly configurable
 *  Resolution independent
 *  Uses VML as fallback in old IEs
 *  Uses @keyframe animations, falling back to setTimeout()
 *  Works in all major browsers, including IE6
 *  Small footprint (~1.9K gzipped)
 *  MIT License 
 */
!function(t,e,i){var o=["webkit","Moz","ms","O"],r={},n;function a(t,i){var o=e.createElement(t||"div"),r;for(r in i)o[r]=i[r];return o}function s(t){for(var e=1,i=arguments.length;e<i;e++)t.appendChild(arguments[e]);return t}var f=function(){var t=a("style",{type:"text/css"});s(e.getElementsByTagName("head")[0],t);return t.sheet||t.styleSheet}();function l(t,e,i,o){var a=["opacity",e,~~(t*100),i,o].join("-"),s=.01+i/o*100,l=Math.max(1-(1-t)/e*(100-s),t),p=n.substring(0,n.indexOf("Animation")).toLowerCase(),u=p&&"-"+p+"-"||"";if(!r[a]){f.insertRule("@"+u+"keyframes "+a+"{"+"0%{opacity:"+l+"}"+s+"%{opacity:"+t+"}"+(s+.01)+"%{opacity:1}"+(s+e)%100+"%{opacity:"+t+"}"+"100%{opacity:"+l+"}"+"}",f.cssRules.length);r[a]=1}return a}function p(t,e){var r=t.style,n,a;if(r[e]!==i)return e;e=e.charAt(0).toUpperCase()+e.slice(1);for(a=0;a<o.length;a++){n=o[a]+e;if(r[n]!==i)return n}}function u(t,e){for(var i in e)t.style[p(t,i)||i]=e[i];return t}function c(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var r in o)if(t[r]===i)t[r]=o[r]}return t}function d(t){var e={x:t.offsetLeft,y:t.offsetTop};while(t=t.offsetParent)e.x+=t.offsetLeft,e.y+=t.offsetTop;return e}var h={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",speed:1,trail:100,opacity:1/4,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"};function m(t){if(!this.spin)return new m(t);this.opts=c(t||{},m.defaults,h)}m.defaults={};c(m.prototype,{spin:function(t){this.stop();var e=this,i=e.opts,o=e.el=u(a(0,{className:i.className}),{position:i.position,width:0,zIndex:i.zIndex}),r=i.radius+i.length+i.width,s,f;if(t){t.insertBefore(o,t.firstChild||null);f=d(t);s=d(o);u(o,{left:(i.left=="auto"?f.x-s.x+(t.offsetWidth>>1):parseInt(i.left,10)+r)+"px",top:(i.top=="auto"?f.y-s.y+(t.offsetHeight>>1):parseInt(i.top,10)+r)+"px"})}o.setAttribute("aria-role","progressbar");e.lines(o,e.opts);if(!n){var l=0,p=i.fps,c=p/i.speed,h=(1-i.opacity)/(c*i.trail/100),m=c/i.lines;(function y(){l++;for(var t=i.lines;t;t--){var r=Math.max(1-(l+t*m)%c*h,i.opacity);e.opacity(o,i.lines-t,r,i)}e.timeout=e.el&&setTimeout(y,~~(1e3/p))})()}return e},stop:function(){var t=this.el;if(t){clearTimeout(this.timeout);if(t.parentNode)t.parentNode.removeChild(t);this.el=i}return this},lines:function(t,e){var i=0,o;function r(t,o){return u(a(),{position:"absolute",width:e.length+e.width+"px",height:e.width+"px",background:t,boxShadow:o,transformOrigin:"left",transform:"rotate("+~~(360/e.lines*i+e.rotate)+"deg) translate("+e.radius+"px"+",0)",borderRadius:(e.corners*e.width>>1)+"px"})}for(;i<e.lines;i++){o=u(a(),{position:"absolute",top:1+~(e.width/2)+"px",transform:e.hwaccel?"translate3d(0,0,0)":"",opacity:e.opacity,animation:n&&l(e.opacity,e.trail,i,e.lines)+" "+1/e.speed+"s linear infinite"});if(e.shadow)s(o,u(r("#000","0 0 4px "+"#000"),{top:2+"px"}));s(t,s(o,r(e.color,"0 0 1px rgba(0,0,0,.1)")))}return t},opacity:function(t,e,i){if(e<t.childNodes.length)t.childNodes[e].style.opacity=i}});(function(){function t(t,e){return a("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',e)}var e=u(a("group"),{behavior:"url(#default#VML)"});if(!p(e,"transform")&&e.adj){f.addRule(".spin-vml","behavior:url(#default#VML)");m.prototype.lines=function(e,i){var o=i.length+i.width,r=2*o;function n(){return u(t("group",{coordsize:r+" "+r,coordorigin:-o+" "+-o}),{width:r,height:r})}var a=-(i.width+i.length)*2+"px",f=u(n(),{position:"absolute",top:a,left:a}),l;function p(e,r,a){s(f,s(u(n(),{rotation:360/i.lines*e+"deg",left:~~r}),s(u(t("roundrect",{arcsize:i.corners}),{width:o,height:i.width,left:i.radius,top:-i.width>>1,filter:a}),t("fill",{color:i.color,opacity:i.opacity}),t("stroke",{opacity:0}))))}if(i.shadow)for(l=1;l<=i.lines;l++)p(l,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(l=1;l<=i.lines;l++)p(l);return s(e,f)};m.prototype.opacity=function(t,e,i,o){var r=t.firstChild;o=o.shadow&&o.lines||0;if(r&&e+o<r.childNodes.length){r=r.childNodes[e+o];r=r&&r.firstChild;r=r&&r.firstChild;if(r)r.opacity=i}}}else n=p(e,"animation")})();if(typeof define=="function"&&define.amd)define(function(){return m});else t.Spinner=m}(window,document);

/*
 * Spin.js : plugin jQuery
 * @param {String} type very-small|small|big|very-big
 */
$.fn.spin = function( type ) {
    
    var options = {};
    
    if( typeof type === 'object' ) {
        
        options = type;
        
    } else {
        
        switch( type ) {

            case 'create-graph':
            case 'big':
                options = {
                  lines: 13, // The number of lines to draw
                  length: 4, // The length of each line
                  width: 5, // The line thickness
                  radius: 16, // The radius of the inner circle
                  corners: 1, // Corner roundness (0..1)
                  rotate: 0, // The rotation offset
                  color: '#32aff5', // #rgb or #rrggbb
                  speed: 2, // Rounds per second
                  trail: 60, // Afterglow percentage
                  shadow: false, // Whether to render a shadow
                  hwaccel: false, // Whether to use hardware acceleration
                  className: 'spinner', // The CSS class to assign to the spinner
                  zIndex: 2e9, // The z-index (defaults to 2000000000)
                  top: 'auto', // Top position relative to parent in px
                  left: 'auto' // Left position relative to parent in px
                };
                break;

            case 'small':
                options = {
                    lines       : 12,
                    length      : 3,
                    width       : 2,
                    radius      : 7,
                    rotate      : 0,
                    color       : '#555',
                    trail       : 50
                };
                break;

            case 'very-small':
                options = {
                    lines       : 10,
                    length      : 2,
                    width       : 2,
                    radius      : 4,
                    rotate      : 0,
                    color       : '#555',
                    trail       : 50
                };
                break;

            case 'sidebar':
                //http://fgnass.github.com/spin.js/#?lines=11&length=4&width=4&radius=8&corners=1.0&rotate=0&trail=68&speed=1.5
                options = {
                    lines: 11, // The number of lines to draw
                    length: 4, // The length of each line
                    width: 4, // The line thickness
                    radius: 8, // The radius of the inner circle
                    corners: 1, // Corner roundness (0..1)
                    rotate: 0, // The rotation offset
                    color: '#555', // #rgb or #rrggbb
                    speed: 1.5, // Rounds per second
                    trail: 68, // Afterglow percentage
                    shadow: false, // Whether to render a shadow
                    hwaccel: false, // Whether to use hardware acceleration
                    className: 'spinner', // The CSS class to assign to the spinner
                    zIndex: 2e9, // The z-index (defaults to 2000000000)
                    top: 'auto', // Top position relative to parent in px
                    left: 'auto' // Left position relative to parent in px
                };
                break;

            default:
                options = {
                    lines       : 12,           // The number of lines to draw
                    length      : 7,            // The length of each line
                    width       : 5,            // The line thickness
                    radius      : 10,           // The radius of the inner circle
                    rotate      : 0,            // rotation offset
                    color       : '#000',       // #rgb or #rrggbb
                    speed       : 1,            // Rounds per second
                    trail       : 100,          // Afterglow percentage
                    opacity     : 1/4,          // Opacity of the lines
                    fps         : 20,           // Frames per second when using setTimeout()
                    zIndex      : 2e9,          // Use a high z-index by default
                    className   : 'spinner',    // CSS class to assign to the element
                    top         : 'auto',       // center vertically
                    left        : 'auto'        // center horizontally
                };
                break;
        }
    }
    
    
    this.each(function() {
        var $this   = $(this),
            data    = $this.data();
        // Arrêt du spinner
        if( data.spinner ) {
            data.spinner.stop();
            delete data.spinner;
        }
        // Lancement du spinner
        if( options ) {
            data.spinner = new Spinner( $.extend( {color : $this.css('color')}, options ) ).spin(this);
            Blu.log('Spinner > new "' + type + '"');
        }
    });
    return this;
};

// Arrêt du spinner
$.fn.spinStop = function() {
    this.each(function() {
        var $this   = $(this),
            data    = $this.data();
        if( data.spinner ) {
            Blu.log('Spinner > stop : ' + JSON.stringify( data.spinner.opts ) + '');
            data.spinner.stop();
            delete data.spinner;
        }
    });
    return this;
};



/**
 * Lancement d'un callback lorsque l'on scrolle en bas de l'élément
 * @param {function} callback
 */
$.fn.onScrollEnd = function( callback ) {
    
    if( typeof callback !== 'function' ) {
        Blu.warn('No callback in $.fn.onScrollEnd');
        return;
    }
    
    $(this).bind( 'scroll', function() {

        var _container = $(this);
        
        //Blu.log('scroll: scrollTop() = ' + _container.scrollTop() + ' // innerHeight() = ' + _container.innerHeight() + ' // _container[0].scrollHeight = ' + _container[0].scrollHeight );
        
        if( _container.scrollTop() + _container.innerHeight() >= _container[0].scrollHeight ) {
            callback();
        }

    });
};

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 * 
 * @link https://github.com/brandonaaron/jquery-mousewheel
 * 
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function($){var types=['DOMMouseScroll','mousewheel'];if($.event.fixHooks){for(var i=types.length;i;){$.event.fixHooks[types[--i]]=$.event.mouseHooks;}}
$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var i=types.length;i;){this.addEventListener(types[--i],handler,false);}}else{this.onmousewheel=handler;}},teardown:function(){if(this.removeEventListener){for(var i=types.length;i;){this.removeEventListener(types[--i],handler,false);}}else{this.onmousewheel=null;}}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel");},unmousewheel:function(fn){return this.unbind("mousewheel",fn);}});function handler(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,returnValue=true,deltaX=0,deltaY=0;event=$.event.fix(orgEvent);event.type="mousewheel";if(orgEvent.wheelDelta){delta=orgEvent.wheelDelta/120;}
if(orgEvent.detail){delta=-orgEvent.detail/3;}
deltaY=delta;if(orgEvent.axis!==undefined&&orgEvent.axis===orgEvent.HORIZONTAL_AXIS){deltaY=0;deltaX=-1*delta;}
if(orgEvent.wheelDeltaY!==undefined){deltaY=orgEvent.wheelDeltaY/120;}
if(orgEvent.wheelDeltaX!==undefined){deltaX=-1*orgEvent.wheelDeltaX/120;}
args.unshift(event,delta,deltaX,deltaY);return($.event.dispatch||$.event.handle).apply(this,args);}})(jQuery);




/**
 * © 2012 Bluenod - All rights reserved.
 */

if( typeof console === 'undefined' ) {
    var console = {
        info : function( a ) { },
        log : function( a ) { },
        warn : function( a ) { }
    };
}

var Blu_Misc = {
    
    app : {
        urls : {
            main        :  '',
            ajax_base   : '/ajax/'
        }
    },
    
    user : {},
    
    errors : [],
    
    fn : {
        user : {},
        misc : {}
    }
    
};

jQuery.fn.showIf = function( condition ) {
    return this[ condition ? 'show' : 'hide' ]();
};

Blu_Misc.fn.showIfEvents = function() {
   
    console.info( 'Blu_Misc.fn.showIfEvents() ');
    
    $('.mail').each( function() {
        var _t = $(this); 
        _t.html( _t.html().replace('*at*','@') );
    });    

    var _form       = $('#form-project, #form-map'),
        _status     = _form.find('input[name="project[status]"]'),
        _premium    = _form.find('input[type="checkbox"][name="project[is_premium]"]');
        
    _form.find('[data-show-if="public"]').showIf( _status.filter(':checked').val() === 'public' );
    
    _form.find('[data-show-if="premium"]').showIf( _premium.attr('checked') );
    
    
};

/**
 * Vérification du formulaire de création/édition de carte
 * @returns {Boolean}
 */
Blu_Misc.fn.verifyMapForm = function() {
    
    var _formMap    = $('#form-map'),
        _q          = _formMap.find('input[name="project[q]"]'),
        _dayMin     = _formMap.find('input[name="project[day_min]"]'),
        _dayMax     = _formMap.find('input[name="project[day_max]"]'),
        _timeMin    = _formMap.find('input[name="project[time_min]"]'),
        _timeMax    = _formMap.find('input[name="project[time_max]"]'),
        _status     = _formMap.find('input[name="project[status]"]'),
        _permalink  = _formMap.find('input[name="project[name]"]'),
        _submit     = _formMap.find('input[type="submit"]'),
        _isValid    = false;
    
    if( _formMap.hasClass('customize') ) {
        return true;
    }
    
    Blu_Misc.errors.length = 0;
    
    _formMap.find('span.error').remove();
    
    if( !_q.val() ) {
        Blu_Misc.errors.push('Please enter a search query.');
    }
    if( !_dayMin.val() ) {
        Blu_Misc.errors.push('Please enter a start date.');
    }
    if( !_timeMin.val() ) {
        Blu_Misc.errors.push('Please enter a start time.');
    }
    if( !_dayMax.val() ) {
        Blu_Misc.errors.push('Please enter an end date.');
    }
    if( !_timeMax.val() ) {
        Blu_Misc.errors.push('Please enter an end time.');
    }
    if( _dayMin.val() + ' ' + _timeMin.val() >= _dayMax.val() + ' ' + _timeMax.val() 
        && _dayMax.val().length && _timeMax.val().length ) {
        Blu_Misc.errors.push('You can\'t create a map that ends before it starts!');
    }
    if( _status.filter(':checked').val() === 'public' && !_permalink.val() ) {
        Blu_Misc.errors.push('Please enter a custom URL for this map.');
    }
    
    _isValid = ( Blu_Misc.errors.length === 0 );
    
    if( !_isValid ) {
        _submit.addClass('disabled');
        _submit.data('disabled', true);
    } else {
        _submit.removeClass('disabled');
        _submit.removeData('disabled');
        console.log( Blu_Misc.errors );
    }
    
    console.log( _isValid );
    console.info('verifyMapForm : ' + ( _isValid ? 'valid' : 'NOT valid' ) );

    var _datesConflict = 'You can\'t create a map that ends before it starts!';
    if( Blu_Misc.errors.indexOf( _datesConflict ) !== -1 ) {
        _timeMax.after('<span class="error">' + _datesConflict + '<span>');
    }    
    
    return _isValid;
};

Blu_Misc.fn.checkMapPermalink = function( permalink ) {
    
    $.getJSON( Blu_Misc.app.urls.main + '/maps/check-permalink', { 'permalink' : permalink }, function( json ) {

        console.log( json );

        var _validPermalink = '';
        
        if( json.success ) {
            _validPermalink = permalink;
        } else {
            if( json.suggestion ) {
                _validPermalink = json.suggestion;
            }
        }
        
        if( _validPermalink ) {
            $('#form-map').find('input[name="project[name]"]').val( _validPermalink );
        }

    });
};

/**
 * Evénements
 */
Blu_Misc.fn.events = function() {
    
    console.info( 'Blu_Misc.fn.events() ');
    
    /*
     * Formulaire nouveau projet
     */
    var _form       = $('#form-project, #form-map'),
        _formMap    = $('#form-map'),
        _hasFormMap = ( _formMap.length > 0 );
    
    _formMap.submit( function( event ) {
        
        var _isValid = Blu_Misc.fn.verifyMapForm();
        
        if( !_isValid ) {
            event.preventDefault();
        } else {
            return true;
        }
        
    });
    
    Blu_Misc.fn.showIfEvents();
    
    if( _hasFormMap ) {
        Blu_Misc.fn.verifyMapForm();
    }
    
    _form.change( Blu_Misc.fn.showIfEvents );
    
    _formMap.change( Blu_Misc.fn.verifyMapForm );
    
    // Changement de la requête
    _formMap.find('input[name="project[q]"]').change( function() {
        
        console.log('q has been changed');
        
        var _inputQ     = $(this),
            _inputPerm  = _formMap.find('input[name="project[name]"]'),
            _q          = _inputQ.val();
        
        if( _q.length > 0 && _q[0] !== '#' && _q[0] !== '@' ) {
            _inputQ.val( '@' + _q );
        }
        
        // Changement automatique du permalien s'il n'a pas déjà été défini dans la BDD
        if( !_inputPerm.data('original-value') ) {
            
            var _permalink = Blu_Misc.fn.misc.toPermalink( _q );
            
            _formMap.find('input[name="project[name]"]').val( _permalink );
            
            Blu_Misc.fn.checkMapPermalink( _permalink );
        }
        
    });

    /*
     * Correction automatique du permalink
     */
    if( _hasFormMap ) {
        var _permalinkInput = _formMap.find('input[name="project[name]"]');
        
        if( _permalinkInput.length ) {
            setInterval( function() {
                var _val    = _permalinkInput.val(),
                    _valPer = Blu_Misc.fn.misc.toPermalink( _val );
                if( _val !== _valPer ) {
                    _permalinkInput.val( _valPer );
                }

            }, 700 );
        }
    }
    
    // Création du calendrier
    $('input[data-type="date-day"]').each( function() {
        
        var _input = $(this);
        
        _input.datepicker({
            dateFormat          : 'yy-mm-dd',
            firstDay            : 1, // lundi = premier jour de la semaine
            //onSelect            : Blu_Misc.fn.timeNav.calendarSelect,
            hideIfNoPrevNext    : true
        });
        //_calendar.datepicker( 'option', 'minDate', Blu_Misc.fn.misc.dateStringToObject( Blu_Misc.projects.current.datesTotal.min ) );
        //_calendar.datepicker( 'option', 'maxDate', _lastDay );
        _input.datepicker( 'setDate', _input.val() );
    });

    
    // Champ heure
    _form.find('input[data-type="date-time"]')
        .each( Blu_Misc.fn.sanitizeInputTime )
        .change( Blu_Misc.fn.sanitizeInputTime )
        .keyup( Blu_Misc.fn.sanitizeInputTime );

    _formMap.find('input[data-type="date-time"]')
        .each( function() {
    
            var _input  = $(this),
                _values = _input.data('values');
            
            //console.log( _values );
            
            var _popover = {
                html        : true,
                placement   : 'bottom',
                trigger     : 'focus'
             };
             
            _popover.content = '<ul>';
            for( var i in _values ) {
                _popover.content += '<li><a href="#">' + _values[i] + '</a></li>';
            }
            _popover.content += '</ul>';

            _input.popover( _popover );
            //_input.popover('show');
            
        })
        /*.focus( function() {
            
        })*/;
        
    /*
     * Choix d'une heure
     */
    _formMap.find('.time-period .popover-content a').live({
        click : function() {
            var _a          = $(this),
                _popover    = _a.parents('.popover'),
                _input      = _popover.prev();
            
            _input.val( _a.text() );
            
            Blu_Misc.fn.verifyMapForm();
            
            return false;
        }
    });
    
    // Color picker
    _form.find('input[data-type="color"]')
        .each( Blu_Misc.fn.previewColor )
        .change( Blu_Misc.fn.previewColor )
        .keyup( Blu_Misc.fn.previewColor );
        
    if( jQuery.fn.dropdown ) {
        $('.dropdown-toggle').dropdown();    
    }

    Blu_Misc.fn.eventsInvites();
    
};

/**
 * Evénements des invites
 */
Blu_Misc.fn.eventsInvites = function() {

    /**
     * Demande d'invite
     */
    $('form.request-invite').live({
        'submit' : function() {

            var _form = $(this),
                _input = _form.find('input[type="text"]');

            _input.popover('destroy');
            
            $.getJSON( _form.attr('action'), _form.serializeArray(), function( json ) {

                var _popover = {
                    content     : json.message,
                    placement   : 'right',
                    trigger     : 'manual'
                };
                
                _input.popover( _popover );
                _input.popover('show');
                
                setTimeout( function() {
                    _input.popover('destroy');
                }, 4000 );

                if( json.success ) {


                } else {

                }

            });

            return false;
        }
    });

    /*
     * Création d'invite
     */
    $('a.create-invite').click( function() {
        
        var _a = $(this),
            _params = {
                'invite' : {
                    'mail' : _a.data('mail')
                },
                'send_mail' : 1
            };
        
        if( _a.hasClass('disabled') ) {
            return false;
        }
        
        _a.addClass('disabled');
        
        $.getJSON( Blu_Misc.app.urls.main + '/invites/create', _params, function( json ) {
            
            if( json.message ) {
               _a.attr( 'title', json.message );
            }
            
            if( json.success ) {
                _a.text('Invited!');
            } else {
                _a.addClass('btn-danger');
                _a.text('Error');
            }

        });
        
        _a.blur();
        return false;
        
    });
    
    /*
     * Suppression d'invite
     */
    $('a.delete-invite-request, a.delete-invite').click( function() {
        
        var _a          = $(this), 
            _isRequest  = _a.hasClass('delete-invite-request'),
            _path       = '/invites' + ( _isRequest ? '/requests' : '' ) + '/delete',
            _params     = _isRequest ? { 'mail' : _a.data('mail') } : { 'id' : _a.data('id') };
        
        if( _a.hasClass('disabled') ) {
            _a.blur();
            return false;
        }
        
        if( !_a.hasClass('need-confirmation') ) {
            _a.addClass('need-confirmation');
            _a.addClass('btn-danger');
            _a.text('Confirm');
            _a.blur();
            return false;
        }
                
        _a.addClass('disabled');
        //_a.text('Deleting...');
        
        $.getJSON( Blu_Misc.app.urls.main + _path, _params, function( json ) {
            
            if( json.message ) {
               _a.attr( 'title', json.message );
            }
            
            if( json.success ) {
                _a.text('Deleted');
                setTimeout( function() {
                    _a.parents('tr').fadeOut('slow');
                }, 1000);
            } else {
                _a.text('Error');
            }

        });
        
        _a.blur();
        return false;
        
    });
};

Blu_Misc.fn.sanitizeInputTime = function() {
        
    var _input = $(this),
        _val = _input.val();
    
    _val = _val.replace('h', ':').replace( /[^0-9:]/g, '' ).substr( 0, 5 );
    
    _input.val( _val );

};

Blu_Misc.fn.previewColor = function() {
        
    var _input = $(this),
        _color = _input.val();
    
    if( _color[0] === '#' ) {
        _input.siblings('.preview-color').css( { 'background' : _color } );
    }

};

/**
 * Initialisation de Blu_Misc
 */
Blu_Misc.init = function() {
    
    Blu_Misc.fn.misc.configMixpanel();
    
    if( Blu_Misc.mixpanelEvent && Blu_Misc.mixpanelEvent.event ) {
        console.info( 'Tracking Mixpanel Event "' + Blu_Misc.mixpanelEvent.event + '"' );
        mixpanel.track( Blu_Misc.mixpanelEvent.event, Blu_Misc.mixpanelEvent.data || {} );
    }
    
    Blu_Misc.app.urls.main       = window.location.protocol + '//' + window.location.host;
    Blu_Misc.app.urls.ajax_base  = Blu_Misc.app.urls.main + Blu_Misc.app.urls.ajax_base;
    
    Blu_Misc.fn.events();
    
};


/**
 * Supprime les accents de la string
 * @param {String} s
 * @returns {String}
 */
Blu_Misc.fn.misc.removeAccents = function( s ){
    var r = s.toLowerCase();
    r = r.replace(new RegExp(/[àáâãäå]/g),"a");
    r = r.replace(new RegExp(/æ/g),"ae");
    r = r.replace(new RegExp(/ç/g),"c");
    r = r.replace(new RegExp(/[èéêë]/g),"e");
    r = r.replace(new RegExp(/[ìíîï]/g),"i");
    r = r.replace(new RegExp(/ñ/g),"n");                
    r = r.replace(new RegExp(/[òóôõö]/g),"o");
    r = r.replace(new RegExp(/œ/g),"oe");
    r = r.replace(new RegExp(/[ùúûü]/g),"u");
    r = r.replace(new RegExp(/[ýÿ]/g),"y");
    return r;
};
/**
 * Retourne le permalien correspondant à une string
 * @param {String} s
 * @returns {String}
 */
Blu_Misc.fn.misc.toPermalink = function( s ){
    return Blu_Misc.fn.misc.removeAccents( s ).replace(/[^a-z0-9_]+/gi, '-').replace(/^-*|-*$/g, '');
};

/**
 * (Ré)initialisation de l'utilisateur courant
 */
Blu_Misc.fn.user.getDefaultUser = function() {
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
 * Retourne un objet Date à partir d'une chaîne de caractères "AAAA-MM-JJ hh:mm:ss" (ou moins précise)
 * L'heure de la string supposée configurée à l'heure du serveur, soit actuellement UTC+1
 * On prend en compte cette timezone pour créer l'objet Date en Javascript
 * @param {String} date_str
 * @param {integer} UTC_offset
 * @returns {Date}
 */
Blu_Misc.fn.misc.dateStringToObject = function( date_str, UTC_offset ) {
    
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
 * Configuration de Mixpanel : activation / désactivation suivant les cas
 */
Blu_Misc.fn.misc.configMixpanel = function() {
    
    var _trackInMixpanel = Blu_Misc.user && Blu_Misc.user.id && !Blu_Misc.user.isFromTeam && !Blu_Misc.fn.localhost();
    
    if( !_trackInMixpanel ) {
        Blu_Misc.fn.misc.disableMixpanel();
        return;
    }
    
    mixpanel.identify( Blu_Misc.user.id );

    mixpanel.people.identify( Blu_Misc.user.id );

    mixpanel.name_tag( Blu_Misc.user.screen_name );

    mixpanel.people.set({
        $name           : Blu_Misc.user.screen_name,
        $username       : Blu_Misc.user.screen_name,
        //$email          : Blu_Misc.user.email,
        $created        : Blu_Misc.user.created_at,
        $last_login     : new Date(),
        'Profile URL'   : 'http://twitter.com/' + Blu_Misc.user.screen_name
    });
    
    console.warn( 'Mixpanel : config OK');
    
};


/**
 * Désactivation de Mixpanel (liste de fonctions à mettre à jour si d'autres méthodes sont appelées)
 */
Blu_Misc.fn.misc.disableMixpanel = function() {
    mixpanel.disable();
    mixpanel.set_config({ 'track_pageview' : false });    
    console.warn('Mixpanel : disabled');
};

/**
 * Teste si l'on est en local
 */
Blu_Misc.fn.localhost = function() {
    var domain = location.host;
    return ( domain.search(/localhost/) !== -1 );
};


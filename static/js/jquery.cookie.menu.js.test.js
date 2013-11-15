var before = {
    setup: function(){
        var cookies = document.cookie.split('; ')
        for (var i = 0, c; (c = (cookies)[i]) && (c = c.split('=')[0]); i++) {
            document.cookie = c + '=; expires=' + new Date(0).toUTCString();
        }
    }
};


module('open menu', before);
test('openMenu', 3, function(){
    var sectID = 'a';
    jQueryMenu.openMenu(sectID);
    
    QUnit.equal(jQuery('#' + sectID).attr('class'), 'header-open', 'class should be header-open');
    QUnit.equal(jQuery('#' + sectID + '_ul').css('display'), 'block', 'display should be block');
    QUnit.equal($.subcookie("_menu_cookie_", sectID), null, 'cookie value should be null');
});

module('close menu', before);
test('closeMenu', 3, function(){
    var sectID = 'a';
    jQueryMenu.closeMenu(sectID);
    
    QUnit.equal(jQuery('#' + sectID).attr('class'), 'header-closed', 'class should be header-closed');
    QUnit.equal(jQuery('#' + sectID + '_ul').css('display'), 'none', 'display should be none');
    QUnit.equal($.subcookie("_menu_cookie_", sectID), '0', 'cookie value should be 0');
});

module('toggle menu', before);
test('toggleMenu', 6, function(){
    var sectID = 'a';
    $.subcookie("_menu_cookie_", sectID, '0');
    
    jQueryMenu.toggleMenu(sectID);
    QUnit.equal(jQuery('#' + sectID).attr('class'), 'header-open', 'class should be header-open');
    QUnit.equal(jQuery('#' + sectID + '_ul').css('display'), 'block', 'display should be block');
    QUnit.equal($.subcookie("_menu_cookie_", sectID), null, 'cookie value should be null');
    
    jQueryMenu.toggleMenu(sectID);
    QUnit.equal(jQuery('#' + sectID).attr('class'), 'header-closed', 'class should be header-closed');
    QUnit.equal(jQuery('#' + sectID + '_ul').css('display'), 'none', 'display should be none');
    QUnit.equal($.subcookie("_menu_cookie_", sectID), '0', 'cookie value should be 0');
});

module('restore menu', before);
test('restoreMenu', 6, function(){
    var sectID = 'a';
    $.subcookie("_menu_cookie_", sectID, '0');
    jQueryMenu.restoreMenu(sectID);
    QUnit.equal(jQuery('#' + sectID).attr('class'), 'header-closed', 'class should be header-closed');
    QUnit.equal(jQuery('#' + sectID + '_ul').css('display'), 'none', 'display should be none');
    QUnit.equal($.subcookie("_menu_cookie_", sectID), '0', 'cookie value should be 0');
    
    $.subcookie("_menu_cookie_", sectID, null);
    jQueryMenu.restoreMenu(sectID);
    QUnit.equal(jQuery('#' + sectID).attr('class'), 'header-open', 'class should be header-open');
    QUnit.equal(jQuery('#' + sectID + '_ul').css('display'), 'block', 'display should be block');
    QUnit.equal($.subcookie("_menu_cookie_", sectID), null, 'cookie value should be null');
});


module('restore ShowHideAllMenu', before);
test('restoreShowHideAllMenu', 4, function(){
    jQueryMenu.showAll();
    jQueryMenu.restoreShowHideAllMenu();
    QUnit.equal(jQuery('#hideAllMenu').css('display'), 'inline', 'display should be inline');
    QUnit.equal(jQuery('#showAllMenu').css('display'), 'none', 'display should be none');
    
    jQueryMenu.hideAll();
    jQueryMenu.restoreShowHideAllMenu();
    QUnit.equal(jQuery('#hideAllMenu').css('display'), 'none', 'display should be none');
    QUnit.equal(jQuery('#showAllMenu').css('display'), 'inline', 'display should be inline');
});

module('hideAll', before);
test('hideAll', 2, function(){
    jQueryMenu.hideAll();
    QUnit.equal(jQuery('#hideAllMenu').css('display'), 'none', 'display should be none');
    QUnit.equal(jQuery('#showAllMenu').css('display'), 'inline', 'display should be inline');
});

module('showAll', before);
test('showAll', 2, function(){
    jQueryMenu.showAll();
    QUnit.equal(jQuery('#hideAllMenu').css('display'), 'inline', 'display should be inline');
    QUnit.equal(jQuery('#showAllMenu').css('display'), 'none', 'display should be none');
});

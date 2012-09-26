
var PrettyPopup = Class.create();

PrettyPopup.prototype = {

    getResponse: function(data)
    {
        //Show response
        $('search_autocomplete').innerHTML = data.responseText;
        $('search_autocomplete').show();
        //Restore default icon in search field
        $('search').setStyle({background: 'white'});
    },

    showPopup: function() {
        //hide pop-up
        $('search_autocomplete').hide();
        //search criteria
        var textQuery = $(this.id).value;
        //check if exist value
        if (textQuery == '') {
            return false;
        }

        //reset timer
        clearTimeout(this.searchTimer);

        var nested = this;

        this.searchTimer = setTimeout(function() {
            //show loading icon
            $(nested.id).setStyle({ background:  "white url(" + atwixImagePath + "opc-ajax-loader.gif) no-repeat right" });
            //AJAX request
            new Ajax.Request(
                atwixBasePath + "catalogsearch/ajax/suggest/",
                {method: 'get', parameters: "q=" + textQuery, onComplete: nested.getResponse}
            );

        },750);
        //PROFIT
        return true;

    },

    initialize: function(id) {
        this.id = id;
        //unbind system keydown action
        $(this.id).stopObserving('keydown');
        //init timer variable
        this.searchTimer = 1;
        Event.observe(this.id, 'keyup', this.showPopup.bind(this));
    }
}

Event.observe(document, 'dom:loaded', function(){
    new PrettyPopup('search');
});
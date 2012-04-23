jQuery(document).ready(
    function()
    {
        //unbind system keydown action
        $('search').stopObserving('keydown');
        
        //init timer variable
        var searchTimer = 1;
        
        //new keydown action
        jQuery("#search").keyup(function(){
            //search criteria
            var textQuery = jQuery("#search").val();
            //check if exist value
            if (textQuery == '')
                return false;
            
            //reset timer
            clearTimeout(searchTimer);
            
            //call function if time was expired
            searchTimer = setTimeout(function(){
                //show loading icon
                jQuery("#search").css("background", "white url(" + atwixImagePath + "opc-ajax-loader.gif) no-repeat right");
                //hide pop-up
                jQuery("#search_autocomplete").fadeOut();
                
                //AJAX request
                jQuery.get(
                    atwixBasePath + "catalogsearch/ajax/suggest/",
                    {q: textQuery},
                    function(data)
                    {
                        //Show response
                        jQuery("#search_autocomplete").html(data);
                        jQuery("#search_autocomplete").fadeIn();
                        //Restore default icon in search field
                        jQuery("#search").css("background", "white");
                    }
                );
            },750);
            //PROFIT
            return true;
        });
    }
);

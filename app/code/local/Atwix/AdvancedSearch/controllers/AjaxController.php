<?php
include_once('Mage/CatalogSearch/controllers/AjaxController.php');

class Atwix_AdvancedSearch_AjaxController extends Mage_CatalogSearch_AjaxController
{
    public function suggestAction()
    {
        $this->loadLayout();
        $this->renderLayout();
    }
}
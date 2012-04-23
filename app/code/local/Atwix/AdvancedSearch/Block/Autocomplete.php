<?php
class Atwix_AdvancedSearch_Block_Autocomplete extends Mage_Catalog_Block_Product_List
{
    protected $_suggestData = null;

    public function getSuggestData()
    {
        if (!$this->_suggestData) {
            $query = $this->helper('catalogsearch')->getQueryText();
            
            $visibility = array(
                Mage_Catalog_Model_Product_Visibility::VISIBILITY_BOTH,
                Mage_Catalog_Model_Product_Visibility::VISIBILITY_IN_CATALOG
            );
            $collection = Mage::getModel('catalogsearch/query')
                    ->getResultCollection()
                    ->addAttributeToSelect(array('name', 'thumbnail', 'partnumber'))
                    ->addAttributeToFilter('visibility', $visibility)
                    ->addSearchFilter($query)
                    ->setPage(1, 4);
            
            $counter = 0;
            $data = array();
            foreach ($collection as $key => $item) {
                $_gallery = Mage::getModel('catalog/product')->load($item->getId())->getMediaGalleryImages();
                $_images = array();
                if (!empty($_gallery)) {
                    $_counter = 0;
                    foreach ($_gallery as $key => $val) {
                        $_images[$key] = (string) $this->helper('catalog/image')->init($item, 'thumbnail', $val->getFile())->resize(32);
                        if (++$_counter > 3) break;
                    }
                }
                $_data = array(
                    'sku' => $item->getSku(),
                    'thumbnail' => (string) $this->helper('catalog/image')->init($item, 'thumbnail')->resize(32),
                    'name' => $item->getName(),
                    'price' => $this->getPriceHtml($item, true),
                    'review' => $this->getReviewsSummaryHtml($item, 'short'),
                    'images' => $_images,
                    'url' => $item->getProductUrl()
                );
                
                $data[] = $_data;
            }
            $this->_suggestData = $data;
        }
        return $this->_suggestData;
    }
}

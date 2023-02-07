import './index.scss';
import tpl from './index.tpl';

import { trimSpaces } from '../../../utils/tools';

class Search {
  constructor () {
    this.name = 'search';
    this.tpl = tpl;
  }

  onSearchPhone (e) {
    const $searchForm = $('#J_searchForm'),
          $searchInput = $('#J_input'),
          keyword = trimSpaces($searchInput.val()),
          keywordLen = keyword.length,
          action = $searchForm.prop('action');

    if (keywordLen) {
      window.open(action + '?keyword=' + keyword);
    } 

  }
}

export { Search }
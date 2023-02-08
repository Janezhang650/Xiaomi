import './index.scss';
import tpl from './tpl/wrapper.tpl';
import itemTpl from './tpl/item.tpl';

import { ShowBoard } from '../show_board';
import { NoDataTip } from '../no_data_tip';

import { tplReplace, throttle } from '../../utils/tools';

class Tab {
  constructor (el, fieldData, phoneData) {
    this.name = 'tab';
    this.$el = el;
    this.fieldData = fieldData;
    this.phoneData = phoneData;
    this.noDataTip = new NoDataTip();

    this.htmlCache = {}; // 模板缓存池
  }

  async init () {
    await this.render();
    this.bindEvent();
  }

  async render () {
    await this.$el.append(tplReplace(tpl, {
      list: this.renderList()
    }));
  }

  bindEvent () {
    const $tab = $('.J_tab'),
          $board = $('.J_board'),
          $searchInput = $('#J_searchInput'),
          oShowBoard = new ShowBoard();

    $tab.on('click', { $board, oShowBoard }, $.proxy(this.onTabClick, this));
    $searchInput.on('input', { $board, oShowBoard }, throttle($.proxy(this.onSearchInput, this), 1000));
  }

  // 改变tab标签处理函数
  onTabClick (e) {
    const tar = e.target,
          data = e.data,
          $board = data.$board,
          oShowBoard = data.oShowBoard,
          tagName = tar.tagName.toLowerCase(),
          $tar = $(tar);

    if (tagName === 'a') {
      const field = $tar.attr('data-field');
      
      this.tabChange($tar);
      this.appendList(field, $board, oShowBoard);
    }
  }

  // 搜索处理
  onSearchInput (e) {
    const data = e.data,
          $board = data.$board,
          oShowBoard = data.oShowBoard,
          $tar = $(e.target),
          val = $tar.val(),
          valLen = val.length;

    this.tabChange($tar.find('.all'));

    if (valLen) {
      this.appendList('all', $board, oShowBoard, val);
    } else {
      this.appendList('all', $board, oShowBoard);
    }
  }

  // 改变tab标签状态
  tabChange (target) {
    target.parent().addClass('current')
          .siblings().removeClass('current');
  }

  // 根据类别field或搜索关键字keyword将获取到的信息展示到页面
  appendList (field, $board, oShowBoard, keyword) {
    if (keyword) {
      let data = this.filterDatas(this.phoneData, field, keyword),
          dataLen = data.length;

      if (dataLen > 0) {
        $board.html(oShowBoard.renderList(data));
      } else {
        $board.html(this.noDataTip.tpl('没有搜索到相关数据'));
      }
    } else {
      if (!this.htmlCache[field]) {
        this.htmlCache[field] = oShowBoard.renderList(this.filterDatas(this.phoneData, field));
      }

      $board.html(this.htmlCache[field]);
    }
  }

  renderList () {
    let list = '';

    this.fieldData.forEach(item => {
      list += tplReplace(itemTpl, {
        field: item.field,
        series_name: item.series_name
      });
    });

    return list;
  }

  // 根据类别field或搜索关键字筛选出符合条件的数据
  filterDatas (data, field, keyword) {
    return data.filter(item => {
      if (keyword) {
        const phone_name = item.phone_name.toLowerCase(),
              slogan = item.slogan.toLowerCase();

        keyword = keyword.toLowerCase();

        return phone_name.includes(keyword) || slogan.includes(keyword);
      } else {
        switch (field) {
          case 'all':
            return true;
            break;
          default:
            return item.field === field;
            break;
        }
      }
    });
  }
}

export { Tab }
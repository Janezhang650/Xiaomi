<tr>
  <td>
    <input type="checkbox" class="checkbox" data-goodsId="{{ goodsId }}" checked>
  </td>
  <td>
    <span>{{ goodsId }}</span>
  </td>
  <td>
    <a href="{{ link }}">
      <img src="{{ pic }}" alt="{{ name }}">
    </a>
  </td>
  <td>
    <a href="{{ link }}">{{ name }}</a>
  </td>
  <td>
    <span class="price">￥{{ price }}.00</span>
  </td>
  <td>
    <span>{{ version }}</span>
  </td>
  <td>
    <span>{{ color }}</span>
  </td>
  <td>
    <button class="purchase-btn" data-goodsId="{{ goodsId }}">结算</button>
  </td>
  <td>
    <a href="javascript:;" class="remove-btn" data-goodsId="{{ goodsId }}">删除</a>
  </td>
</tr>
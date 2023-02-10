<tr>
  <td>
    <input type="checkbox" data-goodsId="{{ goodsId }}" checked>
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
    <button class="purchaseBtn J_purchaseBtn" data-goodsId="{{ goodsId }}">结算</button>
  </td>
  <td>
    <a href="javascript:;" data-goodsId="{{ goodsId }}">删除</a>
  </td>
</tr>
<template>
  <div class="container">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-md-9">
          <div class="ibox">
            <div class="ibox-title">
              <span class="pull-right">(<strong>5</strong>) items</span>
              <h5>Items in your cart</h5>
            </div>
            <div class="ibox-content">
              <div class="table-responsive">
                <table class="table booking-table">
                  <tbody>
                    <tr>
                      <td width="90">
                        <div class="field-image"></div>
                      </td>
                      <td class="desc">
                        <h3>
                          <a href="#" class="text-navy"> Sân bóng Đà Nẵng </a>
                        </h3>
                        <p class="small">
                          Sân tiêu chuẩn với mặt cỏ nhân tạo chất lượng cao
                        </p>

                        <dl class="small m-b-none">
                          <dt>Danh sách Slot</dt>
                          <dd>
                            Slot 1: 17:00 - 18:30
                            <a href="#" class="text-muted"
                              ><i class="fa fa-edit"></i> Sửa</a
                            >
                            |
                            <a href="#" class="text-muted"
                              ><i class="fa fa-trash"></i> Xóa</a
                            >
                          </dd>
                          <table class="table service-table">
                            <tr>
                              <th>Dịch vụ</th>
                              <th>Giá</th>
                              <th>Số lượng</th>
                              <th>Hành động</th>
                            </tr>
                            <tr>
                              <td>Nước</td>
                              <td>10,000 VND</td>
                              <td>
                                <input
                                  type="number"
                                  value="1"
                                  min="0"
                                  class="form-control service-quantity"
                                />
                              </td>
                              <td>
                                <a href="#" class="text-muted"
                                  ><i class="fa fa-edit"></i> Sửa</a
                                >
                                |
                                <a href="#" class="text-muted"
                                  ><i class="fa fa-trash"></i> Xóa</a
                                >
                              </td>
                            </tr>
                            <tr>
                              <td>Trọng tài</td>
                              <td>50,000 VND</td>
                              <td>
                                <input
                                  type="number"
                                  value="1"
                                  min="0"
                                  class="form-control service-quantity"
                                />
                              </td>
                              <td>
                                <a href="#" class="text-muted"
                                  ><i class="fa fa-edit"></i> Sửa</a
                                >
                                |
                                <a href="#" class="text-muted"
                                  ><i class="fa fa-trash"></i> Xóa</a
                                >
                              </td>
                            </tr>
                          </table>
                          <dd>
                            Slot 2: 18:30 - 20:00
                            <a href="#" class="text-muted"
                              ><i class="fa fa-edit"></i> Sửa</a
                            >
                            |
                            <a href="#" class="text-muted"
                              ><i class="fa fa-trash"></i> Xóa</a
                            >
                          </dd>
                          <table class="table service-table">
                            <tr>
                              <th>Dịch vụ</th>
                              <th>Giá</th>
                              <th>Số lượng</th>
                              <th>Hành động</th>
                            </tr>
                            <tr>
                              <td>Nước</td>
                              <td>10,000 VND</td>
                              <td>
                                <input
                                  type="number"
                                  value="1"
                                  min="0"
                                  class="form-control service-quantity"
                                />
                              </td>
                              <td>
                                <a href="#" class="text-muted"
                                  ><i class="fa fa-edit"></i> Sửa</a
                                >
                                |
                                <a href="#" class="text-muted"
                                  ><i class="fa fa-trash"></i> Xóa</a
                                >
                              </td>
                            </tr>
                            <tr>
                              <td>Trọng tài</td>
                              <td>50,000 VND</td>
                              <td>
                                <input
                                  type="number"
                                  value="1"
                                  min="0"
                                  class="form-control service-quantity"
                                />
                              </td>
                              <td>
                                <a href="#" class="text-muted"
                                  ><i class="fa fa-edit"></i> Sửa</a
                                >
                                |
                                <a href="#" class="text-muted"
                                  ><i class="fa fa-trash"></i> Xóa</a
                                >
                              </td>
                            </tr>
                            <tr>
                              <td>Áo tập</td>
                              <td>20,000 VND</td>
                              <td>
                                <input
                                  type="number"
                                  value="1"
                                  min="0"
                                  class="form-control service-quantity"
                                />
                              </td>
                              <td>
                                <a href="#" class="text-muted"
                                  ><i class="fa fa-edit"></i> Sửa</a
                                >
                                |
                                <a href="#" class="text-muted"
                                  ><i class="fa fa-trash"></i> Xóa</a
                                >
                              </td>
                            </tr>
                          </table>
                          <a href="#" class="text-muted"
                            ><i class="fa fa-plus"></i> Thêm Slot</a
                          >
                        </dl>

                        <div class="m-t-sm">
                          <a href="#" class="text-muted">
                            <i class="fa fa-calendar"></i> Chọn thời gian khác
                          </a>
                          |
                          <a href="#" class="text-muted">
                            <i class="fa fa-trash"></i> Hủy đặt sân
                          </a>
                        </div>
                      </td>

                      <td>300,000 VND / Slot</td>
                      <td width="65">
                        <input
                          disabled
                          type="text"
                          class="form-control"
                          value="2"
                        />
                      </td>
                      <td>
                        <h4>600,000 VND</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="ibox-content">
              <div class="table-responsive">
                <table class="table shoping-cart-table">
                  <tbody>
                    <tr>
                      <td width="90">
                        <div class="cart-product-imitation"></div>
                      </td>
                      <td class="desc">
                        <h3>
                          <a href="#" class="text-navy"> Text editor </a>
                        </h3>
                        <p class="small">
                          There are many variations of passages of Lorem Ipsum
                          available
                        </p>
                        <dl class="small m-b-none">
                          <dt>Slot lists</dt>
                          <dd>List is perfect for defining terms.</dd>
                        </dl>

                        <div class="m-t-sm">
                          <a href="#" class="text-muted"
                            ><i class="fa fa-gift"></i> Add gift package</a
                          >
                          |
                          <a href="#" class="text-muted"
                            ><i class="fa fa-trash"></i> Remove item</a
                          >
                        </div>
                      </td>

                      <td>
                        $50,00
                        <s class="small text-muted">$63,00</s>
                      </td>
                      <td width="65">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="2"
                        />
                      </td>
                      <td>
                        <h4>$100,00</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="ibox-content">
              <div class="table-responsive">
                <table class="table shoping-cart-table">
                  <tbody>
                    <tr>
                      <td width="90">
                        <div class="cart-product-imitation"></div>
                      </td>
                      <td class="desc">
                        <h3>
                          <a href="#" class="text-navy"> CRM software </a>
                        </h3>
                        <p class="small">
                          Distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem Ipsum
                          is
                        </p>
                        <dl class="small m-b-none">
                          <dt>Description lists</dt>
                          <dd>
                            A description list is perfect for defining terms.
                          </dd>
                        </dl>

                        <div class="m-t-sm">
                          <a href="#" class="text-muted"
                            ><i class="fa fa-gift"></i> Add gift package</a
                          >
                          |
                          <a href="#" class="text-muted"
                            ><i class="fa fa-trash"></i> Remove item</a
                          >
                        </div>
                      </td>

                      <td>$110,00</td>
                      <td width="65">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="1"
                        />
                      </td>
                      <td>
                        <h4>$110,00</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="ibox-content">
              <div class="table-responsive">
                <table class="table shoping-cart-table">
                  <tbody>
                    <tr>
                      <td width="90">
                        <div class="cart-product-imitation"></div>
                      </td>
                      <td class="desc">
                        <h3>
                          <a href="#" class="text-navy"> PM software </a>
                        </h3>
                        <p class="small">
                          Readable content of a page when looking at its layout.
                          The point of using Lorem Ipsum is
                        </p>
                        <dl class="small m-b-none">
                          <dt>Description lists</dt>
                          <dd>
                            A description list is perfect for defining terms.
                          </dd>
                        </dl>

                        <div class="m-t-sm">
                          <a href="#" class="text-muted"
                            ><i class="fa fa-gift"></i> Add gift package</a
                          >
                          |
                          <a href="#" class="text-muted"
                            ><i class="fa fa-trash"></i> Remove item</a
                          >
                        </div>
                      </td>

                      <td>$130,00</td>
                      <td width="65">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="1"
                        />
                      </td>
                      <td>
                        <h4>$130,00</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="ibox-content">
              <div class="table-responsive">
                <table class="table shoping-cart-table">
                  <tbody>
                    <tr>
                      <td width="90">
                        <div class="cart-product-imitation"></div>
                      </td>
                      <td class="desc">
                        <h3>
                          <a href="#" class="text-navy"> Photo editor </a>
                        </h3>
                        <p class="small">
                          Page when looking at its layout. The point of using
                          Lorem Ipsum is
                        </p>
                        <dl class="small m-b-none">
                          <dt>Description lists</dt>
                          <dd>
                            A description list is perfect for defining terms.
                          </dd>
                        </dl>
                        <div class="m-t-sm">
                          <a href="#" class="text-muted"
                            ><i class="fa fa-gift"></i> Add gift package</a
                          >
                          |
                          <a href="#" class="text-muted"
                            ><i class="fa fa-trash"></i> Remove item</a
                          >
                        </div>
                      </td>
                      <td>$700,00</td>
                      <td width="65">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="1"
                        />
                      </td>
                      <td>
                        <h4>$70,00</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="ibox-content">
              <button class="btn btn-dns-primary pull-right">
                <i class="fa fa fa-shopping-cart"></i> Checkout
              </button>
              <button class="btn btn-white">
                <i class="fa fa-arrow-left"></i> Continue shopping
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="ibox">
            <div class="ibox-title">
              <h5>Cart Summary</h5>
            </div>
            <div class="ibox-content">
              <span> Total </span>
              <h2 class="font-bold">$390,00</h2>

              <hr />
              <span class="text-muted small">
                *For United States, France and Germany applicable sales tax will
                be applied
              </span>
              <div class="m-t-sm">
                <div class="btn-group">
                  <a href="#" class="btn btn-dns-primary btn-sm"
                    ><i class="fa fa-shopping-cart"></i> Checkout</a
                  >
                  <a href="#" class="btn btn-white btn-sm"> Cancel</a>
                </div>
              </div>
            </div>
          </div>

          <div class="ibox">
            <div class="ibox-title">
              <h5>Support</h5>
            </div>
            <div class="ibox-content text-center">
              <h3><i class="fa fa-phone"></i> +43 100 783 001</h3>
              <span class="small">
                Please contact with us if you have any questions. We are
                avalible 24h.
              </span>
            </div>
          </div>

          <div class="ibox">
            <div class="ibox-content">
              <p class="font-bold">Other products you may be interested</p>
              <hr />
              <div>
                <a href="#" class="product-name"> Product 1</a>
                <div class="small m-t-xs">
                  Many desktop publishing packages and web page editors now.
                </div>
                <div class="m-t text-righ">
                  <a href="#" class="btn btn-xs btn-outline btn-dns-primary"
                    >Info <i class="fa fa-long-arrow-right"></i>
                  </a>
                </div>
              </div>
              <hr />
              <div>
                <a href="#" class="product-name"> Product 2</a>
                <div class="small m-t-xs">
                  Many desktop publishing packages and web page editors now.
                </div>
                <div class="m-t text-righ">
                  <a href="#" class="btn btn-xs btn-outline btn-dns-primary"
                    >Info <i class="fa fa-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* import Components */
/* import JS functions */
/* import css */

export default {
  name: "check-out",
  components: {},
  data() {
    return {
      selectedFields: [],
      selectedServices: [],
    };
  },
  methods: {
    fetchData() {
      const query = this.$route.query;
      if (query.selectedFields && query.selectedServices) {
        this.selectedFields = JSON.parse(query.selectedFields);
        this.selectedServices = JSON.parse(query.selectedServices);
      }
    },
  },
};
</script>
<style>
h3 {
  font-size: 16px;
}
.text-navy {
  color: #1ab394;
}
.cart-product-imitation {
  text-align: center;
  padding-top: 30px;
  height: 80px;
  width: 80px;
  background-color: #f8f8f9;
}
.product-imitation.xl {
  padding: 120px 0;
}
.product-desc {
  padding: 20px;
  position: relative;
}
.ecommerce .tag-list {
  padding: 0;
}
.ecommerce .fa-star {
  color: #d1dade;
}
.ecommerce .fa-star.active {
  color: #f8ac59;
}
.ecommerce .note-editor {
  border: 1px solid #e7eaec;
}
table.shoping-cart-table {
  margin-bottom: 0;
}
table.shoping-cart-table tr td {
  border: none;
  text-align: right;
}
table.shoping-cart-table tr td.desc,
table.shoping-cart-table tr td:first-child {
  text-align: left;
}
table.shoping-cart-table tr td:last-child {
  width: 80px;
}
.ibox {
  clear: both;
  margin-bottom: 25px;
  margin-top: 0;
  padding: 0;
}
.ibox.collapsed .ibox-content {
  display: none;
}
.ibox:after,
.ibox:before {
  display: table;
}
.ibox-title {
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  -moz-border-right-colors: none;
  -moz-border-top-colors: none;
  background-color: #ffffff;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 3px 0 0;
  color: inherit;
  margin-bottom: 0;
  padding: 14px 15px 7px;
  min-height: 48px;
}
.ibox-content {
  background-color: #ffffff;
  color: inherit;
  padding: 15px 20px 20px 20px;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 1px 0;
}
.ibox-footer {
  color: inherit;
  border-top: 1px solid #e7eaec;
  font-size: 90%;
  background: #ffffff;
  padding: 10px 15px;
}
.service-quantity {
  width: 65px;
}
</style>

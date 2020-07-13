odoo.define("website_sale_add_to_cart", function (require) {
    "use strict";

    var publicWidget = require('web.public.widget');

    publicWidget.registry.WebsiteSale.include({
        onClickAddCartJSON: function (ev) {
            this._super(ev);
            var $link = $(ev.currentTarget);
            var $input = $link.closest('.input-group').find("input");

            if ($input.hasClass('js_update_cart_json')) {
                var lineId = parseInt($input.data("line-id"), 10);
                var productId = parseInt($input.data('product-id'), 10);
                var value = parseInt($input.val(), 10);
                this._rpc({
                    route: "/shop/cart/update_json",
                    params: {
                        line_id: lineId,
                        product_id: productId,
                        set_qty: value
                    },
                }).then(function (data) {
                    if (!data.cart_quantity) {
                        $('.o_wsale_my_cart').addClass('d-none');
                    } else {
                        $('.o_wsale_my_cart').removeClass('d-none');
                    }
                    $('.my_cart_quantity')
                        .html(data.cart_quantity)
                        .hide()
                        .fadeIn(600);
                })
            }
        }
    });
});

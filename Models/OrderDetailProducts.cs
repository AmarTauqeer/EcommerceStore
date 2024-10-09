using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceStore.Models
{
    public class OrderDetailProducts
    {
        public int orderId { get; set; }
        public int cartId { get; set; }
        public int productId { get; set; }
        public decimal price { get; set; }
        public int quantity { get; set; }
        public decimal amountPerProduct { get; set; }
        public int userId { get; set; }
    }
}
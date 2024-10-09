using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceStore.Models
{
    public class Cart
    {
        public int cartId { get; set; }
        public int productId { get; set; }
        public decimal price { get; set; }
        public int quantity { get; set; }
        public decimal amountPerProduct { get; set; }
        public int UserId { get; set; }

        public DateTime createdAt { get; set; }
    }
}
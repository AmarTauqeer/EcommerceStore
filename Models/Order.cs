using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceStore.Models
{
    public class Order
    {
        public int orderId { get; set; }
        public int userId { get; set; }
        public decimal orderAmount{get; set; }
        public DateTime orderDate { get; set; }
    }
}
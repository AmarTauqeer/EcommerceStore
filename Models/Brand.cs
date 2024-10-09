using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceStore.Models
{
    public class Brand
    {
        public int brandId { get; set; }
        public string? brandTitle { get; set; }
        public DateTime createdAt { get; set; }

    }
}
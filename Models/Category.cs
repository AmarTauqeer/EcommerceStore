using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace EcommerceStore.Models
{
    public class Category
    {
        public int id { get; set; }
        public string? title { get; set; }
        public DateTime createdAt { get; set; }
    }
}
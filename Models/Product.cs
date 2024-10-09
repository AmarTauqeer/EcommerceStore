using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceStore.Models
{
    public class Product
    {
        public int productId { get; set; }
        [Required]
        [Column(TypeName="varchar(max)")]
        public string? productTitle { get; set; }
        [Column(TypeName="varchar(max)")]
        public string? productDescription { get; set; }
        public decimal price { get; set; }
        [Required]
        public int categoryId { get; set; }
        [Required]
        public int modelId { get; set; }
        [Required]
        public int brandId { get; set; }
        public DateTime createdAt { get; set; }
        public string? imagePath { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
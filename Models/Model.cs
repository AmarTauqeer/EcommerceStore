using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceStore.Models
{
    public class Model
    {
        public int id { get; set; }
        [Column(TypeName="varchar(max)")]
        [Required]
        public string? title { get; set; }
        public DateTime createdAt { get; set; }

    }
}
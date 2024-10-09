using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceStore.Models
{
    public partial class UserSalary
    {
        public int UserId { get; set; }
        public decimal Salary { get; set; }
    }
}
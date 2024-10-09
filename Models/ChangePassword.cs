using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceStore.Models
{
    public class ChangePassword
    {
        public string? UserId { get; set; }
        public string? currentPassword { get; set; }
        public string? newPassword { get; set; }

    }
}
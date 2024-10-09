using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceStore.Models
{
    public class StripeSettings
    {
        public string? SecretKey { get; set; }
        public string? PublicKey { get; set; }
    }
}
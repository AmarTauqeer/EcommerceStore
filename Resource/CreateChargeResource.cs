using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceStore.Resource
{
    public record CreateChargeResource(
    string Currency, 
    long Amount, 
    string CustomerId, 
    string ReceiptEmail, 
    string Description);
}
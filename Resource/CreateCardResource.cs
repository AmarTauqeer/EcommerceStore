using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceStore.Resource
{
    public record CreateCardResource(
    string Name, 
    string Number, 
    string ExpiryYear, 
    string ExpiryMonth, 
    string Cvc);
}
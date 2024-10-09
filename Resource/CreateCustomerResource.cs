using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceStore.Resource
{
    public record CreateCustomerResource(
    string Email, 
    string Name, 
    CreateCardResource Card);
}
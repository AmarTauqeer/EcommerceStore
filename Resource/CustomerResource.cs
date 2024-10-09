using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceStore.Resource
{
    public record CustomerResource(
    string CustomerId,
    string Email,
    string Name);
}
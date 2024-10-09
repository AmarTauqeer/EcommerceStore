using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EcommerceStore.Resource;
using EcommerceStore.Services;
using Microsoft.AspNetCore.Authorization;
using Stripe;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using EcommerceStore.Models;
using Stripe.BillingPortal;
using Stripe.Checkout;
using System.Reflection.Metadata;

namespace EcommerceStore.Controllers
{
    // [Authorize]
    [Route("stripe")]
    public class StripeController : ControllerBase
    {
        private readonly StripeSettings _striptSettings;

        public StripeController(IOptions<StripeSettings> stripeSettings)
        {
            _striptSettings = stripeSettings.Value;

        }

        [HttpGet("confirmation/{token}")]
        [Produces("text/html")]
        public IActionResult SuccessfulUrl( string token)
        {
            return Content("<html><head><link rel='stylesheet'"+ 
                            "href='https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css'"+
                            "integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'"+
                            "crossorigin='anonymous'></head><body><div class='container p-5'>"+
                            "<h3>Hi, we have recieved your order. You will receive an email shortly.</h3>"+
                            "<a href=http://localhost:3000/home?token="+token+">Continue shoping</a></div></body></html>", "text/html");
        }

        [HttpPost("create-checkout-session/{token}")]
        public IActionResult CreateCheckoutSessionNew([FromBody] List<CartDetails> cartDetails, string token)
        {
            Console.WriteLine(token);

            // return cartDetails;
            var currency = "usd";
            var successUrl = "http://localhost:5000/stripe/confirmation/"+token;
            var cancleUrl = "http://localhost:3000/shopping-cart?token="+token;
            StripeConfiguration.ApiKey = "sk_test_51IBn26IIuSnyNovEqMRh412jcNlFqWhyOxJhJjPxNENd24xHvmfWBTBUDVqwk7RIIx2Ut8K0DiCgK2KJE1ECVmTu00TXxvUau7";//_striptSettings.SecretKey;

            if (cartDetails.Count > 0)
            {

                var options = new Stripe.Checkout.SessionCreateOptions
                {
                    PaymentMethodTypes = new List<string>
                    {
                        "card"
                    },
                    LineItems=[],
                    Mode = "payment",
                    SuccessUrl = successUrl,
                    CancelUrl = cancleUrl,
                };
                foreach (var item in cartDetails)
                {
                    options.LineItems.Add(new()
                                      {
                                        PriceData= new SessionLineItemPriceDataOptions
                                        {
                                            Currency= currency,
                                            UnitAmount= Convert.ToInt32(item.amountPerProduct)*100,
                                            ProductData = new SessionLineItemPriceDataProductDataOptions
                                            {
                                                Name=item.productTitle,
                                                Description=item.productDescription
                                            }
                                        },
                                        Quantity = item.quantity
                                    });
                }

                var service = new Stripe.Checkout.SessionService();
                var session = service.Create(options);
                var sessionId = new
                {
                    id = session.Id
                };
                return Ok(sessionId);
            }
            throw new Exception("Payment is failed.");
        }
    }
}
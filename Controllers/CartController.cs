using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using EcommerceStore.Data;
using EcommerceStore.Models;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartController : ControllerBase
    {
        private readonly DataContextDapper _dapper;
        private readonly IConfiguration _config;

        public CartController(IConfiguration config)
        {
            _config = config;
            _dapper = new DataContextDapper(config);

        }

        [HttpGet("Cart/{cartId}/{productId}/{userId}/{categoryId}/{modelId}/{brandId}/{searchParam}")]
        public IEnumerable<CartDetails> GetProducts(int cartId = 0,int userId = 0, int categoryId = 0, int productId = 0, int modelId = 0, int brandId = 0, string searchParam = "None")
        {
            string sql = @"EXEC [TutorialAppSchema].[spCart_Get]";
            string parameters = "";

            DynamicParameters sqlParameters = new DynamicParameters();
            
            if (cartId != 0)
            {
                parameters += ", @CartId=@CartIdParameter";
                sqlParameters.Add("@CartIdParameter", cartId, DbType.Int32);
            }

            if (userId != 0)
            {
                parameters += ", @UserId=@UserIdParameter";
                sqlParameters.Add("@UserIdParameter", userId, DbType.Int32);
            }

            if (categoryId != 0)
            {
                parameters += ", @CategoryId=@CategoryIdParameter";
                sqlParameters.Add("@CategoryIdParameter", categoryId, DbType.Int32);
            }

            if (productId != 0)
            {
                parameters += ", @ProductId=@ProductIdParameter";
                sqlParameters.Add("@ProductIdParameter", productId, DbType.Int32);
            }

            if (modelId != 0)
            {
                parameters += ", @ModelId=@MoodelIdParameter";
                sqlParameters.Add("@MoodelIdParameter", modelId, DbType.Int32);
            }

            if (brandId != 0)
            {
                parameters += ", @BrandId=@BrandIdParameter";
                sqlParameters.Add("@BrandIdParameter", brandId, DbType.Int32);
            }

            if (searchParam != "None")
            {
                parameters += ", @SearchValue=@SearchValueParameter";
                sqlParameters.Add("@SearchValueParameter", searchParam, DbType.String);
            }

            if (parameters.Length > 0)
            {
                sql += parameters.Substring(1);
            }


            return _dapper.LoadDataWithParameters<CartDetails>(sql, sqlParameters);
        }

        [HttpPut("UpsertCart")]
        public IActionResult UpsertCart(Cart cartToUpsert)
        {
             
            string sql = @"EXEC [TutorialAppSchema].[spCart_Upsert]
                @ProductId=@ProductIdParameter,
                @Price=@PriceParameter,
                @Quantity=@QuantityParameter,
                @AmountPerProduct=@AmountPerProductParameter,
                @UserId=@UserIdParameter";

            // Console.WriteLine(sql);

            DynamicParameters sqlParameters = new DynamicParameters();
            sqlParameters.Add("@ProductIdParameter", cartToUpsert.productId, DbType.Int32);
            sqlParameters.Add("@PriceParameter", cartToUpsert.price, DbType.Decimal);
            sqlParameters.Add("@QuantityParameter", cartToUpsert.quantity, DbType.Int32);
            sqlParameters.Add("@AmountPerProductParameter", cartToUpsert.amountPerProduct, DbType.Decimal);
            sqlParameters.Add("@UserIdParameter", cartToUpsert.UserId, DbType.Int32);


            if (cartToUpsert.cartId > 0)
            {
                sql += ", @CartId=@CartIdParameter";
                sqlParameters.Add("@CartIdParameter", cartToUpsert.cartId, DbType.Int32);
            }

            Console.WriteLine(sql);
            if (_dapper.ExecuteSqlWithParameters(sql, sqlParameters))
            {
                return Ok();
            }

            throw new Exception("Faild to upsert Cart.");
        }

        [HttpDelete("Cart/{cartId}/{productId}/{userId}")]
        public IActionResult DeleteCart(int cartId, int productId, int userId)
        {

            string sql = @"EXEC [TutorialAppSchema].[spCart_Delete] @CartId=@CartIdParameter, 
            @ProductId=@ProductIdParameter,
            @UserId=@UserIdParameter";

            DynamicParameters sqlParametersForDelete = new DynamicParameters();

            sqlParametersForDelete.Add("@CartIdParameter", cartId, DbType.Int32);

            sqlParametersForDelete.Add("@ProductIdParameter", productId, DbType.Int32);
            sqlParametersForDelete.Add("@UserIdParameter", userId, DbType.Int32);

            if (_dapper.ExecuteSqlWithParameters(sql, sqlParametersForDelete))
            {
                return Ok();
            }

            throw new Exception("Faild to Delete Cart.");
        }

    }
}
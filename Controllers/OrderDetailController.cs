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
    public class OrderDetailController : ControllerBase
    {
        private readonly DataContextDapper _dapper;
        private readonly IConfiguration _config;

        public OrderDetailController(IConfiguration config)
        {
            _config = config;
            _dapper = new DataContextDapper(config);

        }

        [HttpGet("OrderDetail/{orderId}/{cartId}/{productId}/{userId}/{searchParam}")]
        public IEnumerable<OrderDetailProducts> GetOrderDetails(int orderId = 0, int cartId = 0,int userId = 0, int productId = 0, int modelId = 0, int brandId = 0, string searchParam = "None")
        {
            string sql = @"EXEC [TutorialAppSchema].[spOrderDetail_Get]";
            string parameters = "";

            DynamicParameters sqlParameters = new DynamicParameters();

            if (orderId != 0)
            {
                parameters += ", @OrderId=@OrderIdParameter";
                sqlParameters.Add("@OrderIdParameter", orderId, DbType.Int32);
            }
            
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


            return _dapper.LoadDataWithParameters<OrderDetailProducts>(sql, sqlParameters);
        }

        [HttpPut("UpsertOrderDetail")]
        public IActionResult UpsertOrderDetail(OrderDetailProducts orderDetailToUpsert)
        {
             
            string sql = @"EXEC [TutorialAppSchema].[spOrderDetail_Upsert]
                @OrderId=@OrderIdParameter,
                @CartId=@CartIdParameter,
                @ProductId=@ProductIdParameter,
                @Price=@PriceParameter,
                @Quantity=@QuantityParameter,
                @AmountPerProduct=@AmountPerProductParameter,
                @UserId=@UserIdParameter";

            Console.WriteLine(sql);

            DynamicParameters sqlParameters = new DynamicParameters();
            sqlParameters.Add("@OrderIdParameter", orderDetailToUpsert.orderId, DbType.Int32);
            sqlParameters.Add("@CartIdParameter", orderDetailToUpsert.cartId, DbType.Int32);
            sqlParameters.Add("@ProductIdParameter", orderDetailToUpsert.productId, DbType.Int32);
            sqlParameters.Add("@PriceParameter", orderDetailToUpsert.price, DbType.Decimal);
            sqlParameters.Add("@QuantityParameter", orderDetailToUpsert.quantity, DbType.Int32);
            sqlParameters.Add("@AmountPerProductParameter", orderDetailToUpsert.amountPerProduct, DbType.Decimal);
            sqlParameters.Add("@UserIdParameter", orderDetailToUpsert.userId, DbType.Int32);

            // if (orderDetailToUpsert.orderId > 0)
            // {
            //     sql += ", @OrderId=@OrderIdParameter";
            //     sqlParameters.Add("@OrderIdParameter", orderDetailToUpsert.orderId, DbType.Int32);
            // }

            // if (orderDetailToUpsert.cartId > 0)
            // {
            //     sql += ", @CartId=@CartIdParameter";
            //     sqlParameters.Add("@CartIdParameter", orderDetailToUpsert.cartId, DbType.Int32);
            // }

            Console.WriteLine(sql);
            if (_dapper.ExecuteSqlWithParameters(sql, sqlParameters))
            {
                return Ok();
            }

            throw new Exception("Faild to upsert Order Detail.");
        }

        [HttpDelete("OrderDetail/{orderId}/{cartId}/{productId}/{userId}")]
        public IActionResult DeleteOrderDetail(int orderId, int cartId, int productId, int userId)
        {

            string sql = @"EXEC [TutorialAppSchema].[spOrderDetail_Delete] 
            @OrderId=@OrderIdParameter,
            @CartId=@CartIdParameter, 
            @ProductId=@ProductIdParameter,
            @UserId=@UserIdParameter";

            DynamicParameters sqlParametersForDelete = new DynamicParameters();

            sqlParametersForDelete.Add("@OrderIdParameter", orderId, DbType.Int32);

            sqlParametersForDelete.Add("@CartIdParameter", cartId, DbType.Int32);

            sqlParametersForDelete.Add("@ProductIdParameter", productId, DbType.Int32);
            sqlParametersForDelete.Add("@UserIdParameter", userId, DbType.Int32);

            if (_dapper.ExecuteSqlWithParameters(sql, sqlParametersForDelete))
            {
                return Ok();
            }

            throw new Exception("Faild to Delete Order Detail.");
        }

    }
}
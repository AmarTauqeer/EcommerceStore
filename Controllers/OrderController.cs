using System.Data;
using Dapper;
using EcommerceStore.Data;
using EcommerceStore.Models;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly DataContextDapper _dapper;
        private readonly IConfiguration _config;

        public OrderController(IConfiguration config)
        {
            _config = config;
            _dapper = new DataContextDapper(config);
            
        }

        [HttpGet("Order/{orderId}/{userId}/{searchParam}")]
        public IEnumerable<Order> GetOrders(int orderId = 0, int userId=0, string searchParam = "None")
        {
            string sql = @"EXEC [TutorialAppSchema].[spOrder_Get]";
            string parameters = "";

            DynamicParameters sqlParameters = new DynamicParameters();

            if (orderId !=0)
            {
                parameters += ", @OrderId=@OrderIdParameter";
                sqlParameters.Add("@OrderIdParameter", orderId, DbType.Int32);
            }

            if (userId !=0)
            {
                parameters += ", @UserId=@UserIdParameter";
                sqlParameters.Add("@UserIdParameter", userId, DbType.Int32);
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


            return _dapper.LoadDataWithParameters<Order>(sql, sqlParameters);
        }

        [HttpPut("UpsertOrder")]
        public IActionResult UpsertOrder(Order orderToUpsert)
        {
            
            string sql = @"EXEC [TutorialAppSchema].[spOrder_Upsert]
                @OrderAmount=@OrderAmountParameter";
            
            // Console.WriteLine(sql);

            DynamicParameters sqlParameters = new DynamicParameters();
            sqlParameters.Add("@OrderAmountParameter", orderToUpsert.orderAmount, DbType.Decimal);

            if (orderToUpsert.orderId>0)
            {
                 sql += ", @OrderId=@OrderIdParameter" ;
                 sqlParameters.Add("@OrderIdParameter", orderToUpsert.orderId, DbType.Int32);
            }

            if (orderToUpsert.userId>0)
            {
                 sql += ", @UserId=@UserIdParameter" ;
                 sqlParameters.Add("@UserIdParameter", orderToUpsert.userId, DbType.Int32);
            }
           

            if (_dapper.ExecuteSqlWithParameters(sql, sqlParameters))
            {
                return Ok();
            }

            throw new Exception("Faild to upsert a Order.");
        }
        
        [HttpDelete("Order/{orderId}/{userId}")]
        public IActionResult DeleteOrder(int orderId, int userId)
        {
            string sql=@"EXEC [TutorialAppSchema].[spOrder_Delete] @OrderId=@OrderIdParameter, @UserId=@UserIdParameter";
            
            DynamicParameters sqlParameters = new DynamicParameters();

            sqlParameters.Add("@OrderIdParameter", orderId, DbType.Int32);
            sqlParameters.Add("@UserIdParameter", userId, DbType.Int32);

            if (_dapper.ExecuteSqlWithParameters(sql,sqlParameters))
            {
                return Ok();
            }

            throw new Exception("Faild to Delete a Order.");
        }

    }
}
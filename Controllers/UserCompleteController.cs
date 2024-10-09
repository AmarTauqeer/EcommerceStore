using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using EcommerceStore.Data;
using EcommerceStore.Helper;
using EcommerceStore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceStore.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserCompleteController : ControllerBase
    {
        
        DataContextDapper _dapper;
        private readonly ReuseableSql _reuseableSql;
        public UserCompleteController(IConfiguration config)
        {
            _dapper = new DataContextDapper(config);
            _reuseableSql = new ReuseableSql(config);

        }

        [HttpGet("TestGetUsers")]
        public async Task<IActionResult> TestGetUsers()
        {
            return  Ok("Testing by Amar Tauqeer.");
        }

        [HttpGet("GetUsers/{userId}/{isActive}")]
        public IEnumerable<UserComplete> GetUsers(int userId, bool isActive)
        {
            string sql = @"EXEC [TutorialAppSchema].[spUsers_Get]";

            string stringParameters ="";

            DynamicParameters sqlParameters = new DynamicParameters();

            if (userId !=0)
            {
                stringParameters += ", @UserId = @UserIdParameter";
                sqlParameters.Add("@UserIdParameter", userId, DbType.Int32);
            }
            
            if (isActive)
            {
                stringParameters += ", @Active=@ActiveParameter";
                sqlParameters.Add("@ActiveParameter", isActive, DbType.Boolean);
            }
            if (stringParameters.Length > 0)
            {
                sql+=stringParameters.Substring(1);

            }


            IEnumerable<UserComplete> users = _dapper.LoadDataWithParameters<UserComplete>(sql, sqlParameters);
            return users;
        }
        
        [HttpPut("UpsertUser")]
        public IActionResult EditUser(UserComplete user)
        {
         
            if (_reuseableSql.UpsertUser(user))
            {
                return Ok();
            }

            throw new Exception("Faild to Update User.");
        }
        
        [HttpDelete("DeleteUser/{userId}")]
        public IActionResult DeleteUser(int userId)
        {
            string sql=@"EXEC [TutorialAppSchema].[spUser_Delete] @UserId=@UserIdParameter";

            DynamicParameters sqlParameters = new DynamicParameters();

            sqlParameters.Add("@UserIdParameter", userId, DbType.Int32);

            if (_dapper.ExecuteSqlWithParameters(sql, sqlParameters))
            {
                return Ok();
            }else{
                return BadRequest("Faild to Delete a User.");
            }

            // throw new Exception("Faild to Delete a User.");
            // return BadRequest("Faild to Delete a User.");
        }
        

    }
}
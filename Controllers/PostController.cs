using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using EcommerceStore.Data;
using EcommerceStore.Dtos;
using EcommerceStore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceStore.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PostController : ControllerBase
    {
        private readonly DataContextDapper _dapper;
        private readonly IConfiguration _config;
        public PostController(IConfiguration config)
        {
            _config = config;
            _dapper = new DataContextDapper(config);
        }

        [HttpGet("Posts/{postId}/{userId}/{searchParam}")]
        public IEnumerable<Post> GetPosts(int postId = 0, int userId = 0, string searchParam = "None")
        {
            string sql = @"EXEC [TutorialAppSchema].[spPosts_Get]";
            string parameters = "";

            DynamicParameters sqlParameters = new DynamicParameters();

            if (postId !=0)
            {
                parameters += ", @PostId=@PostIdParameter";
                sqlParameters.Add("@PostIdParameter", postId, DbType.Int32);
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

            

            return _dapper.LoadDataWithParameters<Post>(sql, sqlParameters);
        }


        [HttpGet("MyPosts")]
        public IEnumerable<Post> GetMyPosts()
        {
            string sql = @"EXEC [TutorialAppSchema].[spPosts_Get]  @UserId=@UserIdParameter";

            DynamicParameters sqlParameters = new DynamicParameters();
            sqlParameters.Add("@UserIdParameter", User.FindFirst("userId")?.Value, DbType.String);

            // Console.WriteLine(sql);

            return _dapper.LoadDataWithParameters<Post>(sql, sqlParameters);
        }


        [HttpPut("UpsertPost")]
        public IActionResult AddPost(Post postToUpsert)
        {
            // [TutorialAppSchema].[spPosts_Upsert]
            // /* EXEC TutorialAppSchema.spPosts_Upsert @UserId = 1003, @SearchValue='test'*/
            // @UserId INT = NULL,
            // @PostId INT = NULL,
            // @PostTitle NVARCHAR(255),
            // @PostContent NVARCHAR(max) NVARCHAR(255),

            string sql = @"EXEC [TutorialAppSchema].[spPosts_Upsert]
                @UserId=@UserIdParameter, @PostTitle=@PostTitleParameter, @PostContent=@PostContentParameter";
            
            // Console.WriteLine(sql);

            DynamicParameters sqlParameters = new DynamicParameters();
            sqlParameters.Add("@UserIdParameter", this.User.FindFirst("userId")?.Value, DbType.Int32);
            sqlParameters.Add("@PostTitleParameter", postToUpsert.PostTitle, DbType.String);
            sqlParameters.Add("@PostContentParameter", postToUpsert.PostContent, DbType.String);

            if (postToUpsert.PostId>0)
            {
                 sql += ", @PostId=@PostIdParameter" ;
                 sqlParameters.Add("@PostIdParameter", postToUpsert.PostId, DbType.Int32);
            }
           

            if (_dapper.ExecuteSqlWithParameters(sql, sqlParameters))
            {
                return Ok();
            }

            throw new Exception("Faild to upsert a Post.");
        }


        [HttpDelete("Post/{postId}")]
        public IActionResult DeletePost(int postId)
        {
            string sql=@"EXEC [TutorialAppSchema].[spPost_Delete] @PostId=@PostIdParameter, @UserId=@UserIdParameter";
            
            DynamicParameters sqlParameters = new DynamicParameters();

            sqlParameters.Add("@PostIdParameter", postId, DbType.Int32);
            sqlParameters.Add("@UserIdParameter", User.FindFirst("userId")?.Value, DbType.Int32);

            if (_dapper.ExecuteSqlWithParameters(sql,sqlParameters))
            {
                return Ok();
            }

            throw new Exception("Faild to Delete a Post.");
        }
    }
}
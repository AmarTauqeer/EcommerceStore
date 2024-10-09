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
    public class CategoryController : ControllerBase
    {
        private readonly DataContextDapper _dapper;
        private readonly IConfiguration _config;

        public CategoryController(IConfiguration config)
        {
            _config = config;
            _dapper = new DataContextDapper(config);
            
        }

        [HttpGet("Category/{categoryId}/{searchParam}")]
        public IEnumerable<Category> GetCategories(int categoryId = 0, string searchParam = "None")
        {
            string sql = @"EXEC [TutorialAppSchema].[spCategory_Get]";
            string parameters = "";

            DynamicParameters sqlParameters = new DynamicParameters();

            if (categoryId !=0)
            {
                parameters += ", @CategoryId=@CategoryIdParameter";
                sqlParameters.Add("@CategoryIdParameter", categoryId, DbType.Int32);
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


            return _dapper.LoadDataWithParameters<Category>(sql, sqlParameters);
        }

        [HttpPut("UpsertCategory")]
        public IActionResult AddCategory(Category categoryToUpsert)
        {
            
            string sql = @"EXEC [TutorialAppSchema].[spCategory_Upsert]
                @title=@CategoryTitleParameter";
            
            // Console.WriteLine(sql);

            DynamicParameters sqlParameters = new DynamicParameters();
            sqlParameters.Add("@CategoryTitleParameter", categoryToUpsert.title, DbType.String);

            if (categoryToUpsert.id>0)
            {
                 sql += ", @CategoryId=@CategoryIdParameter" ;
                 sqlParameters.Add("@CategoryIdParameter", categoryToUpsert.id, DbType.Int32);
            }
           

            if (_dapper.ExecuteSqlWithParameters(sql, sqlParameters))
            {
                return Ok();
            }

            throw new Exception("Faild to upsert a Category.");
        }
        
        [HttpDelete("Category/{categoryId}")]
        public IActionResult DeleteCategory(int categoryId)
        {
            string sql=@"EXEC [TutorialAppSchema].[spCategory_Delete] @CategoryId=@CategoryIdParameter";
            
            DynamicParameters sqlParameters = new DynamicParameters();

            sqlParameters.Add("@CategoryIdParameter", categoryId, DbType.Int32);

            if (_dapper.ExecuteSqlWithParameters(sql,sqlParameters))
            {
                return Ok();
            }

            throw new Exception("Faild to Delete a Category.");
        }

    }
}
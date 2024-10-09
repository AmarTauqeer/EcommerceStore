using System.Data;
using Dapper;
using EcommerceStore.Data;
using EcommerceStore.Models;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BrandController : ControllerBase
    {
        private readonly DataContextDapper _dapper;
        private readonly IConfiguration _config;

        public BrandController(IConfiguration config)
        {
            _config = config;
            _dapper = new DataContextDapper(config);
            
        }

        [HttpGet("Brand/{brandId}/{searchParam}")]
        public IEnumerable<Brand> GetBrands(int brandId = 0, string searchParam = "None")
        {
            string sql = @"EXEC [TutorialAppSchema].[spBrand_Get]";
            string parameters = "";

            DynamicParameters sqlParameters = new DynamicParameters();

            if (brandId !=0)
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


            return _dapper.LoadDataWithParameters<Brand>(sql, sqlParameters);
        }

        [HttpPut("UpsertBrand")]
        public IActionResult AddBrand(Brand brandToUpsert)
        {
            
            string sql = @"EXEC [TutorialAppSchema].[spBrand_Upsert]
                @title=@BrandTitleParameter";
            
            // Console.WriteLine(sql);

            DynamicParameters sqlParameters = new DynamicParameters();
            sqlParameters.Add("@BrandTitleParameter", brandToUpsert.brandTitle, DbType.String);

            if (brandToUpsert.brandId>0)
            {
                 sql += ", @BrandId=@BrandIdParameter" ;
                 sqlParameters.Add("@BrandIdParameter", brandToUpsert.brandId, DbType.Int32);
            }
           

            if (_dapper.ExecuteSqlWithParameters(sql, sqlParameters))
            {
                return Ok();
            }

            throw new Exception("Faild to upsert a Brand.");
        }
        
        [HttpDelete("Brand/{brandId}")]
        public IActionResult DeleteBrand(int brandId)
        {
            string sql=@"EXEC [TutorialAppSchema].[spBrand_Delete] @BrandId=@BrandIdParameter";
            
            DynamicParameters sqlParameters = new DynamicParameters();

            sqlParameters.Add("@BrandIdParameter", brandId, DbType.Int32);

            if (_dapper.ExecuteSqlWithParameters(sql,sqlParameters))
            {
                return Ok();
            }

            throw new Exception("Faild to Delete a Brand.");
        }

    }
}
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
    public class ProductController : ControllerBase
    {
        private readonly DataContextDapper _dapper;
        private readonly IConfiguration _config;

        private readonly IFileService _fileService;

        public ProductController(IConfiguration config, IFileService fileService)
        {
            _config = config;
            _dapper = new DataContextDapper(config);
            _fileService = fileService;

        }

        [HttpGet("Products/{productId}/{categoryId}/{modelId}/{brandId}/{searchParam}")]
        public IEnumerable<Product> GetProducts(int categoryId = 0, int productId = 0, int modelId = 0, int brandId = 0, string searchParam = "None")
        {
            string sql = @"EXEC [TutorialAppSchema].[spProduct_Get]";
            string parameters = "";

            DynamicParameters sqlParameters = new DynamicParameters();

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


            return _dapper.LoadDataWithParameters<Product>(sql, sqlParameters);
        }

        [HttpPut("UpsertProduct")]
        public IActionResult UpsertProduct(Product productToUpsert)
        {
            // Console.WriteLine(productToUpsert.ImageFile);
            // return Ok();
            string oldImagePath = "";
            if (productToUpsert.productId != 0)
            {
                // fetch product
                string sqlFetch = @"EXEC [TutorialAppSchema].[spProduct_Get]";
                string parameters = "";

                DynamicParameters sqlParametersForFetch = new DynamicParameters();
                parameters += ", @ProductId=@ProductIdParameter";
                sqlParametersForFetch.Add("@ProductIdParameter", productToUpsert.productId, DbType.Int32);

                if (parameters.Length > 0)
                {
                    sqlFetch += parameters.Substring(1);
                }

                // check for existing images

                var existingProduct = _dapper.LoadDataWithParameters<Product>(sqlFetch, sqlParametersForFetch);

                foreach (var prod in existingProduct)
                {
                    if (prod.imagePath != null)
                    {
                        oldImagePath = prod.imagePath;
                    }
                }
            }

            // if (productToUpsert.ImageFile?.Length > 2 * 1024 * 1024)
            // {
            //     return StatusCode(StatusCodes.Status400BadRequest, "File size should not exceed 1 MB");
            // }

            string[] allowedFileExtentions = [".jpg", ".jpeg", ".png"];

            string createdImagePath = "";

            if (productToUpsert.ImageFile != null)
            {
                createdImagePath = _fileService.SaveFile(productToUpsert.ImageFile, allowedFileExtentions);
            }
            Console.WriteLine($"new image path = {createdImagePath}");

            string sql = @"EXEC [TutorialAppSchema].[spProduct_Upsert]
                @CategoryId=@CategoryIdParameter, 
                @ProductTitle=@ProductTitleParameter,
                @ProductDescription=@ProductDescriptionParameter,
                @Price=@PriceParameter,
                @ImagePath=@ImagePathParameter,
                @ModelId=@ModelIdParameter,
                @BrandId=@BrandIdParameter";

            // Console.WriteLine(sql);

            DynamicParameters sqlParameters = new DynamicParameters();
            sqlParameters.Add("@ProductTitleParameter", productToUpsert.productTitle, DbType.String);
            sqlParameters.Add("@ProductDescriptionParameter", productToUpsert.productDescription, DbType.String);
            sqlParameters.Add("@CategoryIdParameter", productToUpsert.categoryId, DbType.Int32);
            sqlParameters.Add("@ModelIdParameter", productToUpsert.modelId, DbType.Int32);
            sqlParameters.Add("@BrandIdParameter", productToUpsert.brandId, DbType.Int32);
            sqlParameters.Add("@PriceParameter", productToUpsert.price, DbType.Decimal);

            if (createdImagePath != "")
                sqlParameters.Add("@ImagePathParameter", createdImagePath, DbType.String);

            if (productToUpsert.productId > 0)
            {
                sql += ", @ProductId=@ProductIdParameter";
                sqlParameters.Add("@ProductIdParameter", productToUpsert.productId, DbType.Int32);
                // delete old image
                Console.WriteLine($"old image = {oldImagePath}");
                if (oldImagePath != "")
                {
                    _fileService.DeleteFile(oldImagePath);
                }

            }

            if (_dapper.ExecuteSqlWithParameters(sql, sqlParameters))
            {
                return Ok();
            }

            throw new Exception("Faild to upsert a Product.");
        }

        [HttpDelete("Product/{productId}")]
        public IActionResult DeleteProduct(int productId)
        {
            // fetch product
            string sqlFetch = @"EXEC [TutorialAppSchema].[spProduct_Get]";
            string parameters = "";

            DynamicParameters sqlParameters = new DynamicParameters();

            if (productId != 0)
            {
                parameters += ", @ProductId=@ProductIdParameter";
                sqlParameters.Add("@ProductIdParameter", productId, DbType.Int32);
            }

            if (parameters.Length > 0)
            {
                sqlFetch += parameters.Substring(1);
            }

            var existingProduct = _dapper.LoadDataWithParameters<Product>(sqlFetch, sqlParameters);
            foreach (var product in existingProduct)
            {
                if (product.imagePath != null)
                {
                    _fileService.DeleteFile(product.imagePath);
                }

            }

            string sql = @"EXEC [TutorialAppSchema].[spProduct_Delete] @ProductId=@ProductIdParameter";

            DynamicParameters sqlParametersForDelete = new DynamicParameters();

            sqlParametersForDelete.Add("@ProductIdParameter", productId, DbType.Int32);

            if (_dapper.ExecuteSqlWithParameters(sql, sqlParametersForDelete))
            {
                return Ok();
            }

            throw new Exception("Faild to Delete a Product.");
        }

    }
}
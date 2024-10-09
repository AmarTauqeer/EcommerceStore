using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EcommerceStore.Data;
using EcommerceStore.Dtos;
using EcommerceStore.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserEFController : ControllerBase
    {
        // DataContextEF _ef;
        IUserRepository _userRepository;
        IMapper _mapper;
        public UserEFController(IConfiguration config, IUserRepository userRepository)
        {
            // _ef = new DataContextEF(config);
            _userRepository = userRepository;
            _mapper = new Mapper(new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<UserToAddDto, User>();
            }));

        }
        [HttpGet("GetUsers")]
        public IEnumerable<User> GetUsers()
        {
            return _userRepository.GetUsers();

        }
        // get request with parameter
        [HttpGet("GetSingleUser/{userId}")]
        public User GetSingleUser(int userId)
        {
            return _userRepository.GetSingleUser(userId);
        }
        [HttpPut("EditUser")]
        public IActionResult EditUser(User user)
        {
            User? userDB = _userRepository.GetSingleUser(user.UserId);
            if (userDB != null)
            {
                userDB.Active = user.Active;
                userDB.FirstName = user.FirstName;
                userDB.LastName = user.LastName;
                userDB.Gender = user.Gender;
                userDB.Email = user.Email;
                if (_userRepository.SaveChanges())
                {
                    return Ok();
                }

            }
            throw new Exception("Faild to Update User.");
        }

        [HttpPost("AddUser")]
        public IActionResult AddUser(UserToAddDto user)
        {

            User userDb = _mapper.Map<User>(user);
            _userRepository.AddEntity<User>(userDb);
            if (_userRepository.SaveChanges())
            {
                return Ok();
            }


            throw new Exception("Faild to Add User.");
        }
        [HttpDelete("DeleteUser/{userId}")]
        public IActionResult DeleteUser(int userId)
        {
            User? userDb = _userRepository.GetSingleUser(userId);
            if (userDb != null)
            {
                _userRepository.RemoveEntity<User>(userDb);
                if (_userRepository.SaveChanges())
                {
                    return Ok();
                }

            }
            throw new Exception("Faild to Delete User.");
        }

    }
}
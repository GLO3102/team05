/**
 * Created by Nate on 15-10-27.
 */

class Authentication {
    function constructor(token) {
        this.Login(token)
    }

    function GetToken() {
        return localStorage.getItem("token");
    }

    function IsLoggedIn() {
        return localStorage.getItem("token") != null;
    }

    function Login(token) {
        localStorage.setItem("token", token);
        return this;
    }

    function Logout() {
        localStorage.removeItem("token")
        return this;
    }

    function SetHeaders() {
        if (this.IsLoggedIn())
            $.ajaxSetup({
                headers: {'Authorization': this.GetToken()}
            });
        return this;
    }
}

// Hard Coded Authentication
new Authentication()
    .Login("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjJmZjdhODJiYmRmNTAzMDA2OGViOTIiLCJleHAiOjE0NDYwNzIyOTMyNTZ9.LM2Mzd0ZUP_UAZ45VfEhWgRGzO6Tzg3KPYuQIF2tJbw").SetHeaders();


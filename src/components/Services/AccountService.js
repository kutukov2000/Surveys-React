export default class AccountService {

  static async Register(newUser){
    const response = await fetch('https://surveysapi.azurewebsites.net/api/Accounts/register',{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })

    console.log(response);

    if (response.ok) {
      return true;
    }
  }

  static async Login(newUser) {
    try {
      const response = await fetch(`https://surveysapi.azurewebsites.net/api/Accounts/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      return data.token;

    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }

  }
}
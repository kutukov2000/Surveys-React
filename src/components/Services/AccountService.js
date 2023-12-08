export default class AccountService{
    static async Login(newUser){
        try {
            const response = await fetch(`https://localhost:7258/api/Accounts/login`, {
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
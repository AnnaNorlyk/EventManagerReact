// src/services/userService.ts
import { UserData } from "../Model/IUserData";
import { USER_API_BASE_URL } from "./apiConfigPath";

export async function createUser(userData: UserData): Promise<any> {
  try {
    const response = await fetch(`${USER_API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
}

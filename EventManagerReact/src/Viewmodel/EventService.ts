import { EVENT_API_BASE_URL } from "./apiConfigPath";
import { EventData } from "../Model/IEventData";


//Fetch all approved events from the server.
export const getApprovedEvents = async (): Promise<EventData[]> => {
  try {
    const response = await fetch(`${EVENT_API_BASE_URL}/approved`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch approved events:", error);
    throw error;
  }
};




export type AppContextType = string | null;

export interface AppContextInterface {
    // Define the properties of your app context here
    // For example:
    user?: {
      name: string;
      email: string;
    };
    theme?: string;
    // Add other context properties as needed
  }
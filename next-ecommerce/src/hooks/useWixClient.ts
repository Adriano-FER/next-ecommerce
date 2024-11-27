export const useWixClient = () => {
    return {
      currentCart: {
        createCheckoutFromCurrentCart: async () => ({ checkoutId: "mockCheckoutId" }),
      },
      redirects: {
        createRedirectSession: async () => ({ fullUrl: "mockRedirectUrl" }),
      },
    };
  };
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.VITE_KEY": JSON.stringify(process.env.VITE_KEY),
    "process.env.VITE_CITY": JSON.stringify(process.env.VITE_CITY),
    "process.env.VITE_RAZORPAY": JSON.stringify(process.env.VITE_RAZORPAY),
    "process.env.VITE_QUOTE_API": JSON.stringify(process.env.VITE_QUOTE_API),
  },
});

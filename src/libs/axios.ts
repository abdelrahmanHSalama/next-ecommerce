import axios from "axios";

export const supabaseProducts = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/products`,
  headers: {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    Prefer: "count=exact",
  },
});

import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate that we have the required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  )
}

// Create and export the Supabase client
// This single instance will be used throughout your app
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TypeScript interface matching your Supabase table structure
// This must match the columns you created in your database
export interface InventoryItem {
  id: string  // UUID in Supabase
  name: string
  description: string
  quantity: number
  expiry: string  // Will be stored as 'expiry_date' in database, mapped in service
  status: "fresh" | "expiring" | "expired"
  batchNumber: string  // Will be stored as 'batch_number'
  receivedDate: string  // Will be stored as 'received_date'
  donor?: string
  lastModifiedBy?: string  // Will be stored as 'last_modified_by'
  lastModifiedDate?: string  // Will be stored as 'last_modified_date'
}
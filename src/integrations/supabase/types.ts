export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      admin_otps: {
        Row: {
          attempts: number
          code_hash: string
          consumed_at: string | null
          created_at: string
          expires_at: string
          id: string
          purpose: string
          user_id: string
        }
        Insert: {
          attempts?: number
          code_hash: string
          consumed_at?: string | null
          created_at?: string
          expires_at: string
          id?: string
          purpose?: string
          user_id: string
        }
        Update: {
          attempts?: number
          code_hash?: string
          consumed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          purpose?: string
          user_id?: string
        }
        Relationships: []
      }
      admin_sessions: {
        Row: {
          created_at: string
          id: string
          ip_address: string | null
          last_active_at: string
          revoked_at: string | null
          session_token: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: string | null
          last_active_at?: string
          revoked_at?: string | null
          session_token: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string | null
          last_active_at?: string
          revoked_at?: string | null
          session_token?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          actor_email: string | null
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: string | null
          metadata: Json | null
        }
        Insert: {
          action: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
        }
        Update: {
          action?: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_date: string
          booking_time: string
          created_at: string
          customer_name: string
          customer_phone: string
          deleted_at: string | null
          id: string
          notes: string | null
          product_id: string
          product_name: string
          product_price: number
          status: Database["public"]["Enums"]["booking_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          booking_date?: string
          booking_time?: string
          created_at?: string
          customer_name: string
          customer_phone: string
          deleted_at?: string | null
          id?: string
          notes?: string | null
          product_id: string
          product_name: string
          product_price: number
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          booking_date?: string
          booking_time?: string
          created_at?: string
          customer_name?: string
          customer_phone?: string
          deleted_at?: string | null
          id?: string
          notes?: string | null
          product_id?: string
          product_name?: string
          product_price?: number
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      failed_login_attempts: {
        Row: {
          created_at: string
          email: string
          id: string
          ip_address: string | null
          reason: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          reason?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          reason?: string | null
        }
        Relationships: []
      }
      login_history: {
        Row: {
          browser: string | null
          created_at: string
          device: string | null
          email: string | null
          id: string
          ip_address: string | null
          location: string | null
          os: string | null
          status: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          browser?: string | null
          created_at?: string
          device?: string | null
          email?: string | null
          id?: string
          ip_address?: string | null
          location?: string | null
          os?: string | null
          status: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          browser?: string | null
          created_at?: string
          device?: string | null
          email?: string | null
          id?: string
          ip_address?: string | null
          location?: string | null
          os?: string | null
          status?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          deleted_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      recovery_codes: {
        Row: {
          code_hash: string
          created_at: string
          id: string
          used_at: string | null
          user_id: string
        }
        Insert: {
          code_hash: string
          created_at?: string
          id?: string
          used_at?: string | null
          user_id: string
        }
        Update: {
          code_hash?: string
          created_at?: string
          id?: string
          used_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      trusted_devices: {
        Row: {
          created_at: string
          device_hash: string
          device_label: string | null
          expires_at: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          device_hash: string
          device_label?: string | null
          expires_at: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          device_hash?: string
          device_label?: string | null
          expires_at?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role:
        | "super_admin"
        | "admin"
        | "manager"
        | "sales_executive"
        | "customer_support"
        | "customer"
      booking_status:
        | "pending"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "super_admin",
        "admin",
        "manager",
        "sales_executive",
        "customer_support",
        "customer",
      ],
      booking_status: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
      ],
    },
  },
} as const

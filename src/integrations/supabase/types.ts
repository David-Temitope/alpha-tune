export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      albums: {
        Row: {
          artist_id: string | null
          artist_name: string
          created_at: string | null
          description: string | null
          genre: Database["public"]["Enums"]["genre_type"]
          id: string
          image: string | null
          release_date: string
          song_link: string | null
          title: string
          tracks: number | null
          updated_at: string | null
        }
        Insert: {
          artist_id?: string | null
          artist_name: string
          created_at?: string | null
          description?: string | null
          genre: Database["public"]["Enums"]["genre_type"]
          id?: string
          image?: string | null
          release_date: string
          song_link?: string | null
          title: string
          tracks?: number | null
          updated_at?: string | null
        }
        Update: {
          artist_id?: string | null
          artist_name?: string
          created_at?: string | null
          description?: string | null
          genre?: Database["public"]["Enums"]["genre_type"]
          id?: string
          image?: string | null
          release_date?: string
          song_link?: string | null
          title?: string
          tracks?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "albums_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      artists: {
        Row: {
          bio: string | null
          created_at: string | null
          facebook: string | null
          followers: number | null
          genre: Database["public"]["Enums"]["genre_type"]
          id: string
          image: string | null
          instagram: string | null
          name: string
          twitter: string | null
          updated_at: string | null
          youtube: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          facebook?: string | null
          followers?: number | null
          genre: Database["public"]["Enums"]["genre_type"]
          id?: string
          image?: string | null
          instagram?: string | null
          name: string
          twitter?: string | null
          updated_at?: string | null
          youtube?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          facebook?: string | null
          followers?: number | null
          genre?: Database["public"]["Enums"]["genre_type"]
          id?: string
          image?: string | null
          instagram?: string | null
          name?: string
          twitter?: string | null
          updated_at?: string | null
          youtube?: string | null
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string
          id: string
          is_like: boolean
          item_id: string
          item_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_like: boolean
          item_id: string
          item_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_like?: boolean
          item_id?: string
          item_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          category: Database["public"]["Enums"]["news_category_type"]
          content: string | null
          created_at: string | null
          date: string | null
          excerpt: string | null
          id: string
          image: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["news_category_type"]
          content?: string | null
          created_at?: string | null
          date?: string | null
          excerpt?: string | null
          id?: string
          image?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["news_category_type"]
          content?: string | null
          created_at?: string | null
          date?: string | null
          excerpt?: string | null
          id?: string
          image?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
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
      is_admin: {
        Args: Record<PropertyKey, never> | { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      genre_type:
        | "Electronic"
        | "Hip-Hop"
        | "Folk"
        | "Pop"
        | "Rock"
        | "Jazz"
        | "Classical"
        | "Country"
        | "R&B"
        | "Reggae"
      news_category_type:
        | "News"
        | "Reviews"
        | "Interviews"
        | "Features"
        | "Events"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      genre_type: [
        "Electronic",
        "Hip-Hop",
        "Folk",
        "Pop",
        "Rock",
        "Jazz",
        "Classical",
        "Country",
        "R&B",
        "Reggae",
      ],
      news_category_type: [
        "News",
        "Reviews",
        "Interviews",
        "Features",
        "Events",
      ],
    },
  },
} as const

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
      activity_feeds: {
        Row: {
          activity_type: string
          created_at: string
          id: string
          metadata: Json | null
          target_id: string | null
          target_type: string | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          id?: string
          metadata?: Json | null
          target_id?: string | null
          target_type?: string | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          target_id?: string | null
          target_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      adventure_stories: {
        Row: {
          certificate_id: string | null
          content: string
          created_at: string
          id: string
          image_urls: Json | null
          is_featured: boolean
          likes_count: number
          location: string | null
          predator_type: string | null
          shares_count: number
          title: string
          updated_at: string
          user_id: string
          views_count: number
        }
        Insert: {
          certificate_id?: string | null
          content: string
          created_at?: string
          id?: string
          image_urls?: Json | null
          is_featured?: boolean
          likes_count?: number
          location?: string | null
          predator_type?: string | null
          shares_count?: number
          title: string
          updated_at?: string
          user_id: string
          views_count?: number
        }
        Update: {
          certificate_id?: string | null
          content?: string
          created_at?: string
          id?: string
          image_urls?: Json | null
          is_featured?: boolean
          likes_count?: number
          location?: string | null
          predator_type?: string | null
          shares_count?: number
          title?: string
          updated_at?: string
          user_id?: string
          views_count?: number
        }
        Relationships: []
      }
      animals: {
        Row: {
          category: string
          created_at: string
          danger_level: number
          description: string
          facts: string[]
          id: string
          image_url: string | null
          kills_per_year: number
          locations: string[]
          name: string
          rarity: string
        }
        Insert: {
          category: string
          created_at?: string
          danger_level: number
          description: string
          facts?: string[]
          id?: string
          image_url?: string | null
          kills_per_year?: number
          locations?: string[]
          name: string
          rarity: string
        }
        Update: {
          category?: string
          created_at?: string
          danger_level?: number
          description?: string
          facts?: string[]
          id?: string
          image_url?: string | null
          kills_per_year?: number
          locations?: string[]
          name?: string
          rarity?: string
        }
        Relationships: []
      }
      audit_metrics: {
        Row: {
          audit_id: string | null
          id: string
          metric_type: string
          metric_value: number
          page_url: string | null
          recorded_at: string | null
        }
        Insert: {
          audit_id?: string | null
          id?: string
          metric_type: string
          metric_value: number
          page_url?: string | null
          recorded_at?: string | null
        }
        Update: {
          audit_id?: string | null
          id?: string
          metric_type?: string
          metric_value?: number
          page_url?: string | null
          recorded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_metrics_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "site_audits"
            referencedColumns: ["id"]
          },
        ]
      }
      bundle_products: {
        Row: {
          animal_count: number
          base_price: number
          category: string | null
          created_at: string | null
          description: string | null
          features: string[] | null
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          savings: number
        }
        Insert: {
          animal_count: number
          base_price: number
          category?: string | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          savings: number
        }
        Update: {
          animal_count?: number
          base_price?: number
          category?: string | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          savings?: number
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_group: boolean
          name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_group?: boolean
          name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_group?: boolean
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_edited: boolean
          message_type: string
          reply_to_id: string | null
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_edited?: boolean
          message_type?: string
          reply_to_id?: string | null
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_edited?: boolean
          message_type?: string
          reply_to_id?: string | null
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_participants: {
        Row: {
          conversation_id: string
          id: string
          joined_at: string
          last_read_at: string | null
          user_id: string
        }
        Insert: {
          conversation_id: string
          id?: string
          joined_at?: string
          last_read_at?: string | null
          user_id: string
        }
        Update: {
          conversation_id?: string
          id?: string
          joined_at?: string
          last_read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_likes: {
        Row: {
          comment_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          comment_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          comment_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_likes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "post_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          fail_id: string
          id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          fail_id: string
          id?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          fail_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_fail_id_fkey"
            columns: ["fail_id"]
            isOneToOne: false
            referencedRelation: "oopsies"
            referencedColumns: ["id"]
          },
        ]
      }
      community_challenges: {
        Row: {
          challenge_type: string
          created_at: string | null
          description: string | null
          end_date: string
          id: string
          is_active: boolean | null
          reward_points: number | null
          start_date: string
          title: string
        }
        Insert: {
          challenge_type: string
          created_at?: string | null
          description?: string | null
          end_date: string
          id?: string
          is_active?: boolean | null
          reward_points?: number | null
          start_date: string
          title: string
        }
        Update: {
          challenge_type?: string
          created_at?: string | null
          description?: string | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          reward_points?: number | null
          start_date?: string
          title?: string
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          certificate_id: string | null
          comments_count: number
          content: string
          created_at: string
          id: string
          image_url: string | null
          likes_count: number
          location: string | null
          shares_count: number
          updated_at: string
          user_id: string
        }
        Insert: {
          certificate_id?: string | null
          comments_count?: number
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          likes_count?: number
          location?: string | null
          shares_count?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          certificate_id?: string | null
          comments_count?: number
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          likes_count?: number
          location?: string | null
          shares_count?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      content_analytics: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          metadata: Json | null
          oopsie_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          oopsie_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          oopsie_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_analytics_oopsie_id_fkey"
            columns: ["oopsie_id"]
            isOneToOne: false
            referencedRelation: "oopsies"
            referencedColumns: ["id"]
          },
        ]
      }
      content_sources: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          last_checked: string | null
          platform: string
          source_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_checked?: string | null
          platform: string
          source_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_checked?: string | null
          platform?: string
          source_id?: string
        }
        Relationships: []
      }
      daily_challenges: {
        Row: {
          board_data: Json
          challenge_date: string
          created_at: string
          id: string
          seed: string
          theme: string
        }
        Insert: {
          board_data: Json
          challenge_date: string
          created_at?: string
          id?: string
          seed: string
          theme?: string
        }
        Update: {
          board_data?: Json
          challenge_date?: string
          created_at?: string
          id?: string
          seed?: string
          theme?: string
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          currency: string
          donor_email: string | null
          id: string
          status: string
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          donor_email?: string | null
          id?: string
          status?: string
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          donor_email?: string | null
          id?: string
          status?: string
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      insurance_policies: {
        Row: {
          coverage_amount: number
          coverage_duration_days: number
          covered_animals: string[]
          covered_regions: string[]
          created_at: string
          description: string
          exclusions: string[]
          id: string
          is_active: boolean
          name: string
          price: number
          requirements: string[]
        }
        Insert: {
          coverage_amount: number
          coverage_duration_days?: number
          covered_animals?: string[]
          covered_regions?: string[]
          created_at?: string
          description: string
          exclusions?: string[]
          id?: string
          is_active?: boolean
          name: string
          price: number
          requirements?: string[]
        }
        Update: {
          coverage_amount?: number
          coverage_duration_days?: number
          covered_animals?: string[]
          covered_regions?: string[]
          created_at?: string
          description?: string
          exclusions?: string[]
          id?: string
          is_active?: boolean
          name?: string
          price?: number
          requirements?: string[]
        }
        Relationships: []
      }
      leaderboards: {
        Row: {
          category: string
          created_at: string | null
          id: string
          period_end: string | null
          period_start: string | null
          rank: number | null
          score: number
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          period_end?: string | null
          period_start?: string | null
          rank?: number | null
          score: number
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          period_end?: string | null
          period_start?: string | null
          rank?: number | null
          score?: number
          user_id?: string | null
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string | null
          fail_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          fail_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          fail_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_fail_id_fkey"
            columns: ["fail_id"]
            isOneToOne: false
            referencedRelation: "oopsies"
            referencedColumns: ["id"]
          },
        ]
      }
      link_health: {
        Row: {
          checked_count: number | null
          error_message: string | null
          first_discovered: string | null
          id: string
          is_healthy: boolean | null
          last_checked: string | null
          response_time: number | null
          status_code: number | null
          url: string
        }
        Insert: {
          checked_count?: number | null
          error_message?: string | null
          first_discovered?: string | null
          id?: string
          is_healthy?: boolean | null
          last_checked?: string | null
          response_time?: number | null
          status_code?: number | null
          url: string
        }
        Update: {
          checked_count?: number | null
          error_message?: string | null
          first_discovered?: string | null
          id?: string
          is_healthy?: boolean | null
          last_checked?: string | null
          response_time?: number | null
          status_code?: number | null
          url?: string
        }
        Relationships: []
      }
      moderation_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          moderator_id: string | null
          new_status: string | null
          oopsie_id: string | null
          previous_status: string | null
          reason: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          moderator_id?: string | null
          new_status?: string | null
          oopsie_id?: string | null
          previous_status?: string | null
          reason?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          moderator_id?: string | null
          new_status?: string | null
          oopsie_id?: string | null
          previous_status?: string | null
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "moderation_logs_oopsie_id_fkey"
            columns: ["oopsie_id"]
            isOneToOne: false
            referencedRelation: "oopsies"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          category: string | null
          created_at: string
          from_user_id: string | null
          id: string
          message: string
          priority: string | null
          read: boolean
          related_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          from_user_id?: string | null
          id?: string
          message: string
          priority?: string | null
          read?: boolean
          related_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          from_user_id?: string | null
          id?: string
          message?: string
          priority?: string | null
          read?: boolean
          related_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      oopsie_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          likes: number
          oopsie_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          likes?: number
          oopsie_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          likes?: number
          oopsie_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "oopsie_comments_oopsie_id_fkey"
            columns: ["oopsie_id"]
            isOneToOne: false
            referencedRelation: "oopsies"
            referencedColumns: ["id"]
          },
        ]
      }
      oopsies: {
        Row: {
          auto_generated: boolean | null
          category: string
          comments: number
          confidence_score: number | null
          created_at: string
          description: string
          discovery_date: string | null
          featured_score: number | null
          featured_until: string | null
          id: string
          image_url: string | null
          is_featured: boolean
          likes: number
          moderation_notes: string | null
          processed_at: string | null
          review_status: string | null
          shares: number
          source_platform: string | null
          source_url: string | null
          status: string
          submission_karma: number | null
          submission_notes: string | null
          tags: string[] | null
          title: string
          trending_score: number | null
          updated_at: string
          user_id: string | null
          video_url: string | null
          view_count: number | null
          viral_score: number
        }
        Insert: {
          auto_generated?: boolean | null
          category: string
          comments?: number
          confidence_score?: number | null
          created_at?: string
          description: string
          discovery_date?: string | null
          featured_score?: number | null
          featured_until?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          likes?: number
          moderation_notes?: string | null
          processed_at?: string | null
          review_status?: string | null
          shares?: number
          source_platform?: string | null
          source_url?: string | null
          status?: string
          submission_karma?: number | null
          submission_notes?: string | null
          tags?: string[] | null
          title: string
          trending_score?: number | null
          updated_at?: string
          user_id?: string | null
          video_url?: string | null
          view_count?: number | null
          viral_score?: number
        }
        Update: {
          auto_generated?: boolean | null
          category?: string
          comments?: number
          confidence_score?: number | null
          created_at?: string
          description?: string
          discovery_date?: string | null
          featured_score?: number | null
          featured_until?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          likes?: number
          moderation_notes?: string | null
          processed_at?: string | null
          review_status?: string | null
          shares?: number
          source_platform?: string | null
          source_url?: string | null
          status?: string
          submission_karma?: number | null
          submission_notes?: string | null
          tags?: string[] | null
          title?: string
          trending_score?: number | null
          updated_at?: string
          user_id?: string | null
          video_url?: string | null
          view_count?: number | null
          viral_score?: number
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number
          created_at: string
          currency: string
          customer_email: string
          customer_name: string
          id: string
          is_bundle: boolean
          items: Json | null
          plan_id: string
          plan_name: string
          status: string
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          customer_email: string
          customer_name: string
          id?: string
          is_bundle?: boolean
          items?: Json | null
          plan_id: string
          plan_name: string
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          customer_email?: string
          customer_name?: string
          id?: string
          is_bundle?: boolean
          items?: Json | null
          plan_id?: string
          plan_name?: string
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      partner_accounts: {
        Row: {
          application_id: string | null
          branding_config: Json | null
          commission_rate: number | null
          company_name: string
          contact_email: string
          created_at: string | null
          custom_domain: string | null
          id: string
          is_active: boolean | null
          partner_code: string
          total_orders: number | null
          total_revenue: number | null
          updated_at: string | null
          white_label_enabled: boolean | null
          wholesale_tier_id: string | null
        }
        Insert: {
          application_id?: string | null
          branding_config?: Json | null
          commission_rate?: number | null
          company_name: string
          contact_email: string
          created_at?: string | null
          custom_domain?: string | null
          id?: string
          is_active?: boolean | null
          partner_code: string
          total_orders?: number | null
          total_revenue?: number | null
          updated_at?: string | null
          white_label_enabled?: boolean | null
          wholesale_tier_id?: string | null
        }
        Update: {
          application_id?: string | null
          branding_config?: Json | null
          commission_rate?: number | null
          company_name?: string
          contact_email?: string
          created_at?: string | null
          custom_domain?: string | null
          id?: string
          is_active?: boolean | null
          partner_code?: string
          total_orders?: number | null
          total_revenue?: number | null
          updated_at?: string | null
          white_label_enabled?: boolean | null
          wholesale_tier_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_accounts_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "partner_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_accounts_wholesale_tier_id_fkey"
            columns: ["wholesale_tier_id"]
            isOneToOne: false
            referencedRelation: "wholesale_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_applications: {
        Row: {
          additional_notes: string | null
          annual_revenue_range: string | null
          business_type: string
          company_name: string
          company_size: string | null
          contact_name: string
          created_at: string | null
          current_distribution_channels: string[] | null
          custom_branding_needs: string | null
          email: string
          expected_monthly_volume: number | null
          id: string
          integration_requirements: string | null
          lead_score: number | null
          marketing_budget_range: string | null
          phone: string | null
          preferred_commission_structure: string | null
          status: string | null
          target_market: string | null
          timeline: string | null
          updated_at: string | null
          website_url: string | null
          white_label_interest: boolean | null
          why_partner: string | null
        }
        Insert: {
          additional_notes?: string | null
          annual_revenue_range?: string | null
          business_type: string
          company_name: string
          company_size?: string | null
          contact_name: string
          created_at?: string | null
          current_distribution_channels?: string[] | null
          custom_branding_needs?: string | null
          email: string
          expected_monthly_volume?: number | null
          id?: string
          integration_requirements?: string | null
          lead_score?: number | null
          marketing_budget_range?: string | null
          phone?: string | null
          preferred_commission_structure?: string | null
          status?: string | null
          target_market?: string | null
          timeline?: string | null
          updated_at?: string | null
          website_url?: string | null
          white_label_interest?: boolean | null
          why_partner?: string | null
        }
        Update: {
          additional_notes?: string | null
          annual_revenue_range?: string | null
          business_type?: string
          company_name?: string
          company_size?: string | null
          contact_name?: string
          created_at?: string | null
          current_distribution_channels?: string[] | null
          custom_branding_needs?: string | null
          email?: string
          expected_monthly_volume?: number | null
          id?: string
          integration_requirements?: string | null
          lead_score?: number | null
          marketing_budget_range?: string | null
          phone?: string | null
          preferred_commission_structure?: string | null
          status?: string | null
          target_market?: string | null
          timeline?: string | null
          updated_at?: string | null
          website_url?: string | null
          white_label_interest?: boolean | null
          why_partner?: string | null
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          likes_count: number
          parent_comment_id: string | null
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          likes_count?: number
          parent_comment_id?: string | null
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          likes_count?: number
          parent_comment_id?: string | null
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "post_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_reactions: {
        Row: {
          created_at: string
          id: string
          post_id: string
          reaction_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          reaction_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          reaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      predator_encounters: {
        Row: {
          animal_id: string
          created_at: string
          description: string
          encounter_date: string
          id: string
          image_url: string | null
          insurance_claim_filed: boolean
          latitude: number | null
          location: string
          longitude: number | null
          severity: string
          user_id: string | null
          verified: boolean
        }
        Insert: {
          animal_id: string
          created_at?: string
          description: string
          encounter_date: string
          id?: string
          image_url?: string | null
          insurance_claim_filed?: boolean
          latitude?: number | null
          location: string
          longitude?: number | null
          severity: string
          user_id?: string | null
          verified?: boolean
        }
        Update: {
          animal_id?: string
          created_at?: string
          description?: string
          encounter_date?: string
          id?: string
          image_url?: string | null
          insurance_claim_filed?: boolean
          latitude?: number | null
          location?: string
          longitude?: number | null
          severity?: string
          user_id?: string | null
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "predator_encounters_animal_id_fkey"
            columns: ["animal_id"]
            isOneToOne: false
            referencedRelation: "animals"
            referencedColumns: ["id"]
          },
        ]
      }
      printify_orders: {
        Row: {
          created_at: string | null
          estimated_delivery_date: string | null
          id: string
          order_id: string | null
          printify_order_id: string | null
          printify_status: string | null
          tracking_number: string | null
          tracking_url: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          estimated_delivery_date?: string | null
          id?: string
          order_id?: string | null
          printify_order_id?: string | null
          printify_status?: string | null
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          estimated_delivery_date?: string | null
          id?: string
          order_id?: string | null
          printify_order_id?: string | null
          printify_status?: string | null
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "printify_orders_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      printify_settings: {
        Row: {
          api_token_configured: boolean | null
          created_at: string | null
          id: string
          last_sync_at: string | null
          sync_enabled: boolean | null
          updated_at: string | null
        }
        Insert: {
          api_token_configured?: boolean | null
          created_at?: string | null
          id?: string
          last_sync_at?: string | null
          sync_enabled?: boolean | null
          updated_at?: string | null
        }
        Update: {
          api_token_configured?: boolean | null
          created_at?: string | null
          id?: string
          last_sync_at?: string | null
          sync_enabled?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          coming_soon: boolean | null
          created_at: string | null
          danger_level: number | null
          description: string | null
          facts: string[] | null
          featured: boolean | null
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_printify_product: boolean | null
          locations: string[] | null
          mockup_images: Json | null
          name: string
          price: number
          print_on_demand: boolean | null
          printify_data: Json | null
          printify_product_id: string | null
          printify_variant_id: string | null
          rarity: string | null
          stripe_price_id: string | null
          updated_at: string | null
          variants: Json | null
        }
        Insert: {
          category: string
          coming_soon?: boolean | null
          created_at?: string | null
          danger_level?: number | null
          description?: string | null
          facts?: string[] | null
          featured?: boolean | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_printify_product?: boolean | null
          locations?: string[] | null
          mockup_images?: Json | null
          name: string
          price: number
          print_on_demand?: boolean | null
          printify_data?: Json | null
          printify_product_id?: string | null
          printify_variant_id?: string | null
          rarity?: string | null
          stripe_price_id?: string | null
          updated_at?: string | null
          variants?: Json | null
        }
        Update: {
          category?: string
          coming_soon?: boolean | null
          created_at?: string | null
          danger_level?: number | null
          description?: string | null
          facts?: string[] | null
          featured?: boolean | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_printify_product?: boolean | null
          locations?: string[] | null
          mockup_images?: Json | null
          name?: string
          price?: number
          print_on_demand?: boolean | null
          printify_data?: Json | null
          printify_product_id?: string | null
          printify_variant_id?: string | null
          rarity?: string | null
          stripe_price_id?: string | null
          updated_at?: string | null
          variants?: Json | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          max_uses: number | null
          user_id: string
          uses_count: number
        }
        Insert: {
          code: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          user_id: string
          uses_count?: number
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          user_id?: string
          uses_count?: number
        }
        Relationships: []
      }
      referral_tracking: {
        Row: {
          conversion_type: string
          created_at: string
          id: string
          referral_code: string
          referred_id: string
          referrer_id: string
          reward_points: number | null
        }
        Insert: {
          conversion_type: string
          created_at?: string
          id?: string
          referral_code: string
          referred_id: string
          referrer_id: string
          reward_points?: number | null
        }
        Update: {
          conversion_type?: string
          created_at?: string
          id?: string
          referral_code?: string
          referred_id?: string
          referrer_id?: string
          reward_points?: number | null
        }
        Relationships: []
      }
      scheduled_tasks: {
        Row: {
          created_at: string | null
          id: string
          is_running: boolean | null
          last_run: string | null
          next_run: string | null
          task_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_running?: boolean | null
          last_run?: string | null
          next_run?: string | null
          task_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_running?: boolean | null
          last_run?: string | null
          next_run?: string | null
          task_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_audits: {
        Row: {
          accessibility_score: number | null
          audit_type: string
          average_load_time: number | null
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          domain: string
          id: string
          performance_score: number | null
          results: Json | null
          seo_score: number | null
          status: string
          summary: Json | null
          total_errors: number | null
          total_pages: number | null
          url: string
        }
        Insert: {
          accessibility_score?: number | null
          audit_type?: string
          average_load_time?: number | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          domain: string
          id?: string
          performance_score?: number | null
          results?: Json | null
          seo_score?: number | null
          status?: string
          summary?: Json | null
          total_errors?: number | null
          total_pages?: number | null
          url: string
        }
        Update: {
          accessibility_score?: number | null
          audit_type?: string
          average_load_time?: number | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          domain?: string
          id?: string
          performance_score?: number | null
          results?: Json | null
          seo_score?: number | null
          status?: string
          summary?: Json | null
          total_errors?: number | null
          total_pages?: number | null
          url?: string
        }
        Relationships: []
      }
      spotto_likes: {
        Row: {
          created_at: string
          id: string
          spotto_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          spotto_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          spotto_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "spotto_likes_spotto_id_fkey"
            columns: ["spotto_id"]
            isOneToOne: false
            referencedRelation: "spottos"
            referencedColumns: ["id"]
          },
        ]
      }
      spottos: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          latitude: number | null
          likes_count: number | null
          location_name: string | null
          longitude: number | null
          shares_count: number | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
          views_count: number | null
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          latitude?: number | null
          likes_count?: number | null
          location_name?: string | null
          longitude?: number | null
          shares_count?: number | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
          views_count?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          latitude?: number | null
          likes_count?: number | null
          location_name?: string | null
          longitude?: number | null
          shares_count?: number | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          views_count?: number | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_name: string
          achievement_type: string
          created_at: string | null
          description: string | null
          id: string
          points: number | null
          unlocked_at: string | null
          user_id: string | null
        }
        Insert: {
          achievement_name: string
          achievement_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          points?: number | null
          unlocked_at?: string | null
          user_id?: string | null
        }
        Update: {
          achievement_name?: string
          achievement_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          points?: number | null
          unlocked_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_certificates: {
        Row: {
          certificate_data: Json
          certificate_name: string
          certificate_type: string
          created_at: string
          download_count: number | null
          id: string
          last_downloaded_at: string | null
          order_id: string | null
          user_id: string | null
        }
        Insert: {
          certificate_data: Json
          certificate_name: string
          certificate_type: string
          created_at?: string
          download_count?: number | null
          id?: string
          last_downloaded_at?: string | null
          order_id?: string | null
          user_id?: string | null
        }
        Update: {
          certificate_data?: Json
          certificate_name?: string
          certificate_type?: string
          created_at?: string
          download_count?: number | null
          id?: string
          last_downloaded_at?: string | null
          order_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_certificates_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      user_challenge_participations: {
        Row: {
          challenge_id: string | null
          completed: boolean | null
          completion_date: string | null
          created_at: string | null
          id: string
          score: number | null
          user_id: string | null
        }
        Insert: {
          challenge_id?: string | null
          completed?: boolean | null
          completion_date?: string | null
          created_at?: string | null
          id?: string
          score?: number | null
          user_id?: string | null
        }
        Update: {
          challenge_id?: string | null
          completed?: boolean | null
          completion_date?: string | null
          created_at?: string | null
          id?: string
          score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_challenge_participations_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "community_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_challenge_progress: {
        Row: {
          challenge_id: string
          completed_at: string | null
          completed_prompts: string[]
          completion_percentage: number
          id: string
          started_at: string
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string | null
          completed_prompts?: string[]
          completion_percentage?: number
          id?: string
          started_at?: string
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string | null
          completed_prompts?: string[]
          completion_percentage?: number
          id?: string
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenge_progress_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "daily_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_email_preferences: {
        Row: {
          created_at: string
          daily_notifications: boolean
          id: string
          last_email_sent: string | null
          updated_at: string
          user_id: string
          weekly_recap: boolean
          welcome_email_sent: boolean
        }
        Insert: {
          created_at?: string
          daily_notifications?: boolean
          id?: string
          last_email_sent?: string | null
          updated_at?: string
          user_id: string
          weekly_recap?: boolean
          welcome_email_sent?: boolean
        }
        Update: {
          created_at?: string
          daily_notifications?: boolean
          id?: string
          last_email_sent?: string | null
          updated_at?: string
          user_id?: string
          weekly_recap?: boolean
          welcome_email_sent?: boolean
        }
        Relationships: []
      }
      user_follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      user_interactions: {
        Row: {
          created_at: string | null
          id: string
          interaction_type: string
          interaction_weight: number | null
          oopsie_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          interaction_type: string
          interaction_weight?: number | null
          oopsie_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          interaction_type?: string
          interaction_weight?: number | null
          oopsie_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_interactions_oopsie_id_fkey"
            columns: ["oopsie_id"]
            isOneToOne: false
            referencedRelation: "oopsies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_mentions: {
        Row: {
          comment_id: string | null
          created_at: string
          id: string
          mentioned_user_id: string
          mentioning_user_id: string
          message_id: string | null
          post_id: string | null
        }
        Insert: {
          comment_id?: string | null
          created_at?: string
          id?: string
          mentioned_user_id: string
          mentioning_user_id: string
          message_id?: string | null
          post_id?: string | null
        }
        Update: {
          comment_id?: string | null
          created_at?: string
          id?: string
          mentioned_user_id?: string
          mentioning_user_id?: string
          message_id?: string | null
          post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_mentions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "post_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_mentions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_mentions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_presence_extended: {
        Row: {
          activity_status: string | null
          created_at: string
          current_location: string | null
          id: string
          last_seen: string
          metadata: Json | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          activity_status?: string | null
          created_at?: string
          current_location?: string | null
          id?: string
          last_seen?: string
          metadata?: Json | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          activity_status?: string | null
          created_at?: string
          current_location?: string | null
          id?: string
          last_seen?: string
          metadata?: Json | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_reputation: {
        Row: {
          comment_karma: number | null
          created_at: string | null
          id: string
          like_karma: number | null
          submission_karma: number | null
          total_karma: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comment_karma?: number | null
          created_at?: string | null
          id?: string
          like_karma?: number | null
          submission_karma?: number | null
          total_karma?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comment_karma?: number | null
          created_at?: string | null
          id?: string
          like_karma?: number | null
          submission_karma?: number | null
          total_karma?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_rewards: {
        Row: {
          created_at: string
          id: string
          last_activity_at: string | null
          points_balance: number
          tier_level: string
          total_points_earned: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_activity_at?: string | null
          points_balance?: number
          tier_level?: string
          total_points_earned?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_activity_at?: string | null
          points_balance?: number
          tier_level?: string
          total_points_earned?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          status: string
          stripe_subscription_id: string | null
          subscription_type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_subscription_id?: string | null
          subscription_type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_subscription_id?: string | null
          subscription_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      viral_metrics: {
        Row: {
          comments_count: number | null
          created_at: string | null
          engagement_score: number | null
          id: string
          oopsie_id: string | null
          platform: string
          recorded_at: string | null
          shares_count: number | null
          upvotes_count: number | null
          viral_score: number | null
        }
        Insert: {
          comments_count?: number | null
          created_at?: string | null
          engagement_score?: number | null
          id?: string
          oopsie_id?: string | null
          platform: string
          recorded_at?: string | null
          shares_count?: number | null
          upvotes_count?: number | null
          viral_score?: number | null
        }
        Update: {
          comments_count?: number | null
          created_at?: string | null
          engagement_score?: number | null
          id?: string
          oopsie_id?: string | null
          platform?: string
          recorded_at?: string | null
          shares_count?: number | null
          upvotes_count?: number | null
          viral_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "viral_metrics_oopsie_id_fkey"
            columns: ["oopsie_id"]
            isOneToOne: false
            referencedRelation: "oopsies"
            referencedColumns: ["id"]
          },
        ]
      }
      white_label_configs: {
        Row: {
          brand_name: string
          created_at: string | null
          custom_certificate_template: Json | null
          custom_domain: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          partner_id: string | null
          pricing_markup: number | null
          primary_color: string | null
          secondary_color: string | null
          updated_at: string | null
        }
        Insert: {
          brand_name: string
          created_at?: string | null
          custom_certificate_template?: Json | null
          custom_domain?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          partner_id?: string | null
          pricing_markup?: number | null
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string | null
        }
        Update: {
          brand_name?: string
          created_at?: string | null
          custom_certificate_template?: Json | null
          custom_domain?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          partner_id?: string | null
          pricing_markup?: number | null
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "white_label_configs_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partner_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      wholesale_tiers: {
        Row: {
          created_at: string | null
          discount_percentage: number
          features: string[] | null
          id: string
          is_active: boolean | null
          min_quantity: number
          price_per_unit: number
          tier_name: string
        }
        Insert: {
          created_at?: string | null
          discount_percentage: number
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          min_quantity: number
          price_per_unit: number
          tier_name: string
        }
        Update: {
          created_at?: string | null
          discount_percentage?: number
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          min_quantity?: number
          price_per_unit?: number
          tier_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      award_achievement: {
        Args: {
          target_user_id: string
          achievement_type: string
          achievement_name: string
          description: string
          points: number
        }
        Returns: undefined
      }
      calculate_viral_score: {
        Args: {
          upvotes: number
          comments: number
          shares: number
          hours_since_creation: number
        }
        Returns: number
      }
      decrement_likes: {
        Args: { fail_id: string }
        Returns: undefined
      }
      generate_daily_challenge: {
        Args: { challenge_date: string }
        Returns: string
      }
      increment_likes: {
        Args: { fail_id: string }
        Returns: undefined
      }
      increment_oopsie_likes: {
        Args: { oopsie_id: string }
        Returns: undefined
      }
      increment_view_count: {
        Args: { oopsie_id: string }
        Returns: undefined
      }
      log_moderation_action: {
        Args: {
          oopsie_id: string
          action: string
          reason?: string
          previous_status?: string
          new_status?: string
        }
        Returns: undefined
      }
      update_link_health: {
        Args: {
          check_url: string
          status_code_param: number
          response_time_param: number
          error_message_param?: string
        }
        Returns: undefined
      }
      update_trending_scores: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_user_karma: {
        Args: { target_user_id: string; karma_type: string; points: number }
        Returns: undefined
      }
      update_viral_scores: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const

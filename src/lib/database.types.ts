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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Advice: {
        Row: {
          code: string
          createdAt: string
          href: string | null
          id: string
          level: Database["public"]["Enums"]["AdviceLevel"]
          message: string
          resolved: boolean
          resolvedAt: string | null
        }
        Insert: {
          code: string
          createdAt?: string
          href?: string | null
          id: string
          level?: Database["public"]["Enums"]["AdviceLevel"]
          message: string
          resolved?: boolean
          resolvedAt?: string | null
        }
        Update: {
          code?: string
          createdAt?: string
          href?: string | null
          id?: string
          level?: Database["public"]["Enums"]["AdviceLevel"]
          message?: string
          resolved?: boolean
          resolvedAt?: string | null
        }
        Relationships: []
      }
      Category: {
        Row: {
          color: string | null
          createdAt: string
          emoji: string | null
          id: string
          nameEn: string | null
          nameFr: string
          order: number
          parentId: string | null
          slug: string
          updatedAt: string
        }
        Insert: {
          color?: string | null
          createdAt?: string
          emoji?: string | null
          id: string
          nameEn?: string | null
          nameFr: string
          order?: number
          parentId?: string | null
          slug: string
          updatedAt: string
        }
        Update: {
          color?: string | null
          createdAt?: string
          emoji?: string | null
          id?: string
          nameEn?: string | null
          nameFr?: string
          order?: number
          parentId?: string | null
          slug?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Category_parentId_fkey"
            columns: ["parentId"]
            isOneToOne: false
            referencedRelation: "Category"
            referencedColumns: ["id"]
          },
        ]
      }
      Conversation: {
        Row: {
          createdAt: string
          customerId: string
          id: string
          lastMessageAt: string
          orderId: string | null
          status: Database["public"]["Enums"]["conversation_status"]
          subject: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          customerId: string
          id?: string
          lastMessageAt?: string
          orderId?: string | null
          status?: Database["public"]["Enums"]["conversation_status"]
          subject?: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          customerId?: string
          id?: string
          lastMessageAt?: string
          orderId?: string | null
          status?: Database["public"]["Enums"]["conversation_status"]
          subject?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Conversation_customerId_fkey"
            columns: ["customerId"]
            isOneToOne: false
            referencedRelation: "Customer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Conversation_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: true
            referencedRelation: "Order"
            referencedColumns: ["id"]
          },
        ]
      }
      Customer: {
        Row: {
          avatarUrl: string | null
          city: string | null
          company: string | null
          country: string | null
          createdAt: string
          email: string | null
          fullName: string | null
          id: string
          isAdmin: boolean
          isGuest: boolean
          phone: string | null
          updatedAt: string
        }
        Insert: {
          avatarUrl?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          createdAt?: string
          email?: string | null
          fullName?: string | null
          id: string
          isAdmin?: boolean
          isGuest?: boolean
          phone?: string | null
          updatedAt?: string
        }
        Update: {
          avatarUrl?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          createdAt?: string
          email?: string | null
          fullName?: string | null
          id?: string
          isAdmin?: boolean
          isGuest?: boolean
          phone?: string | null
          updatedAt?: string
        }
        Relationships: []
      }
      Invoice: {
        Row: {
          amount: number
          createdAt: string
          currency: string
          customerId: string
          id: string
          number: string
          orderId: string
          paidAt: string | null
          pdfUrl: string | null
          periodEnd: string | null
          periodStart: string | null
        }
        Insert: {
          amount: number
          createdAt?: string
          currency?: string
          customerId: string
          id?: string
          number: string
          orderId: string
          paidAt?: string | null
          pdfUrl?: string | null
          periodEnd?: string | null
          periodStart?: string | null
        }
        Update: {
          amount?: number
          createdAt?: string
          currency?: string
          customerId?: string
          id?: string
          number?: string
          orderId?: string
          paidAt?: string | null
          pdfUrl?: string | null
          periodEnd?: string | null
          periodStart?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Invoice_customerId_fkey"
            columns: ["customerId"]
            isOneToOne: false
            referencedRelation: "Customer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Invoice_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "Order"
            referencedColumns: ["id"]
          },
        ]
      }
      Message: {
        Row: {
          attachments: string[]
          authorId: string | null
          body: string
          conversationId: string
          createdAt: string
          fromAdmin: boolean
          id: string
          readAt: string | null
        }
        Insert: {
          attachments?: string[]
          authorId?: string | null
          body: string
          conversationId: string
          createdAt?: string
          fromAdmin?: boolean
          id?: string
          readAt?: string | null
        }
        Update: {
          attachments?: string[]
          authorId?: string | null
          body?: string
          conversationId?: string
          createdAt?: string
          fromAdmin?: boolean
          id?: string
          readAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Message_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "Customer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Message_conversationId_fkey"
            columns: ["conversationId"]
            isOneToOne: false
            referencedRelation: "Conversation"
            referencedColumns: ["id"]
          },
        ]
      }
      Order: {
        Row: {
          adminNotes: string | null
          country: string | null
          createdAt: string
          currency: string
          customerId: string | null
          deliveredAt: string | null
          discountTotal: number
          extraRevisions: number
          guestEmail: string | null
          guestName: string | null
          guestPhone: string | null
          id: string
          monthlyTotal: number
          notes: string | null
          onceTotal: number
          paidAt: string | null
          previewMessage: string | null
          previewSentAt: string | null
          previewUrl: string | null
          reference: string
          status: Database["public"]["Enums"]["order_status"]
          total: number
          updatedAt: string
          utmSource: string | null
          yearlyTotal: number
        }
        Insert: {
          adminNotes?: string | null
          country?: string | null
          createdAt?: string
          currency?: string
          customerId?: string | null
          deliveredAt?: string | null
          discountTotal?: number
          extraRevisions?: number
          guestEmail?: string | null
          guestName?: string | null
          guestPhone?: string | null
          id?: string
          monthlyTotal?: number
          notes?: string | null
          onceTotal?: number
          paidAt?: string | null
          previewMessage?: string | null
          previewSentAt?: string | null
          previewUrl?: string | null
          reference: string
          status?: Database["public"]["Enums"]["order_status"]
          total?: number
          updatedAt?: string
          utmSource?: string | null
          yearlyTotal?: number
        }
        Update: {
          adminNotes?: string | null
          country?: string | null
          createdAt?: string
          currency?: string
          customerId?: string | null
          deliveredAt?: string | null
          discountTotal?: number
          extraRevisions?: number
          guestEmail?: string | null
          guestName?: string | null
          guestPhone?: string | null
          id?: string
          monthlyTotal?: number
          notes?: string | null
          onceTotal?: number
          paidAt?: string | null
          previewMessage?: string | null
          previewSentAt?: string | null
          previewUrl?: string | null
          reference?: string
          status?: Database["public"]["Enums"]["order_status"]
          total?: number
          updatedAt?: string
          utmSource?: string | null
          yearlyTotal?: number
        }
        Relationships: [
          {
            foreignKeyName: "Order_customerId_fkey"
            columns: ["customerId"]
            isOneToOne: false
            referencedRelation: "Customer"
            referencedColumns: ["id"]
          },
        ]
      }
      OrderEvent: {
        Row: {
          authorId: string | null
          createdAt: string
          id: string
          message: string | null
          orderId: string
          status: Database["public"]["Enums"]["order_status"]
        }
        Insert: {
          authorId?: string | null
          createdAt?: string
          id?: string
          message?: string | null
          orderId: string
          status: Database["public"]["Enums"]["order_status"]
        }
        Update: {
          authorId?: string | null
          createdAt?: string
          id?: string
          message?: string | null
          orderId?: string
          status?: Database["public"]["Enums"]["order_status"]
        }
        Relationships: [
          {
            foreignKeyName: "OrderEvent_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "Order"
            referencedColumns: ["id"]
          },
        ]
      }
      OrderItem: {
        Row: {
          customization: Json | null
          description: string | null
          id: string
          label: string
          orderId: string
          periodEnd: string | null
          periodStart: string | null
          priceType: Database["public"]["Enums"]["price_type"]
          productId: string
          quantity: number
          revisionsUsed: number
          unitPrice: number
          variant: string | null
        }
        Insert: {
          customization?: Json | null
          description?: string | null
          id?: string
          label: string
          orderId: string
          periodEnd?: string | null
          periodStart?: string | null
          priceType: Database["public"]["Enums"]["price_type"]
          productId: string
          quantity?: number
          revisionsUsed?: number
          unitPrice: number
          variant?: string | null
        }
        Update: {
          customization?: Json | null
          description?: string | null
          id?: string
          label?: string
          orderId?: string
          periodEnd?: string | null
          periodStart?: string | null
          priceType?: Database["public"]["Enums"]["price_type"]
          productId?: string
          quantity?: number
          revisionsUsed?: number
          unitPrice?: number
          variant?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "OrderItem_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "Order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "OrderItem_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["id"]
          },
        ]
      }
      PackItem: {
        Row: {
          id: string
          itemId: string
          packId: string
          quantity: number
        }
        Insert: {
          id?: string
          itemId: string
          packId: string
          quantity?: number
        }
        Update: {
          id?: string
          itemId?: string
          packId?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "PackItem_itemId_fkey"
            columns: ["itemId"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "PackItem_packId_fkey"
            columns: ["packId"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["id"]
          },
        ]
      }
      Payment: {
        Row: {
          amount: number
          callbackPayload: Json | null
          createdAt: string
          currency: string
          fees: number
          id: string
          method: Database["public"]["Enums"]["payment_method"] | null
          orderId: string
          paidAt: string | null
          provider: string
          providerRef: string | null
          reason: string | null
          status: Database["public"]["Enums"]["payment_status"]
        }
        Insert: {
          amount: number
          callbackPayload?: Json | null
          createdAt?: string
          currency?: string
          fees?: number
          id?: string
          method?: Database["public"]["Enums"]["payment_method"] | null
          orderId: string
          paidAt?: string | null
          provider?: string
          providerRef?: string | null
          reason?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
        }
        Update: {
          amount?: number
          callbackPayload?: Json | null
          createdAt?: string
          currency?: string
          fees?: number
          id?: string
          method?: Database["public"]["Enums"]["payment_method"] | null
          orderId?: string
          paidAt?: string | null
          provider?: string
          providerRef?: string | null
          reason?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
        }
        Relationships: [
          {
            foreignKeyName: "Payment_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "Order"
            referencedColumns: ["id"]
          },
        ]
      }
      Product: {
        Row: {
          category: string | null
          coverUrl: string | null
          createdAt: string
          currency: string
          description: string | null
          emoji: string | null
          extraRevisionPrice: number
          features: string[]
          id: string
          name: string
          order: number
          price: number
          priceBuild: number | null
          priceCode: number | null
          priceType: Database["public"]["Enums"]["price_type"]
          revisionsIncluded: number
          screenshots: string[]
          slug: string
          status: Database["public"]["Enums"]["product_status"]
          tagline: string | null
          templateFileUrl: string | null
          templateKind: Database["public"]["Enums"]["template_kind"] | null
          templateUrl: string | null
          themeJson: Json | null
          type: Database["public"]["Enums"]["product_type"]
          updatedAt: string
        }
        Insert: {
          category?: string | null
          coverUrl?: string | null
          createdAt?: string
          currency?: string
          description?: string | null
          emoji?: string | null
          extraRevisionPrice?: number
          features?: string[]
          id?: string
          name: string
          order?: number
          price?: number
          priceBuild?: number | null
          priceCode?: number | null
          priceType?: Database["public"]["Enums"]["price_type"]
          revisionsIncluded?: number
          screenshots?: string[]
          slug: string
          status?: Database["public"]["Enums"]["product_status"]
          tagline?: string | null
          templateFileUrl?: string | null
          templateKind?: Database["public"]["Enums"]["template_kind"] | null
          templateUrl?: string | null
          themeJson?: Json | null
          type: Database["public"]["Enums"]["product_type"]
          updatedAt?: string
        }
        Update: {
          category?: string | null
          coverUrl?: string | null
          createdAt?: string
          currency?: string
          description?: string | null
          emoji?: string | null
          extraRevisionPrice?: number
          features?: string[]
          id?: string
          name?: string
          order?: number
          price?: number
          priceBuild?: number | null
          priceCode?: number | null
          priceType?: Database["public"]["Enums"]["price_type"]
          revisionsIncluded?: number
          screenshots?: string[]
          slug?: string
          status?: Database["public"]["Enums"]["product_status"]
          tagline?: string | null
          templateFileUrl?: string | null
          templateKind?: Database["public"]["Enums"]["template_kind"] | null
          templateUrl?: string | null
          themeJson?: Json | null
          type?: Database["public"]["Enums"]["product_type"]
          updatedAt?: string
        }
        Relationships: []
      }
      ProductCategory: {
        Row: {
          categoryId: string
          productId: string
        }
        Insert: {
          categoryId: string
          productId: string
        }
        Update: {
          categoryId?: string
          productId?: string
        }
        Relationships: [
          {
            foreignKeyName: "ProductCategory_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "Category"
            referencedColumns: ["id"]
          },
        ]
      }
      ProductGroup: {
        Row: {
          createdAt: string
          emoji: string | null
          id: string
          nameEn: string | null
          nameFr: string
          order: number
          slug: string
          updatedAt: string
          visible: boolean
        }
        Insert: {
          createdAt?: string
          emoji?: string | null
          id: string
          nameEn?: string | null
          nameFr: string
          order?: number
          slug: string
          updatedAt: string
          visible?: boolean
        }
        Update: {
          createdAt?: string
          emoji?: string | null
          id?: string
          nameEn?: string | null
          nameFr?: string
          order?: number
          slug?: string
          updatedAt?: string
          visible?: boolean
        }
        Relationships: []
      }
      ProductGroupItem: {
        Row: {
          groupId: string
          position: number
          productId: string
        }
        Insert: {
          groupId: string
          position?: number
          productId: string
        }
        Update: {
          groupId?: string
          position?: number
          productId?: string
        }
        Relationships: [
          {
            foreignKeyName: "ProductGroupItem_groupId_fkey"
            columns: ["groupId"]
            isOneToOne: false
            referencedRelation: "ProductGroup"
            referencedColumns: ["id"]
          },
        ]
      }
      ProductTag: {
        Row: {
          productId: string
          tagId: string
        }
        Insert: {
          productId: string
          tagId: string
        }
        Update: {
          productId?: string
          tagId?: string
        }
        Relationships: [
          {
            foreignKeyName: "ProductTag_tagId_fkey"
            columns: ["tagId"]
            isOneToOne: false
            referencedRelation: "Tag"
            referencedColumns: ["id"]
          },
        ]
      }
      Project: {
        Row: {
          category: string | null
          client: string | null
          country: string | null
          coverUrl: string | null
          createdAt: string
          description: string | null
          featured: boolean
          gallery: string[]
          id: string
          link: string | null
          order: number
          productId: string | null
          sector: string | null
          tags: string[]
          title: string
          updatedAt: string
          year: number
        }
        Insert: {
          category?: string | null
          client?: string | null
          country?: string | null
          coverUrl?: string | null
          createdAt?: string
          description?: string | null
          featured?: boolean
          gallery?: string[]
          id?: string
          link?: string | null
          order?: number
          productId?: string | null
          sector?: string | null
          tags?: string[]
          title: string
          updatedAt?: string
          year: number
        }
        Update: {
          category?: string | null
          client?: string | null
          country?: string | null
          coverUrl?: string | null
          createdAt?: string
          description?: string | null
          featured?: boolean
          gallery?: string[]
          id?: string
          link?: string | null
          order?: number
          productId?: string | null
          sector?: string | null
          tags?: string[]
          title?: string
          updatedAt?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "Project_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["id"]
          },
        ]
      }
      Setting: {
        Row: {
          key: string
          updatedAt: string
          value: Json
        }
        Insert: {
          key: string
          updatedAt?: string
          value: Json
        }
        Update: {
          key?: string
          updatedAt?: string
          value?: Json
        }
        Relationships: []
      }
      Subscription: {
        Row: {
          amount: number
          cancelledAt: string | null
          createdAt: string
          customerId: string
          id: string
          interval: Database["public"]["Enums"]["price_type"]
          nextRenewal: string
          orderId: string | null
          productId: string
          startDate: string
          status: Database["public"]["Enums"]["sub_status"]
          updatedAt: string
        }
        Insert: {
          amount: number
          cancelledAt?: string | null
          createdAt?: string
          customerId: string
          id?: string
          interval?: Database["public"]["Enums"]["price_type"]
          nextRenewal: string
          orderId?: string | null
          productId: string
          startDate?: string
          status?: Database["public"]["Enums"]["sub_status"]
          updatedAt?: string
        }
        Update: {
          amount?: number
          cancelledAt?: string | null
          createdAt?: string
          customerId?: string
          id?: string
          interval?: Database["public"]["Enums"]["price_type"]
          nextRenewal?: string
          orderId?: string | null
          productId?: string
          startDate?: string
          status?: Database["public"]["Enums"]["sub_status"]
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Subscription_customerId_fkey"
            columns: ["customerId"]
            isOneToOne: false
            referencedRelation: "Customer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Subscription_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: true
            referencedRelation: "Order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Subscription_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["id"]
          },
        ]
      }
      Tag: {
        Row: {
          color: string | null
          createdAt: string
          emoji: string | null
          id: string
          labelEn: string | null
          labelFr: string
          slug: string
        }
        Insert: {
          color?: string | null
          createdAt?: string
          emoji?: string | null
          id: string
          labelEn?: string | null
          labelFr: string
          slug: string
        }
        Update: {
          color?: string | null
          createdAt?: string
          emoji?: string | null
          id?: string
          labelEn?: string | null
          labelFr?: string
          slug?: string
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
      AdviceLevel: "INFO" | "WARNING" | "DANGER"
      conversation_status: "OPEN" | "PENDING" | "CLOSED"
      ConversationStatus: "OPEN" | "PENDING" | "CLOSED"
      order_status:
        | "PENDING_PAYMENT"
        | "ONBOARDING"
        | "IN_PRODUCTION"
        | "PREVIEW_READY"
        | "AWAITING_PAYMENT"
        | "PAID"
        | "IN_REVIEW"
        | "DELIVERED"
        | "CANCELLED"
        | "REFUNDED"
      OrderStatus:
        | "PENDING_PAYMENT"
        | "ONBOARDING"
        | "IN_PRODUCTION"
        | "PREVIEW_READY"
        | "AWAITING_PAYMENT"
        | "PAID"
        | "IN_REVIEW"
        | "DELIVERED"
        | "CANCELLED"
        | "REFUNDED"
      payment_method:
        | "ORANGE"
        | "MTN"
        | "MOOV"
        | "WAVE"
        | "CARD"
        | "BANK"
        | "OTHER"
      payment_status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED"
      PaymentMethod:
        | "ORANGE"
        | "MTN"
        | "MOOV"
        | "WAVE"
        | "CARD"
        | "BANK"
        | "OTHER"
      PaymentStatus: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED"
      price_type: "ONCE" | "MONTHLY" | "YEARLY"
      PriceType: "ONCE" | "MONTHLY" | "YEARLY"
      product_status: "DRAFT" | "ACTIVE" | "ARCHIVED"
      product_type:
        | "BASE"
        | "SUPPLEMENT"
        | "PACK"
        | "AGENT"
        | "APP"
        | "TEMPLATE"
        | "AUDIT"
        | "STUDIO"
      ProductStatus: "DRAFT" | "ACTIVE" | "ARCHIVED"
      ProductType:
        | "BASE"
        | "SUPPLEMENT"
        | "PACK"
        | "AGENT"
        | "APP"
        | "TEMPLATE"
        | "AUDIT"
        | "STUDIO"
      sub_status: "TRIALING" | "ACTIVE" | "PAST_DUE" | "CANCELLED" | "EXPIRED"
      SubStatus: "TRIALING" | "ACTIVE" | "PAST_DUE" | "CANCELLED" | "EXPIRED"
      template_kind: "HTML" | "NEXTJS" | "SCREENSHOT" | "FIGMA"
      TemplateKind: "HTML" | "NEXTJS" | "SCREENSHOT" | "FIGMA"
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
      AdviceLevel: ["INFO", "WARNING", "DANGER"],
      conversation_status: ["OPEN", "PENDING", "CLOSED"],
      ConversationStatus: ["OPEN", "PENDING", "CLOSED"],
      order_status: [
        "PENDING_PAYMENT",
        "ONBOARDING",
        "IN_PRODUCTION",
        "PREVIEW_READY",
        "AWAITING_PAYMENT",
        "PAID",
        "IN_REVIEW",
        "DELIVERED",
        "CANCELLED",
        "REFUNDED",
      ],
      OrderStatus: [
        "PENDING_PAYMENT",
        "ONBOARDING",
        "IN_PRODUCTION",
        "PREVIEW_READY",
        "AWAITING_PAYMENT",
        "PAID",
        "IN_REVIEW",
        "DELIVERED",
        "CANCELLED",
        "REFUNDED",
      ],
      payment_method: [
        "ORANGE",
        "MTN",
        "MOOV",
        "WAVE",
        "CARD",
        "BANK",
        "OTHER",
      ],
      payment_status: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
      PaymentMethod: ["ORANGE", "MTN", "MOOV", "WAVE", "CARD", "BANK", "OTHER"],
      PaymentStatus: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
      price_type: ["ONCE", "MONTHLY", "YEARLY"],
      PriceType: ["ONCE", "MONTHLY", "YEARLY"],
      product_status: ["DRAFT", "ACTIVE", "ARCHIVED"],
      product_type: [
        "BASE",
        "SUPPLEMENT",
        "PACK",
        "AGENT",
        "APP",
        "TEMPLATE",
        "AUDIT",
        "STUDIO",
      ],
      ProductStatus: ["DRAFT", "ACTIVE", "ARCHIVED"],
      ProductType: [
        "BASE",
        "SUPPLEMENT",
        "PACK",
        "AGENT",
        "APP",
        "TEMPLATE",
        "AUDIT",
        "STUDIO",
      ],
      sub_status: ["TRIALING", "ACTIVE", "PAST_DUE", "CANCELLED", "EXPIRED"],
      SubStatus: ["TRIALING", "ACTIVE", "PAST_DUE", "CANCELLED", "EXPIRED"],
      template_kind: ["HTML", "NEXTJS", "SCREENSHOT", "FIGMA"],
      TemplateKind: ["HTML", "NEXTJS", "SCREENSHOT", "FIGMA"],
    },
  },
} as const

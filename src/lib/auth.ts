// =============================================
// FILE: src/lib/auth.ts
// DESCRIPTION: Authentication helpers for Uploadthing middleware
// =============================================

import { supabase } from "./supabase";

export interface AuthUser {
  id: string;
  email: string;
}

/**
 * Verify user authentication from Authorization header
 */
export async function verifyAuth(req: Request): Promise<AuthUser | null> {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    // Verify the JWT token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.error("Auth verification failed:", error);
      return null;
    }

    return {
      id: user.id,
      email: user.email || "",
    };
  } catch (error) {
    console.error("Error verifying auth:", error);
    return null;
  }
}

/**
 * Generate unique filename for user uploads
 */
export function generateFileName(userId: string, originalName: string): string {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop() || 'jpg';
  
  return `profile-${userId}-${timestamp}-${randomSuffix}.${extension}`;
}

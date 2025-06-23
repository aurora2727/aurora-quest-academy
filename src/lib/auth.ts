import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface AuthUser {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface SignUpData {
  email: string;
  password: string;
  full_name: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export const authService = {
  async signUp({ email, password, full_name }: SignUpData) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Pendaftaran Berhasil!",
        description: "Silakan cek email Anda untuk verifikasi akun.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Pendaftaran Gagal",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  },

  async signIn({ email, password }: SignInData) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Login Berhasil!",
        description: "Selamat datang kembali di Aurora Nusa Academy.",
      });

      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Login Gagal",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Logout Berhasil",
        description: "Anda telah keluar dari akun.",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Logout Gagal",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      return profile;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await this.getCurrentUser();
        callback(profile);
      } else {
        callback(null);
      }
    });
  },
};
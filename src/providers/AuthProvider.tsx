import { supabase } from "@/lib/supabase";
import { Profile } from "@/types";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type AuthDataType = {
  session: Session | null;
  loadingSession: boolean;
  profile: Profile | null;
  isAdmin: boolean;
};

const initialData = {
  session: null,
  loadingSession: true,
  profile: null,
  isAdmin: false,
};

const AuthContext = createContext<AuthDataType>(initialData);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(initialData.session);
  const [profile, setProfile] = useState<Profile | null>(initialData.profile);
  const [loadingSession, setLoadingSession] = useState(
    initialData.loadingSession
  );

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(profileData || null);
      }

      setLoadingSession(false);
    };

    fetchSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        loadingSession,
        profile,
        isAdmin: profile?.group === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

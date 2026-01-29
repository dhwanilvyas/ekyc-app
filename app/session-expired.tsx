import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

export default function SessionExpired() {
    const { logout } = useAuthStore();

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            logout();
        }, 1000);

        return () => clearTimeout(timeOutId);
    }, []);

    return (
        <ThemedView safeArea style={{
            flex: 1,
            justifyContent: "center",
            padding: 20,
            gap: 20,
        }}>
            <ThemedText type="subtitle" style={{ textAlign: 'center' }}>Session expired, please login again.</ThemedText>
        </ThemedView>
    );
}

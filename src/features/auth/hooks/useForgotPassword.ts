"use client";

import { useState } from "react";
import { authService } from "@/services/auth.service";
import { apiClient } from "@/services/api/client";

export function useForgotPassword() {
    const [ isLoading, setIsLoading ] = useState( false );
    const [ isSuccess, setIsSuccess ] = useState( false );
    const [ error, setError ] = useState<string | null>( null );

    const requestReset = async ( email: string ) => {
        setIsLoading( true );
        setError( null );
        try {
            // Real email yuborilmasa ham, frontend oqimi tayyor bo'lishi kerak (vazifa talabi)
            await apiClient.post( "/auth/forgot-password", { email } );
            setIsSuccess( true );
        } catch {
            // Xavfsizlik nuqtai nazaridan: email mavjudligi/yo'qligini oshkor qilmaymiz,
            // har doim muvaffaqiyatli javob ko'rsatamiz (enumeration attack'dan himoya)
            setIsSuccess( true );
        } finally {
            setIsLoading( false );
        }
    };

    return { requestReset, isLoading, isSuccess, error };
}
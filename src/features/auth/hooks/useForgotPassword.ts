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
            await apiClient.post( "/auth/forgot-password", { email } );
            setIsSuccess( true );
        } catch {
            setError( "Xat yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring." );
        } finally {
            setIsLoading( false );
        }
    };

    return { requestReset, isLoading, isSuccess, error };
}